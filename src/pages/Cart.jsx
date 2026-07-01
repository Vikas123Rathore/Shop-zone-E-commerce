import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const [showAddress, setShowAddress] = useState(false)

  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext)

  const taxRate = 0.1 // 10% tax rate
  const deliveryFee = 50 // Flat delivery fee
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const taxAmount = totalPrice * taxRate
  const finalPrice = totalPrice + taxAmount + deliveryFee
  const itemCount = cart.reduce((c, item) => c + item.quantity, 0)

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#1C1A17]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .stepper-track { transition: background-color 0.2s ease; }
        .item-row { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .item-row:hover { box-shadow: 0 4px 0 0 #1C1A17; transform: translate(-2px, -2px); }
        .receipt-edge {
          background-image: radial-gradient(circle at 8px 0, transparent 8px, #FAF7F2 8px);
          background-size: 16px 8px;
          background-repeat: repeat-x;
          background-position: top;
        }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-slide { animation: fadeSlide 0.25s ease; }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 border-b-2 border-[#1C1A17] pb-5">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A8175] mb-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Your Cart
            </h1>
          </div>
          <span className="hidden md:block font-display text-[#E0762B] text-2xl font-bold">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart.length === 0 ? (
              <div className="border-2 border-dashed border-[#D8D0C0] rounded-2xl py-20 text-center">
                <p className="font-display text-xl font-semibold text-[#1C1A17] mb-1">
                  Nothing here yet
                </p>
                <p className="font-body text-sm text-[#8A8175]">
                  Items you add will show up in this cart.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="item-row fade-slide flex items-center gap-5 p-4 md:p-5 bg-white border-2 border-[#1C1A17] rounded-2xl"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl border border-[#E8E2D6] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-base md:text-lg font-bold truncate">
                        {item.title}
                      </h2>
                      <p className="font-body text-[#E0762B] font-semibold mt-1">
                        ₹{item.price.toFixed(2)}
                        <span className="text-[#8A8175] font-normal">
                          {' '}
                          / unit
                        </span>
                      </p>

                      {/* Quantity Stepper */}
                      <div className="stepper-track inline-flex items-center gap-1 mt-3 bg-[#F2EDE3] rounded-full p-1">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="w-7 h-7 rounded-full bg-white border border-[#1C1A17] flex items-center justify-center font-bold hover:bg-[#1C1A17] hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="font-body w-7 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          aria-label={`Increase quantity of ${item.title}`}
                          className="w-7 h-7 rounded-full bg-white border border-[#1C1A17] flex items-center justify-center font-bold hover:bg-[#3D6B4F] hover:text-white hover:border-[#3D6B4F] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className="font-display font-extrabold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-body text-xs font-semibold uppercase tracking-wide text-[#B3433C] hover:text-white hover:bg-[#B3433C] px-3 py-1.5 rounded-full border border-[#B3433C] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary — receipt style */}
          {cart.length > 0 && (
            <div className="w-full lg:w-1/3">
              <div className="sticky top-6 bg-white border-2 border-[#1C1A17] rounded-2xl overflow-hidden">
                <div className="px-6 pt-6 pb-5">
                  <h2 className="font-display text-xl font-extrabold mb-5">
                    Order Summary
                  </h2>

                  {/* Address */}
                  <div className="mb-5 relative">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A8175] mb-1.5">
                      Delivery Address
                    </p>
                    <div className="flex justify-between items-start">
                      <p className="font-body text-sm text-[#8A8175]">
                        No address found
                      </p>
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="font-body text-sm font-semibold text-[#E0762B] hover:underline"
                      >
                        Change
                      </button>
                    </div>

                    {showAddress && (
                      <div className="fade-slide absolute z-10 top-9 left-0 w-full bg-white border-2 border-[#1C1A17] rounded-xl shadow-lg overflow-hidden">
                        <p
                          onClick={() => setShowAddress(false)}
                          className="font-body text-sm p-3 hover:bg-[#F2EDE3] cursor-pointer border-b border-[#E8E2D6]"
                        >
                          New York, USA
                        </p>
                        <p
                          onClick={() => setShowAddress(false)}
                          className="font-body text-sm p-3 text-center font-semibold text-[#E0762B] hover:bg-[#FBEFE3] cursor-pointer"
                        >
                          + Add Address
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-[#D8D0C0] my-4" />

                  <div className="flex flex-col gap-2.5 font-body text-sm">
                    <div className="flex justify-between text-[#5C5648]">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1C1A17]">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#5C5648]">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-[#1C1A17]">
                        ₹{deliveryFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#5C5648]">
                      <span>Tax (10%)</span>
                      <span className="font-medium text-[#1C1A17]">
                        ₹{taxAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-[#1C1A17] mt-4 pt-4 flex justify-between items-baseline">
                    <span className="font-display font-bold text-base">
                      Total
                    </span>
                    <span className="font-display font-extrabold text-2xl text-[#E0762B]">
                      ₹{finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Torn receipt edge */}
                <div className="receipt-edge h-2 bg-[#1C1A17]" />

                <div className="px-6 pb-6 pt-5">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#3D6B4F] hover:bg-[#2F5640] text-white font-body font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
