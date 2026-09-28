import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { span } from '../scroll'
import { Mask, useIntro } from '../ui'

/*
  The opening of every inner page, in the home scene's language: one photo
  pushed right and feathered into the ground, the plum grade and low glow,
  display type on the clean left plate. The copy rises in on load; as you
  scroll away the photo drifts and the copy fades, so leaving the hero feels
  like the same scene continuing.
*/
export default function PageHero({
  label,
  title,
  intro,
  photo,
  children,
  short = false,
}: {
  label: string
  title: ReactNode
  intro: ReactNode
  photo: string
  children?: ReactNode
  short?: boolean
}) {
  const t = useIntro()
  const reduce = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 180])
  const fade = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.15])

  return (
    <section className={`page-hero${short ? ' page-hero-short' : ''}`}>
      <div className="ground" />
      <div className="page-hero-photo" aria-hidden>
        <motion.img src={photo} alt="" fetchPriority="high" style={{ y, scale: 1.08 }} />
      </div>
      <div className="tint" />
      <div className="glow" />
      <div className="page-hero-shade" />

      <motion.div className="page-hero-copy" style={{ opacity: fade }}>
        <Mask t={span(t, [0, 0.45])}>
          <div className="label" style={{ color: 'var(--color-flare)' }}>
            {label}
          </div>
        </Mask>
        <h1 className="display page-hero-title">
          <Mask t={span(t, [0.08, 0.6])}>
            <span style={{ display: 'block' }}>{title}</span>
          </Mask>
        </h1>
        <Mask t={span(t, [0.3, 0.8])}>
          <p className="support page-hero-intro">{intro}</p>
        </Mask>
        {children && (
          <div
            className="page-hero-actions"
            style={{ opacity: span(t, [0.45, 1]), transform: `translateY(${(1 - span(t, [0.45, 1])) * 12}px)` }}
          >
            {children}
          </div>
        )}
      </motion.div>
    </section>
  )
}
