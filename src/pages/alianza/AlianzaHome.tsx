import WebsiteNavbar from "../../components/websites/WebsiteNavbar";
import WebsiteFooter from "../../components/websites/WebsiteFooter";
import QuoteForm from "../../components/websites/QuoteForm";
import { alianzaServices, alianzaPriceItems } from "../../data/alianzaServices";

export default function AlianzaHome() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <WebsiteNavbar
        businessName="Alianza Latina"
        logoText="AL"
        accent="emerald"
        ctaLabel="Request Help"
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-emerald-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.18),transparent_35%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                Taxes • Document Filing • Dual Citizenship
              </p>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Helpful document and tax services for the community.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50/80">
                Alianza Latina helps clients with tax preparation, document
                filing, and dual citizenship support through a friendly and
                organized process.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="rounded-full bg-emerald-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-600"
                >
                  Request Help
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
                  Client Service Snapshot
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    ["Taxes", "Personal and business tax help"],
                    ["Documents", "Filing and preparation support"],
                    ["Dual Citizenship", "Document guidance and organization"],
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
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Services
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Practical help for important paperwork.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {alianzaServices.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
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
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  Pricing
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Clear service options before getting started.
                </h2>

                <p className="mt-4 text-slate-600">
                  Final pricing can depend on the type of service, document
                  complexity, deadlines, and client situation.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">Services may include:</h3>

                <ul className="mt-5 space-y-3">
                  {alianzaPriceItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
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
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Reviews
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Friendly help from a team clients trust.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                "They helped me understand exactly what documents I needed.",
                "Very professional and easy to work with. The process felt organized.",
                "They made everything less stressful and explained each step.",
              ].map((review, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 p-6"
                >
                  <p className="text-sm leading-6 text-slate-600">“{review}”</p>

                  <p className="mt-5 font-semibold text-slate-950">
                    Alianza Latina Client
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QuoteForm
          businessName="Alianza Latina"
          services={alianzaServices}
          accent="emerald"
        />
      </main>

      <WebsiteFooter
        businessName="Alianza Latina"
        tagline="Helping the community with taxes, documents, and important filing services."
        phone="Add Alianza phone"
        email="Add Alianza email"
      />
    </div>
  );
}