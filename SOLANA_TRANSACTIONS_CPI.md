# Solana Transactions & CPI - Complete Guide

**Learned:** 2026-02-05  
**For:** Autonomous AI agents building on Solana

---

## Transactions

### What is a Transaction?
A transaction is a **bundle of instructions** that executes atomically on Solana.

**Think of it like:**
- An envelope containing several forms
- Each form = an instruction
- Mailing the envelope = sending the transaction
- Processing = forms get executed

```
┌─────────────────────────────────────────────────────┐
│                   TRANSACTION                       │
├─────────────────────────────────────────────────────┤
│  recentBlockhash: "abc123..." (timestamp)          │
│  signatures: [sig1, sig2, ...]                      │
│  message: {                                        │
│    header: {...}                                   │
│    accountKeys: [addr1, addr2, ...]               │
│    instructions: [inst1, inst2, ...]              │
│  }                                                 │
└─────────────────────────────────────────────────────┘
```

### Key Properties

| Property | Description |
|----------|-------------|
| **Atomic** | All instructions succeed OR all fail |
| **Size limit** | 1232 bytes max |
| **Recent blockhash** | Acts as timestamp, expires after 150 blocks (~1 min) |

---

## Transaction Structure

### 1. Signatures
- Each signature = 64 bytes
- Created by signing the message with private key
- First signature = fee payer (transaction signature)

```typescript
const transaction = new Transaction();
const signature = await connection.sendTransaction(transaction, [payer]);
```

### 2. Message
```typescript
interface Message {
  header: MessageHeader;
  accountKeys: PublicKey[];
  recentBlockhash: string;
  instructions: CompiledInstruction[];
}
```

### 3. Instructions

```typescript
interface Instruction {
  programId: PublicKey;    // Which program to call
  accounts: number[];       // Indices into accountKeys
  data: Buffer;             // Instruction + arguments
}
```

**Example: Transfer SOL**
```typescript
const transferInstruction = SystemProgram.transfer({
  fromPubkey: fromWallet,
  toPubkey: toWallet,
  lamports: 1_000_000,
});
```

---

## Account Keys Ordering

Accounts in `accountKeys` must be strictly ordered:

```
[Signer + Writable]
[Signer + Read-only]
[Not signer + Writable]
[Not signer + Read-only]
```

This ordering lets Solana determine permissions from just the header + array.

---

## Cross-Program Invocation (CPI)

### What is CPI?
When one program invokes instructions from another program.

```
User Transaction → Program A → Program B → Program C
                                    ↑
                            CPI chain (depth ≤ 4)
```

**Think of it like:**
- Program's instructions = API endpoints
- CPI = one endpoint calling another internally

### CPI Depth Limit
- Max stack depth: **5** (initial + 4 CPIs)
- Beyond that: "Max instruction stack depth exceeded"

### Account Privileges in CPI

**IMPORTANT:** When making a CPI, account permissions extend:

```
Program A (has signer + writable) 
    ↓ CPI
Program B (same permissions!)
    ↓ CPI
Program C (same permissions!)
```

### Types of CPI

#### 1. Regular CPI (no PDA signer)
```typescript
// Using @solana/web3.js
await program.rpc.instructionName({
  accounts: {
    someAccount: account.publicKey,
  },
});

// Under the hood, calls: invoke()
```

#### 2. CPI with PDA Signer
```typescript
// When the callee program requires a PDA to sign
await program.rpc.instructionName({
  accounts: {
    pdaAccount: pda.publicKey,
  },
  signers: [pdaBumpSeed],
});

// Under the hood, calls: invoke_signed()
```

---

## CPI in Code

### Using Anchor (High-level)
```rust
// In Anchor program
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

#[program]
pub mod my_program {
    use super::*;
    
    pub fn transfer_with_cpi(ctx: Context<Transfer>, amount: u64) -> Result<()> {
        // CPI to Token Program
        token::transfer(ctx.accounts.transfer_ctx(), amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub from: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
```

### Using Native Rust (Lower-level)
```rust
// In native Rust program
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult};

fn transfer_with_cpi(
    from: &AccountInfo,
    to: &AccountInfo,
    authority: &AccountInfo,
    program_id: &Pubkey,
    amount: u64,
) -> ProgramResult {
    // Create instruction
    let instruction = spl_token::instruction::transfer(
        &TOKEN_PROGRAM_ID,
        from.key,
        to.key,
        authority.key,
        &[],
        amount,
    )?;
    
    // Make CPI (no PDA signer)
    solana_program::program::invoke(
        &instruction,
        &[from.clone(), to.clone(), authority.clone()],
    )
}
```

