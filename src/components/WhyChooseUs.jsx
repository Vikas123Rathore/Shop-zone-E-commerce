import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-6 py-12 bg-linear-to-r from-blue-500 via-black to-pink-400 text-white">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          Why Choose Us
        </h2>
        <p className="text-gray-200 mt-2">
          We provide the best shopping experience for our customers
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2 text-green-700">Best Quality</h3>
          <p className="text-gray-600">
            We ensure high-quality products with strict quality checks.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2 text-green-700">Fast Delivery</h3>
          <p className="text-gray-600">
            Quick and reliable delivery at your doorstep.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2 text-green-700">Best Prices</h3>
          <p className="text-gray-600">
            Affordable pricing with amazing discounts and offers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
