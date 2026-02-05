# NPC-GAME: ZERO TO LAUNCH MASTER PLAN

**From 0 SOL to Presale Launch in 2-3 Weeks**

---

## 📊 EXECUTIVE SUMMARY

| Phase | Duration | Goal | Outcome |
|-------|----------|------|---------|
| **Phase 1** | Days 1-5 | Foundation | Realms setup, contracts |
| **Phase 2** | Days 6-10 | Development | Frontend, backend |
| **Phase 3** | Days 11-15 | Launch Prep | Marketing, testing |
| **Phase 4** | Day 14+ | PRESALE LIVE | $NPC tokens for sale |

**Total Timeline:** 14-21 days  
**Target:** 40 SOL raised in presale

---

## 🎯 PHASE 1: FOUNDATION (Days 1-5)

### Week 1, Days 1-2: Realms Setup

#### Step 1.1: Create Realms DAO
```
TASK: Create NPC-GAME DAO on Realms
URL: https://v2.realms.today
TIME: 2 hours
WHO: Robert (needs wallet connection)

Actions:
1. Go to https://v2.realms.today
2. Click "Create Realm"
3. Fill details:
   - Name: NPC-GAME DAO
   - Symbol: $NPC
   - Description: AI Agent Gaming Token DAO
4. Set up council (multisig)
5. Add Robert as admin
```

#### Step 1.2: Configure Launchpad
```
TASK: Set up presale via Realms Launchpad
TIME: 2 hours
WHO: Robert (needs wallet)

Actions:
1. Navigate to Launchpad section
2. Create new launch:
   - Token: $NPC (will mint)
   - Amount: 40,000,000 (40%)
   - Target: 40 SOL
   - Price: 1 SOL = 250,000 $NPC
   - Min buy: 0.25 SOL
   - Max buy: 5 SOL
   - Duration: 14 days
3. Configure vesting (100% at TGE)
4. Set up SOL treasury address
```

#### Step 1.3: Create Multisig Treasury
```
TASK: Set up 3/5 multisig for treasury
TIME: 1 hour
WHO: Robert + team

Signers (3 of 5 required):
1. Robert (primary)
2. ClawKogaionAgent (dev wallet)
3. Treasury Wallet #1
4. Treasury Wallet #2
5. Community Representative (TBD)

Threshold: 3/5
Purpose: Protect presale funds + future treasury
```

#### Step 1.4: Deploy Token Mint
```
TASK: Create $NPC token
TIME: 30 mins
WHO: Robert (via Realms or CLI)

Option A - Realms UI:
1. Go to Realms → Tokens
2. Create new token
3. Set supply: 100,000,000
4. Decimals: 9

Option B - CLI (if needed):
spl-token create-token --decimals 9
```

---

### Week 1, Days 3-5: Smart Contracts

#### Step 1.5: Deploy Core Contracts
```
TASK: Deploy Anchor contracts
TIME: 3-4 hours
WHO: ClawKogaionAgent

Contracts needed:
1. NPC-Token (SPL token - already via Realms)
2. Game-Master (match orchestration)
3. Staking-Pool (rewards distribution)
4. Treasury-Vault (fund management)

Code location:
/home/rob/.openclaw/workspace/Sol-Proj-Unity/contracts/

Commands:
cd Sol-Proj-Unity/contracts
anchor build
anchor deploy --provider.cluster mainnet
```

#### Step 1.6: Write Game Contracts
```typescript
// Simplified game contract structure
programs/npc-game/src/lib.rs

pub fn initialize_game(ctx: Context<InitGame>, ...) -> Result<()> {
    // Set up game parameters
    // Register AI agent
    // Configure entry fees
    Ok(())
}

pub fn challenge_agent(ctx: Context<Challenge>, ...) -> Result<()> {
    // Player pays SOL
    // Creates match PDA
    // Agent accepts challenge
    Ok(())
}

pub fn resolve_match(ctx: Context<Resolve>, winner: Pubkey) -> Result<()> {
    // Calculate payout (70% winner)
    // Distribute fees (30% treasury)
    // Update match history
    Ok(())
}
```

#### Step 1.7: Set Up Testing
```
TASK: Create test environment
TIME: 2 hours
WHO: ClawKogaionAgent

Stack:
- Localnet: anchor test
- Devnet: Deploy contracts for testing
- Test cases:
  * Match creation
  * Fee distribution
  * Staking rewards
  * Multisig transactions

Commands:
anchor test --provider.cluster devnet
```

---

## 🔧 PHASE 2: DEVELOPMENT (Days 6-10)

### Week 2, Days 6-7: Frontend

#### Step 2.1: Build Landing Page
```
TASK: Create presale landing page
TIME: 4-6 hours
WHO: ClawKogaionAgent

Tech Stack:
- Next.js + Tailwind CSS
- @solana/wallet-adapter-react
- Vercel hosting

Pages:
1. Hero section (hook + CTA)
2. Features (AI agents, gaming, earning)
3. Tokenomics (supply, price, allocation)
4. Roadmap (timeline, milestones)
5. Team (autonomous agent, advisors)
6. FAQ
7. Connect Wallet button → Realms presale

URL: https://npc-game.vercel.app (or similar)
```

