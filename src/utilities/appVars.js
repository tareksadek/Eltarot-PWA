export const navLinks = [
  { linkfor: 'cardsList', path: '/cards' },
  { linkfor: 'readsList', path: '/reads' },
  { linkfor: 'customRead', path: '/customRead' },
]
export const footerLinks = [
  { linkfor: 'philosophy', path: '/philosophy' },
  { linkfor: 'history', path: '/history' },
  { linkfor: 'learn', path: '/learn' },
  { linkfor: 'terms', path: '/terms' },
  { linkfor: 'contact', path: '/contact' },
]
export const userMenu = [
  { linkfor: 'myReads', path: '/myReads' },
  { linkfor: 'logout', path: '/logout' },
  { linkfor: 'users', path: '/users' },
]
export const AUTH_PAGE = '/auth'
export const LOGIN_REDIRECT = '/cards'
export const CONTACT_EMAIL = 'info@eltarot.app'
export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'tarot-331d9.firebaseapp.com',
  databaseURL: 'https://tarot-331d9.firebaseio.com',
  projectId: 'tarot-331d9',
  storageBucket: 'tarot-331d9.appspot.com',
}
export const CARDS_IMAGES_DIRECTORY = '/assets/images/cards'
export const MAX_SAVED_READS = 3
export const STRIPE_PIBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISH_KEY
export const STRIPE_SECRET_KEY = process.env.REACT_APP_STRIPE_SECRET_KEY
export const SUITS = [
  { name: 'major' },
  { name: 'cups' },
  { name: 'pentacles' },
  { name: 'wands' },
  { name: 'swords' },
]
