import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { I, P, PHOTOS, PHOTO_SPAN, PHOTO_SPAN_TALL, SCROLL_VH, SCROLL_VH_TALL, span } from '../scroll'
import { CARD, HERO, SEC, STAGE_H, STAGE_W, placeCard } from '../layout'
import { FACTS, QUOTE_HREF, ROLES, SERVICES, SITE } from '../site'
import { Arrow, Dot, Mask, Pill, Reveal, SectionHead, TextLink, box, px, useIntro } from '../ui'
import Nav from '../components/Nav'
import ServicesTall from '../components/ServicesTall'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

/*
  Nephrite — a scroll-driven hero over the company's own event photography,
  after the Vespine reference: a pinned stage, a sparse nav, big uppercase
  display type on the left, and a fan of service cards that swing into place.

  THE TYPE NEVER SITS ON THE SUBJECT. On landscape screens the photos are
  pushed right and their left edge feathered into the ground, which leaves the
  left 40% of the frame as clean plate for the display type.

  The home page is the trailer; every section after the scene is a short
  preview that hands off to its own page.
*/

const FLARE = 'var(--color-flare)'
const ASH = 'var(--color-ash)'

const SUPPORT =
  'Professional waiters, bartenders, chefs and set-up crews for corporate functions, weddings and private events. You host. We handle the rest.'

/** Portrait or narrow stages get the reflowing layout instead of the artboard. */
const isTall = (w: number, h: number) => w < 720 || w / h < 0.9

