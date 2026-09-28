import { SITE } from '../site'
import { Dot, Mask, TextLink, useIntro } from '../ui'
import { span } from '../scroll'
import Nav from '../components/Nav'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

/* The photos are the hero here, so the page opens on type alone and gets to
   the grid fast. */
export default function GalleryPage() {
  const t = useIntro()
  return (
    <>
      <Nav page="gallery" />
      <main id="main" className="section gallery gallery-page">
        <div className="gallery-head">
          <div>
            <Mask t={span(t, [0, 0.45])}>
              <div className="label" style={{ color: 'var(--color-flare)' }}>
                Gallery
              </div>
            </Mask>
            <h1 className="display page-title">
              <Mask t={span(t, [0.08, 0.6])}>
                <span style={{ display: 'block' }}>
                  Moments we&rsquo;ve
                  <br />
                  served
                  <Dot />
                </span>
              </Mask>
            </h1>
          </div>
          <div style={{ opacity: span(t, [0.3, 0.9]) }}>
            <p className="support gallery-intro">
              Tables set, bars run and the teams behind them, at events across the {SITE.areas}.
            </p>
            <div style={{ marginTop: 16 }}>
              <TextLink href={SITE.instagram}>More on Instagram</TextLink>
            </div>
          </div>
        </div>
        <Gallery filters />
      </main>
      <Footer />
    </>
  )
}
