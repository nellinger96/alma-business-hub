import { useState } from "react";

type HelperOption = {
  id: string;
  label: string;
  title: string;
  serviceValue: string;
  description: string;
  checklist: string[];
  nextStep: string;
};

const options: HelperOption[] = [
  {
    id: "taxes",
    label: "Voy a declarar taxes",
    title: "Taxes / Income Tax",
    serviceValue: "Taxes / Income Tax",
    description:
      "Te ayudamos con declaraciones personales, W-2, 1099, ingresos en efectivo y orientación antes de declarar.",
    checklist: [
      "W-2, 1099 o comprobantes de ingresos",
      "ID o licencia",
      "Social Security o ITIN",
      "Información de dependientes",
      "Gastos importantes si trabajas por tu cuenta",
    ],
    nextStep: "Pedir ayuda con taxes",
  },
  {
    id: "itin",
    label: "Necesito ITIN",
    title: "ITIN",
    serviceValue: "ITIN",
    description:
      "Te orientamos para obtener o renovar tu ITIN y entender qué documentos podrías necesitar.",
    checklist: [
      "Identificación válida",
      "Pasaporte si lo tienes",
      "Declaración de impuestos si aplica",
      "Información personal actualizada",
      "Preguntas sobre renovación o primera vez",
    ],
    nextStep: "Pedir ayuda con ITIN",
  },
  {
    id: "work",
    label: "Permiso de trabajo",
    title: "Permisos de trabajo",
    serviceValue: "Permisos de trabajo",
    description:
      "Te ayudamos a entender requisitos, documentos y próximos pasos para tu permiso de trabajo.",
    checklist: [
      "Identificación",
      "Documentos migratorios que tengas",
      "Cartas o avisos recibidos",
      "Fechas importantes",
      "Preguntas sobre tu situación",
    ],
    nextStep: "Pedir orientación",
  },
  {
    id: "family",
    label: "Trámite familiar",
    title: "Peticiones familiares",
    serviceValue: "Peticiones familiares",
    description:
      "Te orientamos con procesos familiares importantes y te explicamos qué camino puede tener sentido.",
    checklist: [
      "Identificación de las personas involucradas",
      "Actas o documentos familiares",
      "Fechas importantes",
      "Cartas o documentos oficiales",
      "Resumen de tu situación",
    ],
    nextStep: "Hablar con Alianza",
  },
  {
    id: "docs",
    label: "Documento / traducción",
    title: "Actas, apostilla, carta poder o traducciones",
    serviceValue: "Actas / Apostilla / Carta Poder",
    description:
      "Te ayudamos con documentos importantes, traducciones, apostillas, cartas poder y notary public.",
    checklist: [
      "Documento original",
      "País o autoridad donde se usará",
      "Fecha límite si tienes una",
      "Si necesitas traducción español / inglés",
      "Cualquier instrucción recibida",
    ],
    nextStep: "Pedir ayuda con documentos",
  },
  {
    id: "unsure",
    label: "No sé qué necesito",
    title: "No estoy seguro",
    serviceValue: "No estoy seguro",
    description:
      "Está bien si no sabes el nombre del trámite. Cuéntanos qué está pasando y te guiamos en español.",
    checklist: [
      "Qué quieres resolver",
      "Qué documentos tienes",
      "Si recibiste una carta o aviso",
      "Cuándo lo necesitas",
      "Cómo prefieres que te contactemos",
    ],
    nextStep: "Quiero que me orienten",
  },
];

export default function AlianzaServiceHelper() {
  const [activeId, setActiveId] = useState(options[0].id);
  const active = options.find((option) => option.id === activeId) || options[0];

  function sendToForm(serviceValue: string) {
    window.dispatchEvent(
      new CustomEvent("alianza:set-service", {
        detail: { service: serviceValue },
      })
    );

    document.getElementById("ayuda")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="guia-rapida" className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
              Guía rápida
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight text-[#07164f] md:text-6xl">
              ¿Qué trámite necesitas?
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-[#46506f]">
            Toca una opción y te mostramos qué podría aplicar. No tienes que
            saber el nombre exacto del trámite.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {options.map((option) => {
              const isActive = option.id === activeId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveId(option.id)}
                  className={`rounded-2xl px-5 py-4 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-[#07164f] text-white shadow-lg"
                      : "border border-[#dfe3f0] bg-[#f7f8fc] text-[#07164f] hover:border-[#f58220] hover:bg-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[2.5rem] bg-[#07164f] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#07164f] p-7 text-white md:p-10">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ffad62]">
                  Recomendación
                </p>

                <h3 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                  {active.title}
                </h3>

                <p className="mt-6 text-base leading-8 text-white/75">
                  {active.description}
                </p>

                <button
                  type="button"
                  onClick={() => sendToForm(active.serviceValue)}
                  className="mt-8 rounded-full bg-[#f58220] px-7 py-4 text-sm font-black text-white transition hover:bg-[#e87312]"
                >
                  {active.nextStep}
                </button>
              </div>

              <div className="bg-[#f7f8fc] p-7 md:p-10">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f58220]">
                  Qué puedes tener listo
                </p>

                <div className="mt-6 space-y-3">
                  {active.checklist.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white px-5 py-4 text-sm font-bold leading-6 text-[#07164f] shadow-sm"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-[#46506f]">
                  Esta lista es solo una guía. Si no tienes todo, igual puedes
                  mandar tu solicitud y te explicamos qué sigue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}