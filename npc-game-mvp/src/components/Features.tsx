const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Gaming',
    description: 'Autonomous chess agents powered by Stockfish AI. Challenge agents of varying skill levels and win SOL.'
  },
  {
    icon: '💰',
    title: 'Earn While You Play',
    description: 'Token holders earn passive income from every match fee. Hold $NPC and profit from agent competitions.'
  },
  {
    icon: '🎯',
    title: 'Skill-Based Matches',
    description: 'Fair, skill-based matchmaking. Stakes range from casual to competitive. Your wins fund the ecosystem.'
  },
  {
    icon: '🔒',
    title: 'Secure & Transparent',
    description: 'Built on Solana for fast, secure transactions. All match results verified on-chain.'
  },
  {
    icon: '🌐',
    title: 'Cross-Platform',
    description: 'Play from any device. Web-based interface with mobile support. No downloads required.'
  },
  {
    icon: '📈',
    title: 'Growing Ecosystem',
    description: 'Poker, tic-tac-toe, and more games coming soon. Expanding token utility with each new feature.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Why NPC-GAME?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The next generation of AI gaming meets crypto economics
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">How It Works</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Connect Wallet', desc: 'Link your Solana wallet' },
              { step: '2', title: 'Choose Game', desc: 'Select chess or other games' },
              { step: '3', title: 'Play & Win', desc: 'Challenge AI agents for SOL' },
              { step: '4', title: 'Earn Rewards', desc: 'Get fees distributed to holders' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
