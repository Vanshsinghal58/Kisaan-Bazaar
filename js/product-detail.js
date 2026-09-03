/* Kisaan Bazaar — product-detail.html logic. */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));
  const root = document.getElementById("detail-root");

  if (!product) {
    root.innerHTML = `
      <div class="container" style="text-align:center; padding:60px 0;">
        <h1>We couldn't find that listing</h1>
        <p style="margin:0 auto 20px;">It may have sold out or the link may be off. Take a look at everything currently available instead.</p>
        <a class="btn btn-primary" href="products.html">Browse produce</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — Kisaan Bazaar`;
  const initials = product.farmer.split(" ").map(w => w[0]).slice(0, 2).join("");
  const lowStock = product.stock <= 20;

  root.innerHTML = `
    <div class="container detail-layout">
      <div class="detail-media" style="background:${mediaTint(product.category)}" aria-hidden="true">
        ${product.emoji}
      </div>
      <div>
        <span class="product-category">${product.category}</span>
        <h1 style="margin-top:6px;">${product.name}</h1>
        <div class="detail-price">${formatPrice(product.price)} <span>/ ${product.unit}</span></div>
        <p>${product.desc}</p>

        <div class="farmer-card">
          <div class="farmer-avatar" aria-hidden="true">${initials}</div>
          <div class="farmer-meta">
            <strong>${product.farmer}</strong>
            Grown in ${product.village}
          </div>
        </div>

        <div class="qty-row">
          <div class="qty-stepper">
            <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${product.stock}" aria-label="Quantity">
            <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <span class="stock-note ${lowStock ? "low" : ""}">
            ${lowStock ? `Only ${product.stock} ${product.unit} left` : `${product.stock} ${product.unit} in stock`}
          </span>
        </div>

        <div class="detail-actions">
          <button class="btn btn-primary" id="add-to-cart-btn">Add to cart</button>
          <a class="btn btn-outline" href="products.html?category=${encodeURIComponent(product.category)}">More ${product.category.toLowerCase()}</a>
        </div>
      </div>
    </div>`;

  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qtyInput.value = Math.min(product.stock, Number(qtyInput.value) + 1);
  });
  qtyInput.addEventListener("change", () => {
    let v = Math.round(Number(qtyInput.value)) || 1;
    qtyInput.value = Math.min(Math.max(1, v), product.stock);
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, Number(qtyInput.value));
    showToast();
  });
});

function showToast() {
  const toast = document.getElementById("added-toast");
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
}
