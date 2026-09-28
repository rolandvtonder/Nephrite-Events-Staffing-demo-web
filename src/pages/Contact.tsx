import { useRef, useState, type FormEvent } from 'react'
import { EVENT_TYPES, ROLES, SITE, waLink } from '../site'
import { Arrow, Dot, Reveal, TextLink } from '../ui'
import Nav from '../components/Nav'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

/*
  There is no server behind this site, so the quote form doesn't post
  anywhere. It builds a tidy message from the answers and hands it to the
  visitor's own WhatsApp or email app, with everything filled in — they press
  send. The status line says so plainly, so nobody thinks it has already gone.
*/

type Errors = Partial<Record<'name' | 'phone', string>>

const digits = (s: string) => s.replace(/\D/g, '')

function validate(f: FormData): Errors {
  const e: Errors = {}
  if (!String(f.get('name') ?? '').trim()) e.name = 'Please tell us your name.'
  const phone = digits(String(f.get('phone') ?? ''))
  if (!phone) e.phone = 'Please add a phone number so we can reach you.'
  else if (phone.length < 9) e.phone = 'That number looks too short. Please check it, including the area code.'
  return e
}

function compose(f: FormData) {
  const v = (k: string) => String(f.get(k) ?? '').trim()
  const staff = f.getAll('staff').map(String)
  const opt = (k: string, label: string) => (v(k) ? `${label}: ${v(k)}` : null)
  const lines = [
    "Hi Nephrite, I'd like a quote.",
    '',
    `Name: ${v('name')}`,
    `Phone: ${v('phone')}`,
    opt('email', 'Email'),
    opt('type', 'Event'),
    opt('date', 'Date'),
    opt('venue', 'Venue / area'),
    opt('guests', 'Guests'),
    staff.length ? `Staff needed: ${staff.join(', ')}` : null,
    v('notes') ? `\nNotes: ${v('notes')}` : null,
  ]
  return lines.filter((l) => l !== null).join('\n')
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState('')

  const recheck = () => {
    if (tried && form.current) setErrors(validate(new FormData(form.current)))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTried(true)
    const f = new FormData(e.currentTarget)
    const errs = validate(f)
    setErrors(errs)
    const first = (Object.keys(errs) as (keyof Errors)[])[0]
    if (first) {
      setStatus('')
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const text = compose(f)
    const via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value')
    if (via === 'email') {
      const subject = `Quote request${f.get('type') ? ` – ${f.get('type')}` : ''}${f.get('date') ? `, ${f.get('date')}` : ''}`
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
      setStatus('Your email app should now be open with your request filled in. Press send there to reach us.')
    } else {
      window.open(waLink(text), '_blank', 'noopener')
      setStatus('WhatsApp should now be open with your request filled in. Press send there to reach us.')
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="field-err">
        {errors[k]}
      </p>
    ) : null

  return (
    <>
      <Nav page="contact" />
      <main id="main">
        <PageHero
          short
          label="Contact"
          title={
            <>
              Get a quote
              <Dot />
            </>
          }
          intro="Tell us about your event and we'll come back to you with a free, no-obligation quotation."
          photo="/assets/hero-2.webp"
        />

        <section id="quote" className="section contact-page" aria-label="Quote request and contact details">
          <Reveal className="quote card">
            <h2 className="display quote-title">
              Your event<Dot />
            </h2>
            <p className="support" style={{ fontSize: 15 }}>
              Fields marked <span aria-hidden>*</span>
              <span className="sr-only">with an asterisk</span> are required. Everything else helps us quote accurately.
            </p>

            <form ref={form} noValidate onSubmit={submit} className="quote-form">
              <div className="field">
                <label htmlFor="name">
                  Your name <span aria-hidden>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-err' : undefined}
                  onBlur={recheck}
                />
                {err('name')}
              </div>
              <div className="field">
                <label htmlFor="phone">
                  Phone <span aria-hidden>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-err' : undefined}
                  onBlur={recheck}
                />
                {err('phone')}
              </div>
              <div className="field field-wide">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="type">Type of event</label>
                <select id="type" name="type" defaultValue="">
                  <option value="">Choose one</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" />
              </div>
              <div className="field">
                <label htmlFor="venue">Venue or area</label>
                <input id="venue" name="venue" autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor="guests">Number of guests</label>
                <input id="guests" name="guests" type="number" inputMode="numeric" min={1} />
              </div>

              <fieldset className="field field-wide staff-set">
                <legend>Staff you need</legend>
                <div className="staff-opts">
                  {ROLES.map((r) => (
                    <label key={r.name} className="staff-opt">
                      <input type="checkbox" name="staff" value={r.name} />
                      <span>{r.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field field-wide">
                <label htmlFor="notes">Anything else?</label>
                <textarea id="notes" name="notes" rows={4} />
                <p className="field-help" id="notes-help">
                  Timings, dress code, dietary needs, or questions for us.
                </p>
              </div>

              <div className="field-wide quote-actions">
                <button type="submit" value="whatsapp" className="pill quote-submit">
                  <span>Send on WhatsApp</span>
                  <span className="pill-chip">
                    <Arrow size={16} />
                  </span>
                </button>
                <button type="submit" value="email" className="label link-quiet quote-alt">
                  Send by email instead
                </button>
              </div>
              <p className="field-wide quote-status" role="status">
                {status}
              </p>
            </form>
          </Reveal>

          <Reveal className="contact-side" delay={0.08}>
            <ul className="contact-cards">
              <li>
                <span className="label">Call</span>
                <a className="display contact-big" href={SITE.tel}>
                  {SITE.phone}
                </a>
                <span className="contact-muted">{SITE.hours}</span>
              </li>
              <li>
                <span className="label">WhatsApp</span>
                <TextLink href={SITE.whatsapp}>Message us</TextLink>
              </li>
              <li>
                <span className="label">Email</span>
                <a className="contact-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="label">Head office</span>
                <address className="contact-address">
                  {SITE.address.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <TextLink href={SITE.maps}>Get directions</TextLink>
              </li>
              <li>
                <span className="label">Where we work</span>
                <span className="contact-link">{SITE.areas}</span>
              </li>
              <li>
                <span className="label">Follow</span>
                <span className="contact-social">
                  <TextLink href={SITE.facebook}>Facebook</TextLink>
                  <TextLink href={SITE.instagram}>Instagram</TextLink>
                  <TextLink href={SITE.linkedin}>LinkedIn</TextLink>
                </span>
              </li>
            </ul>
          </Reveal>
        </section>
      </main>
      <Footer cta={false} />
    </>
  )
}