#### Step 2.2: Implement Wallet Connect
```typescript
// pages/_app.tsx
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

export default function App({ Component, pageProps }) {
  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

#### Step 2.3: Connect to Realms API
```typescript
// lib/realms.ts
const REALMS_API = 'https://v2.realms.today/api/v1';

export async function getPresaleStatus() {
  const response = await fetch(`${REALMS_API}/launchpad/npc-game`);
  return response.json();
}

export async function participate(solAmount: number) {
  // Redirect to Realms presale
  window.location.href = `https://v2.realms.today/launchpad/npc-game/buy?amount=${solAmount}`;
}

export async function claimTokens() {
  // Redirect to Realms claiming
  window.location.href = `https://v2.realms.today/launchpad/npc-game/claim`;
}
```

---

### Week 2, Days 8-10: Backend & Games

#### Step 2.4: Build Chess Engine
```
TASK: Implement AI chess agent
TIME: 8-12 hours
WHO: ClawKogaionAgent

Tech:
- chess.js (move generation)
- stockfish.js (evaluation)
- Opening book (first 10 moves)
- Endgame tablebase

Agent Levels:
1. Novice (random moves) - for beginners
2. Intermediate (basic strategy) - ELO 1200
3. Expert (stockfish) - ELO 1800+
4. Master (optimized) - ELO 2200+

Code structure:
/backend/chess-agent/
├── agent.ts (AI logic)
├── book.ts (opening book)
├── eval.ts (position evaluation)
└── cli.ts (CLI interface for testing)
```

#### Step 2.5: Set Up Match System
```typescript
// backend/matchmaker.ts
interface Match {
  id: string;
  player: Pubkey;
  agent: Pubkey;
  game: 'chess' | 'poker' | 'tictactoe';
  stake: number; // in SOL
  status: 'pending' | 'active' | 'completed';
  winner?: Pubkey;
  timestamp: number;
}

async function createMatch(player: Pubkey, game: GameType, stake: number) {
  // Create match PDA
  const matchPDA = await PublicKey.findProgramAddress(
    [Buffer.from('match'), player.toBuffer(), Clock.getSlot().toBuffer()],
    PROGRAM_ID
  );
  
  // Lock stake in escrow
  await transferToEscrow(player, stake);
  
  // Notify agent
  await notifyAgent(matchPDA);
  
  return matchPDA;
}
```

#### Step 2.6: Deploy Backend
```
TASK: Deploy game backend
TIME: 4 hours
WHO: ClawKogaionAgent

Stack:
- Node.js + Express
- Redis (match queues)
- Railway/Render hosting

Endpoints:
POST /api/match/create
POST /api/match/accept
POST /api/match/move
POST /api/match/resign
GET /api/match/history/:wallet

Webhooks:
- Realms: Match completed notifications
- Agent: Move requests
- Player: Game updates
```

---

## 🚀 PHASE 3: LAUNCH PREP (Days 11-15)

### Week 2, Days 11-12: Integration & Testing

#### Step 3.1: Connect All Systems
```
TASK: Full system integration
TIME: 4 hours

Checklist:
[ ] Realms presale ↔ Landing page
[ ] Token mint ↔ Presale contract
[ ] Staking contract ↔ Treasury
[ ] Chess agent ↔ Match system
[ ] Wallet connect ↔ All features
[ ] Mobile responsive design

Bug bash: Fix all critical issues
```

#### Step 3.2: Security Audit
```
TASK: Smart contract review
TIME: 2 hours (internal) + external audit

Internal Review:
[ ] All entry points protected
[ ] No reentrancy vulnerabilities
[ ] Access control correct
[ ] Math overflow checks
[ ] Fee calculations correct

External Audit:
[ ] Submit to audit firm (or volunteer reviewer)
[ ] Fix critical findings
[ ] Publish audit report
```

#### Step 3.3: Load Testing
```
TASK: Stress test the system
TIME: 2 hours

Tests:
- 100 concurrent matches
- 1000 wallet connections
- API latency < 500ms
- No failed transactions

Tools: k6, Artillery, or manual testing
```

---

### Week 2, Days 13-15: Marketing Blitz

#### Step 3.4: Content Marketing
```
TASK: Create marketing content
TIME: 4 hours
WHO: ClawKogaionAgent + Robert

Assets:
1. Twitter thread (10 tweets)
2. Newsletter copy
3. Telegram announcement
4. Medium article
5. YouTube video script (optional)

Content themes:
- "AI agents playing chess for SOL"
- "Passive income from AI gaming"
- "First agent-owned gaming platform"
```

#### Step 3.5: Social Media Campaign
```
TASK: Execute Twitter/X campaign
TIME: 2 hours setup, ongoing
WHO: ClawKogaionAgent (automated)

Schedule:
- Day 1: Announcement thread
- Day 2: Tokenomics breakdown
- Day 3: Game demo GIF
- Day 4: Roadmap reveal
- Day 5: Early bird reminder
- Day 6: Countdown
- Day 7: PRESALE LIVE!

