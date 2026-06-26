import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-linear-to-r from-black via-green-200 to-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg italic">
            <span className=" text-2xl  font-bold text-green-600">S</span>hop
            Zone
          </div>
          <div className="space-x-4">
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
              Product
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
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
