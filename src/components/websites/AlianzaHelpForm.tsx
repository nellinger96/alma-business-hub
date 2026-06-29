import { useEffect, useState, type FormEvent } from "react";
import { createWebsiteLead } from "../../services/leadService";

const services = [
  "Taxes / Income Tax",
  "ITIN",
  "Peticiones familiares",
  "Permisos de trabajo",
  "Custodia de hijos",
  "Divorcios en otros países",
  "Actas / Apostilla / Carta Poder",
  "Traducciones",
  "EDD / Desempleo / Incapacidad",
  "Notary Public",
  "Dual Citizenship",
  "No estoy seguro",
];

export default function AlianzaHelpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function handleServiceSelected(event: Event) {
      const customEvent = event as CustomEvent<{ service: string }>;
      setSelectedService(customEvent.detail.service);
    }

    window.addEventListener("alianza:set-service", handleServiceSelected);

    return () => {
      window.removeEventListener("alianza:set-service", handleServiceSelected);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const serviceName = selectedService || String(formData.get("service") || "");
    const urgency = String(formData.get("urgency") || "");
    const contactMethod = String(formData.get("contactMethod") || "");
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const bestTime = String(formData.get("bestTime") || "");
    const notes = String(formData.get("notes") || "");

    const message = [
      `Urgencia: ${urgency}`,
      `Método de contacto preferido: ${contactMethod}`,
      `Mejor hora para contactar: ${bestTime || "No especificado"}`,
      `Notas: ${notes || "Sin notas adicionales"}`,
    ].join("\n");

    setSubmitted(false);
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const lead = await createWebsiteLead({
        business: "alianza",
        serviceName,
        fullName,
        phone,
        email: "",
        message,
        source: "Alianza Latina Website Help Form",
      });

      console.log("Real Alianza lead created:", lead);

      setSubmitted(true);
      setSelectedService("");
      form.reset();
    } catch (error) {
      console.error("Could not create Alianza lead:", error);
      setErrorMessage(
        "No pudimos enviar tu solicitud en este momento. Intenta otra vez o llama directamente a la oficina."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="ayuda" className="bg-[#f7f8fc] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f58220] text-3xl font-black text-white">
            ✓
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#07164f]">
            Gracias. Recibimos tu mensaje.
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#46506f]">
            Un miembro del equipo de Alianza Latina te contactará en español para
            ayudarte con tu trámite.
          </p>

          <button
            onClick={() => {
              setSelectedService("");
              setSubmitted(false);
            }}
            className="mt-8 rounded-full bg-[#07164f] px-6 py-3 text-sm font-black text-white transition hover:bg-[#030d38]"
          >
            Enviar otra solicitud
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="ayuda" className="bg-[#f7f8fc] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-[#07164f] p-7 text-white md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ffad62]">
                Pide ayuda
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                Cuéntanos qué trámite necesitas.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/75">
                No tienes que saber el nombre exacto del proceso. Mándanos tu
                información and te contactamos en español.
              </p>

              <div className="mt-8 rounded-[2rem] bg-white/10 p-6">
                <p className="font-black text-[#ffad62]">
                  Consulta personalizada
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Taxes, ITIN, documentos, peticiones familiares, permisos de
                  trabajo, traducciones y más.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {errorMessage && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="text-sm font-black text-[#07164f]">
                  ¿Con qué necesitas ayuda?
                </label>

                <select
                  required
                  name="service"
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-black text-[#07164f]">
                    ¿Qué tan pronto necesitas ayuda?
                  </label>

                  <select
                    required
                    name="urgency"
                    className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                  >
                    <option value="">Selecciona</option>
                    <option>Hoy mismo</option>
                    <option>Esta semana</option>
                    <option>Este mes</option>
                    <option>Solo quiero información</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-black text-[#07164f]">
                    ¿Cómo prefieres que te contactemos?
                  </label>

                  <select
                    required
                    name="contactMethod"
                    className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                  >
                    <option value="">Selecciona</option>
                    <option>Llamada</option>
                    <option>Texto</option>
                    <option>WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-black text-[#07164f]">
                    Nombre
                  </label>

                  <input
                    required
                    name="fullName"
                    placeholder="Tu nombre"
                    className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                  />
                </div>

                <div>
                  <label className="text-sm font-black text-[#07164f]">
                    Teléfono
                  </label>

                  <input
                    required
                    name="phone"
                    placeholder="(555) 555-5555"
                    className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-black text-[#07164f]">
                  Mejor hora para contactarte
                </label>

                <input
                  name="bestTime"
                  placeholder="Ejemplo: después de las 4 PM"
                  className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                />
              </div>

              <div className="mt-6">
                <label className="text-sm font-black text-[#07164f]">
                  Cuéntanos un poco más
                </label>

                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Opcional"
                  className="mt-3 w-full rounded-2xl border border-[#dfe3f0] bg-[#f7f8fc] px-4 py-3 text-sm outline-none focus:border-[#f58220]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-full bg-[#f58220] px-6 py-4 text-sm font-black text-white transition hover:bg-[#e87312] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Pedir ayuda"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#46506f]">
                Sin compromiso. Atención en español. Te guiamos paso a paso.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}