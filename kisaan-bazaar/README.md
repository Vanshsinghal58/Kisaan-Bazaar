# Kisaan Bazaar

A responsive front-end web platform connecting farmers directly with customers — built with vanilla HTML, CSS, and JavaScript (no frameworks, no build step).

## Pages

- **`index.html`** — Landing page: hero, "how it works" (3-step flow), featured produce, testimonials.
- **`products.html`** — Full catalog with live search, category filters, a price-range filter, and sorting.
- **`product-detail.html`** — Individual listing with farmer info, a quantity stepper, and "Add to cart".
- **`cart.html`** — Cart with per-line quantity editing, removal, a running total, and a demo checkout flow.

## How it's built

- `js/data.js` — the mock product catalog (14 items across 5 categories, standing in for a backend API).
- `js/cart-store.js` — cart read/write logic, backed by `localStorage` so the cart survives page navigation, with an in-memory fallback if storage is blocked.
- `js/main.js` — shared behaviour: mobile nav toggle, cart badge, the product card template used on both the home and listing pages.
- `js/products.js`, `js/product-detail.js`, `js/cart.js` — page-specific logic.
- `css/style.css` — one shared stylesheet with CSS custom properties for the color/type tokens, and responsive breakpoints at 900px and 640px.

## Running it locally

No build tools needed — it's static HTML/CSS/JS. Either:

```bash
# open directly
open index.html

# or serve it (recommended, avoids any local file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Version control

```bash
git init
git add .
git commit -m "Initial commit: Kisaan Bazaar front-end"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

To deploy for free on **GitHub Pages**: push to GitHub, then in the repo go to *Settings → Pages* and set the source to the `main` branch, root folder.

## Notes / next steps

This is a front-end-only demo — the catalog is static data and checkout is simulated (no real payment or backend). Natural next steps if you extend it: a small backend (Node/Express + a database) for real product and order data, and farmer/customer authentication.
