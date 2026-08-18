import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import mark from '../assets/mark.png';
import logoMark from '../assets/logo-mark.png';

const navLinks = [
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#empresas', label: 'Empresas' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#calculadora', label: 'Calculadora' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#inicio"
          aria-label="Ir para o início"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
        >
          {/* Abaixo de 300px o símbolo sai e fica só o logotipo, senão ele
              encosta no botão de cadastro. */}
          <img src={mark} alt="GymClub" className="hidden min-[300px]:block h-4 sm:h-6 w-auto shrink-0" />
          <img src={logoMark} alt="GymClub" className="h-9 sm:h-[76px] w-auto shrink-0" />
        </a>

        {/* Só a partir de lg cabe logo + 4 links + botão na mesma linha.
            No tablet (md) os links passavam por cima do logotipo, então até
            lá vale o menu hambúrguer. */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 xl:px-5 py-2.5 rounded-full text-sm xl:text-base font-title font-light text-gray-900 whitespace-nowrap hover:bg-gym-yellow hover:font-bold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">

          <a href="#cadastro" className="bg-gradient-green hover:opacity-90 text-gray-900 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-title font-bold transition-all hover:shadow-lg hover:shadow-gym-green/20 hover:-translate-y-0.5 block text-center whitespace-nowrap">
            <span className="sm:hidden">Cadastrar</span>
            <span className="hidden sm:inline">Cadastrar minha empresa</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-gray-900 hover:bg-gym-yellow transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

       
      {menuOpen && (
        <nav
          id="menu-mobile"
          className="lg:hidden border-t border-gray-200/70 px-4 pb-4 pt-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-2xl text-base font-title font-light text-gray-900 hover:bg-gym-yellow hover:font-bold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
