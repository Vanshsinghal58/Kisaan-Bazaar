/* Kisaan Bazaar — cart storage.
   Persists to localStorage so the cart survives page navigation;
   falls back to an in-memory object if storage is unavailable. */

const CART_KEY = "kisaanBazaarCart";
let memoryFallback = {};

function storageAvailable() {
  try {
    const t = "__kb_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
}

const HAS_STORAGE = storageAvailable();

function readCart() {
  if (!HAS_STORAGE) return memoryFallback;
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeCart(cart) {
  if (!HAS_STORAGE) {
    memoryFallback = cart;
    return;
  }
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + qty;
  writeCart(cart);
  updateCartBadge();
}

function setQuantity(productId, qty) {
  const cart = readCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  writeCart(cart);
  updateCartBadge();
}

function removeFromCart(productId) {
  const cart = readCart();
  delete cart[productId];
  writeCart(cart);
  updateCartBadge();
}

function clearCart() {
  writeCart({});
  updateCartBadge();
}

function cartCount() {
  const cart = readCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartLines() {
  const cart = readCart();
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: getProductById(id), qty }))
    .filter(line => line.product);
}

function cartTotal() {
  return cartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}
