/* Kisaan Bazaar — mock product catalog.
   In a real deployment this would come from a backend API;
   here it stands in so the UI can be demoed end-to-end. */

const PRODUCTS = [
  { id: "p01", name: "Vine Tomatoes", category: "Vegetables", price: 32, unit: "kg", stock: 48, emoji: "🍅", farmer: "Rakesh Chaudhary", village: "Sardhana, Meerut", desc: "Sun-ripened tomatoes picked within 24 hours of harvest, grown without synthetic pesticides on a 2-acre plot." },
  { id: "p02", name: "Fresh Spinach (Palak)", category: "Vegetables", price: 18, unit: "bunch", stock: 60, emoji: "🥬", farmer: "Sunita Devi", village: "Mawana, Meerut", desc: "Tender spinach leaves, cut in the early morning to lock in freshness. Great for saag or smoothies." },
  { id: "p03", name: "Red Onions", category: "Vegetables", price: 28, unit: "kg", stock: 120, emoji: "🧅", farmer: "Vinod Kumar", village: "Kharkhoda, Meerut", desc: "Storage-quality red onions with a long shelf life, sourced directly from a single family farm." },
  { id: "p04", name: "Farm Potatoes", category: "Vegetables", price: 22, unit: "kg", stock: 150, emoji: "🥔", farmer: "Rakesh Chaudhary", village: "Sardhana, Meerut", desc: "Medium-sized potatoes, ideal for everyday cooking, graded and cleaned before dispatch." },
  { id: "p05", name: "Alphonso Mangoes", category: "Fruits", price: 450, unit: "dozen", stock: 20, emoji: "🥭", farmer: "Imran Siddiqui", village: "Mawana, Meerut", desc: "Naturally tree-ripened Alphonso mangoes, hand-picked and packed the same day for peak sweetness." },
  { id: "p06", name: "Cavendish Bananas", category: "Fruits", price: 45, unit: "dozen", stock: 80, emoji: "🍌", farmer: "Sunita Devi", village: "Mawana, Meerut", desc: "Sweet, firm bananas harvested at the ideal ripeness stage for a 3–4 day counter shelf life." },
  { id: "p07", name: "Guavas", category: "Fruits", price: 60, unit: "kg", stock: 35, emoji: "🍈", farmer: "Vinod Kumar", village: "Kharkhoda, Meerut", desc: "Crisp, fragrant guavas grown on the farm's boundary rows, picked ripe rather than green." },
  { id: "p08", name: "Basmati Rice", category: "Grains & Pulses", price: 95, unit: "kg", stock: 200, emoji: "🌾", farmer: "Harpal Singh", village: "Baraut, Baghpat", desc: "Aged basmati rice with long grains and natural aroma, stone-cleaned and stitched in cloth sacks." },
  { id: "p09", name: "Whole Wheat Atta", category: "Grains & Pulses", price: 38, unit: "kg", stock: 180, emoji: "🌿", farmer: "Harpal Singh", village: "Baraut, Baghpat", desc: "Stone-ground whole wheat flour, milled fresh in small batches to preserve the bran and germ." },
  { id: "p10", name: "Toor Dal", category: "Grains & Pulses", price: 130, unit: "kg", stock: 90, emoji: "🫘", farmer: "Meena Yadav", village: "Hastinapur, Meerut", desc: "Unpolished toor dal, sun-dried the traditional way without added colour or gloss agents." },
  { id: "p11", name: "Fresh Paneer", category: "Dairy", price: 320, unit: "kg", stock: 25, emoji: "🧀", farmer: "Meena Yadav", village: "Hastinapur, Meerut", desc: "Made daily from unadulterated cow's milk, delivered the same morning it's set." },
  { id: "p12", name: "A2 Cow Ghee", category: "Dairy", price: 780, unit: "kg", stock: 15, emoji: "🧈", farmer: "Imran Siddiqui", village: "Mawana, Meerut", desc: "Hand-churned ghee from indigenous cow breeds, slow-cooked in small batches over a wood fire." },
  { id: "p13", name: "Turmeric Powder", category: "Spices", price: 210, unit: "kg", stock: 40, emoji: "🟡", farmer: "Rakesh Chaudhary", village: "Sardhana, Meerut", desc: "Sun-dried and stone-ground turmeric, grown as an intercrop on the same farm as the vegetables." },
  { id: "p14", name: "Farm Honey", category: "Spices", price: 340, unit: "500g", stock: 30, emoji: "🍯", farmer: "Vinod Kumar", village: "Kharkhoda, Meerut", desc: "Raw, unheated honey collected from mustard-field apiaries, filtered but never pasteurised." },
];

const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function formatPrice(n) {
  return "\u20B9" + n.toLocaleString("en-IN");
}
