import { useEffect, useRef, useState } from 'react'
import { NAV, QUOTE_HREF, SITE, type PageId, u } from '../site'

/*
  Pinned at the viewport edge on every page, full and steady from the first
  frame. It sits outside any scaled artboard so it stays readable at any
  width. Four words in the middle, the action on the right — the reference's
  arrangement. Under 720px the four words fold into a Menu button that opens a
  full-screen native <dialog> (focus trap, Escape, focus return built in).
*/
export default function Nav({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false)
  const dlg = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <header className="nav">
      <a href={u('')} className="nav-logo" aria-label={`${SITE.name}, home`}>
        <img src={u('assets/logo-nav.png')} alt="" width={438} height={160} />
      </a>

      <nav className="nav-links" aria-label="Main">
        {NAV.map((l) => (
          <a key={l.id} href={l.href} className="label nav-link" aria-current={page === l.id ? 'page' : undefined}>
            {l.label}
          </a>
        ))}
      </nav>

      <a className="label nav-cta" href={QUOTE_HREF}>
        Get a Quote
      </a>

      <button
        type="button"
        className="label nav-menu-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Menu
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <dialog ref={dlg} className="menu" aria-label="Menu" onClose={() => setOpen(false)}>
        <div className="menu-top">
          <a href={u('')} className="nav-logo" aria-label={`${SITE.name}, home`}>
            <img src={u('assets/logo-nav.png')} alt="" width={438} height={160} />
          </a>
          <button type="button" className="label nav-menu-btn menu-close" onClick={() => setOpen(false)}>
            Close
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="menu-list">
            <li>
              <a href={u('')} className="display" aria-current={page === 'home' ? 'page' : undefined}>
                Home
              </a>
            </li>
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="display" aria-current={page === l.id ? 'page' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot">
          <a className="pill menu-pill" href={QUOTE_HREF} onClick={() => setOpen(false)}>
            <span>Get a Quote</span>
          </a>
          <a className="label link-quiet" href={SITE.tel}>
            Call {SITE.phone}
          </a>
        </div>
      </dialog>
    </header>
  )
}
