import AlianzaServiceHelper from "../../components/websites/AlianzaServiceHelper";
import AlianzaHelpForm from "../../components/websites/AlianzaHelpForm";

const logoSrc = "/images/alianza/logo-1.png";
const familySrc = "/images/alianza/family-alma.png";

const phoneDisplay = "714-603-1250";
const secondPhoneDisplay = "657-232-0443";
const phoneHref = "tel:+17146031250";

const featuredServices = [
  {
    title: "Taxes / Income Tax",
    text: "Declaraciones con W-2, trabajador por cuenta propia y manejo de ingresos en efectivo.",
  },
  {
    title: "ITIN",
    text: "Especialistas en obtener y renovar ITIN para personas de cualquier país de Latinoamérica.",
  },
  {
    title: "Peticiones familiares",
    text: "Orientación para procesos familiares importantes, explicados en español y paso a paso.",
  },
  {
    title: "Permisos de trabajo",
    text: "Apoyo para entender requisitos, documentos y próximos pasos para permisos de trabajo.",
  },
  {
    title: "Custodia de hijos",
    text: "Te orientamos con trámites familiares sensibles con claridad, respeto y paciencia.",
  },
  {
    title: "Divorcios en otros países",
    text: "Ayuda con documentación y procesos relacionados con divorcios de personas en otros países.",
  },
];

const moreServices = [
  "Actas de nacimiento mexicanas",
  "Apostillado de documentos",
  "Carta poder",
  "Traducciones español / inglés",
  "Notary Public",
  "EDD / Desempleo / Incapacidad",
  "Dual Citizenship",
  "Trámites migratorios y ley familiar",
];

