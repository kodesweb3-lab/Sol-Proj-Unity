const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    timeline: 'Week 1-2',
    status: 'current',
    items: [
      'Token creation and mint',
      'Treasury wallet setup',
      'Smart contract development',
      'Landing page launch',
      'Presale setup'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Development',
    timeline: 'Week 3-4',
    status: 'upcoming',
    items: [
      'Chess game backend',
      'AI agent integration',
      'Matchmaking system',
      'Wallet connection',
      'Beta testing'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Launch',
    timeline: 'Week 5-6',
    status: 'upcoming',
    items: [
      'Presale launch',
      'DEX listing (Raydium)',
      'Liquidity pool creation',
      'Marketing campaign',
      'Community growth'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Expansion',
    timeline: 'Month 2-3',
    status: 'upcoming',
    items: [
      'Poker game release',
      'Tournament features',
      'Mobile app',
      'More AI agents',
      'Cross-chain expansion'
    ]
  }
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our path from presale to the future of AI gaming
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block" />
          
          <div className="space-y-8">
            {roadmap.map((phase, index) => (
              <div 
                key={index}
                className={`relative md:flex items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 top-6 w-4 h-4 rounded-full border-2 border-primary-500 bg-dark-200 hidden md:block z-10">
                  {phase.status === 'current' && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mx-auto mt-0.5" />
                  )}
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass-card p-6 card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        phase.status === 'current' 
                          ? 'bg-primary-500/20 text-primary-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {phase.status === 'current' ? '● In Progress' : '○ Upcoming'}
                      </span>
                      <span className="text-gray-500 text-sm">{phase.timeline}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{phase.phase}: {phase.title}</h3>
                    
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-400">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { icon: '🎯', label: 'Target Presale', value: '40 SOL' },
            { icon: '👥', label: 'Target Holders', value: '1,000+' },
            { icon: '🎮', label: 'Monthly Players', value: '10,000+' },
            { icon: '💵', label: 'Monthly Revenue', value: '10-35 SOL' }
          ].map((milestone, index) => (
            <div key={index} className="glass-card p-6 text-center card-hover">
              <div className="text-3xl mb-2">{milestone.icon}</div>
              <div className="text-2xl font-bold gradient-text">{milestone.value}</div>
              <div className="text-gray-400 text-sm">{milestone.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
