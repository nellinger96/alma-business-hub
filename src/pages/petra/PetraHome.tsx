import WebsiteNavbar from "../../components/websites/WebsiteNavbar";
import WebsiteFooter from "../../components/websites/WebsiteFooter";
import QuoteForm from "../../components/websites/QuoteForm";
import { petraServices, petraPriceItems } from "../../data/petraServices";

export default function PetraHome() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <WebsiteNavbar
        businessName="P.E.T.R.A. Insurance"
        logoText="PI"
        accent="blue"
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.2),transparent_35%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
                Life Insurance • Pre-Need Funeral Services • Medicare Coming November
              </p>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Protection and planning for the people you love.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                P.E.T.R.A. Insurance helps families plan ahead with life insurance,
                funeral planning services, and soon Medicare guidance.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Request a Quote
                </a>

                <a
                  href="#services"
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  View Services
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-6">
                <p className="text-sm font-semibold text-slate-500">
                  Client Care Snapshot
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    ["Family Protection", "Life insurance options"],
                    ["Planning Ahead", "Pre-need funeral services"],
                    ["Coming Soon", "Medicare support in November"],
                  ].map(([title, description]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="font-semibold text-slate-950">{title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Services
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Insurance and planning services made simple.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {petraServices.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {service.badge}
                  </span>

                  <h3 className="mt-5 text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Pricing
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Clear next steps before making a decision.
                </h2>

                <p className="mt-4 text-slate-600">
                  Pricing and options can depend on the client’s needs, coverage
                  amount, age, health, and planning goals.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">Quote options may include:</h3>

                <ul className="mt-5 space-y-3">
                  {petraPriceItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Reviews
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by families who want guidance.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                "They explained everything clearly and helped my family understand our options.",
                "Professional, patient, and very helpful during the planning process.",
                "The team made something confusing feel simple and manageable.",
              ].map((review, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 p-6"
                >
                  <p className="text-sm leading-6 text-slate-600">“{review}”</p>

                  <p className="mt-5 font-semibold text-slate-950">
                    P.E.T.R.A. Client
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QuoteForm
          businessName="P.E.T.R.A. Insurance"
          services={petraServices}
          accent="blue"
        />
      </main>

      <WebsiteFooter
        businessName="P.E.T.R.A. Insurance"
        tagline="Helping families protect what matters and plan ahead with confidence."
        phone="Add Petra phone"
        email="Add Petra email"
      />
    </div>
  );
}