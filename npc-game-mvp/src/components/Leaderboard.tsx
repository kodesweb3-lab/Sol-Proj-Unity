import { useState } from 'react'

interface LeaderboardEntry {
  rank: number
  wallet: string
  wins: number
  losses: number
  winRate: number
  rating: number
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, wallet: '7nYh...xK9m', wins: 42, losses: 3, winRate: 93.3, rating: 2450 },
  { rank: 2, wallet: '3mZ2...pL8n', wins: 38, losses: 5, winRate: 88.4, rating: 2380 },
  { rank: 3, wallet: '9fK4...qR2w', wins: 35, losses: 8, winRate: 81.4, rating: 2250 },
  { rank: 4, wallet: '5gL6...sT3v', wins: 31, losses: 10, winRate: 75.6, rating: 2180 },
  { rank: 5, wallet: '2dH8...uW5y', wins: 28, losses: 12, winRate: 70.0, rating: 2100 },
  { rank: 6, wallet: '8cJ1...xZ7a', wins: 25, losses: 15, winRate: 62.5, rating: 2020 },
  { rank: 7, wallet: '4eK3...bN6c', wins: 22, losses: 18, winRate: 55.0, rating: 1940 },
  { rank: 8, wallet: '6fM9...dP2e', wins: 19, losses: 21, winRate: 47.5, rating: 1860 },
  { rank: 9, wallet: '1aN5...gQ8f', wins: 16, losses: 24, winRate: 40.0, rating: 1780 },
  { rank: 10, wallet: '0bP7...hR1g', wins: 13, losses: 27, winRate: 32.5, rating: 1700 },
]

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'today'>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'expert' | 'intermediate' | 'novice'>('all')

  const filteredLeaderboard = MOCK_LEADERBOARD.filter(entry => {
    if (difficultyFilter !== 'all') {
      // Simulated filtering - in real app, would filter by difficulty
      return entry.rating > (difficultyFilter === 'expert' ? 2200 : difficultyFilter === 'intermediate' ? 2000 : 1800)
    }
    return true
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="gradient-text">🏆 Leaderboard</span>
        </h2>
        <p className="text-gray-400">Top AI chess challengers</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex gap-2">
          {(['all', 'week', 'today'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg transition ${
                timeFilter === filter
                  ? 'bg-primary-500 text-white'
                  : 'glass-card hover:bg-white/10'
              }`}
            >
              {filter === 'all' ? 'All Time' : filter === 'week' ? 'This Week' : 'Today'}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {(['all', 'expert', 'intermediate', 'novice'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setDifficultyFilter(filter)}
              className={`px-4 py-2 rounded-lg transition capitalize ${
                difficultyFilter === filter
                  ? 'bg-primary-500 text-white'
                  : 'glass-card hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-primary-500/20 to-purple-500/20">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Player</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Rating</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Wins</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Losses</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Win Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredLeaderboard.map((entry) => (
              <tr 
                key={entry.rank} 
                className={`hover:bg-white/5 transition ${
                  entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {entry.rank === 1 && <span className="text-2xl mr-2">🥇</span>}
                    {entry.rank === 2 && <span className="text-2xl mr-2">🥈</span>}
                    {entry.rank === 3 && <span className="text-2xl mr-2">🥉</span>}
                    {entry.rank > 3 && <span className="text-gray-400 font-mono">#{entry.rank}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      entry.rank === 1 ? 'bg-yellow-500/20' :
                      entry.rank === 2 ? 'bg-gray-400/20' :
                      entry.rank === 3 ? 'bg-orange-500/20' :
                      'bg-primary-500/20'
                    }`}>
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-mono text-sm">{entry.wallet}</div>
                      <div className="text-xs text-gray-500">
                        {entry.rating >= 2400 ? '🏆 Grandmaster' :
                         entry.rating >= 2200 ? '👑 Master' :
                         entry.rating >= 2000 ? '⭐ Expert' :
                         entry.rating >= 1800 ? '🎯 Intermediate' : '🎮 Novice'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-bold ${
                    entry.rating >= 2400 ? 'text-yellow-400' :
                    entry.rating >= 2200 ? 'text-purple-400' :
                    'text-primary-400'
                  }`}>
                    {entry.rating}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-400 font-semibold">{entry.wins}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-red-400 font-semibold">{entry.losses}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-2 bg-white/10 rounded-full mr-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          entry.winRate >= 80 ? 'bg-green-500' :
                          entry.winRate >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${entry.winRate}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${
                      entry.winRate >= 80 ? 'text-green-400' :
                      entry.winRate >= 60 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {entry.winRate.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Your Rank */}
      <div className="mt-8 glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mr-4">
              <span className="text-2xl">🐺</span>
            </div>
            <div>
              <div className="font-semibold">Your Rank</div>
              <div className="text-gray-400 text-sm">Play to appear on leaderboard!</div>
            </div>
          </div>
          <a href="/play" className="btn-primary">
            🎮 Play Now
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold gradient-text">156</div>
          <div className="text-gray-400 text-sm">Total Players</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold gradient-text">1,247</div>
          <div className="text-gray-400 text-sm">Games Played</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold gradient-text">47.3%</div>
          <div className="text-gray-400 text-sm">AI Win Rate</div>
        </div>
      </div>
    </div>
  )
}
