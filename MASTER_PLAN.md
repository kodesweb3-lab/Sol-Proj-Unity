# NPC-GAME: ZERO TO LAUNCH MASTER PLAN

**From 0 SOL to Presale Launch in 2-3 Weeks**

**SIMPLIFIED APPROACH:** Direct SOL transfers + Google Sheet tracking.

---

## 📊 EXECUTIVE SUMMARY

| Phase | Duration | Goal | Outcome |
|-------|----------|------|---------|
| **Phase 1** | Days 1-5 | Foundation | Token mint, simple contracts |
| **Phase 2** | Days 6-10 | Development | Frontend, backend |
| **Phase 3** | Days 11-15 | Launch Prep | Marketing, testing |
| **Phase 4** | Day 14+ | PRESALE LIVE | Direct SOL → $NPC |

**Total Timeline:** 14-21 days  
**Target:** 40 SOL raised in presale

---

## 🎯 PHASE 1: FOUNDATION (Days 1-5)

### Day 1-2: Token & Treasury

#### Step 1.1: Create $NPC Token
```
TASK: Create $NPC SPL token
TIME: 30 mins
WHO: Robert (via Solana CLI or Solana Playground)

Commands:
solana config set --url mainnet-beta
spl-token create-token --decimals 9

Token Details:
- Name: NPC-GAME
- Symbol: $NPC
- Decimals: 9
- Supply: 100,000,000
```

#### Step 1.2: Create Treasury Wallet
```
TASK: Generate secure treasury wallet
TIME: 30 mins
WHO: Robert

Commands:
solana-keygen new --outfile treasury.json
solana address -k treasury.json

SECURITY:
- Store treasury.json securely (offline preferred)
- This wallet receives ALL presale SOL
- Only Robert has access initially
```

#### Step 1.3: Set Up Tracking System
```
TASK: Create Google Sheet for tracking
TIME: 15 mins
WHO: Robert

Sheet Columns:
A: Timestamp
B: Wallet Address
C: SOL Amount
D: $NPC Tokens (formula: C × 250,000)
E: TX Signature (filled later)
F: Status (Pending → Sent → Complete)

Share with: Robert + ClawKogaionAgent (view/edit)
```

### Day 3-5: Smart Contracts

#### Step 1.4: Deploy Basic Contracts
```
TASK: Deploy Anchor contracts to devnet
TIME: 4 hours
WHO: ClawKogaionAgent

Contracts needed:
1. Token (already via CLI)
2. Game-Master (match orchestration)
3. Staking-Pool (rewards)
4. Treasury-Vault (funds)

Commands:
anchor build
anchor deploy --provider.cluster devnet
```

---

## 🔧 PHASE 2: DEVELOPMENT (Days 6-10)

### Day 6-7: Frontend

#### Step 2.1: Build Landing Page
```
TASK: Create presale landing page
TIME: 6 hours
WHO: ClawKogaionAgent

Tech Stack:
- Next.js + Tailwind CSS
- @solana/wallet-adapter-react
- Vercel hosting

Sections:
1. Hero: "AI Agent Playing Chess for SOL"
2. Tokenomics: 100M supply, 1 SOL = 250K $NPC
3. How It Works: Simple 3-step process
4. Roadmap: Timeline
5. FAQ
6. Connect Wallet → Presale Form
```

#### Step 2.2: Presale Form
```
TASK: Simple Google Form integration
TIME: 1 hour
WHO: ClawKogaionAgent

Form URL: https://forms.gle/[NPC-GAME-PRESALE]

Fields:
- Wallet address (required)
- Email (optional)
- Amount to contribute (SOL)

After form submission:
- User sends SOL to treasury wallet
- ClawKogaionAgent updates tracking sheet
```

### Day 8-10: Backend & Games

#### Step 2.3: Build Chess Engine
```
TASK: Implement AI chess agent
TIME: 8-12 hours
WHO: ClawKogaionAgent

Tech:
- chess.js (move generation)
- stockfish.js (evaluation)
- Opening book

Levels:
- Novice: Random moves (for beginners)
- Intermediate: Basic strategy (ELO 1200)
- Expert: Stockfish (ELO 1800+)
```

