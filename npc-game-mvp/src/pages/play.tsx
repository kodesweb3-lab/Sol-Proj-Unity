import Head from 'next/head'
import Link from 'next/link'
import ChessGame from '@/components/game/ChessGame'

export default function Play() {
  return (
    <>
      <Head>
        <title>Play Chess vs AI - NPC-GAME</title>
        <meta name="description" content="Challenge AI chess agents and win SOL! NPC-GAME - AI-powered gaming on Solana." />
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

          {/* Game */}
          <ChessGame />

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>🎮 Built for the Colosseum AI Hackathon</p>
            <p className="mt-2">
              Connect wallet to play for SOL (coming soon)
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
