import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const contactChannels = [
  {
    label: 'Email Support',
    value: 'support@shopzone.com',
    note: 'Replies within 24 hours',
  },
  {
    label: 'Phone Support',
    value: '+91 98765 43210',
    note: 'Mon-Sat, 10:00 AM to 6:00 PM',
  },
  {
    label: 'Head Office',
    value: '123, Tech Park, Sector 62, Noida',
    note: 'Uttar Pradesh, India',
  },
]

const quickTopics = [
  'Order issue',
  'Shipping update',
  'Returns',
  'Product help',
]

const defaultForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState(defaultForm)
  const [status, setStatus] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const setTopic = (topic) => {
    setFormData((prev) => ({
      ...prev,
      subject: topic,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus({ loading: true, success: '', error: '' })

    try {
      const messageRecord = {
        id: `MSG-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
      }

      const existingMessages =
        JSON.parse(localStorage.getItem('contact-messages')) || []
      localStorage.setItem(
        'contact-messages',
        JSON.stringify([messageRecord, ...existingMessages]),
      )

      setStatus({
        loading: false,
        success:
          'Message saved successfully. Our support team will review it shortly.',
        error: '',
      })
      setFormData(defaultForm)
    } catch (error) {
      setStatus({
        loading: false,
        success: '',
        error: 'Unable to save your message right now. Please try again.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F1F7F0] text-[#1C1A17]">
      <style>{`\n        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');\n        .font-display { font-family: 'Archivo', sans-serif; }\n        .font-body { font-family: 'Inter', sans-serif; }\n        .support-card { box-shadow: 0 18px 50px rgba(28, 26, 23, 0.08); }\n        .support-input:focus {\n          outline: none;\n          border-color: #3D6B4F;\n          box-shadow: 0 0 0 4px rgba(61, 107, 79, 0.12);\n        }\n      `}</style>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A8175] mb-2">
              Customer support
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              We’re here to help with orders, shipping, and returns.
            </h1>
            <p className="font-body text-[#5C5648] text-base md:text-lg leading-relaxed">
              Tell us what you need and we’ll get back with a clear next step.
              For faster help, include your order ID or select a topic below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/product"
              className="rounded-full border-2 border-[#1C1A17] bg-white px-5 py-3 font-body text-sm font-semibold hover:bg-[#1C1A17] hover:text-white transition-colors"
            >
              Shop products
            </Link>
            <Link
              to="/cart"
              className="rounded-full bg-[#3D6B4F] px-5 py-3 font-body text-sm font-semibold text-white hover:bg-[#2F5640] transition-colors"
            >
              View cart
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <aside className="support-card rounded-4xl border-2 border-[#1C1A17] bg-[#1C1A17] text-white p-6 md:p-8">
            <div className="mb-8">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Talk to us
              </span>
              <h2 className="font-display text-3xl font-extrabold mt-4 mb-3">
                Fast support, clear answers.
              </h2>
              <p className="font-body text-white/70 leading-relaxed">
                We keep support simple: one message, one clear response, no
                ticket maze.
              </p>
            </div>

            <div className="grid gap-4 mb-8">
              {contactChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-white/55 mb-2">
                    {channel.label}
                  </p>
                  <p className="font-display text-lg font-bold mb-1">
                    {channel.value}
                  </p>
                  <p className="font-body text-sm text-white/65">
                    {channel.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-[#3D6B4F] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                  Response
                </p>
                <p className="font-display text-2xl font-extrabold">24h</p>
                <p className="text-sm text-white/70 mt-1">Average reply time</p>
              </div>
              <div className="rounded-3xl bg-[#E0762B] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                  Help
                </p>
                <p className="font-display text-2xl font-extrabold">7 days</p>
                <p className="text-sm text-white/70 mt-1">Weekly coverage</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55 mb-3">
                Quick topics
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setTopic(topic)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="support-card rounded-4xl border-2 border-[#1C1A17] bg-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-3xl font-extrabold">
                  Send a message
                </h2>
                <p className="font-body text-sm text-[#8A8175] mt-2">
                  Messages are stored locally in this demo so you can review
                  them later.
                </p>
              </div>
              <div className="hidden md:block rounded-2xl bg-[#F1F7F0] px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-[#3D6B4F] font-semibold">
                  Need help now?
                </p>
                <p className="font-body text-sm text-[#5C5648] mt-1">
                  Use phone support for urgent issues.
                </p>
              </div>
            </div>

            {status.success && (
              <div
                className="mb-6 rounded-2xl border border-[#B8D7C0] bg-[#F1F7F0] px-4 py-3 text-sm font-medium text-[#2F5640]"
                aria-live="polite"
              >
                {status.success}
              </div>
            )}

            {status.error && (
              <div
                className="mb-6 rounded-2xl border border-[#F2C4BE] bg-[#FBEFE3] px-4 py-3 text-sm font-medium text-[#B3433C]"
                aria-live="polite"
              >
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-1">
                  <span className="font-body text-sm font-semibold text-[#5C5648]">
                    Full name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="support-input w-full rounded-2xl border-2 border-[#E8E2D6] bg-[#FAF7F2] px-4 py-3 font-body placeholder:text-[#A39A8F]"
                  />
                </label>

                <label className="space-y-2 md:col-span-1">
                  <span className="font-body text-sm font-semibold text-[#5C5648]">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="support-input w-full rounded-2xl border-2 border-[#E8E2D6] bg-[#FAF7F2] px-4 py-3 font-body placeholder:text-[#A39A8F]"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="font-body text-sm font-semibold text-[#5C5648]">
                    Subject / Order ID{' '}
                    <span className="text-[#8A8175] font-normal">Optional</span>
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Order #12345 delivery update"
                    className="support-input w-full rounded-2xl border-2 border-[#E8E2D6] bg-[#FAF7F2] px-4 py-3 font-body placeholder:text-[#A39A8F]"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="font-body text-sm font-semibold text-[#5C5648]">
                    Your message
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what happened and how we can help."
                    required
                    className="support-input w-full rounded-2xl border-2 border-[#E8E2D6] bg-[#FAF7F2] px-4 py-3 font-body placeholder:text-[#A39A8F] resize-none"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#E0762B] px-6 py-4 font-body text-base font-bold text-white hover:bg-[#C96520] disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
                >
                  {status.loading ? 'Sending...' : 'Send message'}
                </button>
                <Link
                  to="/checkout"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-[#1C1A17] px-6 py-4 font-body text-base font-semibold hover:bg-[#1C1A17] hover:text-white transition-colors"
                >
                  Checkout help
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
