import { useState } from "react";

const tabs = [
  {
    id: "life",
    number: "01",
    label: "Seguro de vida",
    title: "Una forma de dejar protección económica.",
    body:
      "El seguro de vida puede pagar dinero a tus beneficiarios si tú falleces. Ese dinero puede ayudar con gastos de funeral, renta, deudas, comida, hijos o necesidades importantes.",
    bullets: [
      "Tú eliges a quién quieres proteger",
      "La compañía revisa edad, salud y cobertura",
      "Si se aprueba, pagas una prima mensual",
      "Si algo pasa, tus beneficiarios pueden reclamar el beneficio",
    ],
  },
  {
    id: "term",
    number: "02",
    label: "Seguro temporal",
    title: "Protección por una etapa específica.",
    body:
      "El seguro temporal cubre por cierto tiempo, por ejemplo 10, 20 o 30 años. Muchas familias lo usan para proteger años importantes: hijos pequeños, hipoteca, renta o deudas.",
    bullets: [
      "Suele enfocarse en precio accesible",
      "Tiene duración específica",
      "Puede proteger años de responsabilidad familiar",
      "No siempre está diseñado para durar toda la vida",
    ],
  },
  {
    id: "permanent",
    number: "03",
    label: "Permanente",
    title: "Cobertura diseñada para durar más tiempo.",
    body:
      "El seguro permanente puede estar diseñado para durar más tiempo, dependiendo del producto y los pagos. Algunas opciones pueden incluir valor en efectivo.",
    bullets: [
      "Puede durar más que un seguro temporal",
      "Suele costar más",
      "Puede tener beneficios adicionales",
      "Conviene revisarlo con un agente",
    ],
  },
  {
    id: "preneed",
    number: "04",
    label: "Pre funeral",
    title: "Decisiones tomadas con calma, no con dolor.",
    body:
      "La planificación funeral anticipada ayuda a dejar instrucciones claras sobre tus deseos. La meta es evitar que tu familia tome decisiones importantes con presión o confusión.",
    bullets: [
      "Puedes dejar preferencias claras",
      "Puede reducir estrés familiar",
      "Puedes preguntar qué incluye y qué no",
      "Es diferente al seguro de vida",
    ],
  },
];

export default function PetraEducationTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) || tabs[0];

  return (
    <section id="aprende" className="border-t border-[#d8c8b2] bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9b672d]">
              Explicado simple
            </p>

            <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16] md:text-7xl">
              Entiende antes de decidir.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-9 text-[#4f5a54]">
              La confianza nace cuando el cliente entiende. Esta sección hace
              que PETRA se sienta educativa, no agresiva.
            </p>
          </div>

          <div className="border-y border-[#111a16]">
            <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
              <div className="border-b border-[#111a16] lg:border-b-0 lg:border-r">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeId;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveId(tab.id)}
                      className={`flex w-full items-center gap-4 border-b border-[#d8c8b2] px-5 py-5 text-left last:border-b-0 ${
                        isActive ? "bg-[#111a16] text-white" : "bg-[#f6efe4] text-[#111a16] hover:bg-white"
                      }`}
                    >
                      <span className="font-serif text-3xl font-black text-[#9b672d]">
                        {tab.number}
                      </span>
                      <span className="text-xs font-black uppercase tracking-[0.16em]">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 md:p-10">
                <p className="font-serif text-6xl font-black text-[#c28a48]">
                  {active.number}
                </p>

                <h3 className="mt-5 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16]">
                  {active.title}
                </h3>

                <p className="mt-7 text-base leading-8 text-[#4f5a54]">
                  {active.body}
                </p>

                <div className="mt-8 divide-y divide-[#d8c8b2] border-y border-[#d8c8b2]">
                  {active.bullets.map((bullet) => (
                    <p key={bullet} className="py-4 text-sm font-bold leading-6 text-[#111a16]">
                      — {bullet}
                    </p>
                  ))}
                </div>

                <a
                  href="#orientacion"
                  className="mt-8 inline-flex border border-[#111a16] bg-[#111a16] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#9b672d] hover:bg-[#9b672d]"
                >
                  Pedir explicación
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}