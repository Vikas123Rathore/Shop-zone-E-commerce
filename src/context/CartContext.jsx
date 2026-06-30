import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id)

      if (exist) {
        toast.info(`${product.title} quantity increased`)

        return prev.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      }

      toast.success(`${product.title} added to cart`)

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const increaseQty = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item
      })
    })
    toast.info(`Item quantity increased`)
  }

  const decreaseQty = (id) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }

          return item
        })
        .filter((item) => {
          return item.quantity > 0
        })
    })
    toast.info(`Item quantity decreased`)
  }

  const removeFromCart = (id) => {
    alert("Are you sure you want to remove this item from the cart?")
    setCart((prev)=>{
      console.log(prev,"prev value")
      return prev.filter((item)=>item.id !== id)

    })
    toast.error(`Item removed from cart`)
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty , removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
