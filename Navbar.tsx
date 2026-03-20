'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const UNIVERSE_MENU = {
  seasons: [
    { label: 'Season 1 — The Awakening', href: '/#universe' },
  ],
  arcs: [
    { label: 'Arc 1 — The Infected Mind', href: '/#arc1' },
  ],
  episodes: [
    { label: 'Ep 1 — The Negativity Bias', href: '/ep1', live: true },
    { label: 'Ep 2 — Why You Destroy Everything Good', href: '#', live: false },
    { label: 'Ep 3 — The Origin', href: '#', live: false },
    { label: 'Ep 4 — The Patterns', href: '#', live: false },
    { label: 'Ep 5 — The Rewire', href: '#', live: false },
  ],
}

const INTEL_MENU = {
  timeline: [{ label: 'Timeline of the Mind', href: '/timeline' }],
  feed: [{ label: 'Cortex Feed', href: '/feed' }],
}

const EXPLORE_MENU = {
  experiment: [{ label: 'Run The Experiment', href: '/ep1#experiment' }],
}

// ─── Hook: scroll-aware nav state ─────────────────────────────────────────────
function useScrollNav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y > 100 && y > lastY.current) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, hidden }
}

// ─── Smooth scroll helper ──────────────────────────────────────────────────────
function useSmoothScrollLink() {
  const router = useRouter()
  const pathname = usePathname()

  return (href: string, close?: () => void) => {
    close?.()
    const [path, hash] = href.split('#')
    if (!hash) {
      router.push(href)
      return
    }
    if (pathname === path || (path === '/' && pathname === '/') || path === '') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      sessionStorage.setItem('scrollTo', hash)
      router.push(path || '/')
    }
  }
}

// ─── Shared mega-menu column style ────────────────────────────────────────────
const COLUMN_HEADER: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '11px',
  color: '#888888',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  marginBottom: '16px',
}

const NAV_LINK_BASE: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '14px',
  color: '#ffffff',
  display: 'block',
  marginBottom: '12px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
}

const NAV_LINK_LOCKED: React.CSSProperties = {
  ...NAV_LINK_BASE,
  color: '#555555',
  cursor: 'default',
}

