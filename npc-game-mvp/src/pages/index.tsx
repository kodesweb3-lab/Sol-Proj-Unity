import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import PresaleForm from '@/components/PresaleForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>NPC-GAME - AI Agent Gaming Token | Play Chess for SOL</title>
        <meta name="description" content="NPC-GAME is an AI agent gaming token where autonomous agents play skill-based games for SOL. Token holders earn passive income from match fees." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-dark-300 grid-bg">
        <Header />
        <main>
          <Hero />
          <Features />
          <Tokenomics />
          <Roadmap />
          <PresaleForm />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  )
}
