import { MessageCircle } from 'lucide-react';
import mark from '../assets/mark.png';
import logoMark from '../assets/logo-mark.png';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1.2fr] gap-10 md:gap-16 lg:gap-20">

          {/* Marca */}
          <div>
            <a
              href="#inicio"
              aria-label="Voltar ao início"
              className="flex items-center gap-2 mb-6 w-fit rounded-full transition-opacity hover:opacity-80"
            >
              <img
                src={mark}
                alt="GymClub"
                className="h-6 w-auto"
              />

              <img
                src={logoMark}
                alt="GymClub"
                className="h-12 w-auto object-contain"
              />
            </a>

            <p className="font-title font-light text-sm leading-relaxed text-gray-500 max-w-xs">
              O benefício corporativo inteligente.
              Sem taxas ocultas, sem gestão complexa.
              Pague apenas pelo que sua equipe usar.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">
              Navegação
            </h4>

            <ul className="space-y-4 text-sm font-title font-light">
              <li>
                <a
                  href="#vantagens"
                  className="text-gray-500 hover:text-gym-orange transition-colors duration-300"
                >
                  Vantagens
                </a>
              </li>

              <li>
                <a
                  href="#como-funciona"
                  className="text-gray-500 hover:text-gym-orange transition-colors duration-300"
                >
                  Como funciona
                </a>
              </li>

              <li>
                <a
                  href="#calculadora"
                  className="text-gray-500 hover:text-gym-orange transition-colors duration-300"
                >
                  Simular economia
                </a>
              </li>
            </ul>
          </div>

          {/* Para empresas */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">
              Para empresas
            </h4>

            <p className="text-sm font-title font-light leading-relaxed text-gray-500 max-w-sm mb-6">
              Quer levar o GymClub para sua equipe?
              Fale diretamente com nosso atendimento comercial.
            </p>

            <a
              href="https://wa.me/5543991831438?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20GymClub%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-title font-medium text-gray-800 transition-all duration-300 hover:text-gym-orange"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-gym-orange">
                <MessageCircle
                  size={17}
                  className="text-gray-800 transition-colors duration-300 group-hover:text-white"
                />
              </span>

              <span>
                <span className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Contato comercial
                </span>

                <span className="block">
                  (43) 99183-1438
                </span>
              </span>
            </a>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-100">
          <p className="text-xs font-title font-light text-gray-400">
            © {new Date().getFullYear()} GymClub. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}