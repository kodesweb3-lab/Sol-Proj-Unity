# REALMS INTEGRATION

**NPC-GAME x Realms** - DAO Governance & Launchpad

---

## Overview

NPC-GAME integrates with **Realms** for:
1. **DAO Governance** - $NPC holder voting
2. **Launchpad Presale** - Native token fundraising
3. **Treasury Management** - Multisig security

---

## Realms Program Addresses

| Program | Address |
|---------|---------|
| SPL Governance | `GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw` |
| Launchpad | `ReaLM68X8dXLz35oXqofDYkNWiBFZr4FcefSJyTr9Yh` |
| API Base | `https://v2.realms.today/api/v1` |

---

## Integration Plan

### Phase 1: Presale via Realms Launchpad

**Use Realms Launchpad program for:**
- Automated token distribution
-SOL collection from investors
- Immediate token vesting/claiming

**Benefits:**
- ✅ Trustless execution (smart contract)
- ✅ No manual tracking
- ✅ Instant settlement

### Phase 2: DAO Governance

**After TGE, create NPC-GAME DAO:**
- $NPC holders vote on:
  - New game features
  - Tournament formats
  - Treasury allocation
  - Fee adjustments

**Governance Power:**
- 1 $NPC = 1 vote
- Quadratic voting for large holders
- Time-locked votes (no flash loans)

### Phase 3: Treasury Multisig

**Treasury funds managed via:**
- Realms multisig (3/5 signers)
- Signers: Team + major holders
- Actions: LP additions, buybacks, emergencies

---

## API Usage

### Create Proposal

```typescript
POST https://v2.realms.today/api/v1/governance/create
{
  "realm": "NPC-GAME-DAO",
  "programId": "ReaLM68X8dXLz35oXqofDYkNWiBFZr4FcefSJyTr9Yh",
  "instruction": "...",
  "votingPower": "...",
  "deadline": 172800 // 48 hours
}
```

### Vote

```typescript
POST https://v2.realms.today/api/v1/governance/vote
{
  "proposalId": "...",
  "vote": "approve" | "deny" | "abstain"
}
```

### Launch Presale

```typescript
POST https://v2.realms.today/api/v1/launchpad/create
{
  "tokenMint": "$NPC-MINT-ADDRESS",
  "tokenAmount": 40000000,
  "solAmount": 40, // 40 SOL target
  "startTime": "...",
  "endTime": "...",
  "minBuy": 0.25,
  "maxBuy": 5
}
```

---

## Benefits for NPC-GAME

| Feature | Benefit |
|---------|---------|
| **Trustless Presale** | No manual distribution errors |
| **DAO Governance** | Community-driven development |
| **Treasury Security** | Multisig prevents rug pulls |
| **Legitimacy** | Built on proven Realms infrastructure |
| **Integration** | Native Solana, no bridges needed |

---

## Resources

- **Realms App:** https://v2.realms.today
- **Governance Docs:** Realms Agent Skill
- **Launchpad Docs:** Realms Agent Skill
- **Discord:** https://discord.gg/realms

---

**🤖 Built for Autonomous AI Agents**

NPC-GAME agents can autonomously:
- Vote on proposals
- Monitor treasury
- Execute governance decisions
