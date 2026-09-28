/*
  Everything a visitor reads that is not layout lives here, so changing a
  phone number, a service line or a photo caption never means touching a page.

  Sources: the business's Facebook page (contact details, areas), LinkedIn
  (founded 2014, head office, "one stop events management and staffing
  company"), and its PartiesAndCelebrations listing (staff roles, free quotes,
  2024 awards).
*/

/* The site can live at a domain root or under a sub-path (GitHub Pages serves
   it at /<repo>/). Every internal link and asset goes through u() so it picks
   up that prefix; Vite sets BASE_URL from `base` in vite.config.ts. */
const BASE = import.meta.env.BASE_URL
export const u = (path: string) => BASE + path.replace(/^\//, '')

const WA = '27848934550'
export const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export const SITE = {
  name: 'Nephrite Events & Staffing',
  tagline: 'Look no further!!',
  phone: '084 893 4550',
  tel: 'tel:+27848934550',
  whatsapp: waLink("Hi Nephrite, I'd like a quote for an event."),
  email: 'Nephritestaffing@icloud.com',
  facebook: 'https://www.facebook.com/nephritestaffing/',
  instagram: 'https://www.instagram.com/nephriteevents/',
  linkedin: 'https://www.linkedin.com/company/nephrite-events-staff/',
  areas: 'Western Cape & Johannesburg',
  hours: 'Open 7 days',
  founded: 2014,
  address: ['618 Nedbank Building', '85 St George’s Mall', 'Cape Town, 8001'],
  maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("85 St George's Mall, Cape Town 8001"),
}

export type PageId = 'home' | 'services' | 'about' | 'gallery' | 'contact'

export const NAV: { id: Exclude<PageId, 'home'>; label: string; href: string }[] = [
  { id: 'services', label: 'Services', href: u('services/') },
  { id: 'about', label: 'About', href: u('about/') },
  { id: 'gallery', label: 'Gallery', href: u('gallery/') },
  { id: 'contact', label: 'Contact', href: u('contact/') },
]

export const QUOTE_HREF = u('contact/#quote')

/* the row under the home headline */
export const FACTS = [
  { big: String(SITE.founded), small: 'Founded' },
  { big: 'Cape Town', small: 'Western Cape' },
  { big: 'Joburg', small: 'Gauteng' },
]

/* The four cards in the home scene. Each links to its full entry on /services/. */
export const SERVICES = [
  { i: '01', slug: 'staffing', art: 'art-staff', title: 'Event\nStaffing', desc: 'Waiters, hosts and runners, uniformed and briefed.' },
  { i: '02', slug: 'bar', art: 'art-bar', title: 'Bar\nService', desc: 'Bartenders who keep glasses full and queues short.' },
  { i: '03', slug: 'catering', art: 'art-catering', title: 'Food &\nCatering', desc: 'Chefs, buffets, platters and desserts.' },
  { i: '04', slug: 'setup', art: 'art-setup', title: 'Setup &\nStyling', desc: 'Tables, linen and décor, ready before guests arrive.' },
]

/* The full list on /services/. `photo` is a gallery number. */
export const SERVICE_DETAIL = [
  {
    slug: 'staffing',
    title: 'Event Staffing',
    photo: '19',
    alt: 'Nephrite waiters setting round tables in a ballroom',
    body:
      'Professional front-of-house staff who arrive uniformed, on time and briefed on your event. We match the team to the size and style of the day, from an intimate lunch to a full banquet.',
    roles: ['Waiters', 'Runners', 'Food service assistants', 'Cashiers'],
  },
  {
    slug: 'bar',
    title: 'Bar Service',
    photo: '06',
    alt: 'A Nephrite bartender behind a wine and glassware station',
    body:
      'Bartenders who keep the bar moving: pouring, clearing and restocking so your guests never wait long for a drink. We can run a full bar, a wine station or welcome drinks at the door.',
    roles: ['Bartenders', 'Runners'],
  },
  {
    slug: 'catering',
    title: 'Food & Catering',
    photo: '13',
    alt: 'Trays of plated desserts and iced biscuits',
    body:
      'Chefs and kitchen support for corporate catering and private functions: buffets, platters, plated service and dessert tables, served with care and cleared without fuss.',
    roles: ['Chefs', 'Food service assistants'],
  },
  {
    slug: 'setup',
    title: 'Setup & Styling',
    photo: '09',
    alt: 'Long tables and chairs laid out under a stretch tent',
    body:
      'Set-up crews who lay out tables, chairs, linen and décor before your guests arrive, and pack everything away when the night is over, so you only have to show up.',
    roles: ['Set-up crews'],
  },
  {
    slug: 'coordination',
    title: 'Event Coordination',
    photo: '12',
    alt: 'A Nephrite manager with two chefs in a kitchen',
    body:
      'An on-site coordinator to run the team, keep to your timeline and be the single person you talk to on the day. One call covers the people, the setup and the service.',
    roles: ['Event coordinators'],
  },
  {
    slug: 'security',
    title: 'Security & Promotions',
    photo: '04',
    alt: 'The Nephrite team of waiters and chefs lined up on a lawn',
    body:
      'Car guards and parking attendants to keep arrivals smooth and safe, and promotions staff to represent your brand at launches, expos and activations.',
    roles: ['Car guards', 'Parking attendants', 'Promotions staff'],
  },
]

/* Straight from the business's own list of staff categories. */
export const ROLES = [
  { name: 'Waiters', note: 'Table and tray service' },
  { name: 'Bartenders', note: 'Full bars and drinks stations' },
  { name: 'Set-up crews', note: 'Layout, décor and pack-down' },
  { name: 'Runners', note: 'Keeping the floor supplied' },
  { name: 'FSAs', note: 'Food service assistants' },
  { name: 'Chefs', note: 'Kitchen and buffet' },
  { name: 'Event security', note: 'Car guards and parking attendants' },
  { name: 'Cashiers', note: 'Ticketing and pay points' },
  { name: 'Promotions staff', note: 'Brand activations and expos' },
  { name: 'Event coordinators', note: 'Your single point of contact' },
]

export const STEPS = [
  { n: '01', title: 'Tell us about it', body: 'The date, the venue, roughly how many guests and what you need. A message or a call is enough.' },
  { n: '02', title: 'Get a free quote', body: 'We come back with a clear, no-obligation quotation built around your event.' },
  { n: '03', title: 'We handle the rest', body: 'Your team arrives uniformed and briefed. You host, and we take care of the service.' },
]

export const VALUES = [
  { title: 'Reliable', body: 'We show up on time with the team we promised, every time.' },
  { title: 'Professional', body: 'Uniformed, trained staff who know how to work an event.' },
  { title: 'One call', body: 'Staff, setup, coordination and security from one supplier.' },
  { title: 'Free quotes', body: 'Every quotation is free and comes with no obligation.' },
]

export const AWARDS = {
  year: 2024,
  source: 'PartiesAndCelebrations.co.za',
  items: [
    { rank: '#20', where: 'Cape Town Central' },
    { rank: '#21', where: 'City Bowl, Cape Town' },
  ],
}

export const EVENT_TYPES = ['Corporate function', 'Wedding', 'Private party', 'Conference or launch', 'Promotion or activation', 'Other']

export type Tag = 'team' | 'food' | 'bar' | 'setup'
export const TAGS: { id: Tag | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'team', label: 'Our team' },
  { id: 'food', label: 'Food' },
  { id: 'bar', label: 'Bar' },
  { id: 'setup', label: 'Setup' },
]

