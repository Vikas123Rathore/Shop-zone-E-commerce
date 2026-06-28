import React from 'react'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const { products, loading } = useProduct()

  return (
    <>
      <div className="flex flex-col w-full bg-black px-10 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-blue-800 underline via-red-400 to-green-500 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-green-800 font-semibold  mb-5">
            Find the best deals and latest items
          </p>
        </div>
        {loading ? (
          <p className="text-center  text-green-400 text-3xl">Loading...</p>
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
