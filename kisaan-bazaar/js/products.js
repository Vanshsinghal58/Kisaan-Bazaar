/* Kisaan Bazaar — products.html listing logic. */

const state = {
  categories: new Set(),   // empty set = no category filter applied
  maxPrice: 800,
  query: "",
  sort: "default",
};

document.addEventListener("DOMContentLoaded", () => {
  buildCategoryFilters();
  bindControls();
  render();
});

function buildCategoryFilters() {
  const list = document.getElementById("category-list");
  list.innerHTML = CATEGORIES.map(cat => `
    <label class="filter-option">
      <input type="checkbox" value="${cat}" data-cat-option> ${cat}
    </label>
  `).join("");

  document.querySelector("[data-cat-all]").addEventListener("change", (e) => {
    if (e.target.checked) {
      state.categories.clear();
      list.querySelectorAll("input").forEach(cb => cb.checked = false);
    }
    render();
  });

  list.querySelectorAll("input").forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) {
        state.categories.add(cb.value);
        document.querySelector("[data-cat-all]").checked = false;
      } else {
        state.categories.delete(cb.value);
      }
      if (state.categories.size === 0) {
        document.querySelector("[data-cat-all]").checked = true;
      }
      render();
    });
  });
}

function bindControls() {
  const priceRange = document.getElementById("price-range");
  priceRange.addEventListener("input", () => {
    state.maxPrice = Number(priceRange.value);
    document.getElementById("price-range-label").textContent =
      state.maxPrice >= 800 ? "Up to ₹800" : `Up to ${formatPrice(state.maxPrice)}`;
    render();
  });

  document.getElementById("search-input").addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById("sort-select").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  // pre-select a category if arriving from a link like products.html?category=Fruits
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("category");
  if (cat && CATEGORIES.includes(cat)) {
    state.categories.add(cat);
    document.querySelector("[data-cat-all]").checked = false;
    const box = document.querySelector(`[data-cat-option][value="${cat}"]`);
    if (box) box.checked = true;
  }
}

function render() {
  let items = PRODUCTS.filter(p => {
    const inCategory = state.categories.size === 0 || state.categories.has(p.category);
    const inPrice = p.price <= state.maxPrice;
    const matchesQuery = !state.query ||
      p.name.toLowerCase().includes(state.query) ||
      p.category.toLowerCase().includes(state.query) ||
      p.farmer.toLowerCase().includes(state.query);
    return inCategory && inPrice && matchesQuery;
  });

  switch (state.sort) {
    case "price-asc": items.sort((a, b) => a.price - b.price); break;
    case "price-desc": items.sort((a, b) => b.price - a.price); break;
    case "name-asc": items.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("results-count");

  count.textContent = `${items.length} item${items.length === 1 ? "" : "s"} found`;

  if (items.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
  } else {
    empty.hidden = true;
    grid.innerHTML = items.map(productCardHTML).join("");
  }
}
