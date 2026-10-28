# Noire Cafe

A modern, premium, luxury one-page website for **Noire Café**, built with React and 3D graphics.

## Features

- 3D hero scene: a rotating coffee cup with steam, floating coffee beans and gold dust
- Smooth scroll animations and 3D tilt effect on cards
- Sections: Hero, About, Menu (with filters), Experience, Reservation form, Footer
- Fully responsive (desktop, tablet and mobile)
- Dark and gold luxury theme

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Drei](https://github.com/pmndrs/drei) for 3D
- [Framer Motion](https://www.framer.com/motion/) for animations
- Plain CSS (no UI framework)

## Requirements

- [Node.js](https://nodejs.org/) version 18 or newer

## Getting Started

Open a terminal inside the project folder and run:

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

> If `npm install` fails or packages are missing, delete the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.

## Build for Production

```bash
npm run build
```

The finished website is created in the `dist` folder. To test it locally:

```bash
npm run preview
```

## Project Structure

```
noire-cafe/
├── index.html              Page shell, title and fonts
├── public/assets/          Images and logo
├── src/
│   ├── main.jsx            App entry point
│   ├── App.jsx             All page sections (Nav, Hero, About, Menu...)
│   ├── data.js             Cafe info, menu items and prices
│   ├── styles.css          All styling and colors
│   └── components/
│       ├── Scene3D.jsx     The 3D hero scene (cup, beans, steam)
│       └── Tilt.jsx        3D tilt effect for cards
└── package.json
```

## How to Edit

### Change contact details, hours and prices

Open `src/data.js`:

- `CAFE` — address, phone, email, opening hours, Instagram link
- `MENU` — dish names, descriptions, prices and images

### Add or replace images

1. Put the image in `public/assets/`
2. Use it in `src/data.js` like this: `img: '/assets/your-image.png'`

### Change colors

Open `src/styles.css` and edit the variables at the top (`:root`):

```css
--gold: #d4af69;   /* main accent color */
--bg: #0a0706;     /* page background */
--cream: #f3e9dc;  /* text color */
```

### Change the 3D scene

Open `src/components/Scene3D.jsx`:

- Cup size and position: the `scale` and `position` values in the `Rig` component
- Number of floating beans: the `length: 26` value in `BeanCloud`
- Lighting: the lights and `Lightformer` items in the `Scene3D` component

## Notes

- The **reservation form** currently only shows a thank-you message. It does not send or save any data. To make it work, connect it to email, WhatsApp or a backend service.
- Contact details, hours and prices are **placeholders**. Replace them with the real ones in `src/data.js`.
- The 3D scene needs a browser with WebGL (all modern browsers support it).