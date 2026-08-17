import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import bgEmpresa from '../assets/bg-empresa.png';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-gym-orange">
      {/* Fundo da marca */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${bgEmpresa})` }}
        aria-hidden="true"
      />

      <div className="max-w-[950px] mt-6 sm:mt-12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <h1 className="text-[26px] sm:text-5xl md:text-7xl font-title font-extrabold text-white tracking-tight leading-tight mb-8 sm:mb-12">
            O  benefício que <br />
            <span className="text-gym-orange">não cobra</span> por quem não usa.
          </h1>

          <p className="text-sm sm:text-xl font-title font-normal text-gray-800 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Implemente uma cultura de saúde sem carregar um custo cego. No GymClub, sua empresa só paga a coparticipação dos colaboradores que realmente treinam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#calculadora" className="w-full sm:w-auto bg-gradient-green hover:opacity-90 text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-base font-title font-bold transition-all hover:shadow-xl hover:shadow-gym-green/30 hover:-translate-y-1 flex items-center justify-center gap-2">
              Simular Economia
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#cadastro" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-base font-title font-bold transition-all hover:border-gray-300">
              Quero cadastrar minha empresa
            </a>
          </div>

          <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-4 text-sm font-title font-light text-gray-900">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-yellow-orange flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-gray-900" />
              </div>
              Taxa zero por cadastro
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-orange flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-gray-900" />
              </div>
              Onboarding em 3 minutos
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-green flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-gray-900" />
              </div>
              Coparticipação flexível
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
