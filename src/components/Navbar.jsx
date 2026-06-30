import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { cart } = useContext(CartContext)

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
      isActive
        ? 'text-[#E0762B] border-b-2 border-[#E0762B]'
        : 'text-[#1C1A17]/80 hover:text-[#E0762B] border-b-2 border-transparent'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-xl font-semibold rounded-xl transition-colors duration-200 ${
      isActive
        ? 'text-[#E0762B] bg-[#FBEFE3]'
        : 'text-white hover:text-[#E0762B] hover:bg-white/5'
    }`

  return (
    <div className="mb-20">
      <nav className="bg-[#FAF7F2] border-b-2 border-[#1C1A17] px-6 py-4 fixed w-full z-50 top-0 left-0">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="font-extrabold text-2xl tracking-tight text-[#1C1A17]">
            <span className="text-[#E0762B]">S</span>hop
            <span className="text-[#E0762B]">Z</span>one
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/product" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            <NavLink
              to="/cart"
              className="relative px-3 py-2 ml-2 rounded-full bg-[#F2EDE3] hover:bg-[#1C1A17] hover:text-white border border-[#1C1A17] transition-colors duration-200"
              aria-label="Cart"
            >
              <span className="text-lg">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#3D6B4F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#FAF7F2]">
                  {cart.length}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`ml-3 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border ${
                isLoggedIn
                  ? 'border-[#B3433C] text-[#B3433C] hover:bg-[#B3433C] hover:text-white'
                  : 'border-[#1C1A17] bg-[#1C1A17] text-white hover:bg-[#3D6B4F] hover:border-[#3D6B4F]'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <NavLink
              to="/cart"
              className="relative px-2.5 py-2 rounded-full bg-[#F2EDE3] border border-[#1C1A17]"
              aria-label="Cart"
            >
              <span className="text-lg">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#3D6B4F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#FAF7F2]">
                  {cart.length}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-[#1C1A17] text-[#1C1A17]"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] bg-[#b0eaf4] flex flex-col items-center justify-center gap-2 p-6 z-40">
            <NavLink
              to="/"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              🏠 Home
            </NavLink>
            <NavLink
              to="/product"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              🛍️ Shop
            </NavLink>
            <NavLink
              to="/contact"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              📞 Contact
            </NavLink>
            <NavLink
              to="/cart"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              🛒 Cart
            </NavLink>

            <button
              onClick={() => {
                setIsLoggedIn(!isLoggedIn)
                setMenuOpen(false)
              }}
              className={`mt-4 px-8 py-3 rounded-full text-lg font-semibold border-2 transition-colors duration-200 ${
                isLoggedIn
                  ? 'border-[#B3433C] text-[#B3433C] hover:bg-[#B3433C] hover:text-white'
                  : 'border-white text-white hover:bg-[#3D6B4F] hover:border-[#3D6B4F]'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
