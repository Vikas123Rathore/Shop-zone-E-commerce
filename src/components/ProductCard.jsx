import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  return (
    <div className="flex flex-col items-start justify-center h-80 w-70 rounded-lg p-4 bg-white border border-gray-400 shadow hover:shadow-lg transition duration-300 hover:scale-105">
      <Link
        to={`/product/${product.id}`}
        className="w-full h-40 mb-3 bg-gray-300 py-6 rounded-md flex items-center justify-center overflow-hidden"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md mb-3 object-center"
        />
      </Link>

      <h2 className="text-lg mb-1 text-gray-800">{product.title}</h2>

      {/* <p className="text-green-600 font-semibold">₹ {product.price}</p> */}

      <div className="flex gap-2 w-full mt-3 justify-between items-center pr-4">
        <p className="text-green-600 font-semibold border-2 border-slate-400 px-2.5 py-2 rounded-lg">₹ {product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-1/2 bg-green-500 text-white py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
