import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Product from './components/Product'
import ProductDetails from './components/ProductDetails'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* navbar */}
      <Navbar />

      <main className="container mx-auto px-4">
        <Routes>
          {/* Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
      {/* toast */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}
export default App