### With PDA Signer (invoke_signed)
```rust
fn transfer_with_pda_signer(
    pda: &AccountInfo,
    to: &AccountInfo,
    program_id: &Pubkey,
    seeds: &[&[u8]],
    amount: u64,
) -> ProgramResult {
    let instruction = system_instruction::transfer(
        pda.key,
        to.key,
        amount,
    );
    
    // invoke_signed allows PDA to sign
    solana_program::program::invoke_signed(
        &instruction,
        &[pda.clone(), to.clone()],
        &[seeds],  // PDA seeds for derivation
    )
}
```

---

## Practical Examples for Agents

### Example 1: Agent Creates Token Account via CPI

When an agent needs to create a token account for a user:

```typescript
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createAssociatedTokenAccount } from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');

// Agent creates ATA for user
const ata = await createAssociatedTokenAccount(
  connection,
  agentWallet,           // Agent pays the fee
  mint,                  // Token mint
  userWallet,            // User will own the ATA
);

console.log('Created ATA:', ata.toBase58());
```

### Example 2: Agent Uses Jupiter for Swap (CPI)

```typescript
import { Jupiter } from '@jup-ag/core';

const jupiter = await Jupiter.load({
  connection,
  cluster: 'mainnet',
});

// Get quote
const route = await jupiter.quote({
  inputMint: SOL_MINT,
  outputMint: USDC_MINT,
  amount: 1000000000, // 1 SOL
});

// Execute swap (creates CPI chain internally)
const { execute } = await jupiter.executeRoute(route);
const { txid } = await execute();
```

### Example 3: Agent Creates PDA Escrow

```typescript
import { PublicKey } from '@solana/web3.js';

const [escrowPDA, bump] = await PublicKey.findProgramAddress(
  [
    Buffer.from('escrow'),
    agentWallet.publicKey.toBuffer(),
    serviceId.toBuffer(),
  ],
  escrowProgram.programId
);

// escrowPDA can sign for itself via CPI!
```

---

## Sending Transactions

### Simple Transaction
```typescript
import { Transaction, SystemProgram } from '@solana/web3.js';

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromWallet.publicKey,
    toPubkey: toWallet.publicKey,
    lamports: 1_000_000,
  })
);

const signature = await connection.sendTransaction(
  transaction,
  [fromWallet]  // Signer
);
```

### Multiple Instructions
```typescript
const transaction = new Transaction()
  .add(createTokenAccountIx)
  .add(mintToIx)
  .add(transferIx);

const signature = await connection.sendTransaction(transaction, signers);
```

### With Recent Blockhash
```typescript
const { blockhash } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
```

---

## Transaction Fees

| Fee Type | Description |
|----------|-------------|
| **Base fee** | ~5000 lamports (dynamic) |
| **Prioritization fee** | Optional, for faster processing |
| **Compute units** | 200K default, can increase to 1.4M |

```typescript
// Add priority fee
const { value: fee } = await connection.getRecentPrioritizationFees();
```

---

## Error Handling

```typescript
try {
  const signature = await connection.sendTransaction(tx, signers);
  console.log('Success:', signature);
} catch (error) {
  if (error.message.includes('already in use')) {
    console.log('Account already exists');
  } else if (error.message.includes('insufficient funds')) {
    console.log('Not enough SOL');
  }
}
```

---

## Agent Workflows with CPI

### Agent Service Payment Flow
```
1. User → sends SOL to agent
2. Agent program → creates escrow PDA
3. Escrow → holds funds (PDA can sign!)
4. Service completed → escrow transfers to agent
5. Agent → provides service
```

### Multi-Program Token Launch
```
1. Agent → calls System Program (create account)
2. Agent → calls Token Program (initialize mint)
3. Agent → calls Associated Token Program (create ATA)
4. Agent → calls Token Program (mint tokens)
5. Agent → calls Raydium/Jupiter (create liquidity)
```

---

## Common CPI Patterns

| Pattern | Programs Involved |
|---------|------------------|
| Token transfer | System + Token Programs |
| Create ATA | System + Associated Token + Token Programs |
| Swap | Jupiter + Token Programs |
| Escrow | Custom Program (owns PDA) |
| NFT mint | System + Token + Metaplex Programs |

---

## Best Practices

### ✅ DO:
- Keep transactions small (under 1232 bytes)
- Get recent blockhash before sending
- Use priority fees for time-sensitive ops
- Handle CPI errors gracefully
- Validate accounts in programs

### ❌ DON'T:
- Reuse old blockhashes (expired!)
- Exceed max compute units
- Forget to include all signers
- Assume CPI depth is unlimited

---

## Resources

- **Transactions**: https://solana.com/docs/core/transactions
- **CPI**: https://solana.com/docs/core/cpi
- **Web3.js**: https://solana-labs.github.io/solana-web3.js/
- **Anchor**: https://www.anchor-lang.com
