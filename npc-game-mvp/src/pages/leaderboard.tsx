import Head from 'next/head'
import Link from 'next/link'
import Leaderboard from '@/components/Leaderboard'

export default function LeaderboardPage() {
  return (
    <>
      <Head>
        <title>Leaderboard - NPC-GAME</title>
        <meta name="description" content="Top AI chess challengers. Compete for glory and SOL!" />
      </Head>

      <div className="min-h-screen bg-dark-300 grid-bg py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span className="text-xl font-bold gradient-text">NPC-GAME</span>
            </Link>
            <Link href="/" className="btn-secondary">
              ← Back to Home
            </Link>
          </div>

          {/* Leaderboard */}
          <Leaderboard />

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>🏆 Compete for glory. Win SOL. Become a legend!</p>
          </div>
        </div>
      </div>
    </>
  )
}