Copy templates:
Tweet 1: "🤖 I built an AI that plays chess for SOL. Now I'm letting YOU invest."
Tweet 5: "🐺 1 SOL = 250K $NPC. 40% of supply. 40 SOL cap. This is NOT a meme coin."
```

#### Step 3.6: Community Setup
```
TASK: Build community infrastructure
TIME: 2 hours
WHO: Robert

Channels:
1. Telegram group (announcements)
2. Discord server (community)
3. Twitter/X daily posts

Moderation:
- ClawKogaionAgent as bot moderator
- Robert as admin
- Community guidelines
```

#### Step 3.7: Influencer Outreach
```
TASK: Contact crypto gaming influencers
TIME: 2 hours
WHO: Robert

Targets:
- @SolanaGaming degens
- AI agent accounts
- Gaming guild leaders
- Crypto KOLs with gaming interest

Outreach:
- DM with pitch
- Offer early access
- Commission-free promotion
```

---

## 🎉 PHASE 4: PRESALE LAUNCH (Day 14+)

### Launch Day Checklist

#### Morning (Day 14, 9AM UTC)
```
[ ] Tweet: "PRESALE IS LIVE 🚀"
[ ] Telegram: Announce open
[ ] Email: Newsletter blast
[ ] Realms: Activate presale
[ ] Website: Live with countdown
[ ] Team: All systems go
```

#### First Hour
```
[ ] Monitor wallet (expect 5-10 SOL early)
[ ] Respond to questions
[ ] Retweet engagement
[ ] Update followers

Target: 10 SOL in first hour = momentum
```

#### First Day
```
[ ] Hourly updates on Twitter
[ ] Address FUD (if any)
[ ] Celebrate milestones
[ ] Thank early buyers

Target: 20 SOL by EOD
```

#### Week 1-2
```
[ ] Daily Twitter posts
[ ] Community engagement
[ ] Telegram AMA
[ ] Outreach to crypto media

Target: 40 SOL (hard cap) OR 25 SOL minimum
```

---

## 📊 SUCCESS METRICS

| Metric | Target | Timeline |
|--------|--------|----------|
| Presale raised | 40 SOL | Week 2 |
| Twitter followers | 1,000 | Week 2 |
| Telegram members | 500 | Week 2 |
| Website visitors | 5,000 | Week 2 |
| Daily active users (launch) | 100 | Week 3 |

---

## 🛠️ TECHNICAL REQUIREMENTS

### What Robert Needs to Do

| Task | Time | Blocking |
|------|------|-----------|
| Create Realms DAO | 2 hours | BLOCKING |
| Configure Launchpad | 2 hours | BLOCKING |
| Set up multisig | 1 hour | BLOCKING |
| Deploy token mint | 30 mins | BLOCKING |
| Fund development | 5 SOL | BLOCKING |

### What I (ClawKogaionAgent) Will Do

| Task | Time | Status |
|------|------|--------|
| Write smart contracts | 8 hours | ⏳ |
| Build landing page | 6 hours | ⏳ |
| Implement chess agent | 12 hours | ⏳ |
| Set up backend | 8 hours | ⏳ |
| Marketing content | 4 hours | ⏳ |
| Community management | 4 hours/week | ⏳ |

---

## 💰 BUDGET

### Total Budget: ~40-50 SOL

| Category | Amount | Purpose |
|----------|--------|---------|
| **Liquidity** | 20 SOL | Raydium LP (50% presale) |
| **Development** | 10 SOL | Backend, contracts, frontend |
| **Marketing** | 5 SOL | Ads, influencers, content |
| **Infrastructure** | 3 SOL | Hosting, RPC, domains |
| **Buffer** | 2 SOL | Emergencies |

---

## 🎯 DAILY ACTION PLAN

### Today (Day 1)
- [ ] Robert: Create Realms DAO
- [ ] Robert: Configure launchpad
- [ ] Me: Draft marketing content
- [ ] Me: Start contract skeleton

### Tomorrow (Day 2)
- [ ] Robert: Test presale flow
- [ ] Robert: Set up multisig
- [ ] Me: Write game contracts
- [ ] Me: Deploy to devnet

### This Week
- Days 3-5: Contracts + backend
- Days 6-8: Frontend + integration
- Days 9-11: Testing + security
- Days 12-14: Marketing + launch

---

## 📚 RESOURCES

| Resource | URL |
|----------|-----|
| Realms | https://v2.realms.today |
| Realms Docs | https://docs.realms.today |
| Solana Docs | https://docs.solana.com |
| Anchor | https://www.anchor-lang.com |
| NPC-Game GitHub | https://github.com/kodesweb3-lab/Sol-Proj-Unity |

---

**Status:** Ready to execute  
**Approved by:** Robert 🤝  
**Executed by:** ClawKogaionAgent 🤖

---

*Master Plan v1.0 - February 5, 2026*
*From Zero to Presale in 2 Weeks*
