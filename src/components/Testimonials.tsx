import { Star } from 'lucide-react';

type Review = {
  name: string;
  initials: string;
  avatarBg: string;
  body: string;
};

const reviews: Review[] = [
  {
    name: 'Mariana Alves',
    initials: 'MA',
    avatarBg: 'bg-gradient-orange',
    body: 'A gente pagava por 180 colaboradores e menos de 50 usavam. No primeiro mês com o GymClub a conta caiu pela metade, sem tirar o benefício de ninguém.',
  },
  {
    name: 'Rafael Bittencourt',
    initials: 'RB',
    avatarBg: 'bg-gradient-green',
    body: 'O time é todo remoto, espalhado por cinco estados. Era impossível fechar com uma rede só. Aqui cada um treina perto de casa e eu não administro nada.',
  },
  {
    name: 'Carolina Dias',
    initials: 'CD',
    avatarBg: 'bg-gradient-yellow',
    body: 'O onboarding levou uma tarde. Mandei a planilha, no dia seguinte estava liberado. Nunca tinha implantado um benefício sem reunião de alinhamento.',
  },
  {
    name: 'Thiago Nakamura',
    initials: 'TN',
    avatarBg: 'bg-gradient-teal',
    body: 'O que me convenceu foi previsibilidade: eu defino o teto da coparticipação e pago só o uso real. O caixa parou de levar susto todo fechamento.',
  },
  {
    name: 'Juliana Prado',
    initials: 'JP',
    avatarBg: 'bg-gradient-orange-yellow',
    body: 'Somos 14 pessoas e todo fornecedor exigia mínimo de 50 vidas. O GymClub foi o único que topou começar do nosso tamanho.',
  },
  {
    name: 'Eduardo Ramos',
    initials: 'ER',
    avatarBg: 'bg-gradient-yellow-green',
    body: 'A adesão saiu de 12% para 47% em três meses. Como o desconto aparece direto na mensalidade, o pessoal entendeu o valor na hora.',
  },
];

function ReviewCard({ name, initials, avatarBg, body }: Review) {
  return (
    <div className="w-[290px] sm:w-[340px] shrink-0 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 shrink-0 ${avatarBg} rounded-full flex items-center justify-center text-sm font-title font-bold text-gray-900`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-title font-bold text-gray-900 truncate">{name}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gym-orange fill-gym-orange" />
        ))}
      </div>

      <p className="text-[13px] sm:text-base font-title font-light text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}

function MarqueeRow({ items }: { items: Review[] }) {
  return (
    <div className="marquee-pause overflow-hidden py-3">
      <div
        className="marquee-track"
        style={{ ['--marquee-duration' as string]: '75s' }}
      >
        {[...items, ...items].map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} {...review} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6">
            Quem já trocou o custo fixo pelo uso real
          </h2>
          <p className="text-sm sm:text-lg font-title font-light text-gray-600">
            Times de RH e financeiro que pararam de pagar por quem não treina.
          </p>
        </div>
      </div>

      <div className="relative">
        <MarqueeRow items={reviews} />

        {/* Máscaras laterais para os cards entrarem e saírem suavemente */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 md:w-48 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 md:w-48 bg-gradient-to-l from-[#FAFAFA] to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mt-15 mb-30 gap-4">
            <a href="#cadastro" className="w-full sm:w-auto bg-gradient-green hover:opacity-90 text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-base font-title font-bold transition-all hover:shadow-xl hover:shadow-gym-green/30 hover:-translate-y-1 flex items-center justify-center gap-2">
              Quero cadastrar minha empresa
            </a>
          </div>
          
    </section>
  );
}
