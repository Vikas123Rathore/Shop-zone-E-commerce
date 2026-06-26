import React from 'react'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const { products, loading } = useProduct()

  return (
    // <div className="p-6">
    //   <h1 className="text-3xl font-bold mb-5">Products</h1>

    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
    //       {products.map((product) => (
    //         <div
    //           key={product.id}
    //           className="border rounded-lg p-4 bg-white shadow"
    //         >
    //           <img
    //             src={product.thumbnail}
    //             alt={product.title}
    //             className="w-full h-40 object-cover"
    //           />

    //           <h2 className="font-bold mt-3">{product.title}</h2>

    //           <p className="text-green-600 font-semibold">
    //             ₹ {product.price}
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <>
      <div className="flex flex-col w-full bg-slate-100 px-10 py-2 mx-auto">
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
              <div
                key={product.id}
                
              >
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
