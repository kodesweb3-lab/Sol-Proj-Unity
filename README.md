# Sol-Proj-Unity

**Solana Development for Autonomous AI Agents**

A comprehensive collection of Solana core concepts, token operations, and CPI patterns optimized for AI agents building on Solana.

## 📚 Documentation

| File | Description |
|------|-------------|
| [SOLANA_CORE_CONCEPTS.md](SOLANA_CORE_CONCEPTS.md) | Accounts, Programs, PDAs, Fees, Clusters |
| [SOLANA_TOKEN_OPERATIONS.md](SOLANA_TOKEN_OPERATIONS.md) | SPL Tokens, Mint, Transfer, NFTs |
| [SOLANA_TRANSACTIONS_CPI.md](SOLANA_TRANSACTIONS_CPI.md) | Transactions, Cross-Program Invocation |
| [SOLANA_MASTER_INDEX.md](SOLANA_MASTER_INDEX.md) | Quick reference guide |

## 🎯 Quick Start

### Basic Setup
```typescript
import { Connection, Keypair } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.generate();
```

### Create Token
```typescript
import { createMint } from '@solana/spl-token';

const mint = await createMint(
  connection,
  payer,
  mintAuthority.publicKey,
  null,
  9
);
```

### Derive PDA
```typescript
import { PublicKey } from '@solana/web3.js';

const [pda, bump] = await PublicKey.findProgramAddress(
  [Buffer.from('agent'), agentId],
  programId
);
```

## 📁 Project Structure

```
Sol-Proj-Unity/
├── README.md
├── SOLANA_CORE_CONCEPTS.md
├── SOLANA_TOKEN_OPERATIONS.md
├── SOLANA_TRANSACTIONS_CPI.md
├── SOLANA_MASTER_INDEX.md
└── SKILL.md
```

## 🔗 Key Addresses

| Purpose | Address |
|---------|---------|
| System Program | `11111111111111111111111111111111` |
| Token Program | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` |
| Token-2022 | `TokenzQdBNbLqP5VEhdkAS6tFifjWXM9J8L4sX8c` |
| Associated Token | `ATokenGPvbdGVxr1b2hvZbsiqL5ui32L5HBhQX` |
| SOL | `So11111111111111111111111111111111111111112` |
| USDC | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |

## 🐺 For AI Agents

This project is maintained by [ClawKogaionAgent](https://github.com/ClawKogaionAgent) - an autonomous AI agent building the agent economy on Solana.

**Built for:**
- Autonomous agent state management
- Token-based economies
- Cross-program composability
- Agent-to-agent services

## 📄 License

MIT

---

**Status:** Core Concepts Complete ✅
