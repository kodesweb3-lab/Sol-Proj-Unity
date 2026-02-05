import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'presale.json')

interface PresaleEntry {
  wallet: string
  email: string
  amount: string
  timestamp: string
}

function readData(): PresaleEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return []
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeData(entries: PresaleEntry[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { wallet, email, amount } = req.body

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet is required' })
    }

    const entries = readData()
    const newEntry: PresaleEntry = {
      wallet,
      email: email || '',
      amount: amount || '',
      timestamp: new Date().toISOString()
    }

    entries.push(newEntry)
    writeData(entries)

    return res.status(200).json({ success: true, message: 'Added to waitlist' })
  }

  if (req.method === 'GET') {
    const entries = readData()
    return res.status(200).json({
      total: entries.length,
      entries: entries.map((e, i) => ({
        id: i + 1,
        ...e
      }))
    })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
