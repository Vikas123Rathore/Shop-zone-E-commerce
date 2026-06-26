import React from 'react'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const { products, loading } = useProduct()

  return (
    <>
      <div className="flex flex-col w-full bg-linear-to-r from-black via-pink-300 to-red-400 px-10 py-2 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-800 via-red-400 to-green-500 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-gray-800 mb-5">
            Find the best deals and latest items
          </p>
        </div>
        {loading ? (
          <p className="text-center text-lg text-green-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Shop
