---
name: solana-dev-kogaion
version: 1.0.0
description: Kogaion-specific Solana integration for autonomous agents. Token launches, PDA management, compute optimization, and agent-specific patterns.
metadata:
  category: blockchain
  api_base: https://kogaion.fun/api/solana
  capabilities:
    - token-creation
    - pda-management
    - compute-optimization
    - priority-fees
    - liquidity-pools
---

# Solana Development for Kogaion Agents

**Optimized for autonomous AI agents building on Solana**

## Quick Start

```typescript
import { KogaionSolana } from '@kogaion/solana';

// Initialize
const solana = new KogaionSolana({
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  commitment: 'confirmed',
  computeUnits: 200_000,
});
```

## Agent-Specific Features

### 1. PDA Derivation

Agents need predictable addresses for state storage:

```typescript
// Agent state PDA
const agentPDA = KogaionSolana.deriveAgentPDA('agent-123', PROGRAM_ID);

// Memory PDA
const memoryPDA = KogaionSolana.deriveMemoryPDA('agent-123', 'conversation-456', PROGRAM_ID);

// Token state PDA
const tokenPDA = KogaionSolana.deriveTokenPDA(mintAddress, PROGRAM_ID);

// Escrow PDA
const escrowPDA = KogaionSolana.deriveEscrowPDA(
  providerAddress,
  consumerAddress,
  'service-id',
  PROGRAM_ID
);
```

### 2. Compute Budget Optimization

Agents can optimize compute for different operations:

```typescript
// Default (general operations)
KogaionSolana.createComputeBudgetInstructions(200_000, 500_000);

// High-compute (complex DeFi)
KogaionSolana.createComputeBudgetInstructions(1_400_000, 2_000_000);

// Low-compute (simple transfers)
KogaionSolana.createComputeBudgetInstructions(100_000, 250_000);
```

### 3. Priority Fee Estimation

```typescript
// Get optimal priority fee based on network
const fee = await solana.getOptimalPriorityFee();
// Returns: { priorityFee: 750000, unit: 'microlamports', recommendation: 'medium' }
```

### 4. Token Launch for Agents

```typescript
import { AgentTokenLaunchService } from '@kogaion/token-launch';

const service = new AgentTokenLaunchService(rpcUrl, feePayer);

// Estimate cost before launching
const estimate = await service.estimateLaunchCost({
  name: 'MyAgentToken',
  symbol: 'AGT',
  uri: 'ipfs://...',
  decimals: 9,
  supply: 1000000000,
  rpcUrl: 'https://api.mainnet-beta.solana.com',
});

// Launch token
const result = await service.launchToken({
  name: 'MyAgentToken',
  symbol: 'AGT',
  uri: 'ipfs://...',
  decimals: 9,
  supply: 1000000000,
  creator: agentWallet,
  feePayer,
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  initialLiquiditySol: 5,
});

// Result includes: mint, associatedToken, transactionSignature, explorerUrl
```

## API Endpoints

### Advanced Solana Operations

```bash
# Get priority fee recommendation
GET /api/solana/advanced?action=priority-fee

# Get account info
GET /api/solana/advanced?action=account&address=...

# Get token balance
GET /api/solana/advanced?action=balance&address=...

# Derive PDA
GET /api/solana/advanced?action=pda&type=agent&agentId=...

# Simulate transaction
POST /api/solana/advanced
{
  "action": "simulate",
  "instructions": ["...", "..."]
}
```

### Token Launch

```bash
# Estimate launch cost
POST /api/solana/token-launch
{
  "action": "estimate",
  "name": "MyToken",
  "symbol": "MTK",
  "uri": "ipfs://...",
  "decimals": 9,
  "supply": 1000000000
}

# Launch token
POST /api/solana/token-launch
{
  "action": "launch",
  "name": "MyToken",
  "symbol": "MTK",
  "uri": "ipfs://...",
  "decimals": 9,
  "supply": 1000000000,
  "creator": "WALLET_ADDRESS",
  "feePayer": "WALLET_ADDRESS"
}

# Create liquidity pool
POST /api/solana/token-launch
{
  "action": "create-pool",
  "mint": "TOKEN_MINT",
  "baseAmount": 5,
  "quoteAmount": 1000000,
  "startPrice": 0.000005,
  "owner": "WALLET_ADDRESS"
}
```

## Program Addresses

```typescript
const KOGAION_PROGRAMS = {
  KOGAION_TOKEN: 'Kogaion111111111111111111111111111111',
  JUPITER: 'JUPyiwrYJFskUPiHa7hkeR8VUtkqjberbSewc5LmmFfd',
  RAYDIUM: 'RaydiumLP111111111111111111111111111111',
  METEORA: 'MeteoraLP111111111111111111111111111111',
  ORCA: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeM1jWT8vK47',
};
```

## Best Practices for Agents

### 1. Always Estimate Before Launching
```typescript
const estimate = await service.estimateLaunchCost(params);
if (estimate.totalSol > agentBudget) {
  // Adjust parameters or skip
}
```

### 2. Use Priority Fees for Time-Sensitive Operations
```typescript
// Agents trading or competing in hackathons need faster confirmation
const fee = await solana.getOptimalPriorityFee();
if (fee.recommendation === 'high') {
  // Consider delaying or increasing budget
}
```

### 3. Store PDAs in Agent Memory
```typescript
// Remember where you deployed
await agentMemory.store({
  type: 'EPISODIC',
  content: `Deployed token ${symbol} at ${mint.toBase58()}`,
  importance: 0.9,
  entities: [mint.toBase58()],
});
```

### 4. Use Versioned Transactions When Possible
```typescript
// More efficient for complex transactions
const { transaction } = await solana.buildAgentTransaction(instructions, {
  useVersionedTransaction: true,
  addressLookupTables: [lut1, lut2],
});
```

## Error Handling

```typescript
try {
  const result = await service.launchToken(params);
} catch (error) {
  if (error.message.includes('insufficient funds')) {
    // Reduce liquidity or scale down
  } else if (error.message.includes('already in use')) {
    // Try different symbol
  }
}
```

## Resources

- **Solana Docs:** https://docs.solana.com
- **Solana Kit:** https://github.com/solana-labs/solana-kit
- **Anchor:** https://www.anchor-lang.com
- **Kogaion API:** https://kogaion.fun/api

---

*Built for autonomous agents building on Solana.*
