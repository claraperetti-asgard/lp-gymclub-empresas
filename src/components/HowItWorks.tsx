import { motion } from 'motion/react';

const steps = [
  {
    num: '1',
    bg: 'bg-gradient-yellow-orange',
    title: 'Preencha o formulário',
    desc: 'Leva menos de 3 minutos para iniciar a parceria.',
  },
  {
    num: '2',
    bg: 'bg-gradient-orange',
    title: 'Onboarding Rápido',
    desc: 'Receba a confirmação e faça a ativação com nossa equipe.',
  },
  {
    num: '3',
    bg: 'bg-gradient-green',
    title: 'Benefício Liberado',
    desc: 'Disponibilize a plataforma para seus colaboradores treinarem.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 sm:py-24 text-gray-900 relative overflow-x-clip">
      {/* glow que atravessa para a section de baixo, sem corte na borda */}
      <div className="absolute top-0 right-0 w-[800px] h-[1300px] bg-gradient-yellow-orange opacity-10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
           
          <h2 className="text-xl sm:text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6">
            Rápido e sem burocracia
          </h2>
          <p className="text-sm sm:text-lg font-title font-light text-gray-600">
            Esqueça implementações que demoram meses. Com o GymClub, sua equipe tem acesso ao benefício em poucos dias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:border-gray-200 transition-all"
            >
             
              <div className={`w-12 h-12 ${step.bg} rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 text-gray-900 shadow-sm`}>
                {step.num}
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-3 relative z-10 text-gray-900">{step.title}</h3>
              <p className="text-[13px] sm:text-base font-title font-light text-gray-600 relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
