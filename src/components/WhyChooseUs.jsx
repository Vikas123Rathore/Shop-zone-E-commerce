import React from 'react'

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Premium Quality',
      description:
        'Every product is carefully selected to ensure top quality and long-lasting value.',
      icon: '⭐',
    },
    {
      title: 'Fast Delivery',
      description:
        'Get your orders delivered quickly with reliable shipping across the country.',
      icon: '🚚',
    },
    {
      title: 'Secure Payments',
      description:
        'Shop confidently with safe and encrypted payment methods.',
      icon: '🔒',
    },
    {
      title: 'Easy Returns',
      description:
        'Not satisfied? Enjoy a simple and hassle-free return process.',
      icon: '↩️',
    },
    {
      title: 'Best Deals',
      description:
        'Save more with exclusive discounts, seasonal offers, and exciting deals.',
      icon: '🏷️',
    },
    {
      title: '24/7 Support',
      description:
        'Our support team is always ready to help you whenever you need assistance.',
      icon: '💬',
    },
  ]

  return (
    <section className="w-full bg-gradient-to-br from-gray-950 via-black to-slate-900 py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Why Shop With Us?
          </h2>
          <p className="text-gray-400 mt-3">
            Everything you need for a smooth, secure, and enjoyable shopping experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-green-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>

              <h3 className="text-xl font-semibold text-green-400 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
