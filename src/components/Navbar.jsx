import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart } = useContext(CartContext)

  return (
    <div>
      <nav className="bg-linear-to-r from-black via-blue-400 to-slate-800 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg italic">
            <span className=" text-2xl  font-bold text-green-600">S</span>hop
            Zone
          </div>
          {/*
           menu items for medium and larger screens
          */}
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-2 transition duration-200 ${
                  isActive
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'hover:text-green-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `px-2 py-2 transition duration-200 ${
                  isActive
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'hover:text-green-400'
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-2 py-2 transition duration-200 ${
                  isActive
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'hover:text-green-400'
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/cart"
              className=" px-2 py-2 transition duration-200 relative "
            >
              🛒
              <span className="ml-1 text-sm bg-green-500 rounded-full px-2 py-0.5 absolute -top-1 -right-2">
                {cart.length}
              </span>
            </NavLink>
          </div>

          {/*
            menu button for small screens
          */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
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
            {/* mobile menu */}
            {menuOpen && (
              <div className="absolute top-17 right-0 h-[90vh] w-full flex flex-col items-center justify-center bg-black/60 p-4 rounded shadow-md z-10">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-2 py-2 transition duration-200  text-2xl ${
                      isActive
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'hover:text-green-400'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  🏠 Home
                </NavLink>
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    `block px-2 py-2 transition duration-200 text-2xl  ${
                      isActive
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'hover:text-green-400'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  🛍️ Shop
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block px-2 py-2 transition duration-200 text-2xl  ${
                      isActive
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'hover:text-green-400'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  📞 Contact
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `block px-2 py-2 transition duration-200 text-2xl  ${
                      isActive
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'hover:text-green-400'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  🛒 Cart
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
