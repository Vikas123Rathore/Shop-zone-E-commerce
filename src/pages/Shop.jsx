import React from "react";
import { useProduct } from "../hooks/useProduct";

const Shop = () => {
  const { products, loading } = useProduct();

 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover"
              />

              <h2 className="font-bold mt-3">{product.title}</h2>

              <p className="text-green-600 font-semibold">
                ₹ {product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
