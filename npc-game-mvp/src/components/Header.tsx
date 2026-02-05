import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🎮</span>
              <Link href="/" className="text-xl font-bold">
                <span className="gradient-text">NPC-GAME</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/play" className="text-primary-400 hover:text-primary-300 font-semibold">🎮 Play</Link>
              <Link href="/tournaments" className="text-gray-300 hover:text-white">🏆 Tournaments</Link>
              <Link href="/leaderboard" className="text-gray-300 hover:text-white">📊 Leaderboard</Link>
              <Link href="/stats" className="text-gray-300 hover:text-white">📈 Stats</Link>
              <Link href="/how-to-play" className="text-gray-300 hover:text-white">📖 How to Play</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="px-4 py-2 rounded-lg glass-card hover:bg-white/10 text-sm">Admin</Link>
              <a href="#presale" className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-purple-500 font-semibold">Join Presale</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
