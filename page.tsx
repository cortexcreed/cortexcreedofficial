'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { AuroraText } from '@/components/magicui/aurora-text'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

import TheWeapon from '@/components/TheWeapon'
import CortexTest from '@/components/CortexTest'
import LatestTransmissions from '@/components/LatestTransmissions'
import TheSystem from '@/components/TheSystem'
import Footer from '@/components/Footer'

// Dynamic imports for heavy canvas component
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })
const BrainSequence = dynamic(() => import('@/components/BrainSequence'), { ssr: false })

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loading screen always renders first and is always on top while loading */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content — hidden behind loading screen until ready */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {/* 1. Brain Sequence — cinematic 800vh animation */}
        <BrainSequence />

        {/* 2. TheWeapon — brand promise and four pillars */}
        <TheWeapon />

        {/* 3. Cortex Test — genuine recall experiment */}
        <CortexTest />

        {/* 4. The System — season arc and episodes */}
        <TheSystem />

        {/* 5. Latest Transmissions — feed preview */}
        <LatestTransmissions />

        {/* 6. Manifesto — closing statement */}
        <ManifestoSection />

        <Footer />
      </div>
    </>
  )
}

// ── Manifesto section ──────────────────────────────────────────────────────────

function ManifestoSection() {
  const [inView, setInView] = useState(false)
  const ref = (el: HTMLDivElement | null) => {
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
  }

  return (
    <section
      style={{
        background: '#050508',
        padding: 'clamp(80px, 10vw, 120px) 24px',
        width: '100%',
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#ffffff',
            lineHeight: 1.1,
            display: 'block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0s, transform 0.6s ease 0s',
          }}
        >
          TRAIN YOUR MIND.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#ffffff',
            lineHeight: 1.1,
            display: 'block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          OWN YOUR LIFE.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '20px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
            marginTop: '24px',
            display: 'block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
          }}
        >
          For the ones who refuse to stay asleep.
        </span>

        <div
          className="mt-12 flex justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
          }}
        >
          <InteractiveHoverButton
            text="INITIATE"
            className="font-bebas text-lg px-8 tracking-widest border-[#0066FF] text-white bg-transparent"
          />
        </div>
      </div>
    </section>
  )
}
