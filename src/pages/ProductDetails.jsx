import { Link, useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addToCart, cart, increaseQty, decreaseQty } = useContext(CartContext)
  const { products, loading } = useProduct()
  // const cartItem = cart.find((item) => item.id === product.id)
  const product = products.find((item) => item.id === Number(id))
  const cartItem = cart.find((item) => item.id === product?.id)
  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!product) {
    return <h1>Product Not Found</h1>
  }

  const handleBuyNow = (product) => {
    console.log('Buy Now clicked for product:', product)
    addToCart(product) // Add the product to the cart
    navigate('/checkout', { state: { product } })
  }

  return (
    <div className="max-w-7xl mx-auto my-10 p-8 bg-white text-black rounded-xl shadow-lg">
      {/* Back Button */}
      <Link
        to="/product"
        className="inline-block mb-6 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        ← Back to Products
      </Link>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side */}
        <div className="md:w-2/5 flex justify-center items-center border rounded-xl p-6 bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 space-y-4">
          <p className="text-blue-600 font-semibold uppercase">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-gray-600">{product.description}</p>

          <h2 className="text-3xl font-bold text-green-600">
            ₹ {product.price}
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <span className="font-semibold">Category:</span>
              <p>{product.category}</p>
            </div>

            <div>
              <span className="font-semibold">Rating:</span>
              <p>⭐ {product.rating}</p>
            </div>

            <div>
              <span className="font-semibold">Stock:</span>
              <p>{product.stock}</p>
            </div>

            <div>
              <span className="font-semibold">Availability:</span>
              <p className="text-green-600">{product.availabilityStatus}</p>
            </div>

            <div>
              <span className="font-semibold">Discount:</span>
              <p>{product.discountPercentage}% Off</p>
            </div>

            <div>
              <span className="font-semibold">Minimum Order:</span>
              <p>{product.minimumOrderQuantity}</p>
            </div>

            <div>
              <span className="font-semibold">SKU:</span>
              <p>{product.sku}</p>
            </div>

            <div>
              <span className="font-semibold">Warranty:</span>
              <p>{product.warrantyInformation}</p>
            </div>

            <div>
              <span className="font-semibold">Shipping:</span>
              <p>{product.shippingInformation}</p>
            </div>

            <div>
              <span className="font-semibold">Return Policy:</span>
              <p>{product.returnPolicy}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Tags</h3>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            {cartItem ? (
              <div className="flex items-center gap-3 bg-green-500 text-white rounded px-3 py-2">
                <button onClick={() => decreaseQty(product.id)}>-</button>

                <span>{cartItem.quantity}</span>

                <button onClick={() => increaseQty(product.id)}>+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-1/2 bg-green-500 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={() => handleBuyNow(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