// ─── Desktop mega menu panels ──────────────────────────────────────────────────
function UniversePanel({ navigate }: { navigate: (href: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 48px', minWidth: '480px' }}>
      <div>
        <div style={COLUMN_HEADER}>SEASONS</div>
        {UNIVERSE_MENU.seasons.map(s => (
          <span
            key={s.href}
            style={NAV_LINK_BASE}
            onMouseEnter={e => (e.currentTarget.style.color = '#0066FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
            onClick={() => navigate(s.href)}
          >{s.label}</span>
        ))}
      </div>
      <div>
        <div style={COLUMN_HEADER}>ARCS</div>
        {UNIVERSE_MENU.arcs.map(a => (
          <span
            key={a.href}
            style={NAV_LINK_BASE}
            onMouseEnter={e => (e.currentTarget.style.color = '#0066FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
            onClick={() => navigate(a.href)}
          >{a.label}</span>
        ))}
      </div>
      <div>
        <div style={COLUMN_HEADER}>EPISODES</div>
        {UNIVERSE_MENU.episodes.map((ep, i) => (
          ep.live
            ? <span
                key={i}
                style={NAV_LINK_BASE}
                onMouseEnter={e => (e.currentTarget.style.color = '#0066FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
                onClick={() => navigate(ep.href)}
              >{ep.label}</span>
            : <span key={i} style={NAV_LINK_LOCKED}>{ep.label} <span style={{ color: '#444444' }}>🔒</span></span>
        ))}
      </div>
    </div>
  )
}

function IntelPanel({ navigate }: { navigate: (href: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 48px', minWidth: '320px' }}>
      <div>
        <div style={COLUMN_HEADER}>TIMELINE</div>
        {INTEL_MENU.timeline.map(t => (
          <span
            key={t.href}
            style={NAV_LINK_BASE}
            onMouseEnter={e => (e.currentTarget.style.color = '#0066FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
            onClick={() => navigate(t.href)}
          >{t.label}</span>
        ))}
      </div>
      <div>
        <div style={COLUMN_HEADER}>FEED</div>
        {INTEL_MENU.feed.map(f => (
          <span
            key={f.href}
            style={NAV_LINK_BASE}
            onMouseEnter={e => (e.currentTarget.style.color = '#0066FF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
            onClick={() => navigate(f.href)}
          >{f.label}</span>
        ))}
      </div>
    </div>
  )
}

function ExplorePanel({ navigate }: { navigate: (href: string) => void }) {
  return (
    <div style={{ minWidth: '240px' }}>
      <div style={COLUMN_HEADER}>EXPERIMENT</div>
      {EXPLORE_MENU.experiment.map(e => (
        <span
          key={e.href}
          style={NAV_LINK_BASE}
          onMouseEnter={el => (el.currentTarget.style.color = '#0066FF')}
          onMouseLeave={el => (el.currentTarget.style.color = '#ffffff')}
          onClick={() => navigate(e.href)}
        >{e.label}</span>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { scrolled, hidden } = useScrollNav()
  const pathname = usePathname()
  const navigate = useSmoothScrollLink()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll-to logic on route change (handles sessionStorage hash)  
  useEffect(() => {
    const hash = sessionStorage.getItem('scrollTo')
    if (hash) {
      sessionStorage.removeItem('scrollTo')
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }, [pathname])

  const openMenu = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setActiveMenu(label)
  }
  const startCloseMenu = () => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 80)
  }
  const keepMenuOpen = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
  }

  // Active route detection
  const universeActive = pathname === '/' || pathname === '/ep1'
  const intelActive = pathname === '/timeline' || pathname === '/feed'
  const exploreActive = pathname === '/ep1'

  const activeLinkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-inter)',
    fontSize: '14px',
    letterSpacing: '0.08em',
    color: active ? '#0066FF' : '#ffffff',
    textDecoration: 'none',
    paddingBottom: active ? '2px' : undefined,
    borderBottom: active ? '1px solid #0066FF' : undefined,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  })

  // Nav background styles
  const navBg: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9000,
    transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
    WebkitTransform: hidden ? 'translateY(-100%) translateZ(0)' : 'translateY(0) translateZ(0)',
    height: '64px',
    backgroundColor: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav style={navBg} className="hidden md:block">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* LEFT — Brand */}
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '0.05em', color: '#ffffff', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
          >
            CORTEX CREED
          </Link>

          {/* CENTER — Nav items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', height: '100%' }}>
            {/* UNIVERSE */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('UNIVERSE')}
              onMouseLeave={startCloseMenu}
            >
              <span
                style={activeLinkStyle(universeActive)}
                onMouseEnter={e => { keepMenuOpen(); if (!universeActive) e.currentTarget.style.color = '#0066FF' }}
                onMouseLeave={e => { if (!universeActive) e.currentTarget.style.color = '#ffffff' }}
              >UNIVERSE</span>
              <AnimatePresence>
                {activeMenu === 'UNIVERSE' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseEnter={keepMenuOpen}
                    onMouseLeave={startCloseMenu}
                    style={{ position: 'absolute', top: '100%', left: 0, marginTop: 0, background: '#050508', borderTop: '2px solid #0066FF', borderRadius: '0 0 4px 4px', padding: '32px', zIndex: 100 }}
                  >
                    <UniversePanel navigate={(href) => { setActiveMenu(null); navigate(href) }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* INTEL */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('INTEL')}
              onMouseLeave={startCloseMenu}
            >
              <span
                style={activeLinkStyle(intelActive)}
                onMouseEnter={e => { keepMenuOpen(); if (!intelActive) e.currentTarget.style.color = '#0066FF' }}
                onMouseLeave={e => { if (!intelActive) e.currentTarget.style.color = '#ffffff' }}
              >INTEL</span>
              <AnimatePresence>
                {activeMenu === 'INTEL' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseEnter={keepMenuOpen}
                    onMouseLeave={startCloseMenu}
                    style={{ position: 'absolute', top: '100%', left: 0, marginTop: 0, background: '#050508', borderTop: '2px solid #0066FF', borderRadius: '0 0 4px 4px', padding: '32px', zIndex: 100 }}
                  >
                    <IntelPanel navigate={(href) => { setActiveMenu(null); navigate(href) }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* EXPLORE */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('EXPLORE')}
              onMouseLeave={startCloseMenu}
            >
              <span
                style={activeLinkStyle(exploreActive)}
                onMouseEnter={e => { keepMenuOpen(); if (!exploreActive) e.currentTarget.style.color = '#0066FF' }}
                onMouseLeave={e => { if (!exploreActive) e.currentTarget.style.color = '#ffffff' }}
              >EXPLORE</span>
              <AnimatePresence>
                {activeMenu === 'EXPLORE' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseEnter={keepMenuOpen}
                    onMouseLeave={startCloseMenu}
                    style={{ position: 'absolute', top: '100%', left: 0, marginTop: 0, background: '#050508', borderTop: '2px solid #0066FF', borderRadius: '0 0 4px 4px', padding: '32px', zIndex: 100 }}
                  >
                    <ExplorePanel navigate={(href) => { setActiveMenu(null); navigate(href) }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — Follow */}
          <a
            href="https://www.instagram.com/cortexcreed"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '14px',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.5)',
              background: 'transparent',
              padding: '10px 20px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.2s ease, border-color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0066FF'; e.currentTarget.style.borderColor = '#0066FF' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
          >
            FOLLOW
          </a>
        </div>
      </nav>

      {/* ── Mobile Navbar ── */}
      <nav
        className="md:hidden"
        style={{
          ...navBg,
          height: '56px',
        }}
      >
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '0.05em', color: '#ffffff', textDecoration: 'none' }}
          >
            CORTEX CREED
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px' }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Nav items */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 32px' }}>
              {/* UNIVERSE */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px' }}
              >
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'UNIVERSE' ? null : 'UNIVERSE')}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1 }}>UNIVERSE</span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'UNIVERSE' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden', marginTop: '16px', paddingLeft: '8px' }}
                    >
                      {[
                        { label: '— Season 1 The Awakening', href: '/#universe', grey: true, live: true },
                        { label: '— Arc 1 The Infected Mind', href: '/#arc1', grey: true, live: true },
                        { label: '— Ep 1 The Negativity Bias', href: '/ep1', grey: false, live: true },
                        { label: '— Ep 2 Why You Destroy Everything Good', href: '#', grey: true, live: false },
                        { label: '— Ep 3 The Origin', href: '#', grey: true, live: false },
                        { label: '— Ep 4 The Patterns', href: '#', grey: true, live: false },
                        { label: '— Ep 5 The Rewire', href: '#', grey: true, live: false },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          {item.live
                            ? <span
                                onClick={() => { navigate(item.href, () => { setMobileOpen(false); setMobileExpanded(null) }) }}
                                style={{
                                  display: 'block',
                                  fontFamily: 'var(--font-inter)',
                                  fontSize: '18px',
                                  color: item.grey ? '#888888' : '#ffffff',
                                  marginBottom: '10px',
                                  cursor: 'pointer',
                                }}
                              >{item.label}</span>
                            : <span
                                style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '18px', color: '#444444', marginBottom: '10px' }}
                              >{item.label} 🔒</span>
                          }
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* INTEL */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px' }}
              >
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'INTEL' ? null : 'INTEL')}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1 }}>INTEL</span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'INTEL' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden', marginTop: '16px', paddingLeft: '8px' }}
                    >
                      {[
                        { label: '— Timeline of the Mind', href: '/timeline' },
                        { label: '— Cortex Feed', href: '/feed' },
                      ].map((item, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 }}
                          onClick={() => { navigate(item.href, () => { setMobileOpen(false); setMobileExpanded(null) }) }}
                          style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '18px', color: '#888888', marginBottom: '10px', cursor: 'pointer' }}
                        >{item.label}</motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* EXPLORE */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{ paddingBottom: '24px', marginBottom: '32px' }}
              >
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'EXPLORE' ? null : 'EXPLORE')}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1 }}>EXPLORE</span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'EXPLORE' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden', marginTop: '16px', paddingLeft: '8px' }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.08 }}
                        onClick={() => { navigate('/ep1#experiment', () => { setMobileOpen(false); setMobileExpanded(null) }) }}
                        style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '18px', color: '#888888', marginBottom: '10px', cursor: 'pointer' }}
                      >— Run The Experiment</motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* FOLLOW button at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                padding: `0 48px calc(env(safe-area-inset-bottom) + 24px)`,
              }}
            >
              <a
                href="https://www.instagram.com/cortexcreed"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '52px',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '16px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0066FF'; e.currentTarget.style.color = '#0066FF' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#ffffff' }}
              >
                FOLLOW @CORTEXCREED
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
