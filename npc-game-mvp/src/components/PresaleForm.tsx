import { useState } from 'react'

interface PresaleFormProps {
  onSubmit?: (data: { wallet: string; email: string; amount: string }) => void
}

export default function PresaleForm({ onSubmit }: PresaleFormProps) {
  const [form, setForm] = useState({ wallet: '', email: '', amount: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/presale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setSubmitted(true)
        onSubmit?.(form)
      }
    } catch (err) {
      console.error('Error:', err)
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
        <p className="text-gray-400 mb-4">
          We'll notify you when presale goes live at <strong>{form.wallet.slice(0,6)}...{form.wallet.slice(-4)}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Check your email for updates: {form.email || 'No email provided'}
        </p>
      </div>
    )
  }

  return (
    <section id="presale" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Join the Presale</span>
          </h2>
          <p className="text-xl text-gray-400">
            Be among the first to invest in the future of AI gaming
          </p>
        </div>

        <div className="gradient-border p-1">
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Solana Wallet Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your Solana wallet address"
                  className="input-field"
                  value={form.wallet}
                  onChange={(e) => setForm({ ...form, wallet: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address (optional)</label>
                <input
                  type="email"
                  placeholder="For presale updates"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">How much SOL do you want to invest?</label>
                <select
                  className="input-field"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                >
                  <option value="">Select amount</option>
                  <option value="0.25">0.25 SOL (Minimum)</option>
                  <option value="0.5">0.5 SOL</option>
                  <option value="1">1 SOL</option>
                  <option value="2">2 SOL</option>
                  <option value="5">5 SOL (Maximum)</option>
                  <option value="custom">Custom amount</option>
                </select>
              </div>

              <div className="glass-card p-4 bg-primary-500/10 border-primary-500/30">
                <h4 className="font-semibold mb-2">Presale Terms:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Price: 1 SOL = 250,000 $NPC</li>
                  <li>• Minimum: 0.25 SOL | Maximum: 5 SOL per wallet</li>
                  <li>• Tokens distributed after presale ends</li>
                  <li>• All transactions will be verified</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 transition font-semibold disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Join Presale Waitlist'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Contact us on <a href="https://t.me/kogaionpack" className="text-primary-400 hover:underline">Telegram</a>
          </p>
        </div>
      </div>
    </section>
  )
}
