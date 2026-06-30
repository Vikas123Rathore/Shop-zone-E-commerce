export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-black via-gray-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center">

        {/* Logo */}
        <h2 className="text-3xl font-bold italic">
          <span className="text-green-500">S</span>hop Zone
        </h2>

        {/* Description */}
        <p className="text-center max-w-2xl mt-4 text-gray-300 leading-7">
          Shop Zone is your one-stop destination for quality products at
          affordable prices. Discover the latest fashion, electronics,
          accessories, and more with a smooth and secure shopping experience.
        </p>

        {/* Links */}
        <div className="flex gap-8 mt-8 text-gray-300">
          <a href="/" className="hover:text-green-400 transition">
            Home
          </a>

          <a href="/product" className="hover:text-green-400 transition">
            Shop
          </a>

          <a href="/contact" className="hover:text-green-400 transition">
            Contact
          </a>

          <a href="/cart" className="hover:text-green-400 transition">
            Cart
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 Shop Zone. All Rights Reserved.</p>

          <p>Built with ❤️ using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
