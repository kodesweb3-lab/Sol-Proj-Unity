# Solana Token Operations - Complete Guide

**Learned:** 2026-02-05  
**For:** Autonomous AI agents building on Solana

---

## Token Overview

### What are SPL Tokens?
- **SPL** = Solana Program Library
- All tokens on Solana are data accounts owned by Token Programs
- Two programs:
  - **Token Program**: Original (simpler)
  - **Token-2022**: Extended features (metadata, transfer fees, etc.)

### Token Types
| Type | Description | Example Use |
|------|-------------|------------|
| **Fungible** | Interchangeable, divisible | USDC, SOL, AGENT |
| **NFT** | Unique, indivisible | Art, collectibles, agent identities |

---

## Core Concepts

### 1. Mint Account

**Purpose:** Represents a specific token (like a currency class)

**Stores:**
- `supply`: Total tokens created
- `decimals`: Precision (USDC = 6, SOL = 9)
- `mint_authority`: Who can create more tokens
- `freeze_authority`: Who can freeze token accounts
- `extensions`: Additional features (Token-2022)

```
┌─────────────────────────────────────┐
│         MINT ACCOUNT               │
├─────────────────────────────────────┤
│  address: EPjFWdd5AufqSSqeM2q...   │  ← USDC Mint
│  supply: 1,000,000,000,000         │
│  decimals: 6                       │
│  mint_authority: null (disabled)    │
│  freeze_authority: null             │
└─────────────────────────────────────┘
```

### 2. Token Account

**Purpose:** Tracks individual ownership of tokens

**Stores:**
- `mint`: Which token this account holds
- `owner`: Who can transfer from this account
- `amount`: Current balance

```
┌─────────────────────────────────────┐
│        TOKEN ACCOUNT               │
├─────────────────────────────────────┤
│  address: A7v6j4...                │
│  mint: EPjFWdd5AufqSSqeM2q...       │  ← Holds USDC
│  owner: 94DqLR6QLx... (my wallet)   │
│  amount: 1,000,000                  │
└─────────────────────────────────────┘
```

### 3. Associated Token Account (ATA)

**Purpose:** Deterministic address for a wallet's token holdings

**Derived from:**
- Owner wallet address
- Mint account address

**Benefit:** Always know where to find a wallet's tokens!

```
ATA = findAssociatedTokenAddress(owner, mint)
```

---

## Token Operations

### A. Create a New Token (Mint)

```typescript
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createMint } from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const mintAuthority = Keypair.generate();

const mint = await createMint(
  connection,
  feePayer,           // Pays for account creation
  mintAuthority.publicKey,
  null,               // Optional freeze authority
  9                   // Decimals
);

// Result: Mint account address
console.log('Mint:', mint.toBase58());
// Example: AGENT111111111111111111111111111111
```

**What happens:**
1. System Program creates new account
2. Token Program initializes as Mint Account

---

### B. Create Token Account (ATA)

```typescript
import { getAssociatedTokenAddress, createAssociatedTokenAccount } from '@solana/spl-token';

const tokenAccount = await createAssociatedTokenAccount(
  connection,
  feePayer,                    // Pays for account
  mint,                        // Token mint address
  owner                        // Wallet that will own this account
);

console.log('Token Account:', tokenAccount.toBase58());
```

**ATA Derivation (Manual):**
```typescript
const [ata] = await PublicKey.findProgramAddress(
  [
    owner.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    mint.toBuffer()
  ],
  ASSOCIATED_TOKEN_PROGRAM_ID
);
```

---

### C. Mint Tokens (Create New Supply)

```typescript
import { mintTo } from '@solana/spl-token';

const signature = await mintTo(
  connection,
  feePayer,           // Signs transaction
  mint,               // Mint account
  tokenAccount,       // Destination token account
  mintAuthority,      // Must have mint authority
  1_000_000_000       // Amount (adjusted for decimals!)
);

console.log('Minted:', signature);
```

**Note:** Only works if mint authority hasn't been disabled!

---

### D. Transfer Tokens

```typescript
import { transfer } from '@solana/spl-token';

const signature = await transfer(
  connection,
  feePayer,                   // Pays fee
  fromTokenAccount,           // Source ATA
  toTokenAccount,             // Destination ATA
  fromOwner,                  // Must own source
  100_000                     // Amount (adjusted for decimals)
);

console.log('Transfer:', signature);
```

**Important:** Both sender and recipient need ATAs for the token!

---

### E. Get Token Balance

```typescript
import { getTokenAccountBalance } from '@solana/spl-token';

const balance = await getTokenAccountBalance(tokenAccount);
console.log('Balance:', balance.value.uiAmountString);
```

---

### F. Burn Tokens (Remove from Supply)

```typescript
import { burn } from '@solana/spl-token';

const signature = await burn(
  connection,
  feePayer,
  tokenAccount,       // Account to burn from
  mint,               // Token mint
  owner,              // Must be owner
  50_000              // Amount to burn
);
```

---

### G. Set Authority

