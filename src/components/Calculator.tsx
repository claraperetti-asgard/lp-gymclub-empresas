import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import nivel1 from '../assets/nivel-1.svg';
import nivel2 from '../assets/nivel-2.svg';
import nivel3 from '../assets/nivel-3.svg';

// A carinha acompanha a faixa do plano: nível 1 vai do Clube 1 ao 4,
// nível 2 do 5 ao 8 e nível 3 fecha do 9 ao 12.
const PLAN_CARDS = [
  { name: 'CLUBE 1', price: 39.90, hex: '#ff883f', face: nivel1 },
  { name: 'CLUBE 2', price: 69.90, hex: '#ff883f', face: nivel1 },
  { name: 'CLUBE 3', price: 99.90, hex: '#ff9d3a', face: nivel1 },
  { name: 'CLUBE 4', price: 139.90, hex: '#ffb336', face: nivel1 },
  { name: 'CLUBE 5', price: 169.90, hex: '#f7e92a', face: nivel2 },
  { name: 'CLUBE 6', price: 199.90, hex: '#f7e92a', face: nivel2 },
  { name: 'CLUBE 7', price: 249.90, hex: '#e8ec2b', face: nivel2 },
  { name: 'CLUBE 8', price: 309.90, hex: '#d9f032', face: nivel2 },
  { name: 'CLUBE 9', price: 419.90, hex: '#c2f463', face: nivel3 },
  { name: 'CLUBE 10', price: 549.90, hex: '#c2f463', face: nivel3 },
  { name: 'CLUBE 11', price: 649.90, hex: '#b3f253', face: nivel3 },
  { name: 'CLUBE 12', price: 739.90, hex: '#a1f042', face: nivel3 },
];

// gap-4 entre os cards do carrossel.
const CARD_GAP = 16;

// Teto da coparticipação. R$ 200 cobre por inteiro do Clube 1 ao 6, e é onde o
// slider ainda deixa acertar o valor — acima disso vira um trilho longo demais.
const MAX_CONTRIBUTION = 200;

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const money = (value: number) => brl.format(Number.isFinite(value) ? value : 0);

// No card o "R$" sai de cena para o número respirar, como no site.
const plainBrl = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const amount = (value: number) =>
  plainBrl.format(Number.isFinite(value) ? value : 0);

