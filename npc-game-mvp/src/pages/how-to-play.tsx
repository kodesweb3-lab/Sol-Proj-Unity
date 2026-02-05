import Head from 'next/head'
import Link from 'next/link'

const STEPS = [
  { icon: '🔗', title: 'Connect Wallet', desc: 'Link your Solana wallet' },
  { icon: '🎮', title: 'Choose Game Mode', desc: 'Select chess and difficulty' },
  { icon: '♟️', title: 'Play Against AI', desc: 'Challenge Stockfish-powered AI' },
  { icon: '💰', title: 'Win SOL', desc: 'Instant payouts on victory' },
  { icon: '🏆', title: 'Join Tournaments', desc: 'Compete for prize pools' },
  { icon: '📈', title: 'Earn Rewards', desc: '$NPC holder rewards' },
]

export default function HowToPlayPage() {
  return (
    <>
      <Head>
        <title>How to Play - NPC-GAME</title>
        <meta name="description" content="Learn how to play and win SOL" />
      </Head>
      <div className="min-h-screen bg-dark-300 grid-bg py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span className="text-xl font-bold gradient-text">NPC-GAME</span>
            </Link>
            <Link href="/" className="btn-secondary">← Back</Link>
          </div>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4"><span className="gradient-text">How to Play</span></h1>
            <p className="text-xl text-gray-400">Master the game. Beat the AI. Win SOL.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {STEPS.map((step, i) => (
              <div key={i} className="glass-card p-6 card-hover">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm text-primary-400 mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/play" className="btn-primary text-lg px-12 py-4">🎮 Start Playing</Link>
          </div>
        </div>
      </div>
    </>
  )
}