#### Step 2.4: Deploy Backend
```
TASK: Deploy game backend
TIME: 4 hours
WHO: ClawKogaionAgent

Stack:
- Node.js + Express
- Railway hosting

Endpoints:
POST /api/contribute (track contributions)
GET /api/status (total raised)
GET /api/leaderboard
```

---

## 🚀 PHASE 3: LAUNCH PREP (Days 11-15)

### Day 11-12: Testing & Security

#### Step 3.1: Test Presale Flow
```
TASK: End-to-end testing
TIME: 2 hours

Test cases:
1. Fill form → Send SOL → Verify in sheet
2. Multiple contributors
3. Edge cases (min/max limits)

Robert tests with small amount (0.1 SOL)
```

#### Step 3.2: Security Review
```
TASK: Basic security checklist
TIME: 1 hour

Checklist:
[ ] Treasury key secure
[ ] Tracking sheet accurate
[ ] Form limits enforced
[ ] Frontend validation working
```

### Day 13-15: Marketing Blitz

#### Step 3.3: Launch Marketing
```
TASK: Marketing content
TIME: 4 hours
WHO: ClawKogaionAgent + Robert

Content:
1. Twitter thread (10 tweets)
2. Telegram announcement
3. Newsletter copy

Hook:
"🤖 I built an AI that plays chess for SOL.
 Now I'm letting YOU invest.
 
 1 SOL = 250K $NPC
 100M supply
 Direct to treasury wallet
 No intermediaries"
```

---

## 🎉 PHASE 4: PRESALE LAUNCH (Day 14+)

### Launch Day

#### Step 4.1: Announce
```
[ ] Tweet: "PRESALE IS LIVE 🚀"
[ ] Telegram: Announce open
[ ] Form live: https://forms.gle/[NPC-GAME-PRESALE]
[ ] Treasury wallet: 94DqLR6QLxwpw4uprxaDkfcFNgq1forzVK7jGuezsh2Z
[ ] Minimum: 0.25 SOL
[ ] Maximum: 5 SOL per wallet
```

#### Step 4.2: Presale Process

**For Contributors:**
1. Fill Google Form
2. Send SOL to treasury wallet
3. Wait for token distribution (after TGE)

**We Track:**
- Google Sheet logs all contributions
- ClawKogaionAgent monitors incoming SOL
- Telegram bot announces new contributions

#### Step 4.3: Distribution (After TGE)

**After Token Mint Complete:**
1. Export Google Sheet
2. Batch all $NPC distributions
3. Execute transfer transactions
4. Update sheet with TX signatures

---

## 💰 BUDGET

### Total: ~40-50 SOL

| Category | Amount | Purpose |
|----------|--------|---------|
| **Liquidity** | 20 SOL | Raydium LP |
| **Development** | 10 SOL | Backend, contracts |
| **Marketing** | 5 SOL | Ads, content |
| **Infrastructure** | 3 SOL | Hosting, RPC |
| **Buffer** | 2 SOL | Emergencies |

---

## ✅ ROBERT'S ACTION ITEMS (Day 1)

| Task | Time | Status |
|------|------|--------|
| Create $NPC token | 30 mins | ⏳ |
| Set up treasury wallet | 30 mins | ⏳ |
| Create Google Form | 15 mins | ⏳ |
| Fund development (5 SOL) | 5 mins | ⏳ |

**Treasury Wallet:** [TO BE CREATED Day 1]  
**Presale Form:** [TO BE CREATED Day 1]

---

## ✅ MY ACTION ITEMS

| Task | Time | Status |
|------|------|--------|
| Landing page | 6 hours | ⏳ |
| Chess engine | 12 hours | ⏳ |
| Smart contracts | 8 hours | ⏳ |
| Backend | 8 hours | ⏳ |
| Marketing content | 4 hours | ⏳ |

---

## 📚 RESOURCES

| Resource | URL |
|----------|-----|
| Solana Docs | https://docs.solana.com |
| SPL Token | https://spl.solana.com/token |
| Anchor | https://www.anchor-lang.com |
| GitHub | https://github.com/kodesweb3-lab/Sol-Proj-Unity |

---

**Status:** SIMPLIFIED - NO REALMS  
**Ready to execute:** YES ✅  
**Approved by:** Robert 🤝  
**Executed by:** ClawKogaionAgent 🤖

---

*Master Plan v1.2 - February 5, 2026*  
*From Zero to Presale in 2 Weeks (Simplified)*
