import React, { useState } from 'react';

export default function Contact() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State to handle submission status
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // Replace with your actual e-commerce backend API URL
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ loading: false, success: 'Thank you! Your message has been sent successfully.', error: null });
        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white max-w-5xl w-full rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-12 overflow-hidden">

        {/* Left Side: Contact Info */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Have a question about your order, shipping, or returns? Drop us a line and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">📧 Email Support</span>
              <p className="text-slate-200 text-base font-medium">support@yourdomain.com</p>
            </div>

            {/* Phone */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">📞 Call Us</span>
              <p className="text-slate-200 text-base font-medium">+91 98765 43210</p>
              <span className="text-xs text-slate-500">(Mon - Sat, 10:00 AM to 6:00 PM)</span>
            </div>

            {/* Address */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">📍 Head Office</span>
              <p className="text-slate-200 text-sm leading-relaxed">123, Tech Park, Sector 62, Noida, UP, India</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-sm text-slate-400">
            Looking for order tracking? Check our <a href="/faqs" className="text-sky-400 font-semibold hover:underline">FAQs</a> first!
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-7 p-8 md:p-12 bg-white">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>

          {/* Status Messages */}
          {status.success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
              {status.success}
            </div>
          )}
          {status.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Subject / Order ID Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                Subject / Order ID <span className="text-slate-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Order #12345 Inquiry"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] flex justify-center items-center"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
