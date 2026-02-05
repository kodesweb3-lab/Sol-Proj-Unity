# CLAW KOGAION AGENT - SOLANA MASTER INDEX

**Created:** 2026-02-05  
**Status:** ✅ CORE CONCEPTS COMPLETE

---

## 📚 LEARNED DOCS (In Order)

1. ✅ **SOLANA_CORE_CONCEPTS.md** - Accounts, Programs, Fees, PDAs
2. ✅ **SOLANA_TOKEN_OPERATIONS.md** - SPL Tokens, Mint, Transfer, NFTs
3. ✅ **SOLANA_TRANSACTIONS_CPI.md** - Transactions, CPI, Stack Depth

---

## 🎯 QUICK REFERENCE

### Core Concepts (Memory)
| Concept | Key Points |
|---------|------------|
| **Accounts** | Key-value store, max 10MiB, fields: lamports, data, owner, executable |
| **Programs** | Stateless code in executable accounts, instructions = API endpoints |
| **PDAs** | Deterministic addresses (no private key), programs can sign for their PDAs |
| **Fees** | Base + priority fees, rent (2 years worth) |
| **Clusters** | Mainnet, Devnet, Testnet |

### Token Operations (Memory)
| Operation | Function | Use Case |
|-----------|----------|----------|
| Create Mint | `createMint()` | Define new token |
| Create ATA | `createAssociatedTokenAccount()` | Wallet's token holding |
| Mint | `mintTo()` | Create supply |
| Transfer | `transfer()` | Send tokens |
| Burn | `burn()` | Remove supply |

### Transactions & CPI (Memory)
| Concept | Key Points |
|---------|------------|
| **Transaction** | Bundle of instructions, atomic (all or nothing), max 1232 bytes |
| **CPI** | Program calls another program, depth ≤ 4 |
| **invoke** | Regular CPI (no PDA signer) |
| **invoke_signed** | CPI with PDA signing |
| **Blockhash** | Expiration: ~150 blocks |

---

## 💻 CODE SNIPPETS

### Quick Transaction
```typescript
const tx = new Transaction()
  .add(SystemProgram.transfer({ from, to, lamports }));
const sig = await connection.sendTransaction(tx, [payer]);
```

### Create Token
```typescript
const mint = await createMint(connection, payer, mintAuth, null, 9);
```

### Transfer Tokens
```typescript
await transfer(connection, payer, fromATA, toATA, owner, amount);
```

### Derive PDA
```typescript
const [pda, bump] = await PublicKey.findProgramAddress(
  [seeds],
  programId
);
```

---

## 📁 FILE LOCATIONS

```
/home/rob/.openclaw/workspace/skills/solana-dev/
├── SOLANA_CORE_CONCEPTS.md      (Step 1)
├── SOLANA_TOKEN_OPERATIONS.md    (Step 2)
└── SOLANA_TRANSACTIONS_CPI.md   (Step 3)
```

---

## 🚀 NEXT STEPS

- [ ] Practice with SolSkill API
- [ ] Build first agent token
- [ ] Implement escrow with PDA
- [ ] Create swap integration
- [ ] Deploy agent service

---

## 🔗 KEY ADDRESSES

| Purpose | Address |
|---------|---------|
| System Program | `11111111111111111111111111111111` |
| Token Program | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` |
| Token-2022 | `TokenzQdBNbLqP5VEhdkAS6tFifjWXM9J8L4sX8c` |
| Associated Token | `ATokenGPvbdGVxr1b2hvZbsiqL5ui32L5HBhQX` |
| SOL | `So11111111111111111111111111111111111111112` |
| USDC | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
