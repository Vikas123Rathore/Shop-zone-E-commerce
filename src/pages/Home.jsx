import React from "react";
import Hero from "../components/Hero";
import { useProduct } from "../hooks/useProduct";

const Home = () => {
  const { products, loading } = useProduct();

  return (
    <div className="w-full">
      <Hero />

      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((item) => (
          <div key={item.id}>
            {item.title}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
