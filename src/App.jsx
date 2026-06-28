import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Footer from './components/Footer'
// import { useProduct } from './hooks/useProduct'
function App() {
  // const products = useProduct()
  return (
    <div className="min-h-screen bg-black text-white">
      {/* navbar */}
      <Navbar />

      <main className="container mx-auto w-full ">
        <Routes>
          {/* Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
      {/* toast */}
<Footer/>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}
export default App
