import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false)

  const { cart, increaseQty, decreaseQty } = useContext(CartContext)

  const taxRate = 0.1 // 10% tax rate
  const deliveryFee = 50 // Flat delivery fee
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const finalPrice = totalPrice + totalPrice * taxRate + deliveryFee

  return (
    <div className="bg-white min-h-screen w-full flex flex-col md:flex-row gap-6 p-8">
      {/* Cart Items */}
      <div className="w-full md:w-2/3 text-black">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div className="flex gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded bg-red-500 text-white"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded bg-green-500 text-white"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-green-600 font-semibold mt-2">
                      ₹ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <h2 className="font-bold">
                  ₹ {(item.price * item.quantity).toFixed(2)}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="w-full md:w-1/3 h-fit bg-gray-100 rounded-lg border p-6 text-black">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <hr className="mb-6" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>

            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500">No address found</p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 hover:underline"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute top-10 left-0 w-full bg-white border rounded shadow">
                  <p
                    onClick={() => setShowAddress(false)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    New York, USA
                  </p>

                  <p
                    onClick={() => setShowAddress(false)}
                    className="p-2 text-center text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                  >
                    Add Address
                  </p>
                </div>
              )}
            </div>
          </div>

          <hr className="mb-4" />
          <div className="flex justify-between texxt-lg font-bold">
            <span>Delivery Fees</span>
            <span>₹ {deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Tax (10%)</span>
            <span>₹ {(totalPrice * taxRate).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹ {finalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
