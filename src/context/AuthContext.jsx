import { createContext, useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'

export const AuthContext = createContext()

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null
  } catch {
    return null
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser)

  // ✅ useContext component ke andar
  const { clearCart } = useContext(CartContext) || {}

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (userData) => {
    setUser({
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
    })
  }

  const logout = () => {
    setUser(null)
    clearCart?.()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
