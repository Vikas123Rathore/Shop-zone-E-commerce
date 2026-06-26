import React from 'react'
import Hero from '../components/Hero'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/ProductCard'
import Trending from '../components/Trending'
import WhyChooseUs from '../components/WhyChooseUs'
import NewsLetter from '../components/NewsLetter'
import Cta from '../components/Cta'
const Home = () => {
  const { products, loading } = useProduct()

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <Hero />
      <Trending products={products} loading={loading} />
      <WhyChooseUs />
      {/* <NewsLetter /> */}
      <Cta/>
    </div>
  )
}

export default Home