/* Thumbnails are 640 wide; w/h are the thumbnail's, so the grid reserves the
   right space before each image loads. Order is curated, strongest first. */
export const GALLERY: { n: string; w: number; h: number; alt: string; tag: Tag }[] = [
  { n: '19', w: 640, h: 349, tag: 'team', alt: 'Waiters setting round tables in a chandelier-lit ballroom' },
  { n: '09', w: 640, h: 360, tag: 'setup', alt: 'Long tables laid under a stretch tent on a lawn' },
  { n: '04', w: 640, h: 800, tag: 'team', alt: 'The Nephrite team of waiters and chefs lined up on a lawn' },
  { n: '02', w: 640, h: 381, tag: 'setup', alt: 'A formal place setting with a folded napkin, glassware and orange roses' },
  { n: '08', w: 640, h: 360, tag: 'food', alt: 'A rustic bread and pastry spread with preserves' },
  { n: '11', w: 640, h: 360, tag: 'setup', alt: 'Tables with clear chairs set under a stretch tent' },
  { n: '14', w: 640, h: 360, tag: 'bar', alt: 'Staff in branded aprons behind a wooden bar' },
  { n: '13', w: 640, h: 1138, tag: 'food', alt: 'Trays of plated desserts and iced biscuits' },
  { n: '06', w: 640, h: 853, tag: 'bar', alt: 'A bartender behind a wine and glassware station' },
  { n: '10', w: 640, h: 360, tag: 'team', alt: 'Four waitresses in branded aprons beside a buffet' },
  { n: '18', w: 640, h: 853, tag: 'food', alt: 'A long pastry buffet at an indoor event' },
  { n: '05', w: 640, h: 853, tag: 'food', alt: 'Two staff members serving from a chafing dish under an umbrella' },
  { n: '07', w: 640, h: 853, tag: 'setup', alt: 'Outdoor wooden tables set with colourful napkins' },
  { n: '12', w: 640, h: 360, tag: 'team', alt: 'A manager and two chefs in a kitchen with plated desserts' },
  { n: '15', w: 640, h: 853, tag: 'food', alt: 'A long outdoor buffet table with glassware and food' },
  { n: '16', w: 640, h: 360, tag: 'bar', alt: 'Bar staff preparing drinks at a wooden bar' },
  { n: '03', w: 640, h: 288, tag: 'setup', alt: 'Guests gathering in a shaded garden venue' },
  { n: '01', w: 640, h: 853, tag: 'team', alt: 'Two Nephrite waiters in black aprons unloading supplies from a van' },
  { n: '17', w: 640, h: 480, tag: 'team', alt: 'Two Nephrite vans ready to leave for an event' },
]

/** Responsive source set for a gallery photo: the 640 thumb and the 1600 original. */
export const photoSet = (n: string) => ({
  src: u(`assets/gallery/${n}-sm.webp`),
  srcSet: `${u(`assets/gallery/${n}-sm.webp`)} 640w, ${u(`assets/gallery/${n}.webp`)} 1600w`,
})
