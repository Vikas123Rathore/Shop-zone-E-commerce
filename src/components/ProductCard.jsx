import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="flex flex-col items-center justify-center h-80 w-80  rounded-lg p-4 bg-white border border-gray-400 shadow hover:shadow-lg transition duration-300 hover:scale-105">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md mb-3 bg-transparent"
        />
        <h2 className=" text-lg mb-1">{product.title}</h2>
        <div className="flex justify-between items-center w-3/4">
          <p className="text-green-600 font-semibold">
            Price: ₹{product.price}
          </p>
        </div>
        <div className="flex justify-between items-center w-full gap-2">
          <button className="flex justify-center items-center w-1/2 mt-2 bg-green-400 text-white px-2 py-1 rounded-md hover:bg-green-500 cursor-pointer transition duration-300">
            Add to Cart
          </button>
          <button className="flex justify-center items-center w-1/2 mt-2 bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-green-500 cursor-pointer transition duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
