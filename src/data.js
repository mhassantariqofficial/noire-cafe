// ─────────────────────────────────────────────────────────────
//  Edit your cafe details here — prices, contact info, hours.
// ─────────────────────────────────────────────────────────────

export const CAFE = {
  name: 'Noire Café',
  tagline: 'Coffee, crafted in the dark.',
  address: 'Islamabd, Pakistan', 
  phone: '+92 300 0000000', 
  email: 'hello@noirecafe.com',
  hours: [
    ['Monday – Thursday', '10:00 AM – 12:00 AM'],
    ['Friday – Saturday', '10:00 AM – 2:00 AM'],
    ['Sunday', '12:00 PM – 12:00 AM'],
  ], 
  instagram: 'https://instagram.com/',
}

export const MENU_FILTERS = ['All', 'Coffee', 'Savory', 'Dessert']

export const MENU = [
  {
    id: 'latte',
    name: 'Noire Latte',
    category: 'Coffee',
    price: 'Rs. 650',
    img: '/assets/latte.png',
    desc: 'Velvety espresso folded into silky steamed milk, finished with a hand-poured heart.',
    tag: 'Signature',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Coffee',
    price: 'Rs. 600',
    img: '/assets/cappuccino.png',
    desc: 'A bold double shot beneath a cloud of airy microfoam and a delicate rosetta.',
    tag: 'Classic',
  },
  {
    id: 'mocha',
    name: 'Noire Mocha',
    category: 'Coffee',
    price: 'Rs. 750',
    img: '/assets/mocha.png',
    desc: 'Deep dark chocolate meets rich espresso and steamed milk, drizzled by hand.',
    tag: 'Indulgent',
  },
  {
    id: 'sandwich',
    name: 'Crispy Chicken Sandwich',
    category: 'Savory',
    price: 'Rs. 1,150',
    img: '/assets/sandwich.png',
    desc: 'Golden fried chicken, melted cheese, crisp lettuce and tomato on toasted bread, with our signature dip.',
    tag: 'Chef’s pick',
  },
  {
    id: 'fries',
    name: 'Golden Fries',
    category: 'Savory',
    price: 'Rs. 550',
    img: '/assets/fries.png',
    desc: 'Hand-cut, perfectly crisp and lightly salted, served with a creamy house dip.',
    tag: 'Shareable',
  },
  {
    id: 'cake',
    name: 'Chocolate Layer Cake',
    category: 'Dessert',
    price: 'Rs. 850',
    img: '/assets/cake.png',
    desc: 'Three tender layers of chocolate sponge, silky ganache and a crown of chocolate curls.',
    tag: 'Decadent',
  },
]

export const PILLARS = [
  {
    n: '01',
    title: 'Carefully Sourced',
    text: 'Beans chosen for character, roasted for depth — every cup begins with an uncompromising standard.',
  },
  {
    n: '02',
    title: 'Crafted by Hand',
    text: 'From the steam wand to the final drizzle, each drink and plate is made to order, never rushed.',
  },
  {
    n: '03',
    title: 'Made to Linger',
    text: 'Warm light, deep tones and quiet corners — a place designed for slow conversations and long evenings.',
  },
]
