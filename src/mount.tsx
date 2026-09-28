import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'

/* Every page is its own HTML entry (real URLs, no router, works on any static
   host). Each entry calls this with its page component. */
export function mount(Page: ComponentType) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <Page />
      </MotionConfig>
    </StrictMode>,
  )
}
