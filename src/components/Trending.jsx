import React from 'react'
import ProductCard from './ProductCard'
const Trending = ({products,loading}) => {
  return (
    <>
      <div className="flex flex-col w-full  px-10 py-2 mx-auto items-center my-10">
        <div className='text-3xl text-slate-200 font-semibold italic mb-4 underline'>Our Trending Products</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10 py-2 mx-auto">
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
