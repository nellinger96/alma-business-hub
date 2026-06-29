import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createWebsiteLead } from "../../services/leadService";

const needs = [
  "Seguro de vida",
  "Servicios funerales anticipados",
  "Seguro de vida + planificación funeral",
  "Medicare (noviembre)",
  "No estoy seguro",
];

export default function PetraGuidedQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function handleServiceSelected(event: Event) {
      const customEvent = event as CustomEvent<{
        service: string;
        note?: string;
      }>;

      setSelectedNeed(customEvent.detail.service);

      if (customEvent.detail.note) {
        setNotes(customEvent.detail.note);
      }
    }

    window.addEventListener("petra:set-service", handleServiceSelected);

    return () => {
      window.removeEventListener("petra:set-service", handleServiceSelected);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const serviceName = selectedNeed || String(formData.get("need") || "");
    const ageRange = String(formData.get("ageRange") || "");
    const budget = String(formData.get("budget") || "");
    const healthComfort = String(formData.get("healthComfort") || "");
    const contactMethod = String(formData.get("contactMethod") || "");
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const bestTime = String(formData.get("bestTime") || "");

    const message = [
      `Necesidad: ${serviceName}`,
      `Rango de edad: ${ageRange}`,
      `Presupuesto mensual cómodo: ${budget}`,
      `Salud general: ${healthComfort}`,
      `Método de contacto preferido: ${contactMethod}`,
      `Mejor hora para contactar: ${bestTime || "No especificado"}`,
      `Notas: ${notes || "Sin notas adicionales"}`,
    ].join("\n");

    setSubmitted(false);
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const lead = await createWebsiteLead({
        business: "petra",
        serviceName,
        fullName,
        phone,
        email: "",
        message,
        source: "PETRA Insurance Website Guided Quote Form",
      });

      console.log("Real PETRA lead created:", lead);

      setSubmitted(true);
      setSelectedNeed("");
      setNotes("");
      form.reset();
    } catch (error) {
      console.error("Could not create PETRA lead:", error);
      setErrorMessage(
        "No pudimos enviar tu solicitud en este momento. Intenta otra vez o llama directamente a la oficina."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="orientacion" className="bg-[#f6efe4] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl border-y border-[#111a16] py-12 text-center">
          <p className="font-serif text-7xl font-black text-[#9b672d]">✓</p>

          <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16]">
            Solicitud recibida.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4f5a54]">
            Un agente de PETRA puede contactarte en español para explicarte
            opciones sin presión.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedNeed("");
              setNotes("");
              setErrorMessage("");
            }}
            className="mt-8 border border-[#111a16] bg-[#111a16] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white"
          >
            Enviar otra solicitud
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="orientacion" className="bg-[#f6efe4] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9b672d]">
              Orientación
            </p>

            <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16] md:text-7xl">
              Una conversación seria. No una venta agresiva.
            </h2>

            <p className="mt-8 text-lg leading-9 text-[#4f5a54]">
              Responde unas preguntas rápidas. Esto no es una compra automática.
              Es para que un agente sepa cómo ayudarte mejor.
            </p>

            <div className="mt-10 border-l-4 border-[#9b672d] pl-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#111a16]">
                Promesa de experiencia
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f5a54]">
                Claro. En español. Sin presión. Con respeto por la decisión de
                cada familia.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-y border-[#111a16] py-4">
            {errorMessage && (
              <div className="mb-5 border border-red-300 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-0 md:grid-cols-2">
              <FieldBlock label="¿Qué quieres revisar?">
                <select
                  required
                  name="need"
                  value={selectedNeed}
                  onChange={(event) => setSelectedNeed(event.target.value)}
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  {needs.map((need) => (
                    <option key={need} value={need}>
                      {need}
                    </option>
                  ))}
                </select>
              </FieldBlock>

              <FieldBlock label="Rango de edad">
                <select
                  required
                  name="ageRange"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none"
                >
                  <option value="">Selecciona</option>
                  <option>18–29</option>
                  <option>30–39</option>
                  <option>40–49</option>
                  <option>50–59</option>
                  <option>60–69</option>
                  <option>70+</option>
                </select>
              </FieldBlock>

              <FieldBlock label="Presupuesto mensual cómodo">
                <select
                  required
                  name="budget"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none"
                >
                  <option value="">Selecciona</option>
                  <option>Lo más económico posible</option>
                  <option>$25–$50</option>
                  <option>$50–$100</option>
                  <option>$100+</option>
                  <option>No estoy seguro</option>
                </select>
              </FieldBlock>

              <FieldBlock label="Salud general">
                <select
                  required
                  name="healthComfort"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none"
                >
                  <option value="">Selecciona</option>
                  <option>Buena salud</option>
                  <option>Salud promedio</option>
                  <option>Tengo condiciones de salud</option>
                  <option>Prefiero hablarlo en privado</option>
                </select>
              </FieldBlock>

              <FieldBlock label="Nombre">
                <input
                  required
                  name="fullName"
                  placeholder="Tu nombre"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none placeholder:text-[#111a16]/35"
                />
              </FieldBlock>

              <FieldBlock label="Teléfono">
                <input
                  required
                  name="phone"
                  placeholder="(555) 555-5555"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none placeholder:text-[#111a16]/35"
                />
              </FieldBlock>

              <FieldBlock label="¿Cómo prefieres contacto?">
                <select
                  required
                  name="contactMethod"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none"
                >
                  <option value="">Selecciona</option>
                  <option>Llamada</option>
                  <option>Texto</option>
                  <option>WhatsApp</option>
                </select>
              </FieldBlock>

              <FieldBlock label="Mejor hora">
                <input
                  name="bestTime"
                  placeholder="Ejemplo: después de las 5 PM"
                  className="w-full bg-transparent py-3 text-base font-semibold text-[#111a16] outline-none placeholder:text-[#111a16]/35"
                />
              </FieldBlock>
            </div>

            <div className="border-b border-[#d8c8b2] px-0 py-6 md:px-6">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-[#9b672d]">
                Cuéntanos un poco más
              </label>

              <textarea
                name="notes"
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Opcional"
                className="mt-3 w-full bg-transparent text-base font-semibold leading-7 text-[#111a16] outline-none placeholder:text-[#111a16]/35"
              />
            </div>

            <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-xs leading-6 text-[#4f5a54]">
                Sin presión. No es compra automática. Un agente te explica
                opciones en español.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="border border-[#111a16] bg-[#111a16] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#9b672d] hover:bg-[#9b672d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Solicitar orientación"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-[#d8c8b2] px-0 py-6 md:border-r md:px-6 even:md:border-r-0">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-[#9b672d]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}