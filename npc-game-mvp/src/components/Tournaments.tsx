import { useState } from 'react'

interface Tournament {
  id: number
  name: string
  description: string
  startTime: string
  prizePool: string
  entryFee: string
  maxPlayers: number
  currentPlayers: number
  difficulty: 'all' | 'expert' | 'intermediate' | 'novice'
  status: 'live' | 'upcoming' | 'registration'
  format: 'single-elimination' | 'round-robin' | 'swiss'
}

const TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: '🐺 Wolf Cup Daily',
    description: 'Daily tournament for all skill levels. Fast-paced chess action!',
    startTime: 'Today, 8:00 PM UTC',
    prizePool: '5 SOL',
    entryFee: '0.1 SOL',
    maxPlayers: 64,
    currentPlayers: 47,
    difficulty: 'all',
    status: 'registration',
    format: 'single-elimination'
  },
  {
    id: 2,
    name: '🔥 Fire Championship',
    description: 'High-stakes tournament for intermediate and expert players.',
    startTime: 'Tomorrow, 6:00 PM UTC',
    prizePool: '15 SOL',
    entryFee: '0.5 SOL',
    maxPlayers: 32,
    currentPlayers: 28,
    difficulty: 'intermediate',
    status: 'registration',
    format: 'single-elimination'
  },
  {
    id: 3,
    name: '👑 Grandmasters Arena',
    description: 'Only for 2000+ rated players. The ultimate test of skill.',
    startTime: 'Sat, 8:00 PM UTC',
    prizePool: '50 SOL',
    entryFee: '2 SOL',
    maxPlayers: 16,
    currentPlayers: 12,
    difficulty: 'expert',
    status: 'registration',
    format: 'round-robin'
  },
  {
    id: 4,
    name: '🎯 Novice Cup',
    description: 'New to chess? Start here! Friendly competition for beginners.',
    startTime: 'Sun, 4:00 PM UTC',
    prizePool: '2 SOL',
    entryFee: 'Free',
    maxPlayers: 100,
    currentPlayers: 34,
    difficulty: 'novice',
    status: 'registration',
    format: 'swiss'
  },
  {
    id: 5,
    name: '⚡ Lightning Rapid',
    description: '5+3 time control. Speed chess for adrenaline lovers!',
    startTime: 'Live now!',
    prizePool: '3 SOL',
    entryFee: '0.25 SOL',
    maxPlayers: 128,
    currentPlayers: 89,
    difficulty: 'all',
    status: 'live',
    format: 'single-elimination'
  }
]

export default function Tournaments() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'live':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">🔴 LIVE NOW</span>
      case 'upcoming':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">📅 Upcoming</span>
      case 'registration':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">📝 Register</span>
    }
  }

  const getFormatIcon = (format: Tournament['format']) => {
    switch (format) {
      case 'single-elimination':
        return '🏆'
      case 'round-robin':
        return '🔄'
      case 'swiss':
        return '📊'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">🏆 Tournaments</span>
        </h2>
        <p className="text-xl text-gray-400">
          Compete for SOL prizes. Glory awaits!
        </p>
      </div>

      {/* Live Tournament Banner */}
      {TOURNAMENTS.filter(t => t.status === 'live').length > 0 && (
        <div className="mb-8 gradient-border p-1">
          <div className="glass-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mr-4 animate-pulse">
                  <span className="text-3xl">⚡</span>
                </div>
                <div>
                  <div className="text-red-400 text-sm font-semibold">🔴 LIVE NOW</div>
                  <h3 className="text-xl font-bold">{TOURNAMENTS[4].name}</h3>
                  <p className="text-gray-400 text-sm">{TOURNAMENTS[4].description}</p>
                </div>
              </div>
              <button className="btn-primary whitespace-nowrap">
                🎮 Join Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tournament Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {TOURNAMENTS.filter(t => t.status !== 'live').map((tournament) => (
          <div 
            key={tournament.id}
            className="glass-card p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                {getStatusBadge(tournament.status)}
                <h3 className="text-xl font-bold mt-2">{tournament.name}</h3>
              </div>
              <div className="text-3xl">{getFormatIcon(tournament.format)}</div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{tournament.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="glass-card p-3">
                <div className="text-2xl font-bold gradient-text">{tournament.prizePool}</div>
                <div className="text-gray-500 text-xs">Prize Pool</div>
              </div>
              <div className="glass-card p-3">
                <div className="text-2xl font-bold gradient-text">{tournament.entryFee}</div>
                <div className="text-gray-500 text-xs">Entry Fee</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>📅 {tournament.startTime}</span>
              <span>👥 {tournament.currentPlayers}/{tournament.maxPlayers}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%` }}
              />
            </div>

            <button 
              className="w-full btn-primary"
              onClick={() => setSelectedTournament(tournament)}
            >
              {tournament.status === 'registration' ? '📝 Register' : '🔔 Notify Me'}
            </button>
          </div>
        ))}
      </div>

      {/* Tournament Rules */}
      <div className="mt-12 glass-card p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">📋 Tournament Rules</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">🎯 Format</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• <strong>Single Elimination:</strong> Lose once = out</li>
              <li>• <strong>Round Robin:</strong> Everyone plays everyone</li>
              <li>• <strong>Swiss:</strong> Balanced matchmaking each round</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">💰 Prizes</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• 1st Place: 50% of pool</li>
              <li>• 2nd Place: 25% of pool</li>
              <li>• 3rd-4th: 12.5% each</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Your Tournaments */}
      <div className="mt-8 glass-card p-6">
        <h3 className="font-semibold mb-4">🎮 Your Tournament History</h3>
        <div className="text-center py-8 text-gray-400">
          <span className="text-4xl mb-4 block">🎯</span>
          <p>No tournaments played yet!</p>
          <p className="text-sm mt-2">Enter your first tournament to appear here.</p>
        </div>
      </div>
    </div>
  )
}
