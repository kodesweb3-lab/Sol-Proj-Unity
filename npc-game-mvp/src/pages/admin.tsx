import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PresaleEntry {
  id: number
  wallet: string
  email: string
  amount: string
  timestamp: string
}

export default function Admin() {
  const [entries, setEntries] = useState<PresaleEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, emails: 0 })

  useEffect(() => {
    fetch('/api/presale')
      .then(res => res.json())
      .then(data => {
        setEntries(data.entries || [])
        setStats({
          total: data.total || 0,
          emails: (data.entries || []).filter((e: PresaleEntry) => e.email).length
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Admin - NPC-GAME Presale</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dark-300 grid-bg py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="gradient-text">NPC-GAME</span> Admin
              </h1>
              <p className="text-gray-400">Presale Waitlist Management</p>
            </div>
            <Link href="/" className="btn-secondary">
              ← Back to Site
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="text-4xl font-bold gradient-text">{stats.total}</div>
              <div className="text-gray-400">Total Signups</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-4xl font-bold gradient-text">{stats.emails}</div>
              <div className="text-gray-400">With Email</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-4xl font-bold gradient-text">
                {entries.filter(e => e.amount && ['1','2','5'].includes(e.amount)).length}
              </div>
              <div className="text-gray-400">High Interest (1+ SOL)</div>
            </div>
          </div>

          {/* Actions */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Export Data</h2>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const csv = 'Wallet,Email,Amount,Timestamp\n' + 
                    entries.map(e => `${e.wallet},${e.email},${e.amount},${e.timestamp}`).join('\n')
                  const blob = new Blob([csv], { type: 'text/csv' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'presale-waitlist.csv'
                  a.click()
                }}
                className="btn-primary"
              >
                📥 Download CSV
              </button>
              <button
                onClick={() => {
                  const emails = entries.filter(e => e.email).map(e => e.email).join(', ')
                  navigator.clipboard.writeText(emails)
                  alert('Emails copied to clipboard!')
                }}
                className="btn-secondary"
              >
                📧 Copy All Emails
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Wallet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : entries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No signups yet. Share your link!
                      </td>
                    </tr>
                  ) : (
                    entries.slice().reverse().map((entry, idx) => (
                      <tr key={entry.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-400">{entries.length - idx}</td>
                        <td className="px-6 py-4 font-mono text-sm">
                          <a 
                            href={`https://solscan.io/address/${entry.wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:underline"
                          >
                            {entry.wallet.slice(0,6)}...{entry.wallet.slice(-4)}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{entry.email || '-'}</td>
                        <td className="px-6 py-4">
                          {entry.amount ? (
                            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm">
                              {entry.amount} SOL
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