export default function Calculator() {
  const [hasBenefit, setHasBenefit] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Guardado em ref porque muda a cada pixel do arrasto e não deve
  // re-renderizar; só o snap precisa virar estado, e ele muda duas vezes por
  // arrasto (começo e fim).
  const dragOrigin = useRef({ pointerX: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);

   const [totalEmp, setTotalEmp] = useState<number>(100);
  const [contribution, setContribution] = useState<number>(40);
  const [activeUsers, setActiveUsers] = useState<number>(30);

   const [currentFixedFee, setCurrentFixedFee] = useState<number>(500);
  const [currentFeePerUser, setCurrentFeePerUser] = useState<number>(10);

   const actualGymClubCost = activeUsers * contribution;
  const annualGymClubCost = actualGymClubCost * 12;

   const currentTotalCost = currentFixedFee + (totalEmp * currentFeePerUser);
  const savings = currentTotalCost - actualGymClubCost;

  
  const isSaving = savings > 0;
  const monthlyDelta = Math.abs(savings);
  const annualDelta = monthlyDelta * 12;

   const adoptionRate = totalEmp > 0 ? (activeUsers / totalEmp) * 100 : 0;

   
  const toPositive = (value: string) => Math.max(0, Number(value) || 0);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = carouselRef.current;

    // No toque o próprio navegador já rola; entrar no caminho aqui só
    // atrapalharia a inércia nativa.
    if (!track || event.pointerType === 'touch') return;

    dragOrigin.current = { pointerX: event.clientX, scrollLeft: track.scrollLeft };
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = carouselRef.current;

    if (!track || !dragging) return;

    track.scrollLeft =
      dragOrigin.current.scrollLeft - (event.clientX - dragOrigin.current.pointerX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = carouselRef.current;

    if (!track || !dragging) return;

    setDragging(false);

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const track = carouselRef.current;

    if (!track) return;

    // O card muda de largura em cada breakpoint (85vw, 340px, 380px), então o
    // passo sai da medida real em vez de uma constante que só serve num deles.
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + CARD_GAP : track.clientWidth;

    track.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section id="calculadora" className="relative overflow-x-clip py-24">

      {/* Blur laranja atrás de tudo */}
      <div className="absolute top-[200px] left-0 z-0 w-[800px] h-[900px] bg-gradient-yellow-orange opacity-10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-title font-bold text-gray-900 mb-6 tracking-tight">
            Transforme{' '}
            <span className="text-gray-400 line-through decoration-[#f7e92a] decoration-4">
              custo
            </span>{' '}
            em valor percebido
          </h2>

          <p className="text-sm sm:text-lg font-title font-light text-gray-600">
            Simule o investimento e veja como o GymClub é mais inteligente para o seu caixa.
          </p>
        </div>

        {/* Caixa única que agrupa toda a simulação */}
        <div className="bg-white rounded-[40px] border border-gray-200 shadow-xl shadow-gray-200/40 p-6 md:p-10">

          <div className="flex justify-center mb-8">
            <div className="inline-flex w-full sm:w-auto flex-col sm:flex-row bg-gray-100 border border-gray-200 p-1 rounded-2xl sm:rounded-full items-stretch sm:items-center">

              <button
                onClick={() => setHasBenefit(false)}
                className={`px-4 sm:px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-title font-light transition-all ${
                  !hasBenefit
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black hover:text-gray-900'
                }`}
              >
                Ainda não possuo benefício
              </button>

              <button
                onClick={() => setHasBenefit(true)}
                className={`px-4 sm:px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-title font-light transition-all ${
                  hasBenefit
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black hover:text-gray-900'
                }`}
              >
                Já possuo outro benefício
              </button>

            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Form Panel */}
            <div className="lg:col-span-5 min-w-0 h-full bg-gray-50 p-6 sm:p-8 rounded-[32px] border border-gray-200">

              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-6">
                Configure sua simulação
              </h3>

              <div className="space-y-6">

                {hasBenefit && (
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-4 mb-6">

                    <h4 className="font-bold text-[10px] text-gray-500 uppercase tracking-widest">
                      Seu Cenário Atual
                    </h4>

                    <div>
                      <label className="block text-sm font-title font-light text-gray-700 mb-2">
                        Mensalidade da Plataforma (R$)
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={currentFixedFee}
                        onChange={(e) => setCurrentFixedFee(toPositive(e.target.value))}
                        className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gym-orange focus:border-gym-orange transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-title font-light text-gray-700 mb-2">
                        Taxa por Colaborador Cadastrado (R$)
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={currentFeePerUser}
                        onChange={(e) => setCurrentFeePerUser(toPositive(e.target.value))}
                        className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gym-orange focus:border-gym-orange transition-all outline-none"
                      />

                      <p className="text-xs font-title font-light text-gray-500 mt-2">
                        Valor que a plataforma cobra apenas para liberar o acesso, mesmo de quem não usa.
                      </p>
                    </div>

                  
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-3 border-t border-dashed border-gray-200">
                      <span className="text-xs font-title font-light text-gray-500">
                        Você paga hoje, por mês
                      </span>

                      <span className="text-base font-title font-bold text-gray-900">
                        {money(currentTotalCost)}
                      </span>
                    </div>

                  </div>
                )}

                <div>
                  <label className="block text-sm font-title font-light text-gray-700 mb-2">
                    Total de Colaboradores na Empresa
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={totalEmp}
                    onChange={(e) => {
                      const val = toPositive(e.target.value);
                      setTotalEmp(val);

                      if (activeUsers > val) {
                        setActiveUsers(val);
                      }
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gym-orange focus:border-gym-orange transition-all outline-none"
                  />
                </div>

                <div>
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:items-end mb-2">

                    <label className="block text-sm font-title font-light text-gray-700">
                      Coparticipação da Empresa (R$)
                    </label>

                    <span className="text-sm font-title font-bold text-gym-orange">
                      {money(contribution)}
                    </span>

                  </div>

                  <input
                    type="range"
                    min="0"
                    max={MAX_CONTRIBUTION}
                    step="5"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full accent-gym-orange"
                  />

                  <p className="text-xs font-title font-light text-gray-500 mt-2">
                    Quanto você quer ajudar por colaborador ativo?
                  </p>
                </div>

                <div>
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:items-end mb-2">

                    <label className="block text-sm font-title font-light text-gray-700">
                      Estimativa de Uso
                    </label>

                    <span className="text-sm font-title font-bold text-gray-900">
                      {activeUsers} colaboradores
                      <span className="font-light text-gray-500">
                        {' '}· {adoptionRate.toFixed(0)}%
                      </span>
                    </span>

                  </div>

                  <input
                    type="range"
                    min="0"
                    max={totalEmp}
                    value={activeUsers}
                    onChange={(e) => setActiveUsers(Number(e.target.value))}
                    className="w-full accent-gym-green"
                  />

                  <p className="text-xs font-title font-light text-gray-500 mt-2">
                    Ajuste para ver o custo real baseado na adoção.
                  </p>
                </div>

              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 min-w-0 flex flex-col gap-6">

              {hasBenefit ? (

                <>

                <div className="grid sm:grid-cols-2 gap-6">

                  {/* Custo Atual */}
                  <div className="bg-gray-50 p-6 sm:p-8 rounded-[32px] border border-gray-200 shadow-lg shadow-gray-200/30 relative overflow-hidden sm:min-h-[280px] flex flex-col sm:justify-center">

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-[32px]" />

                    <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      Custo Atual (Outros Apps)
                    </h4>

                    <div className="relative z-10 text-3xl sm:text-4xl font-title font-bold text-gray-400 line-through decoration-2 mb-2">
                      {money(currentTotalCost)}
                    </div>

                    <p className="relative z-10 text-xs font-title font-light text-gray-500 uppercase tracking-widest mt-4">
                      Você paga por {totalEmp} pessoas, independente de quem usa.
                    </p>

                  </div>

                  {/* Simulação GymClub */}
                  <div className="bg-[#e9fdf2] p-6 sm:p-8 rounded-[32px] border border-gym-green/30 shadow-lg shadow-gym-green/10 relative overflow-hidden sm:min-h-[280px] flex flex-col sm:justify-center">

                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                    <div
                      className={`relative z-10 inline-block mb-4 self-start sm:absolute sm:top-6 sm:right-6 sm:mb-0 text-[10px] font-title font-bold px-3 py-1.5 rounded-full shadow-sm ${
                        isSaving
                          ? 'bg-gym-green text-gray-900'
                          : 'bg-gray-900 text-white'
                      }`}
                    >
                      {isSaving ? (
                        <>
                          VOCÊ ECONOMIZA{' '}
                          {((savings / currentTotalCost) * 100).toFixed(0)}%
                        </>
                      ) : (
                        'VOCÊ INVESTE MAIS'
                      )}
                    </div>

                    <h4 className="relative z-10 text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-4 sm:pr-36">
                      Simulação GymClub
                    </h4>

                    <div className="relative z-10 text-3xl sm:text-4xl font-title font-bold text-gray-900 mb-2">
                      {money(actualGymClubCost)}
                    </div>

                    <p className="relative z-10 text-xs font-title font-light text-gray-700 italic">
                      Pague apenas pelo uso efetivo ({activeUsers} pessoas).
                    </p>

                    <div
                      className={`relative z-10 mt-6 inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-title font-bold shadow-sm ${
                        isSaving
                          ? 'bg-gray-900 text-gym-green'
                          : 'bg-white text-gray-900 border border-gray-900/15'
                      }`}
                    >
                      {isSaving
                        ? `Economia de ${money(monthlyDelta)} / mês`
                        : `+ ${money(monthlyDelta)} / mês`}
                    </div>

                  </div>

                </div>

             
                <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-6 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    {isSaving ? 'Economia anual' : 'Investimento anual a mais'}
                  </h4>

                  <div className="relative z-10 text-2xl font-title font-bold text-gray-900 mb-1">
                    {money(annualDelta)}
                  </div>

                  <p className="relative z-10 text-xs font-title font-light text-gray-500">
                    {isSaving
                      ? 'Mantendo a mesma adoção da simulação acima.'
                      : `Em troca, cada um dos ${activeUsers} ativos recebe ${money(contribution)} de desconto na mensalidade — dinheiro que ele sente no bolso, não taxa de acesso.`}
                  </p>

                </div>

                </>

              ) : (

                /* Investimento. Três cards do tamanho do que cada um diz:
                   um painel único aqui virava uma caixa quase vazia, já que
                   sem benefício atual não existe custo para comparar. */
                <>

                <div className="bg-[#fff3e8] p-6 sm:p-8 rounded-[40px] border border-gym-orange/30 shadow-lg shadow-gym-orange/10 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-orange rounded-l-[40px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-3">
                    Investimento estimado
                  </h4>

                  <div className="relative z-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">

                    <span className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-gray-900">
                      {money(actualGymClubCost)}
                    </span>

                    <span className="text-xs font-title font-light text-gray-700 uppercase tracking-widest">
                      por mês
                    </span>

                  </div>

                  <p className="relative z-10 text-xs sm:text-sm font-title font-light text-gray-700">
                    {activeUsers} colaboradores ativos × {money(contribution)} de
                    coparticipação. Quem não usa, não entra na conta.
                  </p>

                </div>

                <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-6 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-orange rounded-l-[32px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Investimento anual
                  </h4>

                  <div className="relative z-10 text-2xl font-title font-bold text-gray-900 mb-1">
                    {money(annualGymClubCost)}
                  </div>

                  <p className="relative z-10 text-xs font-title font-light text-gray-500">
                    Mantendo os {adoptionRate.toFixed(0)}% de adoção da simulação.
                  </p>

                </div>

                </>
              )}

            </div>

          </div>

    
          <div className="mt-3 pt-10  ">

            <div className="mb-6">

              <h3 className="text-base sm:text-xl font-bold text-gray-900">
                O que o colaborador vê
              </h3>

              <p className="text-xs sm:text-sm font-title font-light text-gray-500 mt-1">
                Com a sua ajuda de{' '}
                <strong className="font-bold text-gray-900">{money(contribution)}</strong>,
                este é o preço que aparece para ele em cada plano.
              </p>

            </div>

          
            <div className="relative">

              <button
                type="button"
                aria-label="Ver planos anteriores"
                onClick={() => scrollCarousel('left')}
                className="absolute -left-2 sm:-left-5 top-1/2 z-20 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-300/40 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                aria-label="Ver próximos planos"
                onClick={() => scrollCarousel('right')}
                className="absolute -right-2 sm:-right-5 top-1/2 z-20 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md shadow-gray-300/40 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div
                ref={carouselRef}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className={`flex gap-4 overflow-x-auto hide-scrollbar -mx-2 px-2 py-2 ${
                  dragging
                    ? 'snap-none cursor-grabbing select-none'
                    : 'snap-x snap-mandatory cursor-grab'
                }`}
              >

                {PLAN_CARDS.map((plan) => {
                   
                  const help = Math.min(contribution, plan.price);
                  const finalPrice = plan.price - help;

                  return (
                    <article
                      key={plan.name}
                      className="group relative min-h-[190px] min-w-[240px] flex-none snap-start overflow-hidden rounded-[28px] border border-gray-200 bg-gray-50 px-5 py-5 text-left transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-lg hover:shadow-gray-300/50 sm:min-w-[260px] sm:px-6 sm:py-6"
                    >

                      <div className="relative z-10 flex h-full flex-col pr-16">

                        <h4 className="font-title text-xl font-bold uppercase leading-tight text-black sm:text-2xl">
                          {plan.name}
                        </h4>

                        <div className="mt-3 space-y-1">

                          {help > 0 && (
                            <p className="font-title text-lg font-light text-red-500 line-through">
                              {amount(plan.price)}
                            </p>
                          )}

                          <p className="font-title text-2xl font-semibold text-black sm:text-3xl">
                            {amount(finalPrice)}
                          </p>

                          <p className="font-title text-[10px] font-light uppercase tracking-[0.12em] text-black/60">
                            por mês
                          </p>

                        </div>

                      </div>

                     
                      <div className="pointer-events-none absolute bottom-0 right-0 z-0 flex h-full items-center justify-end">
                        <div
                          className="h-32 w-32 translate-x-5 translate-y-3 opacity-90 transition duration-500 ease-out group-hover:-translate-y-3 group-hover:translate-x-10 group-hover:scale-[1.35] sm:h-36 sm:w-36 sm:translate-x-6"
                          style={{
                            backgroundColor: plan.hex,
                            maskImage: `url("${plan.face}")`,
                            WebkitMaskImage: `url("${plan.face}")`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                          }}
                        />
                      </div>

                    </article>
                  );
                })}

            </div>

            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#cadastro"
              className="inline-block bg-gradient-orange hover:bg-gray-800 text-black px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-title font-bold text-center transition-all hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5"
            >
              Quero implementar na minha empresa ➝
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}