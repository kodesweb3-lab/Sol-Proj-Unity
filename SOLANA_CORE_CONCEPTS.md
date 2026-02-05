# Solana Core Concepts - Learned 2026-02-05

## Accounts
- **All data stored as Accounts** (key-value store)
- **Address**: 32-byte ID, usually Ed25519 public key (base58 encoded)
- **Max size**: 10MiB
- **Fields**:
  - `lamports`: SOL balance
  - `data`: account data
  - `owner`: program that owns the account
  - `executable`: true for programs
  - `rent_epoch`: deprecated

### Account Types
| Type | Description |
|------|-------------|
| **Program accounts** | Contain executable code (smart contracts) |
| **Data accounts** | Store state/information |
| **System accounts** | Owned by System Program (wallets) |
| **Sysvar accounts** | Predefined addresses with cluster state data |

---

## Programs (Smart Contracts)
- **Stateless**: Code stored in program accounts, state in data accounts
- **Instructions**: Individual operations within a program
- **Deployed as**: ELF bytecode in sBPF format (eBPF variant)
- **Written in**: Rust (Anchor framework recommended)

### Key Programs
| Program | Address | Purpose |
|---------|---------|---------|
| System Program | `11111111111111111111111111111111` | Create accounts, transfer SOL |
| Token Program | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` | SPL tokens |
| Token-2022 | `TokenzQdBNbLqP5VEhdkAS6tFifjWXM9J8L4sX8c` | Extended SPL tokens |
| Associated Token | `ATokenGPvbdGVxr1b2hvZbsiqL5ui32L5HBhQX` | Create token accounts |

---

## Program Derived Addresses (PDAs)

### What are PDAs?
- **Deterministic addresses** derived from program ID + seeds
- **Off-curve**: No private key (can't sign directly)
- **Program can sign**: Runtime allows programs to sign for their PDAs
- **Use cases**: State storage, escrow accounts, deterministic addresses

### PDA Derivation
```
PDA = findProgramAddress(seeds + bump_seed, program_id)
```

- Starts bump=255, decrements until off-curve
- **Canonical bump**: First valid off-curve bump found
- **Always validate** inputs use canonical bump for security

### PDA Examples
| Use Case | Seeds |
|----------|-------|
| Agent state | `["agent", agent_id]` |
| Escrow | `[wallet_a, wallet_b, service_id]` |
| Token mint | `[mint_address, "state"]` |
| Memory | `[agent_id, conversation_id]` |

---

## Transactions & Instructions

### Transaction Structure
```json
{
  "recentBlockhash": "...",
  "signatures": ["sig1", "sig2"],
  "message": {
    "accountKeys": [...],
    "instructions": [...]
  }
}
```

### Instruction
```json
{
  "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  "accounts": [...],
  "data": "..."
}
```

**Key points**:
- Transaction = bundle of instructions
- Multiple programs can be invoked in one transaction
- Atomic execution (all succeed or all fail)

---

## Fees

| Fee Type | Description |
|----------|-------------|
| **Transaction fees** | Base fee for validators to process |
| **Prioritization fees** | Optional boost for faster processing |
| **Rent** | Withheld balance for data storage (≈ 2 years worth) |

---

## Clusters

| Cluster | Endpoint | Purpose |
|---------|----------|---------|
| Mainnet | `api.mainnet.solana.com` | Production |
| Devnet | `api.devnet.solana.com` | Testing |
| Testnet | `api.testnet.solana.com` | Validator testing |

---

## Cross-Program Invocation (CPI)

When one program calls another:
```
Program A → Instruction on Program B
```

**Important**: Programs can sign for PDAs they own during CPI.

---

## Tokens

### Fungible Tokens (SPL)
- Interchangeable, divisible (like USDC, SOL)
- Mint authority controls supply
- Transfer checked by Token Program

### NFTs (SPL)
- Non-fungible, indivisible
- Single mint authority, frozen state
- Metadata stored separately

---

## Key Concepts for Agents

### 1. Wallet Management
```typescript
// Keypair = public key (address) + private key (signing)
const keypair = Keypair.generate();
const publicKey = keypair.publicKey;  // Address for accounts
const secretKey = keypair.secretKey;  // Keep secret!
```

### 2. Account Ownership
- Programs own accounts, not the other way around
- Data accounts must be assigned to a program
- System Program creates accounts, then ownership is transferred

### 3. Agent State with PDAs
```typescript
// Predictable addresses for agent state
const [agentPDA, bump] = await PublicKey.findProgramAddress(
  [Buffer.from("agent"), Buffer.from(agentId)],
  programId
);
// Program can sign for agentPDA automatically
```

### 4. Compute Budget
- Each transaction has compute unit limits
- Priority fees speed up processing
- Max: 1.4M compute units per transaction

---

## Resources

- **Docs**: https://solana.com/docs
- **Explorer**: https://explorer.solana.com
- **Web3.js**: https://github.com/solana-labs/solana-web3.js
- **Anchor**: https://www.anchor-lang.com
