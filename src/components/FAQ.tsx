import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Como funciona o Gymclub para empresas?",
    answer: "A empresa disponibiliza o acesso à plataforma para seus colaboradores, que passam a ter a liberdade de treinar em diferentes academias, de acordo com o plano escolhido. O uso é simples e não exige uma estrutura complexa de gestão por parte da empresa."
  },
  {
    question: "A empresa precisa pagar pelo benefício?",
    answer: "A empresa não paga nenhuma taxa por colaborador cadastrado. É possível realizar o pagamento de um valor por colaborador para se tornar desconto na mensalidade. Como funciona, caso a empresa pague R$10,00 por colaborador, esse valor é revertido em desconto no plano. Se seu colaborador contratar um plano de R$110,00, ele irá sair por R$100,00. Esse formato gera maior percepção do benefício pelos colaboradores, já que a contribuição da empresa impacta diretamente no acesso ao plano. Diferente de outros formatos em que o valor pago serve apenas para liberar o uso do aplicativo, aqui a empresa participa ativamente do benefício, tornando-o mais tangível e relevante para o colaborador."
  },
  {
    question: "Quais as vantagens para a empresa?",
    answer: "O Gymclub permite oferecer um benefício de bem-estar de forma simples e flexível, sem a necessidade de gerenciar contratos complexos ou múltiplos fornecedores. Além disso, contribui para a qualidade de vida dos colaboradores, com impacto positivo em engajamento, produtividade e clima organizacional."
  },
  {
    question: "Para quais empresas o Gymclub é mais indicado?",
    answer: "O Gymclub é ideal para empresas que buscam oferecer um benefício moderno e flexível, especialmente aquelas com equipes híbridas, colaboradores em diferentes regiões ou com rotinas variadas. Também é uma ótima opção para empresas que ainda não possuem um benefício estruturado de bem-estar e querem começar de forma simples."
  },
  {
    question: "O Gymclub substitui outros benefícios?",
    answer: "O Gymclub pode atuar como benefício principal de bem-estar ou complementar outros já existentes. Ele se adapta à estratégia da empresa, podendo ser utilizado como ferramenta de atração, retenção e engajamento de colaboradores."
  },
  {
    question: "Existe uma quantidade mínima de colaboradores para aderir ao Gymclub?",
    answer: "Não. O Gymclub não exige uma quantidade mínima de colaboradores para contratação. Empresas de diferentes portes podem aderir à plataforma, desde equipes menores até estruturas maiores, com a possibilidade de escalar o benefício conforme o crescimento e a adesão dos colaboradores."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-6xl font-title font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Perguntas <span className="text-gradient-orange">Frequentes</span>
          </h2>
          <p className="text-sm sm:text-lg font-title font-light text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre como o GymClub revoluciona o benefício corporativo da sua empresa.
          </p>
        </div>

        {/* FAQ Container matching the provided style */}
        <div className="bg-gray-100 rounded-3xl sm:rounded-[40px] p-3 sm:p-4 md:p-8 shadow-inner border border-gray-200/50">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-3 sm:px-6 py-3 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    {/* Plus/Minus icon positioned on the left as in the reference, but colored orange */}
                    <div className="shrink-0 text-gym-orange">
                      {openIndex === index ? (
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-[13px] sm:text-base md:text-lg font-title font-bold text-gray-900">
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
                      <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-0 ml-6 sm:ml-9 text-[13px] sm:text-base font-title font-light text-gray-600 leading-relaxed">
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
