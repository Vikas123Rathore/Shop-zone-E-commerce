import React from 'react'
import ProductCard from './ProductCard'
const Trending = ({products,loading}) => {
  return (
    <>
      <div className="flex flex-col w-full  px-10 py-2 mx-auto  my-10 items-center justify-center">
        <div className=' text-xl md:text-3xl text-slate-800 font-semibold italic mb-4 underline'>Our Trending Products</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-10 py-2 mx-auto place-items-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.slice(8, 12).map((item) => (
              <div key={item.id}>
                <ProductCard product={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Trending
