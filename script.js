const products = [
  { id: 1, name: "Olive Oil 500ml", price: 1200, img: "https://via.placeholder.com/250x200/2d6a4f/D4AF37?text=Olive+Oil" },
  { id: 2, name: "Coconut Oil 1L", price: 1500, img: "https://via.placeholder.com/250x200/2d6a4f/D4AF37?text=Coconut+Oil" },
  { id: 3, name: "Mustard Oil 1L", price: 800, img: "https://via.placeholder.com/250x200/2d6a4f/D4AF37?text=Mustard+Oil" },
  { id: 4, name: "Almond Oil 250ml", price: 2000, img: "https://via.placeholder.com/250x200/2d6a4f/D4AF37?text=Almond+Oil" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadProducts() {
  const productList = document.getElementById('product-list');
  if(!productList) return;
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs. ${p.price}</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let item = cart.find(i => i.id === id);
  if(item) item.qty++;
  else cart.push({...products.find(p => p.id === id), qty: 1});
  saveCart();
  alert("Product added to cart!");
}

function loadCart() {
  const cartItems = document.getElementById('cart-items');
  if(!cartItems) return;
  cartItems.innerHTML = '';
  if(cart.length === 0) { cartItems.innerHTML = "<p style='padding:20px'>Cart is empty</p>"; return; }
  
  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div>
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="qty-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
        <span>Rs. ${item.price * item.qty}</span>
      </div>
    `;
  });
  document.getElementById('cart-total').innerText = "Total: Rs. " + cart.reduce((t,i) => t + i.price * i.qty, 0);
}

function updateQty(id, change) {
  let item = cart.find(i => i.id === id);
  item.qty += change;
  if(item.qty <= 0) removeItem(id);
  saveCart();
}
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-count').innerText = cart.reduce((t,i) => t + i.qty, 0);
  loadCart();
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  let msg = "Order from The Noor Store:%0A";
  cart.forEach(i => msg += `${i.name} x ${i.qty} = Rs.${i.price*i.qty}%0A`);
  msg += `Total: Rs.${cart.reduce((t,i) => t + i.price * i.qty, 0)}`;
  window.open(`https://wa.me/923xxxxxxxxxx?text=${msg}`);
})

loadProducts();
loadCart();
saveCart();
