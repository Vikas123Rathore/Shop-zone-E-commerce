import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  // console.log("Cart Items are:", cart)
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
  const increaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      )

      console.log(updated)
      return updated
    })
  }

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
