import PetraEducationTabs from "../../components/websites/PetraEducationTabs";
import PetraFAQ from "../../components/websites/PetraFAQ";
import PetraGuidedQuoteForm from "../../components/websites/PetraGuidedQuoteForm";
import PetraProtectionHelper from "../../components/websites/PetraProtectionHelper";

const phoneDisplay = "714-603-1250";
const phoneHref = "tel:+17146031250";

const processSteps = [
  {
    number: "01",
    title: "Tú respondes unas preguntas",
    text: "No son preguntas complicadas. Solo queremos entender qué te preocupa y qué quieres proteger.",
  },
  {
    number: "02",
    title: "Un agente revisa tu situación",
    text: "Se revisa edad, necesidad, presupuesto y tipo de protección que puede tener sentido.",
  },
  {
    number: "03",
    title: "Te explican tus opciones",
    text: "Te explican en español qué significa cada opción, cuánto podría costar y qué sigue.",
  },
  {
    number: "04",
    title: "Tú decides sin presión",
    text: "No se trata de empujarte. Se trata de que entiendas y tomes una decisión con calma.",
  },
];

const concerns = [
  "¿Qué pasa con mi familia si algo me pasa?",
  "¿Quién pagaría mi funeral?",
  "¿Mis hijos o pareja estarían protegidos?",
  "¿Puedo dejar todo planeado desde ahora?",
  "¿Cuál opción es mejor para mi presupuesto?",
];

export default function PetraHome() {
  return (
    <div className="min-h-screen bg-[#f6efe4] pb-20 text-[#111a16] md:pb-0">
      <header className="sticky top-0 z-50 border-b border-[#d8c8b2] bg-[#f6efe4]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <a href="#" className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center border border-[#111a16] text-base font-black tracking-[0.25em]">
              P
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#111a16]">
                PETRA Insurance
              </p>
              <p className="mt-1 text-xs font-bold text-[#9b672d]">
                Life Insurance · Pre-Need · Medicare Soon
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-black uppercase tracking-[0.18em] text-[#111a16]/60 lg:flex">
            <a href="#guia" className="hover:text-[#9b672d]">
              Guía
            </a>
            <a href="#aprende" className="hover:text-[#9b672d]">
              Aprende
            </a>
            <a href="#proceso" className="hover:text-[#9b672d]">
              Proceso
            </a>
            <a href="#preguntas" className="hover:text-[#9b672d]">
              Preguntas
            </a>
          </nav>

          <a
            href="#orientacion"
            className="border border-[#111a16] bg-[#111a16] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#9b672d] hover:border-[#9b672d]"
          >
            Orientarme
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#d8c8b2] bg-[#111a16] text-white">
          <div className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/10 bg-[#18231e] lg:block" />

          <div className="relative mx-auto grid max-w-7xl gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#c28a48]">
                Protección familiar en español
              </p>

              <h1 className="mt-8 max-w-4xl font-serif text-6xl font-black leading-[0.88] tracking-[-0.06em] md:text-8xl">
                Protege lo que no se puede reemplazar.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-white/72 md:text-xl md:leading-10">
                Seguro de vida y planificación funeral anticipada explicados con
                calma, en español y sin presión. Una conversación clara para
                tomar decisiones importantes.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#guia"
                  className="bg-[#c28a48] px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[#111a16] transition hover:bg-white"
                >
                  Empezar guía
                </a>

                <a
                  href="#aprende"
                  className="border border-white/30 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-[#111a16]"
                >
                  Entender opciones
                </a>
              </div>
            </div>

            <div className="relative border-t border-white/10 px-5 py-10 md:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-24">
              <div className="border border-white/20 p-7 md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#c28a48]">
                  La pregunta real
                </p>

                <h2 className="mt-6 font-serif text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
                  “Si algo me pasa, ¿mi familia estaría bien?”
                </h2>

                <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
                  {concerns.map((concern) => (
                    <div key={concern} className="py-5">
                      <p className="text-base font-semibold leading-7 text-white/80">
                        {concern}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm leading-7 text-white/55">
                  PETRA no debe sentirse como una página de seguros. Debe
                  sentirse como una guía seria para proteger a la familia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PetraProtectionHelper />

        <PetraEducationTabs />

        <section
          id="proceso"
          className="border-y border-[#d8c8b2] bg-[#111a16] px-4 py-16 text-white md:px-6 md:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#c28a48]">
                  Proceso
                </p>

                <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
                  Sin misterio. Sin presión.
                </h2>
              </div>

              <div className="border-l border-white/15 pl-6 md:pl-10">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="grid gap-4 border-b border-white/15 py-8 md:grid-cols-[120px_1fr]"
                  >
                    <p className="font-serif text-5xl font-black text-[#c28a48]">
                      {step.number}
                    </p>

                    <div>
                      <h3 className="text-2xl font-black leading-tight">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-8 text-white/65">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6efe4] px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9b672d]">
                Pre funeral
              </p>

              <h2 className="mt-6 max-w-4xl font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16] md:text-7xl">
                No dejes decisiones difíciles para un momento difícil.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-9 text-[#4f5a54]">
                La planificación funeral anticipada ayuda a dejar instrucciones
                claras para que tu familia no tenga que decidir todo con dolor,
                presión o confusión.
              </p>

              <a
                href="#guia"
                className="mt-10 inline-flex border border-[#111a16] bg-[#111a16] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9b672d] hover:border-[#9b672d]"
              >
                Ver si aplica para mí
              </a>
            </div>

            <div className="border-y border-[#111a16] py-4">
              {[
                "Entierro o cremación",
                "Servicio familiar o religioso",
                "Transporte a otro país",
                "Costos incluidos y no incluidos",
                "Preferencias por escrito",
                "Quién debe conocer tus decisiones",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#d8c8b2] py-5 last:border-b-0"
                >
                  <p className="text-lg font-black text-[#111a16]">{item}</p>
                  <span className="text-2xl text-[#9b672d]">+</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PetraFAQ />

        <PetraGuidedQuoteForm />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-[#111a16] bg-[#f6efe4] md:hidden">
        <a
          href={phoneHref}
          className="border-r border-[#111a16] px-3 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#111a16]"
        >
          Llamar
        </a>

        <a
          href="#guia"
          className="border-r border-[#111a16] bg-[#111a16] px-3 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-white"
        >
          Guía
        </a>

        <a
          href="#orientacion"
          className="px-3 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#111a16]"
        >
          Ayuda
        </a>
      </div>

      <footer className="border-t border-white/10 bg-[#111a16] px-4 py-12 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="grid h-16 w-16 place-items-center border border-white text-xl font-black tracking-[0.28em]">
              P
            </div>

            <h3 className="mt-6 font-serif text-4xl font-black tracking-[-0.04em]">
              PETRA Insurance
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Seguro de vida, servicios funerales anticipados y Medicare pronto.
              Una experiencia en español para familias que quieren claridad.
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c28a48]">
              Contacto
            </p>
            <p className="mt-5 text-sm text-white/70">{phoneDisplay}</p>
            <p className="mt-3 text-sm text-white/70">Atención en español</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c28a48]">
              Nota
            </p>
            <p className="mt-5 text-sm leading-7 text-white/60">
              La información de esta página es educativa. Opciones, precios y
              aprobación dependen de la compañía, producto, edad, salud y
              requisitos aplicables.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}