import { useState } from "react";

const faqs = [
  {
    question: "¿Tengo que comprar algo hoy?",
    answer:
      "No. Primero se trata de entender tu situación, explicarte opciones y ayudarte a decidir con calma.",
  },
  {
    question: "¿Qué diferencia hay entre seguro de vida y pre funeral?",
    answer:
      "El seguro de vida puede dejar dinero a tus beneficiarios. La planificación funeral anticipada ayuda a dejar instrucciones y detalles preparados.",
  },
  {
    question: "¿Puedo calificar si tengo problemas de salud?",
    answer:
      "Depende de la compañía, el producto, edad y situación. Un agente puede revisar opciones sin hacerte sentir juzgado.",
  },
  {
    question: "¿Necesito examen médico?",
    answer:
      "Algunas pólizas piden más información o examen. Otras pueden ser más simples. Depende del producto y la compañía.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende de edad, salud, cobertura, tipo de póliza y compañía. Por eso es mejor pedir orientación antes de prometer un precio.",
  },
  {
    question: "¿Me atienden en español?",
    answer:
      "Sí. La experiencia debe ser clara, humana y en español para que entiendas lo que estás considerando.",
  },
  {
    question: "¿Medicare ya está disponible?",
    answer:
      "Medicare estará disponible en noviembre. Por ahora, PETRA puede recibir interesados y dar seguimiento cuando esté listo.",
  },
];

export default function PetraFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="preguntas" className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9b672d]">
            Preguntas
          </p>

          <h2 className="mt-6 font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111a16] md:text-7xl">
            Lo que muchos piensan, pero no preguntan.
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-9 text-[#4f5a54]">
            Esta parte baja la presión. El cliente siente que PETRA entiende sus
            dudas antes de pedir sus datos.
          </p>
        </div>

        <div className="border-y border-[#111a16]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-[#d8c8b2] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-6 py-6 text-left"
                >
                  <span className="text-xl font-black leading-tight text-[#111a16]">
                    {faq.question}
                  </span>

                  <span className="font-serif text-5xl font-black text-[#9b672d]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="max-w-3xl pb-7 text-base leading-8 text-[#4f5a54]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}