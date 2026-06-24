import { useState } from "react";
import type { WebsiteService } from "../../data/petraServices";

type QuoteFormProps = {
  businessName: string;
  services: WebsiteService[];
  accent?: "blue" | "emerald" | "amber";
};

export default function QuoteForm({
  businessName,
  services,
  accent = "blue",
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const accentClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    emerald: "bg-emerald-600 hover:bg-emerald-700",
    amber: "bg-amber-500 hover:bg-amber-600",
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const mockLead = {
      business: businessName,
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
      status: "New Lead",
      source: `${businessName} Website`,
      createdAt: new Date().toISOString(),
    };

    console.log("Mock lead created:", mockLead);

    setSubmitted(true);
    event.currentTarget.reset();
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
              Fill out this form and the request will later flow directly into Alma’s internal dashboard as a new lead.
            </p>

            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Future software flow:
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
                Request submitted. This is currently mocked until Supabase is connected.
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
              className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-sm transition ${accentClasses[accent]}`}
            >
              Submit Quote Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}