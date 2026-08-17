import { Briefcase, MapPin, Target } from 'lucide-react';
import bgPraQuem from '../assets/bg-praquem.png';

export default function TargetAudience() {
  return (
    <section id="empresas" className="relative overflow-hidden py-16 sm:py-24">
      {/* imagem de fundo desfocada */}
      <div
        className="absolute -inset-10 bg-cover bg-center blur-[0.05px]"
        style={{ backgroundImage: `url(${bgPraQuem})` }}
        aria-hidden="true"
      />
      {/* véu laranja translúcido para garantir a leitura do texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,136,63,0.26), rgba(255,172,63,0.14)), rgba(255,255,255,0.84)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
          
          <div className="lg:w-1/2">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6">
              O GymClub é para quais empresas?
            </h2>
            <p className="text-sm sm:text-lg font-title font-normal text-gray-800 mb-8 leading-relaxed">
              O Gymclub é ideal para empresas que buscam oferecer um benefício moderno e flexível, especialmente aquelas com:
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-orange rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="text-gray-900 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-lg">Equipes Híbridas ou Remotas</h4>
                  <p className="text-[13px] sm:text-base font-title font-light text-gray-800 mt-1">Colaboradores em diferentes regiões com rotinas variadas, que precisam de liberdade para treinar onde quiserem.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-yellow rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Briefcase className="text-gray-900 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-lg">Iniciando na Saúde Corporativa</h4>
                  <p className="text-[13px] sm:text-base font-title font-light text-gray-800 mt-1">Ótima opção para empresas que ainda não possuem um benefício estruturado de bem-estar e querem começar de forma simples.</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-green rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Target className="text-gray-900 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-lg">Foco em Crescimento</h4>
                  <p className="text-[13px] sm:text-base font-title font-light text-gray-800 mt-1">Escalável para acompanhar o crescimento da sua empresa, desde equipes menores até estruturas maiores, sem burocracia.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-xl" />
              <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[40px] border border-gray-100 relative shadow-2xl shadow-gray-200/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gym-orange rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                    <span className="text-4xl sm:text-5xl leading-none text-white font-sans font-extrabold">0</span>
                  </div>
                  <h3 className="text-base sm:text-2xl font-bold text-gray-900 mb-4">Quantidade Mínima</h3>
                  <p className="font-title font-light text-black text-sm sm:text-lg">
                    Diferente do mercado tradicional, não exigimos um número mínimo de colaboradores para contratação.
                  </p>
                  <a href="#cadastro" className="mt-8 inline-block bg-gradient-green hover:opacity-90 text-gray-900 px-6 sm:px-8 py-3 rounded-full text-[13px] sm:text-base font-title font-bold transition-all hover:shadow-lg hover:shadow-gym-green/20">
                    Quero cadastrar minha empresa
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
