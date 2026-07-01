import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const CheckOut = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, clearCart } = useContext(CartContext)
  const { user, login } = useContext(AuthContext)
  const [accountForm, setAccountForm] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [shippingForm, setShippingForm] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [loading, setLoading] = useState(false)

  const checkoutItems =
    cart.length > 0
      ? cart
      : location.state?.product
        ? [{ ...location.state.product, quantity: 1 }]
        : []

  const totals = useMemo(() => {
    const subtotal = checkoutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const deliveryFee = checkoutItems.length > 0 ? 50 : 0
    const tax = subtotal * 0.1
    const total = subtotal + deliveryFee + tax

    return { subtotal, deliveryFee, tax, total }
  }, [checkoutItems])

  useEffect(() => {
    if (!user) return

    setAccountForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
    })
  }, [user])

  const handleAccountSubmit = (event) => {
    event.preventDefault()

    if (!accountForm.name || !accountForm.email || !accountForm.phone) {
      toast.error('Please fill your account details')
      return
    }

    login(accountForm)
    toast.success('Account saved on this device')
  }

  const handlePlaceOrder = (event) => {
    event.preventDefault()

    if (checkoutItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    if (!user) {
      toast.error('Please save your account details first')
      return
    }

    if (
      !shippingForm.address ||
      !shippingForm.city ||
      !shippingForm.state ||
      !shippingForm.pincode
    ) {
      toast.error('Please complete the shipping address')
      return
    }

    setLoading(true)

    const order = {
      id: `SZ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: user,
      shipping: shippingForm,
      items: checkoutItems,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      total: totals.total,
      status: 'confirmed',
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || []
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]))
    localStorage.setItem('latestOrder', JSON.stringify(order))
    clearCart()
    toast.success('Order placed successfully')
    setLoading(false)
    navigate('/order-success', { state: { orderId: order.id } })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F1F7F0] text-[#1C1A17]">
      <style>{`\n        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');\n        .font-display { font-family: 'Archivo', sans-serif; }\n        .font-body { font-family: 'Inter', sans-serif; }\n        .checkout-card { box-shadow: 0 18px 50px rgba(28,26,23,0.08); }\n        .checkout-input:focus { outline: none; border-color: #3D6B4F; box-shadow: 0 0 0 4px rgba(61,107,79,0.12); }\n      `}</style>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A8175] mb-2">
              Secure checkout
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Place your order
            </h1>
          </div>
          <Link
            to="/cart"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#1C1A17] bg-white px-4 py-2 font-body text-sm font-semibold hover:bg-[#1C1A17] hover:text-white transition-colors"
          >
            ← Back to cart
          </Link>
        </div>

        {checkoutItems.length === 0 ? (
          <div className="checkout-card rounded-3xl border-2 border-dashed border-[#D8D0C0] bg-white p-10 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">
              Your checkout is empty
            </h2>
            <p className="font-body text-[#8A8175] mb-6">
              Add products to your cart before placing an order.
            </p>
            <Link
              to="/product"
              className="inline-flex items-center rounded-full bg-[#3D6B4F] px-6 py-3 font-body font-semibold text-white hover:bg-[#2F5640] transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <section className="checkout-card rounded-3xl border-2 border-[#1C1A17] bg-white p-6 md:p-8">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold">Account</h2>
                    <p className="font-body text-sm text-[#8A8175]">
                      Your profile is stored locally on this device.
                    </p>
                  </div>
                  {user && (
                    <span className="rounded-full bg-[#F1F7F0] px-3 py-1 text-xs font-semibold text-[#3D6B4F]">
                      Signed in
                    </span>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={accountForm.name}
                    onChange={(e) =>
                      setAccountForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={accountForm.email}
                    onChange={(e) =>
                      setAccountForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={accountForm.phone}
                    onChange={(e) =>
                      setAccountForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAccountSubmit}
                  className="mt-4 inline-flex rounded-full border-2 border-[#1C1A17] px-5 py-2.5 font-body text-sm font-semibold hover:bg-[#1C1A17] hover:text-white transition-colors"
                >
                  Save account
                </button>
              </section>

              <section className="checkout-card rounded-3xl border-2 border-[#1C1A17] bg-white p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-5">
                  Shipping address
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Street address"
                    value={shippingForm.address}
                    onChange={(e) =>
                      setShippingForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="checkout-input md:col-span-2 rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingForm.city}
                    onChange={(e) =>
                      setShippingForm((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingForm.state}
                    onChange={(e) =>
                      setShippingForm((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={shippingForm.pincode}
                    onChange={(e) =>
                      setShippingForm((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                    className="checkout-input rounded-2xl border-2 border-[#E8E2D6] px-4 py-3 font-body md:col-span-2"
                  />
                </div>
              </section>

              <section className="checkout-card rounded-3xl border-2 border-[#1C1A17] bg-white p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-5">
                  Payment
                </h2>
                <div className="grid gap-3 md:grid-cols-3">
                  {['Cash on delivery', 'UPI', 'Card'].map((method, index) => (
                    <label
                      key={method}
                      className={`rounded-2xl border-2 px-4 py-4 font-body text-sm font-semibold ${
                        index === 0
                          ? 'border-[#3D6B4F] bg-[#F1F7F0] text-[#3D6B4F]'
                          : 'border-[#E8E2D6] bg-white text-[#5C5648]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="mr-2"
                        defaultChecked={index === 0}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#E0762B] px-6 py-4 font-body text-base font-bold text-white hover:bg-[#C96520] disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
              >
                {loading
                  ? 'Placing order...'
                  : `Place order • ₹${totals.total.toFixed(2)}`}
              </button>
            </form>

            <aside className="checkout-card sticky top-6 h-fit rounded-3xl border-2 border-[#1C1A17] bg-white p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold mb-5">
                Order summary
              </h2>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 rounded-2xl object-cover border border-[#E8E2D6]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-body font-semibold truncate">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-[#8A8175]">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-body font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#D8D0C0] my-5" />

              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8A8175]">Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8175]">Delivery</span>
                  <span>₹{totals.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8175]">Tax</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t-2 border-[#1C1A17] mt-5 pt-5 flex items-baseline justify-between">
                <span className="font-display text-lg font-bold">Total</span>
                <span className="font-display text-3xl font-extrabold text-[#3D6B4F]">
                  ₹{totals.total.toFixed(2)}
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckOut
