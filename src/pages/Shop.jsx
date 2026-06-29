import React from 'react'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const { products, loading } = useProduct()

  return (
    <div className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          Our Products
        </h1>

        <p className="text-gray-400 mt-3">
          Find the best deals and latest items
        </p>
      </div>

      {loading ? (
        <p className="text-center text-3xl text-green-400">Loading...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
