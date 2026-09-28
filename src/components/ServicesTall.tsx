import { motion } from 'motion/react'
import { SERVICES } from '../site'
import { Arrow, Dot, EASE, TextLink } from '../ui'

/*
  Phones and portrait tablets: the service cards as their own section, two
  across. They keep the wide scene's signature — each swings in from a pivot
  well above the card (50% -30%) and comes to rest on a slight tilt — but the
  trigger is the card entering view rather than scroll progress.
*/
export default function ServicesTall() {
  return (
    <section className="services" aria-labelledby="services-title">
      <div className="label" style={{ color: 'var(--color-flare)' }}>
        What we do
      </div>
      <h2 id="services-title" className="display section-title">
        Every detail
        <Dot c="," />
        <br />
        handled
      </h2>
      <ul className="services-grid">
        {SERVICES.map((c, i) => (
          <motion.li
            key={c.i}
            initial={{ opacity: 0, y: 72, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? -1 : 1) * 2 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease: EASE }}
            style={{ transformOrigin: '50% -30%' }}
          >
            <a
              className="card-link tall-card"
              href={`/services/#${c.slug}`}
              aria-label={`${c.title.replace('\n', ' ')}: ${c.desc} Read more`}
            >
              <span className="card" aria-hidden />
              <img className="card-art" src={`/assets/${c.art}.webp`} alt="" width={76} height={76} loading="lazy" />
              <span className="label tall-card-i">{c.i}</span>
              <span className="display tall-card-title">{c.title}</span>
              <span className="card-desc tall-card-desc">{c.desc}</span>
              <span className="card-chip tall-card-chip">
                <Arrow size={14} stroke={2.6} />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
      <div style={{ marginTop: 44 }}>
        <TextLink href="/services/">All services</TextLink>
      </div>
    </section>
  )
}
