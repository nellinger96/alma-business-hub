import { FormEvent, useState } from 'react'
import type { WebsiteService } from '../../data/petraServices'
import { createWebsiteLead } from '../../services/leadService'

type QuoteFormProps = {
  businessName: string
  services: WebsiteService[]
  accent?: 'blue' | 'emerald' | 'amber'
}

export default function QuoteForm({
  businessName,
  services,
  accent = 'blue'
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const accentClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    amber: 'bg-amber-500 hover:bg-amber-600'
  }

  const businessKey = businessName.toLowerCase().includes('petra')
    ? 'petra'
    : 'alianza'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const fullName = String(formData.get('fullName') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const serviceName = String(formData.get('service') || '').trim()
    const message = String(formData.get('message') || '').trim()

    setSubmitted(false)
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const lead = await createWebsiteLead({
        business: businessKey,
        serviceName,
        fullName,
        phone,
        email,
        message,
        source: `${businessName} Website Quote Form`
      })

      console.log('Real Appwrite lead created:', lead)

      setSubmitted(true)
      form.reset()
    } catch (error) {
      console.error('Could not submit quote request:', error)
      setErrorMessage(
        'Something went wrong submitting the request. Please try again or contact the office directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="quote" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Request a quote
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Get help from {businessName}
            </h2>

            <p className="mt-4 max-w-xl text-slate-600">
              Fill out this form and your request will go directly into the NEXO OS dashboard as a new website lead.
            </p>

            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Software flow:
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Website quote request → New lead → Assigned employee → Follow-up task → Client record.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8"
          >
            {submitted && (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Request submitted successfully. Your lead was sent to the NEXO OS dashboard.
              </div>
            )}

            {errorMessage && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  name="fullName"
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  name="phone"
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Service needed
                </label>
                <select
                  name="service"
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                placeholder="Tell us what you need help with..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 ${accentClasses[accent]}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}