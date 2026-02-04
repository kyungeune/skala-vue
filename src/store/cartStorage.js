// src/store/cartStorage.js
const KEY = 'cart_items_v1'

function emitCartUpdated() {
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

export function getCartItems() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function setCartItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
  emitCartUpdated()
}

export function getCartCount() {
  // 총 "개수" 합산 (상품 종류 수가 아니라 quantity 합)
  return getCartItems().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
}

/**
 * item: { id, type, name, quantity }
 * 같은 id면 quantity 누적
 */
export function addToCart(item) {
  const items = getCartItems()
  const qty = Math.max(1, Math.floor(Number(item.quantity) || 1))

  const found = items.find((x) => x.id === item.id)
  if (found) {
    found.quantity += qty
  } else {
    items.push({ ...item, quantity: qty })
  }

  setCartItems(items)
  return items
}

export function updateCartQuantity(productId, quantity) {
  const items = getCartItems()
  const found = items.find((x) => x.id === productId)
  if (!found) return items

  const qty = Math.max(1, Math.floor(Number(quantity) || 1))
  found.quantity = qty

  setCartItems(items)
  return items
}

export function removeFromCart(productId) {
  const items = getCartItems().filter((x) => x.id !== productId)
  setCartItems(items)
  return items
}

export function clearCart() {
  localStorage.removeItem(KEY)
  emitCartUpdated()
}
