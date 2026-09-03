/* Kisaan Bazaar — cart.html logic. */

const DELIVERY_FEE = 30;
const FREE_DELIVERY_THRESHOLD = 500;

document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const root = document.getElementById("cart-root");
  const lines = cartLines();

  if (lines.length === 0) {
    root.innerHTML = `
      <div class="container" style="text-align:center; padding:50px 0 70px;">
        <h2>Your cart is empty</h2>
        <p style="margin:0 auto 20px;">Nothing here yet — browse this week's listings and add something fresh.</p>
        <a class="btn btn-primary" href="products.html">Browse produce</a>
      </div>`;
    return;
  }

  const subtotal = cartTotal();
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  root.innerHTML = `
    <div class="container cart-layout">
      <div>
        <div id="cart-lines">
          ${lines.map(lineHTML).join("")}
        </div>
        <a class="btn-text" href="products.html" style="display:inline-block; margin-top:18px;">← Keep browsing</a>
      </div>

      <div class="summary-card">
        <h3 style="margin-top:0;">Order summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>${delivery === 0 ? "Free" : formatPrice(delivery)}</span>
        </div>
        ${delivery > 0 ? `<div class="summary-row" style="font-size:0.82rem;">Add ${formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery</div>` : ""}
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <button class="btn btn-accent btn-block" id="checkout-btn" style="margin-top:16px;">Place order</button>
        <p style="font-size:0.78rem; color:var(--ink-soft); margin:12px 0 0;">Demo checkout — no payment is processed.</p>
      </div>
    </div>`;

  bindLineControls();
  document.getElementById("checkout-btn").addEventListener("click", placeOrder);
}

function lineHTML(line) {
  const { product, qty } = line;
  return `
    <div class="cart-line" data-line-id="${product.id}">
      <div class="cart-line-media" style="background:${mediaTint(product.category)}" aria-hidden="true">${product.emoji}</div>
      <div>
        <div class="cart-line-name">${product.name}</div>
        <div class="cart-line-unit">${formatPrice(product.price)} / ${product.unit} · ${product.farmer}</div>
      </div>
      <div class="qty-stepper">
        <button type="button" data-action="minus" aria-label="Decrease quantity">−</button>
        <input type="number" value="${qty}" min="1" max="${product.stock}" data-qty-input aria-label="Quantity">
        <button type="button" data-action="plus" aria-label="Increase quantity">+</button>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:700;">${formatPrice(product.price * qty)}</div>
        <button class="cart-line-remove" data-action="remove">Remove</button>
      </div>
    </div>`;
}

function bindLineControls() {
  document.querySelectorAll(".cart-line").forEach(row => {
    const id = row.dataset.lineId;
    const input = row.querySelector("[data-qty-input]");
    const max = Number(input.max);

    row.querySelector('[data-action="minus"]').addEventListener("click", () => {
      const next = Math.max(1, Number(input.value) - 1);
      setQuantity(id, next);
      renderCart();
    });
    row.querySelector('[data-action="plus"]').addEventListener("click", () => {
      const next = Math.min(max, Number(input.value) + 1);
      setQuantity(id, next);
      renderCart();
    });
    input.addEventListener("change", () => {
      const next = Math.min(max, Math.max(1, Math.round(Number(input.value)) || 1));
      setQuantity(id, next);
      renderCart();
    });
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      removeFromCart(id);
      renderCart();
    });
  });
}

function placeOrder() {
  const orderTotal = formatPrice(cartTotal() + (cartTotal() >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE));
  clearCart();
  document.getElementById("cart-root").innerHTML = `
    <div class="container confirm-panel">
      <svg class="confirm-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#33532E"/>
        <path d="M20 33L28 41L45 24" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
      <h2>Order placed</h2>
      <p>Your order for ${orderTotal} has been sent to the farmers you bought from. This is a portfolio demo, so no payment was taken and nothing will actually ship.</p>
      <a class="btn btn-primary" href="products.html">Continue browsing</a>
    </div>`;
}
