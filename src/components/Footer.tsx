import { NAV, QUOTE_HREF, SITE, u } from '../site'
import { Dot, Pill } from '../ui'

/*
  The same close on every page: one last call to action, then the details.
  The contact page already IS the call to action, so it drops the band.
*/
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden />
      {cta && (
        <div className="footer-cta">
          <div>
            <div className="label" style={{ color: 'var(--color-flare)' }}>
              Free, no-obligation quotes
            </div>
            <h2 className="display section-title">
              Let&rsquo;s staff
              <br />
              your event
              <Dot />
            </h2>
          </div>
          <div className="footer-cta-actions">
            <p className="support">
              Tell us the date, the venue and roughly how many guests, and we&rsquo;ll come back to you with a quote.
            </p>
            <div className="row-actions">
              <Pill href={QUOTE_HREF} h={64} text={16}>
                Get a Quote
              </Pill>
              <a className="label link-quiet" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="footer-grid">
        <div className="footer-brand">
          <img
            src={u('assets/logo-full.png')}
            alt={`${SITE.name}. ${SITE.tagline}`}
            width={770}
            height={359}
            loading="lazy"
            className="footer-logo"
          />
          <p className="support" style={{ fontSize: 15, maxWidth: 320 }}>
            Your one-stop events management and staffing company, since {SITE.founded}.
          </p>
        </div>

        <div>
          <h3 className="label footer-h">Pages</h3>
          <ul className="footer-list">
            <li>
              <a href={u('')}>Home</a>
            </li>
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label footer-h">Contact</h3>
          <ul className="footer-list">
            <li>
              <a href={SITE.tel}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="footer-muted">{SITE.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="label footer-h">Office</h3>
          <address className="footer-list footer-address">
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer">
              {SITE.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </a>
            <span className="footer-muted">Serving the {SITE.areas}</span>
          </address>
        </div>
      </div>

      <div className="footer-base">
        <p className="label">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <ul className="footer-social">
          <li>
            <a className="label" href={SITE.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a className="label" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a className="label" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