function Photos({ q, tall, reduce }: { q: number; tall: boolean; reduce: boolean }) {
  return (
    <div
      aria-hidden
      className="photos"
      style={
        tall
          ? undefined
          : {
              transform: 'translateX(9%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 22%)',
              maskImage: 'linear-gradient(90deg, transparent 0, #000 22%)',
            }
      }
    >
      {PHOTOS.map((name, i) => {
        /* each frame holds, then the next lands over it with a slow push-in */
        const o = i === 0 ? 1 : span(q, [i - 0.5, i])
        const settle = Math.min(Math.max((q - (i - 1)) / 2, 0), 1)
        const z = reduce ? 1 : 1.1 - 0.1 * settle
        return (
          <img
            key={name}
            src={`/assets/${name}.webp`}
            alt=""
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
            style={{
              opacity: o,
              visibility: o > 0 ? 'visible' : 'hidden',
              transform: `scale(${z})`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function Home() {
  const wrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const [p, setP] = useState(0)
  const intro = useIntro()

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  /* Measure the stage itself rather than the window: it is 100svh, which on a
     phone is not innerHeight while the address bar is showing. */
  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    const fit = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const tall = isTall(size.w, size.h)
  const scale = Math.min(size.w / STAGE_W, size.h / STAGE_H)
  const ox = (size.w - STAGE_W * scale) / 2
  const oy = (size.h - STAGE_H * scale) / 2

  const n = PHOTOS.length - 1
  const q = Math.min(p / (tall ? PHOTO_SPAN_TALL : PHOTO_SPAN), 1) * n

  const tLabel = span(intro, I.label)
  const tLine1 = span(intro, I.line1)
  const tLine2 = span(intro, I.line2)
  const tSupport = span(intro, I.support)
  const tFacts = span(intro, I.facts)
  const tOut = tall ? 0 : span(p, P.heroOut)
  const tSec = tall ? 0 : span(p, P.secHead)
  const tCards = tall ? 0 : span(p, P.cards)

  return (
    <>
      <Nav page="home" />
      <main id="main">
        <div ref={wrap} className="scene" style={{ height: `${tall ? SCROLL_VH_TALL : SCROLL_VH}vh` }}>
          <div ref={stage} className="stage">
            <div className="ground" />
            <Photos q={q} tall={tall} reduce={reduce} />
            <div className="tint" />
            <div className="glow" />
            <div className={tall ? 'type-ground-tall' : 'type-ground'} />
            {!tall && <div className="sec-dim" style={{ opacity: tSec }} />}

            {tall ? (
              <TallHero t={{ tLabel, tLine1, tLine2, tSupport, tFacts }} cue={Math.max(0, 1 - p * 10) * tFacts} />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  left: px(ox),
                  top: px(oy),
                  width: px(STAGE_W),
                  height: px(STAGE_H),
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  zIndex: 2,
                }}
              >
                {/* ---- hero ---- */}
                <div
                  inert={tOut > 0.5}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 1 - tOut,
                    transform: `translateX(${-tOut * 150}px)`,
                    filter: tOut > 0 ? `blur(${tOut * 16}px)` : undefined,
                  }}
                >
                  <Mask t={tLabel} style={box(HERO.label)}>
                    <div className="label" style={{ color: FLARE, fontSize: px(12) }}>
                      Events &amp; Staffing · {SITE.areas}
                    </div>
                  </Mask>

                  <h1 style={{ margin: 0 }}>
                    <Mask t={tLine1} style={box(HERO.line1)}>
                      <span className="display" style={{ display: 'block', fontSize: px(HERO.headSize) }}>
                        Look no
                      </span>
                    </Mask>
                    <Mask t={tLine2} style={box(HERO.line2)}>
                      <span className="display" style={{ display: 'block', fontSize: px(HERO.headSize) }}>
                        further
                        <Dot />
                      </span>
                    </Mask>
                  </h1>

                  <Mask t={tSupport} style={box(HERO.support)}>
                    <p className="support" style={{ fontSize: px(17), lineHeight: px(27) }}>
                      {SUPPORT}
                    </p>
                  </Mask>

                  <div
                    style={{
                      ...box(HERO.cta),
                      opacity: tSupport,
                      transform: `scale(${0.94 + tSupport * 0.06})`,
                      transformOrigin: 'left center',
                    }}
                  >
                    <div className="flex items-center" style={{ gap: px(30), height: '100%' }}>
                      <Pill href={QUOTE_HREF}>Get a Quote</Pill>
                      <a className="label link-quiet" href={SITE.tel} style={{ fontSize: px(12) }}>
                        Call {SITE.phone}
                      </a>
                    </div>
                  </div>

                  <div style={box(HERO.facts)}>
                    <div className="flex h-full">
                      {FACTS.map((f, i) => (
                        <div
                          key={f.big}
                          style={{
                            flex: 1,
                            paddingLeft: i ? px(26) : 0,
                            borderLeft: i ? '1px solid rgba(247,242,255,0.18)' : undefined,
                            opacity: tFacts,
                            transform: `translateY(${(1 - tFacts) * 14}px)`,
                          }}
                        >
                          <div className="display" style={{ fontSize: px(28), letterSpacing: '-0.015em', whiteSpace: 'nowrap' }}>
                            {f.big}
                          </div>
                          <div className="label" style={{ marginTop: px(10), color: ASH, whiteSpace: 'nowrap' }}>
                            {f.small}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---- services ---- */}
                <div inert={tCards < 0.5}>
                  <Mask t={tSec} style={box(SEC.label)}>
                    <div className="label" style={{ color: FLARE, fontSize: px(12) }}>
                      What we do
                    </div>
                  </Mask>
                  <Mask t={tSec} style={box(SEC.head)}>
                    <h2 className="display" style={{ margin: 0, fontSize: px(SEC.headSize) }}>
                      Every detail
                      <Dot c="," />
                      <br />
                      handled
                    </h2>
                  </Mask>
                  <div style={{ ...box(SEC.more), opacity: tSec, display: 'flex', justifyContent: 'flex-end' }}>
                    <TextLink href="/services/">All services</TextLink>
                  </div>

                  {/*
                    Laid out absolutely because a flex row cannot express the
                    per-card rotation origin. The pivot sits well above each
                    card (50% -30%), which is what makes them swing in rather
                    than slide.
                  */}
                  <ul style={{ ...box(SEC.block), margin: 0, padding: 0, listStyle: 'none' }}>
                    {SERVICES.map((c, i) => {
                      const t = span(p, [P.cards[0] + i * 0.03, P.cards[1]])
                      const { left, top, tilt } = placeCard(i)
                      const move = reduce ? 0 : 1
                      return (
                        <li
                          key={c.i}
                          style={{
                            position: 'absolute',
                            left: px(left),
                            top: px(top),
                            width: px(CARD.w),
                            height: px(CARD.h),
                            opacity: t,
                            transform: `translateY(${(1 - t) * 96 * move}px) rotate(${tilt * t * move}deg)`,
                            transformOrigin: '50% -30%',
                          }}
                        >
                          <WideCard c={c} />
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* scroll cue, out of the way once you have started */}
                <div
                  aria-hidden
                  style={{ ...box(HERO.cue), opacity: Math.max(0, 1 - p * 14) * tFacts, textAlign: 'center' }}
                >
                  <div className="label" style={{ color: ASH, fontSize: px(10) }}>
                    Scroll
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {tall && <ServicesTall />}

        {/* ---- about, in brief ---- */}
        <section className="section home-about" aria-labelledby="about-title">
          <Reveal className="home-about-head">
            <SectionHead label={`Since ${SITE.founded}`} id="about-title">
              One call<Dot c="," />
              <br />
              every role
            </SectionHead>
          </Reveal>
          <Reveal className="home-about-body" delay={0.1}>
            <p className="support lead">
              We&rsquo;re a one-stop events management and staffing company, founded in Cape Town in {SITE.founded}. From
              a single bartender to a full crew with a coordinator, we supply the people who make an event run, across
              the Western Cape and Gauteng.
            </p>
            <ul className="role-chips" aria-label="Staff we supply">
              {ROLES.map((r) => (
                <li key={r.name} className="role-chip">
                  {r.name}
                </li>
              ))}
            </ul>
            <div className="row-actions">
              <TextLink href="/about/">About us</TextLink>
              <TextLink href="/services/">How we work</TextLink>
            </div>
          </Reveal>
        </section>

        {/* ---- gallery, in brief ---- */}
        <section className="section gallery" aria-labelledby="gallery-title">
          <Reveal className="gallery-head">
            <SectionHead label="Gallery" id="gallery-title">
              Moments we&rsquo;ve
              <br />
              served
              <Dot />
            </SectionHead>
            <TextLink href="/gallery/">See all photos</TextLink>
          </Reveal>
          <Gallery limit={6} />
        </section>
      </main>
      <Footer />
    </>
  )
}

function WideCard({ c }: { c: (typeof SERVICES)[number] }) {
  const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s })
  return (
    <a
      className="card-link"
      href={`/services/#${c.slug}`}
      aria-label={`${c.title.replace('\n', ' ')}: ${c.desc} Read more`}
      style={abs({ inset: 0, borderRadius: px(CARD.radius) })}
    >
      <div className="card" style={abs({ inset: 0, borderRadius: px(CARD.radius) })} />
      <img
        className="card-art"
        src={`/assets/${c.art}.webp`}
        alt=""
        width={CARD.art}
        height={CARD.art}
        loading="lazy"
        style={abs({
          top: px(CARD.artTop),
          right: px(CARD.artRight),
          width: px(CARD.art),
          height: px(CARD.art),
          borderRadius: px(16),
          objectFit: 'cover',
        })}
      />
      <span className="label" style={abs({ left: px(CARD.pad), top: px(CARD.pad), color: FLARE })}>
        {c.i}
      </span>
      <div
        className="display"
        style={abs({
          left: px(CARD.pad),
          top: px(CARD.titleTop),
          fontSize: px(CARD.titleSize),
          lineHeight: px(CARD.titleSize + 2),
          whiteSpace: 'pre-line',
        })}
      >
        {c.title}
      </div>
      <div
        className="card-desc"
        style={abs({
          left: px(CARD.pad),
          right: px(CARD.descRight),
          top: px(CARD.descTop),
          fontSize: px(CARD.descSize),
          lineHeight: px(CARD.descLh),
        })}
      >
        {c.desc}
      </div>
      <span
        className="card-chip"
        style={abs({
          right: px(CARD.chipInset),
          bottom: px(CARD.chipInset),
          width: px(CARD.chip),
          height: px(CARD.chip),
        })}
      >
        <Arrow size={16} stroke={2.6} />
      </span>
    </a>
  )
}

/** Phones and portrait tablets: the same hero, reflowed and anchored to the bottom. */
function TallHero({
  t,
  cue,
}: {
  t: { tLabel: number; tLine1: number; tLine2: number; tSupport: number; tFacts: number }
  cue: number
}) {
  return (
    <div className="tall-hero">
      <Mask t={t.tLabel}>
        <div className="label" style={{ color: FLARE, lineHeight: 1.5 }}>
          Events &amp; Staffing · {SITE.areas}
        </div>
      </Mask>
      <h1 className="tall-h1">
        <Mask t={t.tLine1}>
          <span className="display" style={{ display: 'block' }}>
            Look no
          </span>
        </Mask>
        <Mask t={t.tLine2}>
          <span className="display" style={{ display: 'block' }}>
            further
            <Dot />
          </span>
        </Mask>
      </h1>
      <Mask t={t.tSupport}>
        <p className="support tall-support">{SUPPORT}</p>
      </Mask>
      <div
        className="tall-cta"
        style={{ opacity: t.tSupport, transform: `scale(${0.94 + t.tSupport * 0.06})`, transformOrigin: 'left center' }}
      >
        <Pill href={QUOTE_HREF} h={60} text={16}>
          Get a Quote
        </Pill>
        <a className="label link-quiet" href={SITE.tel}>
          Call us
        </a>
      </div>
      <div className="tall-facts">
        {FACTS.map((f) => (
          <div key={f.big} style={{ opacity: t.tFacts, transform: `translateY(${(1 - t.tFacts) * 12}px)` }}>
            <div className="display tall-fact">{f.big}</div>
            <div className="label" style={{ marginTop: 8, color: ASH, fontSize: 10 }}>
              {f.small}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden className="label tall-cue" style={{ opacity: cue }}>
        Scroll
      </div>
    </div>
  )
}
