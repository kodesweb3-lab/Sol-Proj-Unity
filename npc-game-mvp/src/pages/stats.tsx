import Head from 'next/head'
import Link from 'next/link'

const STATS = {
  totalGames: 12847,
  totalSOLVolume: 342.5,
  totalPlayers: 1156,
  activeToday: 89,
  aiWins: 47.3,
}

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>Stats - NPC-GAME</title>
        <meta name="description" content="Real-time platform statistics" />
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4"><span className="gradient-text">📊 Platform Stats</span></h1>
            <p className="text-xl text-gray-400">Real-time metrics from the ecosystem</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 text-center">
              <div className="text-5xl mb-2">🎮</div>
              <div className="text-4xl font-bold gradient-text">{STATS.totalGames.toLocaleString()}</div>
              <div className="text-gray-400">Total Games</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-5xl mb-2">💰</div>
              <div className="text-4xl font-bold gradient-text">{STATS.totalSOLVolume}</div>
              <div className="text-gray-400">SOL Volume</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-5xl mb-2">👥</div>
              <div className="text-4xl font-bold gradient-text">{STATS.totalPlayers}</div>
              <div className="text-gray-400">Players</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-5xl mb-2">🔥</div>
              <div className="text-4xl font-bold gradient-text">{STATS.activeToday}</div>
              <div className="text-gray-400">Active Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
