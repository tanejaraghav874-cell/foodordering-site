// js/cart.js — shared cart helper (uses localStorage key: 'cart')
const CART_KEY = 'cart';


function getCart(){
try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
catch(e){ console.error('cart parse error', e); return []; }
}


function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }


function addToCart(item){
// item expected: { id, name, price, image, qty }
const cart = getCart();
const found = cart.find(i => i.id === item.id);
if(found){ found.qty = (found.qty || 0) + (item.qty || 1); }
else{ cart.push({ ...item, qty: item.qty || 1 }); }
saveCart(cart);
}


function removeFromCart(id){
const cart = getCart().filter(i => i.id !== id);
saveCart(cart);
}


function updateQty(id, qty){
const cart = getCart();
const it = cart.find(i => i.id === id);
if(!it) return;
it.qty = Math.max(1, qty);
saveCart(cart);
}


function cartCount(){
return getCart().reduce((s, i) => s + (i.qty || 0), 0);
}


// Optional helper to show cart count in header (if you include an element with id 'cartCount')
function refreshCartBadge(){
const el = document.getElementById('cartCount');
if(!el) return;
const c = cartCount();
el.textContent = c;
el.style.display = c > 0 ? 'inline-block' : 'none';
}


// Run once on load (if included)
refreshCartBadge();