export default function AlianzaHome() {
  return (
    <div className="min-h-screen bg-white pb-20 text-[#07164f] md:pb-0">
      <header className="sticky top-0 z-50 border-b border-[#e8e8ef] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
              <img
                src={logoSrc}
                alt="Alianza Latina logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-black leading-none text-[#07164f]">
                Alianza Latina
              </p>
              <p className="mt-1 text-xs font-semibold text-[#f58220]">
                Tu apoyo en un nuevo territorio
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold text-[#07164f]/70 lg:flex">
            <a href="#servicios" className="hover:text-[#f58220]">
              Servicios
            </a>
            <a href="#historia" className="hover:text-[#f58220]">
              Historia
            </a>
            <a href="#testimonios" className="hover:text-[#f58220]">
              Testimonios
            </a>
            <a href="#ayuda" className="hover:text-[#f58220]">
              Ayuda
            </a>
          </nav>

          <a
            href={phoneHref}
            className="rounded-full bg-[#f58220] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#e87312]"
          >
            Llamar
          </a>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-[#07164f]">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative px-5 py-14 text-white md:px-8 md:py-20 lg:px-10">
              <div className="absolute left-0 top-0 h-full w-3 bg-[#f58220]" />

              <div className="relative max-w-3xl">
                <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#07164f]">
                  Servicios en español para la comunidad latina
                </p>

                <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  ¿Necesitas ayuda con tus taxes o trámites?
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl md:leading-9">
                  En Alianza Latina te ayudamos con taxes, ITIN, documentos,
                  traducciones y trámites importantes. Te explicamos en español,
                  sin vueltas y paso a paso.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#ayuda"
                    className="rounded-full bg-[#f58220] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#e87312]"
                  >
                    Pedir ayuda
                  </a>

                  <a
                    href={phoneHref}
                    className="rounded-full border border-white/30 bg-white px-7 py-4 text-center text-sm font-black text-[#07164f] transition hover:bg-[#f7f7fb]"
                  >
                    Llamar ahora
                  </a>
                </div>

                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {[
                    "Fluidez en inglés y español",
                    "Negocio familiar",
                    "Santa Ana, California",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm font-black backdrop-blur"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[460px] bg-[#f58220] lg:min-h-full">
              <img
                src={familySrc}
                alt="Familia y equipo de Alianza Latina"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white p-5 shadow-2xl md:left-8 md:right-8 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f58220]">
                  Familia • Comunidad • Confianza
                </p>
                <p className="mt-3 text-lg font-black leading-7 text-[#07164f]">
                  Un negocio familiar creado para ayudar a nuestra comunidad a
                  sentirse acompañada en Estados Unidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AlianzaServiceHelper />

        <section id="servicios" className="bg-[#f7f8fc] px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
                  Servicios principales
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#07164f] md:text-6xl">
                  Trámites importantes, explicados fácil.
                </h2>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-[#46506f]">
                Ofrecemos servicios que combinan entendimiento cultural,
                experiencia en documentación legal y traducciones de calidad.
                Nuestro equipo habla inglés y español.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service, index) => (
                <div
                  key={service.title}
                  className={`rounded-[2rem] p-7 shadow-sm ${
                    index === 0
                      ? "bg-[#07164f] text-white"
                      : index === 1
                        ? "bg-[#f58220] text-white"
                        : "bg-white text-[#07164f]"
                  }`}
                >
                  <div
                    className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black ${
                      index === 0
                        ? "bg-[#f58220]"
                        : index === 1
                          ? "bg-white text-[#f58220]"
                          : "bg-[#f58220] text-white"
                    }`}
                  >
                    ✓
                  </div>

                  <h3 className="text-2xl font-black leading-tight">
                    {service.title}
                  </h3>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      index === 0 || index === 1
                        ? "text-white/80"
                        : "text-[#46506f]"
                    }`}
                  >
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="rounded-[2.5rem] bg-[#07164f] p-7 text-white md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ffad62]">
                También podemos ayudarte con
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {moreServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black"
                  >
                    ✓ {service}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
                Sin hacerte batallar
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight text-[#07164f] md:text-6xl">
                No tienes que saber el nombre exacto del trámite.
              </h2>

              <p className="mt-6 text-lg leading-9 text-[#46506f]">
                A veces solo sabes que necesitas arreglar un documento, preparar
                tus taxes, traducir algo o pedir ayuda con un proceso. Está bien.
                Nos cuentas tu situación y te orientamos.
              </p>

              <a
                href="#ayuda"
                className="mt-8 inline-flex rounded-full bg-[#f58220] px-7 py-4 text-sm font-black text-white transition hover:bg-[#e87312]"
              >
                Explicarme mi situación
              </a>
            </div>
          </div>
        </section>

        <section id="historia" className="bg-[#f7f8fc] px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
                <img
                  src={familySrc}
                  alt="Almita y familia de Alianza Latina"
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </div>

              <div className="rounded-[2.5rem] bg-white p-7 shadow-sm md:p-10">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
                  Nuestra historia
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight text-[#07164f] md:text-6xl">
                  Un negocio familiar que nació en tiempos difíciles.
                </h2>

                <p className="mt-6 text-lg leading-9 text-[#46506f]">
                  Alianza Latina abrió sus puertas en 2020, justo antes de la
                  pandemia. Como pequeño negocio familiar, enfrentamos retos
                  grandes desde el inicio.
                </p>

                <p className="mt-5 text-lg leading-9 text-[#46506f]">
                  Gracias al apoyo y recomendaciones de nuestros clientes, no
                  solo seguimos adelante: crecimos. Por eso valoramos tanto la
                  confianza de cada persona que llega a nuestra oficina.
                </p>

                <div className="mt-8 rounded-[2rem] bg-[#07164f] p-6 text-white">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffad62]">
                    Conoce a Almita M.
                  </p>

                  <p className="mt-4 text-lg leading-8 text-white/80">
                    Almita, dueña de Alianza Latina, es inmigrante de Chapala,
                    Jalisco. Ella entiende lo que significa llegar a un nuevo
                    país y necesitar ayuda clara, honesta y en tu idioma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonios" className="bg-white px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
                Testimonios
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight text-[#07164f] md:text-6xl">
                Clientes que confiaron en Alianza.
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#46506f]">
                Historias reales de personas que recibieron apoyo de nuestro
                equipo.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {["Testimonio.mp4", "Testimonio-2.mp4"].map((video) => (
                <div
                  key={video}
                  className="overflow-hidden rounded-[2rem] bg-[#07164f] p-3 shadow-sm"
                >
                  <video
                    src={`/images/alianza/${video}`}
                    controls
                    className="aspect-video w-full rounded-[1.4rem] bg-black object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <AlianzaHelpForm />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 gap-2 border-t border-black/10 bg-white p-3 shadow-2xl md:hidden">
        <a
          href={phoneHref}
          className="rounded-full bg-[#07164f] px-3 py-3 text-center text-xs font-black text-white"
        >
          Llamar
        </a>

        <a
          href="#ayuda"
          className="rounded-full bg-[#f58220] px-3 py-3 text-center text-xs font-black text-white"
        >
          Ayuda
        </a>

        <a
          href="#servicios"
          className="rounded-full border border-[#07164f] px-3 py-3 text-center text-xs font-black text-[#07164f]"
        >
          Servicios
        </a>
      </div>

      <footer className="bg-[#07164f] px-4 py-12 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <img
              src={logoSrc}
              alt="Alianza Latina logo"
              className="h-16 w-16 rounded-xl bg-white object-contain p-1"
            />

            <h3 className="mt-5 text-2xl font-black">Alianza Latina</h3>

            <p className="mt-4 text-sm leading-7 text-white/70">
              Trámites, taxes, ITIN, documentos y traducciones en español para
              la comunidad latina.
            </p>
          </div>

          <div>
            <p className="font-black text-[#ffad62]">Contacto</p>
            <p className="mt-4 text-sm text-white/75">{phoneDisplay}</p>
            <p className="mt-2 text-sm text-white/75">{secondPhoneDisplay}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              2112 E 4th St, Suite 313
              <br />
              Santa Ana, CA 92705
            </p>
          </div>

          <div>
            <p className="font-black text-[#ffad62]">Nuestra promesa</p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Te escuchamos, te explicamos y te guiamos en español para que no
              tengas que hacer tus trámites solo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}