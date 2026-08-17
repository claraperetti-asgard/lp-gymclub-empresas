import { useState } from 'react';
 
const PLANS = [
  39.90, 69.90, 99.90, 139.90, 169.90, 199.90,
  249.90, 309.90, 419.90, 549.90, 649.90, 739.90,
];

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const money = (value: number) => brl.format(Number.isFinite(value) ? value : 0);

export default function Calculator() {
  const [hasBenefit, setHasBenefit] = useState<boolean>(false);

   const [totalEmp, setTotalEmp] = useState<number>(100);
  const [contribution, setContribution] = useState<number>(40);
  const [activeUsers, setActiveUsers] = useState<number>(30);

   const [currentFixedFee, setCurrentFixedFee] = useState<number>(500);
  const [currentFeePerUser, setCurrentFeePerUser] = useState<number>(10);

   const [planCost, setPlanCost] = useState<number>(69.90);

   
  const contributionPerUser = Math.min(contribution, planCost);

   const maxGymClubCost = totalEmp * contributionPerUser;
  const actualGymClubCost = activeUsers * contributionPerUser;

   const currentTotalCost = currentFixedFee + (totalEmp * currentFeePerUser);
  const savings = currentTotalCost - actualGymClubCost;

  const employeePays = Math.max(0, planCost - contributionPerUser);

   const annualSavings = Math.max(0, savings) * 12;

   
  const currentCostPerActiveUser =
    activeUsers > 0 ? currentTotalCost / activeUsers : 0;

   const adoptionRate = totalEmp > 0 ? (activeUsers / totalEmp) * 100 : 0;

   
  const toPositive = (value: string) => Math.max(0, Number(value) || 0);

  return (
    <section id="calculadora" className="relative overflow-x-clip py-24">

      {/* Blur laranja atrás de tudo */}
      <div className="absolute top-[200px] left-0 z-0 w-[800px] h-[900px] bg-gradient-yellow-orange opacity-10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-title font-bold text-gray-900 mb-6 tracking-tight">
            Transforme{' '}
            <span className="text-gray-400 line-through decoration-[#f7e92a] decoration-4">
              custo
            </span>{' '}
            em valor percebido
          </h2>

          <p className="text-lg font-title font-light text-gray-600">
            Simule o investimento e veja como o GymClub é mais inteligente para o seu caixa.
          </p>
        </div>

        {/* Caixa única que agrupa toda a simulação */}
        <div className="bg-white rounded-[40px] border border-gray-200 shadow-xl shadow-gray-200/40 p-6 md:p-10">

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 border border-gray-200 p-1 rounded-full items-center">

              <button
                onClick={() => setHasBenefit(false)}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-title font-light transition-all ${
                  !hasBenefit
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black hover:text-gray-900'
                }`}
              >
                Ainda não possuo benefício
              </button>

              <button
                onClick={() => setHasBenefit(true)}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-title font-light transition-all ${
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
            <div className="lg:col-span-5 h-full bg-gray-50 p-8 rounded-[32px] border border-gray-200">

              <h3 className="text-xl font-bold text-gray-900 mb-6">
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
                  <label className="block text-sm font-title font-light text-gray-700 mb-2">
                    Plano do Colaborador
                  </label>

                  <select
                    value={planCost}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPlanCost(val);

                      // A coparticipação não pode sobrar do plano escolhido.
                      if (contribution > val) {
                        setContribution(val);
                      }
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gym-orange focus:border-gym-orange transition-all outline-none"
                  >
                    {PLANS.map((plan) => (
                      <option key={plan} value={plan}>
                        {money(plan)}
                      </option>
                    ))}
                  </select>

                  <p className="text-xs font-title font-light text-gray-500 mt-2">
                    Mensalidade cheia do plano que o colaborador vai assinar.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">

                    <label className="block text-sm font-title font-light text-gray-700">
                      Coparticipação da Empresa (R$)
                    </label>

                    <span className="text-sm font-title font-bold text-gym-orange">
                      {money(contributionPerUser)}
                    </span>

                  </div>

                  <input
                    type="range"
                    min="0"
                    max={planCost}
                    step="0.10"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full accent-gym-orange"
                  />

                  <p className="text-xs font-title font-light text-gray-500 mt-2">
                    Quanto você quer ajudar por colaborador ativo?
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">

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
            <div className="lg:col-span-7 flex flex-col gap-6">

              {hasBenefit ? (

                <>

                <div className="grid sm:grid-cols-2 gap-6">

                  {/* Custo Atual */}
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-200 shadow-lg shadow-gray-200/30 relative overflow-hidden min-h-[280px] flex flex-col justify-center">

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-[32px]" />

                    <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      Custo Atual (Outros Apps)
                    </h4>

                    <div className="relative z-10 text-4xl font-title font-bold text-gray-400 line-through decoration-2 mb-2">
                      {money(currentTotalCost)}
                    </div>

                    <p className="relative z-10 text-xs font-title font-light text-gray-500 uppercase tracking-widest mt-4">
                      Você paga por {totalEmp} pessoas, independente de quem usa.
                    </p>

                  </div>

                  {/* Simulação GymClub */}
                  <div className="bg-[#e9fdf2] p-8 rounded-[32px] border border-gym-green/30 shadow-lg shadow-gym-green/10 relative overflow-hidden min-h-[280px] flex flex-col justify-center">

                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                    <div className="absolute top-6 right-6 bg-gym-green text-gray-900 text-[10px] font-title font-bold px-3 py-1.5 rounded-full shadow-sm">
                      VOCÊ ECONOMIZA{' '}
                      {savings > 0
                        ? ((savings / currentTotalCost) * 100).toFixed(0)
                        : 0}
                      %
                    </div>

                    <h4 className="relative z-10 text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-4 pr-28">
                      Simulação GymClub
                    </h4>

                    <div className="relative z-10 text-4xl font-title font-bold text-gray-900 mb-2">
                      {money(actualGymClubCost)}
                    </div>

                    <p className="relative z-10 text-xs font-title font-light text-gray-700 italic">
                      Pague apenas pelo uso efetivo ({activeUsers} pessoas).
                    </p>

                    {savings > 0 && (
                      <div className="relative z-10 mt-6 inline-block bg-gray-900 text-gym-green px-4 py-2 rounded-full text-sm font-title font-bold shadow-sm">
                        Economia de {money(savings)} / mês
                      </div>
                    )}

                  </div>

                </div>

             
                <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-6 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Economia anual
                  </h4>

                  <div className="relative z-10 text-2xl font-title font-bold text-gray-900 mb-1">
                    {money(annualSavings)}
                  </div>

                  <p className="relative z-10 text-xs font-title font-light text-gray-500">
                    Mantendo a mesma adoção da simulação acima.
                  </p>

                </div>

                <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-6 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Hoje, por colaborador que usa
                  </h4>

                  <div className="relative z-10 text-2xl font-title font-bold text-gray-900 mb-1">
                    {activeUsers > 0 ? money(currentCostPerActiveUser) : '—'}
                  </div>

                  <p className="relative z-10 text-xs font-title font-light text-gray-500">
                    Você paga por {totalEmp} cadastros, mas só {activeUsers} usam.
                  </p>

                </div>

                <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-6 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-green rounded-l-[32px]" />

                  <h4 className="relative z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    O colaborador paga
                  </h4>

                  <div className="relative z-10 text-2xl font-title font-bold text-gray-900 mb-1">
                    {money(employeePays)}
                  </div>

                  <p className="relative z-10 text-xs font-title font-light text-gray-500">
                    No plano de {money(planCost)}, com sua ajuda de {money(contributionPerUser)}.
                  </p>

                </div>

                </>

              ) : (

                /* Investimento */
                <div className="bg-[#fff3e8] p-8 rounded-[40px] border border-gym-orange/30 shadow-lg shadow-gym-orange/10 relative overflow-hidden">

                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gym-orange rounded-l-[40px]" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 relative z-10">

                    <div>
                      <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-2">
                        Investimento Estimado
                      </h4>

                      <div className="text-5xl font-title font-bold text-gray-900">
                        {money(actualGymClubCost)}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-title font-light text-gray-800 uppercase tracking-widest mb-1">
                        Custo máximo pretendido
                      </p>

                      <p className="text-lg font-title font-light text-gray-400 line-through">
                        {money(maxGymClubCost)}
                      </p>
                    </div>

                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-gym-orange/20 flex flex-col sm:flex-row gap-6 justify-between items-center relative z-10 shadow-sm">

                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">
                        Percepção do Colaborador
                      </h4>

                      <p className="text-sm font-title font-light text-gray-900">
                        Plano Base: {money(planCost)}
                      </p>
                    </div>

                    <div className="text-center sm:text-right">

                      <p className="text-[10px] font-title font-light uppercase tracking-widest text-gray-500 mb-1">
                        Com sua ajuda, ele paga apenas:
                      </p>

                      <p className="text-3xl font-title font-extrabold text-gray-900">
                        {money(employeePays)}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* CTA do simulador. Fica fora do ternário porque vale para os
                  dois cenários. O mt-auto encosta ele no rodapé da coluna, na
                  mesma linha em que o formulário ao lado termina, em vez de
                  abrir uma faixa nova embaixo da caixa inteira. */}
              <div className="mt-auto flex justify-center sm:justify-end">
                <a
                  href="#cadastro"
                  className="inline-block bg-gradient-orange hover:bg-gray-800 text-black px-6 py-3 rounded-full text-sm font-title font-bold transition-all hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5"
                >
                  Quero implementar na minha empresa ➝
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}