import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Box } from './layout'
import { INTRO_MS } from './scroll'

export const px = (n: number) => `${n}px`

export const box = ([x, y, w, h]: Box): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  width: px(w),
  height: px(h),
})

export const EASE = [0.22, 1, 0.36, 1] as const

/** Rises behind a clip mask as `t` goes 0 to 1. Works absolutely placed or in flow. */
export function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <div style={{ height: '100%', transform: `translateY(${(1 - t) * 125}%)`, willChange: 'transform' }}>{children}</div>
    </div>
  )
}

/** 0 → 1 over INTRO_MS after mount; the one timed motion, used for first-screen copy. */
export function useIntro() {
  const reduce = useReducedMotion() ?? false
  const [v, setV] = useState(reduce ? 1 : 0)
  useEffect(() => {
    if (reduce) {
      setV(1)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const x = Math.min((now - t0) / INTRO_MS, 1)
      setV(x)
      if (x < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])
  return v
}

/** Fades and rises into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'li' | 'section'
}) {
  const M = as === 'li' ? motion.li : as === 'section' ? motion.section : motion.div
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

export function Arrow({ size = 20, stroke = 2.4 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19L19 5M19 5H8M19 5v11"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)
const extProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

/** The fat bone pill with the accent chip — the one primary action per screen. */
export function Pill({ href, children, h = 72, text = 17 }: { href: string; children: ReactNode; h?: number; text?: number }) {
  const chip = h - 14
  return (
    <a
      className="pill"
      href={href}
      {...(isExternal(href) ? extProps(href) : {})}
      style={{ height: px(h), paddingLeft: px(Math.round(h * 0.45)), paddingRight: px(7), gap: px(Math.round(h * 0.3)) }}
    >
      <span style={{ fontSize: px(text), fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>
      <span className="pill-chip" style={{ width: px(chip), height: px(chip) }}>
        <Arrow size={Math.round(chip / 3)} />
      </span>
    </a>
  )
}

/** Quiet tracked-out text link with a small arrow — the secondary action. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="label text-link" href={href} {...extProps(href)}>
      {children}
      <Arrow size={13} stroke={2.6} />
    </a>
  )
}

/** Label + display heading, the opening of every section. */
export function SectionHead({
  label,
  children,
  id,
  className,
}: {
  label: string
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={className}>
      <div className="label" style={{ color: 'var(--color-flare)' }}>
        {label}
      </div>
      <h2 id={id} className="display section-title">
        {children}
      </h2>
    </div>
  )
}

/** The accent full stop / comma that ends every display heading. */
export const Dot = ({ c = '.' }: { c?: string }) => <span style={{ color: 'var(--color-flare)' }}>{c}</span>
