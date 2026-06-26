import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-center  rounded-lg p-4 bg-white border border-gray-400 shadow hover:shadow-lg transition duration-300 hover:scale-105">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-3 bg-transparent"
      />
      <h2 className=" text-lg mb-1">{product.title}</h2>
      <div className="flex justify-between items-center w-full">
        <p className="text-gray-600 text-lg ">{product.brand}</p>
        <p className="text-green-600 font-semibold">₹ {product.price}</p>
      </div>
      <div className="flex justify-center items-center w-3/4 mt-2 bg-green-400 text-white px-2 py-1 rounded-md hover:bg-green-500 cursor-pointer transition duration-300">
        Add to Cart
      </div>
    </div>
  )
}

export default ProductCard
