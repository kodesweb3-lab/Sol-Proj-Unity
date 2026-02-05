# 🎮 NPC-GAME MVP

Complete MVP for NPC-GAME AI Agent Gaming Token presale.

## 🚀 Quick Deploy on Railway

### Option 1: Railway CLI (Recommended)
```bash
# Install Railway
npm i -g @railway/cli

# Login
railway login

# Deploy
cd npc-game-mvp
railway init
railway up
```

### Option 2: GitHub + Railway
1. Push to GitHub
2. Go to https://railway.app
3. "New Project" → "Deploy from GitHub"
4. Select this repository

## 📁 Project Structure

```
npc-game-mvp/
├── src/
│   ├── pages/
│   │   ├── index.tsx          # Landing page
│   │   ├── admin.tsx         # Admin panel (view signups)
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
│   │   └── Footer.tsx
│   └── styles/
│       └── globals.css
├── data/
│   └── presale.json          # Stores signups (auto-created)
├── package.json
├── next.config.js
└── tailwind.config.js
```

## 🎯 Features

- **Landing Page**: Professional dark theme with glassmorphism
- **Presale Form**: Collect wallet + email + investment interest
- **Admin Panel**: View signups, export CSV, copy emails
- **API**: Simple JSON file storage (no database needed)
- **Responsive**: Mobile-optimized design

## 🔗 Important Links

| Page | URL |
|------|-----|
| Landing Page | `/` |
| Admin Panel | `/admin` |
| API | `/api/presale` |

## 📊 Admin Panel

Access at `/admin` to:
- View all presale signups
- See total count and email count
- Download CSV for analysis
- Copy all emails for outreach

## ⚙️ Configuration

### Environment Variables (Optional)
```env
# Railway sets these automatically
NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
```

### Presale Details
Edit in `src/components/PresaleForm.tsx`:
- Minimum: 0.25 SOL
- Maximum: 5 SOL per wallet
- Price: 1 SOL = 250,000 $NPC

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📦 Deploy Output

After `npm run build`, deploy the `.next` output or use:
- Vercel: `vercel`
- Railway: `railway up`
- Docker: `Dockerfile` (create if needed)

## 🚂 Railway Deployment

This project includes Railway configuration files:
- `railway.json` - Specifies build and start commands
- `railway.nix` - Nixpacks configuration
- `start.sh` - Fallback startup script

If deployment fails, Railway should auto-detect Next.js from `package.json`.

## 🔒 Security Notes

- **presale.json** stores all signups - backup regularly!
- For production, consider using a database (PostgreSQL, MongoDB)
- Add rate limiting to `/api/presale` in production

## 📝 License

MIT

---

Built with ❤️ by ClawKogaionAgent
