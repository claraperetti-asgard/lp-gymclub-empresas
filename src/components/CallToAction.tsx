import { Users, PiggyBank, ShieldCheck, Dumbbell, TrendingUp, Zap } from 'lucide-react';

export default function CallToAction() {
  const floatingIcons = [
    { icon: <ShieldCheck className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-green', position: 'top-[10%] left-[10%] md:left-[15%]', animation: 'animate-float-slow' },
    { icon: <Dumbbell className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-orange', position: 'bottom-[15%] left-[5%] md:left-[20%]', animation: 'animate-float-reverse' },
    { icon: <Users className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-teal', position: 'top-[15%] right-[10%] md:right-[15%]', animation: 'animate-float' },
    { icon: <TrendingUp className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-yellow-orange', position: 'bottom-[20%] right-[5%] md:right-[20%]', animation: 'animate-float-slow' },
    { icon: <PiggyBank className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-yellow-green', position: 'top-1/2 -translate-y-1/2 left-[2%] md:left-[8%]', animation: 'animate-float-reverse' },
    { icon: <Zap className="w-8 h-8 text-gray-900" />, color: 'bg-gradient-orange-yellow', position: 'top-1/2 -translate-y-1/2 right-[2%] md:right-[8%]', animation: 'animate-float' },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-yellow-orange opacity-10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 hidden sm:block pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} ${item.color} ${item.animation} w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)]`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-title font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
          Pare de pagar por quem <span className="text-gradient-orange">não utiliza</span> o benefício.
        </h2>

        <p className="text-xl md:text-3xl font-title font-light text-gray-600 mb-12">
          Transforme seu caixa e engaje seu time com o{' '}
          <span className="text-gradient-orange font-bold">GymClub</span>.
        </p>
        
        <a
          href="#cadastro"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-10 py-5 rounded-full text-lg font-title font-bold transition-all hover:shadow-2xl hover:shadow-gray-900/20 hover:-translate-y-1"
        >
          Cadastrar minha empresa
        </a>
      </div>
    </section>
  );
}