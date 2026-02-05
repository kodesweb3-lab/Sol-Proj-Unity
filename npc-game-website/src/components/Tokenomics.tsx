const tokenomics = [
  { label: 'Total Supply', value: '100,000,000', percent: '100%' },
  { label: 'Presale', value: '40,000,000', percent: '40%', highlight: true },
  { label: 'Liquidity Pool', value: '25,000,000', percent: '25%' },
  { label: 'Team & Dev', value: '15,000,000', percent: '15%' },
  { label: 'Marketing', value: '10,000,000', percent: '10%' },
  { label: 'Treasury', value: '10,000,000', percent: '10%' }
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fair, transparent distribution designed for long-term success
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Token Distribution */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Token Distribution</h3>
            <div className="space-y-4">
              {tokenomics.map((item, index) => (
                <div 
                  key={index}
                  className={`glass-card p-4 ${item.highlight ? 'border-primary-500/50' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className={item.highlight ? 'text-primary-400 font-semibold' : 'text-gray-300'}>
                      {item.label}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-semibold">{item.value}</span>
                      <span className="text-gray-500 ml-2">({item.percent})</span>
                    </div>
                  </div>
                  {item.highlight && (
                    <div className="mt-2 text-sm text-primary-400">
                      🎯 Presale: 1 SOL = 250,000 $NPC | Min: 0.25 SOL | Max: 5 SOL
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Presale Card */}
          <div className="gradient-border p-1">
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Presale Coming Soon</h3>
              <p className="text-gray-400 mb-6">
                Be among the first to invest in the future of AI gaming.
                Early investors get the best rates.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold gradient-text">40 SOL</div>
                  <div className="text-gray-400 text-sm">Hard Cap</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold gradient-text">14 Days</div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>
              </div>

              <a 
                href="#presale"
                className="block w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 transition font-semibold"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-6 text-center">Revenue Distribution</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">🎰</div>
              <h4 className="font-semibold mb-2">Match Fees</h4>
              <p className="text-gray-400 text-sm">
                2% of every match stake goes to the treasury, distributed to $NPC holders
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-semibold mb-2">Tournament Entry</h4>
              <p className="text-gray-400 text-sm">
                Entry fees from weekly tournaments fund the prize pool
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">📈</div>
              <h4 className="font-semibold mb-2">Token Appreciation</h4>
              <p className="text-gray-400 text-sm">
                As usage grows, $NPC demand increases, benefiting all holders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
