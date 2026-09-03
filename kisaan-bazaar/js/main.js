/* Kisaan Bazaar — shared behaviour across all pages. */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
});

/* Renders one product card. Shared by the home page's "featured" strip
   and the full listing page so markup can't drift between the two. */
function productCardHTML(product) {
  return `
    <a class="product-card" href="product-detail.html?id=${product.id}">
      <div class="product-media" style="background:${mediaTint(product.category)}">
        <span aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <span class="product-farmer">${product.farmer} · ${product.village}</span>
        <div class="product-price">${formatPrice(product.price)} <span>/ ${product.unit}</span></div>
      </div>
    </a>`;
}

function mediaTint(category) {
  const tints = {
    "Vegetables": "#E4EDD7",
    "Fruits": "#F6E6C8",
    "Grains & Pulses": "#EFE7D4",
    "Dairy": "#F1EFE3",
    "Spices": "#F3DFC4",
  };
  return tints[category] || "#EEF1E3";
}
