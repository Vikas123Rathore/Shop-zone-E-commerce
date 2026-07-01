import { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const order = useMemo(() => {
    if (location.state?.orderId) {
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || []
      const matchedOrder = storedOrders.find(
        (item) => item.id === location.state.orderId,
      )

      if (matchedOrder) return matchedOrder
    }

    try {
      return JSON.parse(localStorage.getItem('latestOrder')) || null
    } catch {
      return null
    }
  }, [location.state])

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white border-2 border-[#1C1A17] rounded-3xl p-8 text-center shadow-xl">
          <h1 className="text-3xl font-extrabold mb-3">No order found</h1>
          <p className="text-[#8A8175] mb-6">
            Start a new checkout to see your order confirmation.
          </p>
          <Link
            to="/product"
            className="inline-flex rounded-full bg-[#3D6B4F] px-6 py-3 text-white font-semibold hover:bg-[#2F5640]"
          >
            Shop now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F1F7F0] via-[#FFFDF9] to-[#FAF7F2] px-5 py-10 text-[#1C1A17]">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-4xl border-2 border-[#1C1A17] bg-white p-6 md:p-10 shadow-[0_24px_60px_rgba(28,26,23,0.10)]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#3D6B4F] font-semibold mb-2">
                Order confirmed
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Thank you, {order.customer?.name || 'customer'}
              </h1>
            </div>
            <div className="rounded-2xl bg-[#F1F7F0] px-4 py-3 text-sm font-semibold text-[#3D6B4F]">
              Order ID: {order.id}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border-2 border-[#E8E2D6] bg-[#FAF7F2] p-5">
                <h2 className="text-xl font-bold mb-3">Delivery details</h2>
                <div className="space-y-1 text-[#5C5648]">
                  <p>{order.customer?.email}</p>
                  <p>{order.customer?.phone}</p>
                  <p>
                    {order.shipping.address}, {order.shipping.city},{' '}
                    {order.shipping.state} - {order.shipping.pincode}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-[#E8E2D6] p-5">
                <h2 className="text-xl font-bold mb-4">Items</h2>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-[#8A8175]">
                          Qty {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border-2 border-[#1C1A17] bg-[#1C1A17] p-6 text-white h-fit">
              <h2 className="text-2xl font-bold mb-4">Payment summary</h2>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹{order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-white/20 mt-5 pt-5 flex justify-between items-baseline">
                <span className="text-lg font-semibold">Total paid</span>
                <span className="text-3xl font-extrabold text-[#EBC48C]">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/product')}
                className="mt-6 w-full rounded-full bg-[#E0762B] px-5 py-3 font-semibold hover:bg-[#C96520] transition-colors"
              >
                Continue shopping
              </button>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="rounded-full border-2 border-[#1C1A17] px-5 py-3 font-semibold hover:bg-[#1C1A17] hover:text-white transition-colors"
            >
              Review cart
            </Link>
            <Link
              to="/product"
              className="rounded-full bg-[#3D6B4F] px-5 py-3 font-semibold text-white hover:bg-[#2F5640] transition-colors"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
