import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { AWARDS, ROLES, SITE, VALUES, photoSet } from '../site'
import { Dot, Reveal, SectionHead, TextLink } from '../ui'
import Nav from '../components/Nav'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

/** Counts up to `to` the first time it scrolls into view. */
function Count({ to, pad = 0 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!seen || reduce) return
    const c = animate(pad ? to - pad : 0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [seen, reduce, to, pad])
  return <span ref={ref}>{reduce ? to : v}</span>
}

const STATS = [
  { el: <Count to={SITE.founded} pad={40} />, label: 'Founded in Cape Town' },
  { el: <Count to={ROLES.length} />, label: 'Staff roles we supply' },
  { el: <Count to={2} />, label: 'Provinces: Western Cape & Gauteng' },
  { el: <>7</>, label: 'Days a week' },
]

const TEAM_PHOTOS = [
  { n: '04', alt: 'The Nephrite team of waiters and chefs lined up on a lawn' },
  { n: '10', alt: 'Four Nephrite waitresses in branded aprons beside a buffet' },
  { n: '12', alt: 'A Nephrite manager with two chefs in a kitchen' },
]

export default function About() {
  return (
    <>
      <Nav page="about" />
      <main id="main">
        <PageHero
          label={`About us · Since ${SITE.founded}`}
          title={
            <>
              Look no
              <br />
              further
              <Dot />
            </>
          }
          intro="Nephrite Events & Staffing is a one-stop events management and staffing company, based in Cape Town and serving the Western Cape and Johannesburg."
          photo="/assets/hero-4.webp"
        />

        {/* ---- story ---- */}
        <section className="section story" aria-labelledby="story-title">
          <Reveal>
            <SectionHead label="Our story" id="story-title">
              The people
              <br />
              behind the service
              <Dot />
            </SectionHead>
          </Reveal>
          <Reveal className="story-body" delay={0.1}>
            <p className="support lead">
              Founded in Cape Town in {SITE.founded}, we&rsquo;re a reliable supplier of professional event staff: the
              team event hosts can call, and then stop worrying.
            </p>
            <p className="support">
              We supply waiters, bartenders, chefs, set-up crews, runners, food service assistants, cashiers, promotions
              staff, event security and on-site coordinators. Whatever the event needs, one call to Nephrite covers it.
            </p>
            <p className="support">
              We work corporate functions, weddings and private celebrations from our base in Cape Town, across the
              Western Cape and in Johannesburg.
            </p>
          </Reveal>
        </section>

        {/* ---- numbers ---- */}
        <section className="section" aria-label="Nephrite in numbers">
          <ul className="stat-row">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} className="stat" delay={i * 0.06}>
                <span className="display stat-n">{s.el}</span>
                <span className="label stat-l">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---- team photos ---- */}
        <section className="section" aria-label="Our team at work">
          <ul className="team-strip">
            {TEAM_PHOTOS.map((t, i) => {
              const set = photoSet(t.n)
              return (
                <Reveal as="li" key={t.n} delay={i * 0.08}>
                  <img
                    src={set.src}
                    srcSet={set.srcSet}
                    sizes="(max-width: 719px) 100vw, 33vw"
                    alt={t.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </Reveal>
              )
            })}
          </ul>
        </section>

        {/* ---- values ---- */}
        <section className="section" aria-labelledby="values-title">
          <Reveal>
            <SectionHead label="Why Nephrite" id="values-title">
              What you can
              <br />
              count on
              <Dot />
            </SectionHead>
          </Reveal>
          <ul className="value-grid">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} className="value card" delay={i * 0.06}>
                <span className="label" style={{ color: 'var(--color-flare)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display value-title">{v.title}</h3>
                <p className="support">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---- recognition + office ---- */}
        <section className="section duo" aria-label="Recognition and office">
          <Reveal className="award card">
            <div className="label" style={{ color: 'var(--color-flare)' }}>
              Recognition · {AWARDS.year}
            </div>
            <h2 className="display award-title">
              Most Popular Party
              <br />& Event Supplier
            </h2>
            <ul className="award-list">
              {AWARDS.items.map((a) => (
                <li key={a.where}>
                  <span className="display award-rank">{a.rank}</span>
                  <span>{a.where}</span>
                </li>
              ))}
            </ul>
            <p className="label award-src">Awarded by {AWARDS.source}</p>
          </Reveal>

          <Reveal className="office card" delay={0.08}>
            <div className="label" style={{ color: 'var(--color-flare)' }}>
              Head office
            </div>
            <address className="office-address display">
              {SITE.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p className="support">Serving the {SITE.areas}.</p>
            <div className="row-actions">
              <TextLink href={SITE.maps}>Get directions</TextLink>
              <TextLink href={SITE.linkedin}>LinkedIn</TextLink>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