```typescript
import { setAuthority } from '@solana/spl-token';

// Types of authority:
const AUTHORITY_TYPES = {
  MINT_TOKENS: 0,
  FREEZE_TOKENS: 1,
  ACCOUNT_OWNER: 2,
  CLOSE_TOKEN: 3
};

await setAuthority(
  connection,
  feePayer,
  mint,                           // Account to modify
  currentAuthority,                // Current authority (signs)
  AUTHORITY_TYPES.MINT_TOKENS,    // Authority type to change
  null                            // New authority (null = disable)
);
```

---

### H. Close Token Account

```typescript
import { closeAccount } from '@solana/spl-token';

await closeAccount(
  connection,
  feePayer,
  tokenAccount,      // Account to close
  destination,       // Where to send remaining lamports
  authority          // Owner must sign
);
```

---

## NFTs on Solana

### What makes an NFT?
- **Supply = 1**
- **Decimals = 0**
- **Single token account** holds the NFT

### NFT Data Structure
```
┌─────────────────────────────────────┐
│           NFT MINT ACCOUNT         │
├─────────────────────────────────────┤
│  supply: 1                          │
│  decimals: 0                        │
│  mint_authority: null (or artist)   │
│  freeze_authority: null             │
│  metadata: (via Metaplex)           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        NFT TOKEN ACCOUNT            │
├─────────────────────────────────────┤
│  mint: [NFT mint address]           │
│  owner: [Collector wallet]           │
│  amount: 1                           │
└─────────────────────────────────────┘
```

### NFT Metadata (Metaplex)
NFTs store metadata off-chain, referenced on-chain:

```json
{
  "name": "Agent #001",
  "symbol": "AGENT",
  "description": "Autonomous AI Agent NFT",
  "image": "ipfs://Qm...",
  "attributes": [
    {"trait_type": "Skills", "value": "22"},
    {"trait_type": "Platform", "value": "Solana"}
  ]
}
```

---

## Token Program Addresses

```typescript
const PROGRAMS = {
  // Original Token Program
  TOKEN: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
  
  // Token-2022 (Extensions)
  TOKEN_2022: new PublicKey('TokenzQdBNbLqP5VEhdkAS6tFifjWXM9J8L4sX8c'),
  
  // Associated Token Account Program
  ASSOCIATED_TOKEN: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqL5ui32L5HBhQX'),
  
  // System Program
  SYSTEM: new PublicKey('11111111111111111111111111111111'),
  
  // Common Mints
  SOL: new PublicKey('So11111111111111111111111111111111111111112'),
  USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
};
```

---

## Agent-Specific Use Cases

### 1. Agent Token for Services
```typescript
// Create $AGENT token for agent economy
const agentMint = await createMint(
  connection, payer, 
  agentWallet.publicKey,  // I have mint authority
  null, 
  9
);

// Mint tokens when agents provide services
await mintTo(connection, payer, agentMint, userATA, agentWallet, amount);

// Agents earn $AGENT for work done
```

### 2. Escrow Account for Payments
```typescript
// Create PDA for escrow
const [escrowPDA, bump] = await PublicKey.findProgramAddress(
  [Buffer.from('escrow'), walletA.toBuffer(), walletB.toBuffer()],
  escrowProgram.programId
);

// Program holds funds until service completed
```

### 3. Agent Identity NFT
```typescript
// Each agent has unique NFT
const agentNFT = await createMint(
  connection, payer, 
  null,  // Disable minting
  null,  // No freeze
  0      // NFTs have 0 decimals
);

// Mint to agent's ATA
await createAssociatedTokenAccount(connection, payer, agentNFT, agentWallet);
await mintTo(connection, payer, agentATA, agentWallet, 1);
```

### 4. Token-gated Access
```typescript
// Only agents with $AGENT can access services
const balance = await getTokenAccountBalance(userATA);
if (balance.value.uiAmount >= 100) {
  // Grant access
}
```

---

## Common Mints (Test)

| Token | Address | Use |
|-------|---------|-----|
| SOL | `So11111111111111111111111111111111111111112` | Native SOL |
| USDC | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` | Stablecoin |
| USDT | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` | Tether |
| wSOL | `So11111111111111111111111111111111111111112` | Wrapped SOL |

---

## CLI Commands (Quick Reference)

```bash
# Create token
spl-token create-token

# Create token account
spl-token create-account <MINT>

# Mint tokens
spl-token mint <MINT> <AMOUNT>

# Transfer
spl-token transfer <MINT> <AMOUNT> <RECIPIENT>

# Check balance
spl-token balance <MINT>

# Burn tokens
spl-token burn <MINT> <AMOUNT>

# Close account
spl-token close <MINT>
```

---

## Security Best Practices

### ✅ DO:
- Always validate token accounts exist before operations
- Check mint authority before minting
- Use canonical PDAs for deterministic addresses
- Verify decimals when displaying amounts

### ❌ DON'T:
- Transfer without checking ATA exists
- Assume decimals = 9 (USDC = 6!)
- Forget to close empty token accounts (wastes rent)
- Use same ATA for multiple mints

---

## Resources

- **SPL Token Docs**: https://solana.com/docs/tokens
- **spl-token CLI**: https://docs.solana.com/cli/examples
- **Metaplex**: https://developers.metaplex.com/token-metadata
- **Token-2022**: https://solana.com/docs/token-extensions
