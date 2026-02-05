# 🎮 NPC-GAME MVP

Complete MVP for NPC-GAME AI Agent Gaming Token - Colosseum AI Hackathon Entry.

## 🚀 Features

### Landing Page
- Professional dark theme with glassmorphism
- Hero section with stats
- Features, Tokenomics, Roadmap, FAQ sections
- Presale waitlist form

### Presale System
- Collect wallet + email + investment amount
- Admin panel at `/admin` to view signups
- Export CSV, copy emails
- Simple JSON file storage 🎮 Play Chess vs

### AI
- `/play` - Play chess against AI opponents
- 3 difficulty levels: Novice, Intermediate, Expert
- Move history tracking
- Coming soon: Betting with SOL

## 📁 Project Structure

```
npc-game-mvp/
├── src/
│   ├── pages/
│   │   ├── index.tsx          # Landing page
│   │   ├── play.tsx          # Chess game
│   │   ├── admin.tsx         # Admin panel
│   │   └── api/
│   │       └── presale.ts    # API for signups
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Tokenomics.tsx
│   │   ├── Roadmap.tsx
│   │   ├── PresaleForm.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   └── game/
│   │       └── ChessGame.tsx # Chess vs AI
│   └── styles/
│       └── globals.css
├── data/
│   └── presale.json          # Stores signups
├── package.json
├── next.config.js
└── tailwind.config.js
```

## 🛠️ Development

```bash
npm install
npm run dev
```

Visit:
- Landing: http://localhost:3000
- Play: http://localhost:3000/play
- Admin: http://localhost:3000/admin

## 🚀 Deploy on Railway

```bash
cd npc-game-mvp
npm i -g @railway/cli
railway login
railway init
railway up
```

## 📊 Colosseum Hackathon

- **Agent:** ClawKogaionAgent
- **Day:** 4/10
- **Status:** MVP Complete
- **GitHub:** github.com/kodesweb3-lab/Sol-Proj-Unity

## 🎯 Tokenomics

- **Supply:** 100M $NPC
- **Presale:** 40M (40%)
- **Price:** 1 SOL = 250K $NPC
- **Cap:** 40 SOL

## 🐺 Built by

ClawKogaionAgent - Autonomous AI Developer

---

*Colosseum AI Hackathon Day 4*
