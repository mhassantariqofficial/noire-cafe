import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tilt from './components/Tilt.jsx'
import { CAFE, MENU, MENU_FILTERS, PILLARS } from './data.js'

const Scene3D = lazy(() => import('./components/Scene3D.jsx'))

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

const NAV = [
  ['About', '#about'],
  ['Menu', '#menu'],
  ['Experience', '#experience'],
  ['Visit', '#visit'],
]

/* ───────────── Nav ───────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="nav-logo" aria-label="Noire Café — home">
        <img src="/assets/logo-gold.png" alt="Noire Café logo" />
      </a>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#visit" className="btn btn-sm btn-gold" onClick={() => setOpen(false)}>
          Reserve
        </a>
      </nav>
      <button className="nav-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span />
        <span />
      </button>
    </header>
  )
}

/* ───────────── Hero ───────────── */

function Hero() {
  const scrollRef = useRef(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const on = () => {
      const h = heroRef.current?.offsetHeight || 1
      scrollRef.current = Math.min(window.scrollY / h, 1.2)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <Scene3D scrollRef={scrollRef} />
        </Suspense>
      </div>
      <div className="hero-vignette" />

      <div className="hero-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <span className="line" /> Specialty Coffee &amp; Fine Bites
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Coffee, <em>crafted</em>
          <br />
          in the dark.
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
        >
          Step into Noire Café — where rich espresso, golden light and handcrafted flavors turn every moment into a
          quiet luxury.
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          <a href="#menu" className="btn btn-gold">
            Explore the Menu
          </a>
          <a href="#visit" className="btn btn-ghost">
            Reserve a Table
          </a>
        </motion.div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

/* ───────────── Marquee ───────────── */

function Marquee() {
  const words = ['Specialty Coffee', 'Fresh Bakes', 'Slow Moments', 'Golden Hour', 'Handcrafted Daily', 'Noire Café']
  const row = words.map((w, i) => (
    <span key={i}>
      {w} <b>✦</b>
    </span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}

/* ───────────── About ───────────── */

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <motion.div className="about-copy" {...reveal}>
          <p className="eyebrow">
            <span className="line" /> Our Story
          </p>
          <h2>
            A darker, <em>richer</em> kind of café.
          </h2>
          <p>
            Noire was born from a simple belief: the best coffee deserves the best setting. We pair carefully roasted
            beans with a refined, intimate space — deep tones, warm gold light and a menu built around craft.
          </p>
          <p>
            Whether it’s a morning ritual, a long conversation or a midnight dessert, every visit is designed to feel
            effortless, elevated and unmistakably yours.
          </p>
          <a href="#menu" className="link-arrow">
            Discover our menu <span>→</span>
          </a>
        </motion.div>

        <motion.div className="about-visual" {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <Tilt className="about-card about-card--a" max={7}>
            <img src="/assets/latte.png" alt="Noire latte with heart latte art" loading="lazy" />
          </Tilt>
          <Tilt className="about-card about-card--b" max={9}>
            <img src="/assets/cake.png" alt="Slice of chocolate layer cake" loading="lazy" />
          </Tilt>
          <div className="about-badge">
            <img src="/assets/logo-gold.png" alt="" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────── Menu ───────────── */

function Menu() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? MENU : MENU.filter((m) => m.category === filter)

  return (
    <section className="section menu" id="menu">
      <div className="container">
        <motion.div className="section-head" {...reveal}>
          <p className="eyebrow center">
            <span className="line" /> The Menu <span className="line" />
          </p>
          <h2>
            Signature <em>flavors</em>
          </h2>
          <p className="section-sub">A refined selection of coffee, savory bites and desserts — made fresh, served beautifully.</p>
        </motion.div>

        <motion.div className="filters" role="tablist" aria-label="Menu categories" {...reveal}>
          {MENU_FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="menu-grid">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.div
                layout
                key={m.id}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt className="dish" max={8}>
                  <div className="dish-img">
                    <img src={m.img} alt={m.name} loading="lazy" />
                    <span className="dish-tag">{m.tag}</span>
                  </div>
                  <div className="dish-body">
                    <div className="dish-top">
                      <h3>{m.name}</h3>
                      <span className="dish-price">{m.price}</span>
                    </div>
                    <p>{m.desc}</p>
                    <span className="dish-cat">{m.category}</span>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────── Experience ───────────── */

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.div className="section-head" {...reveal}>
          <p className="eyebrow center">
            <span className="line" /> The Noire Experience <span className="line" />
          </p>
          <h2>
            Made with <em>intention</em>
          </h2>
        </motion.div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <motion.div key={p.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}>
              <Tilt className="pillar" max={7}>
                <span className="pillar-n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <motion.blockquote className="quote" {...reveal}>
          <span>“</span>
          Every cup is a small act of devotion — poured slowly, served warmly, remembered long after the last sip.
          <cite>— The Noire Café Promise</cite>
        </motion.blockquote>
      </div>
    </section>
  )
}

/* ───────────── Visit / Reserve ───────────── */

function Visit() {
  const [sent, setSent] = useState(false)
  const today = new Date().toISOString().split('T')[0]

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section visit" id="visit">
      <div className="container visit-grid">
        <motion.div className="visit-info" {...reveal}>
          <p className="eyebrow">
            <span className="line" /> Visit Us
          </p>
          <h2>
            Reserve your <em>table</em>
          </h2>
          <p className="section-sub left">
            Join us for an unhurried morning, a golden afternoon or a late-night treat. Book ahead and we’ll have your
            corner ready.
          </p>

          <ul className="info-list">
            <li>
              <b>Address</b>
              <span>{CAFE.address}</span>
            </li>
            <li>
              <b>Phone</b>
              <a href={`tel:${CAFE.phone.replace(/\s/g, '')}`}>{CAFE.phone}</a>
            </li>
            <li>
              <b>Email</b>
              <a href={`mailto:${CAFE.email}`}>{CAFE.email}</a>
            </li>
          </ul>

          <div className="hours">
            <b>Opening Hours</b>
            {CAFE.hours.map(([d, h]) => (
              <div key={d} className="hours-row">
                <span>{d}</span>
                <i />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <Tilt className="form-card" max={3} glare={false}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  className="form-ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <img src="/assets/logo-gold.png" alt="" />
                  <h3>Thank you.</h3>
                  <p>Your reservation request has been received. We’ll confirm your table shortly.</p>
                  <button className="btn btn-ghost" onClick={() => setSent(false)}>
                    Make another request
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3>Book a table</h3>
                  <label>
                    <span>Full name</span>
                    <input required name="name" placeholder="Your name" autoComplete="name" />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input required name="phone" type="tel" placeholder="+92 300 0000000" autoComplete="tel" />
                  </label>
                  <div className="row">
                    <label>
                      <span>Date</span>
                      <input required name="date" type="date" min={today} />
                    </label>
                    <label>
                      <span>Time</span>
                      <input required name="time" type="time" defaultValue="19:00" />
                    </label>
                  </div>
                  <label>
                    <span>Guests</span>
                    <select name="guests" defaultValue="2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Special request (optional)</span>
                    <textarea name="note" rows="3" placeholder="Birthday, anniversary, seating preference…" />
                  </label>
                  <button type="submit" className="btn btn-gold btn-block">
                    Request Reservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────── Footer ───────────── */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src="/assets/logo-gold.png" alt="Noire Café" className="footer-logo" />
        <nav className="footer-links" aria-label="Footer">
          {NAV.map(([l, h]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
          <a href={CAFE.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
        <p>© {new Date().getFullYear()} Noire Café. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ───────────── App ───────────── */

export default function App() {
  const glow = useRef(null)
  useEffect(() => {
    const on = (e) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [])

  return (
    <>
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Experience />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
