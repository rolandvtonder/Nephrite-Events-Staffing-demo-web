import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { GALLERY, TAGS, photoSet, type Tag } from '../site'
import { Arrow, EASE } from '../ui'

/*
  A masonry of photos, each one a button that opens a native <dialog> viewer —
  which brings focus trapping, Escape to close and focus return for free.
  `filters` adds the category chips (gallery page); `limit` trims it to a
  preview (home page). The viewer steps through whatever is currently shown.
*/
export default function Gallery({ filters = false, limit }: { filters?: boolean; limit?: number }) {
  const [tag, setTag] = useState<Tag | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)
  const dlg = useRef<HTMLDialogElement>(null)

  const items = useMemo(() => {
    const list = tag === 'all' ? GALLERY : GALLERY.filter((g) => g.tag === tag)
    return limit ? list.slice(0, limit) : list
  }, [tag, limit])
  const count = items.length

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)), [count])

  const g = open === null ? null : items[open]

  return (
    <>
      {filters && (
        <div className="chips" role="group" aria-label="Filter photos">
          {TAGS.map((t) => (
            <button
              key={t.id}
              type="button"
              className="label chip"
              aria-pressed={tag === t.id}
              onClick={() => setTag(t.id)}
            >
              {t.label}
              <span className="chip-n">
                {t.id === 'all' ? GALLERY.length : GALLERY.filter((x) => x.tag === t.id).length}
              </span>
            </button>
          ))}
        </div>
      )}
      {filters && (
        <p className="sr-only" role="status">
          Showing {count} photos
        </p>
      )}

      {/* keyed by filter, so a new selection re-deals the grid with its entrance */}
      <ul className="masonry" key={tag}>
          {items.map((item, i) => {
            const set = photoSet(item.n)
            return (
              <motion.li
                key={item.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.05, ease: EASE }}
              >
                <button type="button" className="tile" onClick={() => setOpen(i)}>
                  <img
                    src={set.src}
                    srcSet={set.srcSet}
                    sizes="(max-width: 719px) 50vw, 33vw"
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </motion.li>
            )
          })}
      </ul>

      <dialog
        ref={dlg}
        className="lightbox"
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {g && (
          <figure className="lightbox-figure">
            <img src={`/assets/gallery/${g.n}.webp`} alt={g.alt} />
            <figcaption>
              <span>{g.alt}</span>
              <span className="label" style={{ color: 'var(--color-ash)' }}>
                {open! + 1} / {count}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" aria-label="Close photo viewer" onClick={() => setOpen(null)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
        {count > 1 && (
          <>
            <button type="button" className="lb-btn lb-prev" aria-label="Previous photo" onClick={() => step(-1)}>
              <span style={{ transform: 'rotate(-135deg)', display: 'grid' }}>
                <Arrow size={18} />
              </span>
            </button>
            <button type="button" className="lb-btn lb-next" aria-label="Next photo" onClick={() => step(1)}>
              <span style={{ transform: 'rotate(45deg)', display: 'grid' }}>
                <Arrow size={18} />
              </span>
            </button>
          </>
        )}
      </dialog>
    </>
  )
}
