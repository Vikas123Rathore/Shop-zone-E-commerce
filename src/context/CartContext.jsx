import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  // ✅ Load from localStorage
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem('cart')) || [],
  )

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id)

      if (exist) {
        toast.info(`${product.title} quantity increased`)

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      toast.success(`${product.title} added to cart`)

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // INCREASE QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )

    toast.info(`Item quantity increased`)
  }

  // DECREASE QTY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )

    toast.info(`Item quantity decreased`)
  }

  // REMOVE ITEM
  const removeFromCart = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to remove this item from the cart?',
    )

    if (!confirmDelete) return

    setCart((prev) => prev.filter((item) => item.id !== id))

    toast.error(`Item removed from cart`)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
