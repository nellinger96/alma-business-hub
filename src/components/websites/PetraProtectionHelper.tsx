import { useState } from "react";

type HelperOption = {
  id: string;
  label: string;
  title: string;
  serviceValue: string;
  description: string;
  recommendation: string;
  checklist: string[];
  note: string;
  nextStep: string;
};

const options: HelperOption[] = [
  {
    id: "family",
    label: "Proteger a mi familia",
    title: "Seguro de vida",
    serviceValue: "Seguro de vida",
    description:
      "El seguro de vida puede dejar dinero a tus beneficiarios si tú falleces. Ese dinero puede ayudar con renta, deudas, comida, hijos, funeral o gastos importantes.",
    recommendation:
      "Tiene sentido si tienes hijos, pareja, deudas, renta, hipoteca o personas que dependen de ti.",
    checklist: [
      "Edad aproximada",
      "Personas que dependen de ti",
      "Presupuesto mensual cómodo",
      "Deudas o gastos importantes",
      "A quién quieres nombrar beneficiario",
    ],
    note: "Estoy interesado en seguro de vida para proteger a mi familia.",
    nextStep: "Orientarme",
  },
  {
    id: "funeral",
    label: "Cubrir gastos funerales",
    title: "Cobertura para gasto final",
    serviceValue: "Seguro de vida",
    description:
      "Muchas familias buscan una protección para que los gastos funerales no caigan de golpe sobre sus seres queridos.",
    recommendation:
      "Tiene sentido si tu prioridad es dejar dinero disponible para funeral, entierro, cremación, transporte o gastos familiares.",
    checklist: [
      "Presupuesto mensual",
      "Edad aproximada",
      "Salud general",
      "Cantidad que quieres dejar",
      "Quién recibiría el beneficio",
    ],
    note: "Me interesa cobertura para gastos funerales o gasto final.",
    nextStep: "Ver opciones",
  },
  {
    id: "preneed",
    label: "Dejar todo planeado",
    title: "Planificación funeral anticipada",
    serviceValue: "Servicios funerales anticipados",
    description:
      "La planificación funeral anticipada ayuda a dejar instrucciones claras para que tu familia no tenga que decidir todo durante un momento doloroso.",
    recommendation:
      "Tiene sentido si quieres elegir con calma y dejar claridad sobre tus deseos.",
    checklist: [
      "Entierro o cremación",
      "Servicio religioso o familiar",
      "Lugar del servicio",
      "Transporte a otro país",
      "Quién debe conocer tus decisiones",
    ],
    note: "Quiero información sobre servicios funerales anticipados.",
    nextStep: "Planear con calma",
  },
  {
    id: "compare",
    label: "Comparar opciones",
    title: "Seguro de vida + pre funeral",
    serviceValue: "Seguro de vida + planificación funeral",
    description:
      "No son lo mismo. El seguro de vida puede dejar dinero; la planificación funeral ayuda a dejar instrucciones y servicios preparados.",
    recommendation:
      "Tiene sentido si quieres entender diferencias antes de tomar una decisión.",
    checklist: [
      "Qué te preocupa más",
      "Presupuesto mensual",
      "Preferencias funerales",
      "Familia o dependientes",
      "Preguntas que quieres aclarar",
    ],
    note: "Quiero comparar seguro de vida y planificación funeral.",
    nextStep: "Comparar",
  },
  {
    id: "unsure",
    label: "No sé qué necesito",
    title: "Orientación personalizada",
    serviceValue: "No estoy seguro",
    description:
      "No necesitas saber el nombre del producto. Solo necesitas explicar qué te preocupa y un agente puede guiarte en español.",
    recommendation:
      "Tiene sentido si quieres claridad antes de hablar de precios o aplicaciones.",
    checklist: [
      "Tu preocupación principal",
      "Edad aproximada",
      "Presupuesto cómodo",
      "Familia dependiente",
      "Mejor forma de contacto",
    ],
    note: "No estoy seguro de qué necesito. Quiero orientación.",
    nextStep: "Quiero claridad",
  },
];

export default function PetraProtectionHelper() {
  const [activeId, setActiveId] = useState(options[0].id);
  const active = options.find((option) => option.id === activeId) || options[0];

  function sendToForm() {
    window.dispatchEvent(
      new CustomEvent("petra:set-service", {
        detail: {
          service: active.serviceValue,
          note: active.note,
        },
      })
    );

    document.getElementById("orientacion")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="guia" className="bg-[#f6efe4] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9b672d]">
              Guía interactiva
            </p>

            <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16] md:text-7xl">
              ¿Qué estás tratando de proteger?
            </h2>

            <p className="mt-8 text-lg leading-9 text-[#4f5a54]">
              Toca una opción. PETRA debe sentirse como una conversación
              honesta, no como una venta.
            </p>
          </div>

          <div className="border-y border-[#111a16]">
            <div className="grid lg:grid-cols-[0.45fr_0.55fr]">
              <div className="border-b border-[#111a16] lg:border-b-0 lg:border-r">
                {options.map((option, index) => {
                  const isActive = option.id === activeId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setActiveId(option.id)}
                      className={`flex w-full items-center gap-5 border-b border-[#d8c8b2] px-5 py-5 text-left transition last:border-b-0 ${
                        isActive ? "bg-[#111a16] text-white" : "text-[#111a16] hover:bg-white"
                      }`}
                    >
                      <span
                        className={`font-serif text-3xl font-black ${
                          isActive ? "text-[#c28a48]" : "text-[#9b672d]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-black uppercase tracking-[0.16em]">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white p-6 md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9b672d]">
                  Podría aplicar
                </p>

                <h3 className="mt-5 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16]">
                  {active.title}
                </h3>

                <p className="mt-6 text-base leading-8 text-[#4f5a54]">
                  {active.description}
                </p>

                <div className="mt-8 border-l-4 border-[#9b672d] pl-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#111a16]">
                    Recomendación simple
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#4f5a54]">
                    {active.recommendation}
                  </p>
                </div>

                <div className="mt-8 border-y border-[#d8c8b2]">
                  {active.checklist.map((item) => (
                    <div key={item} className="border-b border-[#d8c8b2] py-4 last:border-b-0">
                      <p className="text-sm font-bold leading-6 text-[#111a16]">
                        — {item}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={sendToForm}
                  className="mt-8 border border-[#111a16] bg-[#111a16] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#9b672d] hover:bg-[#9b672d]"
                >
                  {active.nextStep}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}