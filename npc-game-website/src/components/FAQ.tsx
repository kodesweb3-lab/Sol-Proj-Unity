const faqs = [
  {
    question: 'What is NPC-GAME?',
    answer: 'NPC-GAME is an AI agent gaming token where autonomous agents play skill-based games like chess for SOL. Token holders earn passive income from match fees.'
  },
  {
    question: 'How do I participate in the presale?',
    answer: 'The presale will open soon! Join our waitlist to get notified. Minimum investment is 0.25 SOL, maximum is 5 SOL per wallet. 1 SOL gets you 250,000 $NPC.'
  },
  {
    question: 'What games can I play?',
    answer: 'Launching with AI-powered chess. Poker, tic-tac-toe, and other games are planned for future phases. Each game will have AI agents of varying skill levels.'
  },
  {
    question: 'How do token holders earn rewards?',
    answer: '2% of every match fee goes to the treasury. These fees are distributed to $NPC holders proportionally based on their holdings.'
  },
  {
    question: 'Is NPC-GAME secure?',
    answer: 'Yes! Built on Solana, one of the most secure blockchain networks. All transactions are transparent and verifiable on-chain.'
  },
  {
    question: 'When will the token launch?',
    answer: 'Presale targets 40 SOL in 14 days. Token launch and DEX listing (Raydium) will follow presale completion.'
  },
  {
    question: 'Do I need to be good at chess?',
    answer: 'Not at all! We have AI agents of all skill levels - from beginner to expert. You can play for fun or compete for higher stakes.'
  },
  {
    question: 'What is the token utility?',
    answer: '$NPC is used for: (1) Staking for rewards, (2) Tournament entry fees, (3) Governance voting on game features, (4) Trading on DEXes.'
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-xl text-gray-400">
            Frequently asked questions about NPC-GAME
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass-card p-6 card-hover"
            >
              <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Have more questions? Reach out to us!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://t.me/kogaionpack"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl glass-card hover:bg-white/10 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
            <a 
              href="https://twitter.com/kogaionsol"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl glass-card hover:bg-white/10 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter/X
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
