import { QUOTE_HREF, ROLES, SERVICE_DETAIL, STEPS, SITE, photoSet, waLink } from '../site'
import { Dot, Pill, Reveal, SectionHead, TextLink } from '../ui'
import Nav from '../components/Nav'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <>
      <Nav page="services" />
      <main id="main">
        <PageHero
          label="Services"
          title={
            <>
              Every detail
              <Dot c="," />
              <br />
              handled
            </>
          }
          intro="Reliable, professional event staff, and everything around them. From a single bartender to a full crew with a coordinator, we supply the people who make an event run."
          photo="/assets/hero-1.webp"
        >
          <Pill href={QUOTE_HREF} h={64} text={16}>
            Get a Quote
          </Pill>
          <a className="label link-quiet" href="#roles">
            Staff we supply
          </a>
        </PageHero>

        {/* ---- the six services ---- */}
        <section className="section" aria-label="Our services">
          <ol className="svc-list">
            {SERVICE_DETAIL.map((s, i) => {
              const set = photoSet(s.photo)
              return (
                <li key={s.slug} id={s.slug} className={`svc${i % 2 ? ' svc-flip' : ''}`}>
                  <Reveal className="svc-photo">
                    <img
                      src={set.src}
                      srcSet={set.srcSet}
                      sizes="(max-width: 899px) 100vw, 50vw"
                      alt={s.alt}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </Reveal>
                  <Reveal className="svc-copy" delay={0.08}>
                    <h2 className="display svc-title">
                      {s.title}
                      <Dot />
                    </h2>
                    <p className="support">{s.body}</p>
                    <ul className="role-chips" aria-label={`${s.title} staff`}>
                      {s.roles.map((r) => (
                        <li key={r} className="role-chip">
                          {r}
                        </li>
                      ))}
                    </ul>
                    <TextLink href={waLink(`Hi Nephrite, I'd like a quote for ${s.title.toLowerCase()}.`)}>
                      Ask about {s.title.toLowerCase()}
                    </TextLink>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </section>

        {/* ---- every role ---- */}
        <section id="roles" className="section roles" aria-labelledby="roles-title">
          <Reveal className="split-head">
            <SectionHead label="Staff we supply" id="roles-title">
              Ten roles<Dot c="," />
              <br />
              one supplier
            </SectionHead>
            <p className="support">
              Book one role or the whole team. Every staff member arrives uniformed and briefed on your event.
            </p>
          </Reveal>
          <ul className="role-grid">
            {ROLES.map((r, i) => (
              <Reveal as="li" key={r.name} className="role-card card" delay={(i % 5) * 0.05}>
                <span className="label" style={{ color: 'var(--color-flare)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="display role-name">{r.name}</span>
                <span className="role-note">{r.note}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---- how booking works ---- */}
        <section className="section steps" aria-labelledby="steps-title">
          <Reveal>
            <SectionHead label="How it works" id="steps-title">
              Three steps
              <br />
              to a staffed event
              <Dot />
            </SectionHead>
          </Reveal>
          <ol className="step-list">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} className="step" delay={i * 0.08}>
                <span className="display step-n">{s.n}</span>
                <h3 className="display step-title">{s.title}</h3>
                <p className="support">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="row-actions" style={{ marginTop: 48 }}>
            <Pill href={QUOTE_HREF} h={64} text={16}>
              Start with a quote
            </Pill>
            <a className="label link-quiet" href={SITE.tel}>
              Or call {SITE.phone}
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
