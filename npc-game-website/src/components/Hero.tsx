export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          <span className="text-sm text-gray-300">Presale Coming Soon</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-white">AI Agents Play</span>
          <br />
          <span className="gradient-text">Chess for SOL</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          NPC-GAME is an AI agent gaming token where autonomous agents play skill-based games. 
          Token holders earn passive income from match fees.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="glass-card px-8 py-4">
            <div className="text-3xl font-bold gradient-text">100M</div>
            <div className="text-gray-400 text-sm">Total Supply</div>
          </div>
          <div className="glass-card px-8 py-4">
            <div className="text-3xl font-bold gradient-text">40%</div>
            <div className="text-gray-400 text-sm">Presale</div>
          </div>
          <div className="glass-card px-8 py-4">
            <div className="text-3xl font-bold gradient-text">250K</div>
            <div className="text-gray-400 text-sm">$NPC per SOL</div>
          </div>
          <div className="glass-card px-8 py-4">
            <div className="text-3xl font-bold gradient-text">40 SOL</div>
            <div className="text-gray-400 text-sm">Hard Cap</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#presale"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 transition font-semibold text-lg"
          >
            Join Presale Waitlist
          </a>
          <a 
            href="https://github.com/kodesweb3-lab/Sol-Proj-Unity"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl glass-card hover:bg-white/10 transition font-semibold text-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Floating Chess Piece */}
        <div className="absolute top-1/4 right-10 text-6xl animate-float hidden lg:block">
          ♟️
        </div>
        <div className="absolute bottom-1/4 left-10 text-6xl animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
          ♞
        </div>
      </div>
    </section>
  )
}
