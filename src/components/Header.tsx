import mark from '../assets/mark.png';
import logoMark from '../assets/logo-mark.png';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={mark} alt="GymClub" className="h-6 w-auto" />
          <img src={logoMark} alt="GymClub" className="h-[76px] w-auto" />
        </div>
        
        <nav className="hidden md:flex items-center gap-2">
          <a href="#solucao" className="px-5 py-2.5 rounded-full text-base font-title font-light text-gray-900 hover:bg-gym-yellow hover:font-bold transition-colors">A Solução</a>
          <a href="#vantagens" className="px-5 py-2.5 rounded-full text-base font-title font-light text-gray-900 hover:bg-gym-yellow hover:font-bold transition-colors">Vantagens</a>
          <a href="#como-funciona" className="px-5 py-2.5 rounded-full text-base font-title font-light text-gray-900 hover:bg-gym-yellow hover:font-bold transition-colors">Como Funciona</a>
          <a href="#calculadora" className="px-5 py-2.5 rounded-full text-base font-title font-light text-gray-900 hover:bg-gym-yellow hover:font-bold transition-colors">Calculadora</a>
        </nav>

        <div className="flex items-center gap-4">

          <a href="#cadastro" className="bg-gradient-green hover:opacity-90 text-gray-900 px-6 py-2.5 rounded-full text-sm font-title font-bold transition-all hover:shadow-lg hover:shadow-gym-green/20 hover:-translate-y-0.5 block text-center">
            Cadastrar minha empresa
          </a>
        </div>
      </div>
    </header>
  );
}
