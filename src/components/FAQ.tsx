import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Como funciona o Gymclub para empresas?",
    answer: "Sua empresa se cadastra gratuitamente e decide o valor da coparticipação. Seus colaboradores ganham acesso a uma ampla rede de academias e você só paga pelos que efetivamente utilizarem o benefício no mês."
  },
  {
    question: "A empresa precisa pagar pelo benefício?",
    answer: "Não há taxa de adesão ou mensalidade fixa para a empresa. Você paga apenas o valor da coparticipação escolhida exclusivamente para os colaboradores que ativamente frequentarem as academias."
  },
  {
    question: "Quais as vantagens para a empresa?",
    answer: "Redução drástica de custos com benefícios ociosos, atração e retenção de talentos, uma equipe mais saudável e engajada, e zero burocracia na gestão do RH."
  },
  {
    question: "Para quais empresas o Gymclub é mais indicado?",
    answer: "Para empresas de todos os tamanhos que desejam oferecer um benefício de saúde flexível, justo e de alto valor percebido, sem arcar com custos de colaboradores inativos."
  },
  {
    question: "O Gymclub substitui outros benefícios?",
    answer: "O Gymclub pode atuar como o benefício principal de bem-estar ou complementar outros pacotes de saúde da sua empresa, oferecendo flexibilidade total para o seu RH."
  },
  {
    question: "Existe uma quantidade mínima de colaboradores para aderir ao Gymclub?",
    answer: "Não! Acreditamos na democratização do bem-estar. Empresas de qualquer tamanho podem se cadastrar e oferecer o Gymclub para suas equipes, pagando apenas pelo uso."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-title font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Perguntas <span className="text-gradient-orange">Frequentes</span>
          </h2>
          <p className="text-lg font-title font-light text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre como o GymClub revoluciona o benefício corporativo da sua empresa.
          </p>
        </div>

        {/* FAQ Container matching the provided style */}
        <div className="bg-gray-100 rounded-[40px] p-4 md:p-8 shadow-inner border border-gray-200/50">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    {/* Plus/Minus icon positioned on the left as in the reference, but colored orange */}
                    <div className="shrink-0 text-gym-orange">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5" strokeWidth={3} />
                      ) : (
                        <Plus className="w-5 h-5" strokeWidth={3} />
                      )}
                    </div>
                    <span className="font-title font-bold text-gray-900 md:text-lg">
                      {faq.question}
                    </span>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 ml-9 font-title font-light text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
