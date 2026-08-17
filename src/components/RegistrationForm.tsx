import { useEffect, useState } from 'react';

// Os 27 estados cabem no bundle sem custo. Os ~5.570 municípios não — esses
// vêm da API pública do IBGE, só do estado que a pessoa escolher.
const UFS = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
];

/** (43) 99183-1438 para celular, (43) 3322-1100 para fixo. */
function formatarTelefone(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;

  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  // Celular tem 9 dígitos após o DDD; fixo tem 8.
  const corte = d.length > 10 ? 5 : 4;

  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

/** 12.345.678/0001-90 */
function formatarCnpj(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 14);
  if (d.length > 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  if (d.length > 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  if (d.length > 5) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length > 2) return `${d.slice(0, 2)}.${d.slice(2)}`;
  return d;
}

/** Confere os dois dígitos verificadores — pega erro de digitação. */
function cnpjValido(valor: string) {
  const d = valor.replace(/\D/g, '');
  if (d.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(d)) return false;

  const digito = (base: string) => {
    let peso = base.length - 7;
    let soma = 0;
    for (const char of base) {
      soma += Number(char) * peso--;
      if (peso < 2) peso = 9;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return digito(d.slice(0, 12)) === Number(d[12]) && digito(d.slice(0, 13)) === Number(d[13]);
}

const emailValido = (valor: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

const campoBase =
  'w-full bg-gray-100 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-title font-light outline-none transition-all placeholder:text-gray-400';
const campoErro = 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-300';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');

  // Só acusa erro depois que a pessoa sai do campo, para não reclamar
  // enquanto ela ainda está digitando.
  const [tocado, setTocado] = useState<Record<string, boolean>>({});
  const marcar = (campo: string) => setTocado((t) => ({ ...t, [campo]: true }));

  const [cidades, setCidades] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [falhouIbge, setFalhouIbge] = useState(false);

  // Busca os municípios do estado escolhido. A flag `cancelado` evita que uma
  // resposta antiga sobrescreva a lista quando a pessoa troca de estado antes
  // de a requisição anterior terminar.
  useEffect(() => {
    if (!uf) {
      setCidades([]);
      setFalhouIbge(false);
      return;
    }

    let cancelado = false;
    const ctrl = new AbortController();

    setCarregando(true);
    setFalhouIbge(false);

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`,
      { signal: ctrl.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((dados: { nome: string }[]) => {
        if (cancelado) return;
        setCidades(dados.map((m) => m.nome));
        setCarregando(false);
      })
      .catch(() => {
        if (cancelado) return;
        // Sem lista, o campo vira texto livre: a API fora do ar não pode
        // impedir alguém de concluir o cadastro.
        setFalhouIbge(true);
        setCarregando(false);
      });

    return () => {
      cancelado = true;
      ctrl.abort();
    };
  }, [uf]);

  const erroEmail = tocado.email && email !== '' && !emailValido(email);
  const erroCnpj = tocado.cnpj && cnpj !== '' && !cnpjValido(cnpj);
  const erroTelefone =
    tocado.telefone && telefone !== '' && telefone.replace(/\D/g, '').length < 10;

  return (
    <section
      id="cadastro"
      className="relative lg:min-h-[834px] flex items-center py-16 lg:py-12 bg-gym-orange overflow-hidden"
    >
      {/* Background Graphic elements inspired by the brand's vibrant curves */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[800px] md:w-[1200px] aspect-square rounded-full bg-[#f7e92a] pointer-events-none" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[1000px] md:w-[1500px] aspect-square rounded-full border-[60px] md:border-[100px] border-[#c2f463] pointer-events-none opacity-80" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[1200px] md:w-[1800px] aspect-square rounded-full border-[60px] md:border-[100px] border-[#3ad9c5] pointer-events-none opacity-40" />

      {/* Até lg o texto ocupa a largura toda e passaria por cima dos círculos
          amarelos; aí o véu é vertical e cobre tudo. No desktop volta a ser
          horizontal, preservando os círculos à direita. */}
      <div className="absolute inset-0 bg-gradient-to-b from-gym-orange via-gym-orange/90 to-gym-orange/70 lg:bg-gradient-to-r lg:from-gym-orange lg:via-gym-orange/80 lg:to-transparent pointer-events-none" />

      {/* Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="w-full lg:flex-1 text-white">
            <h2 className="text-xl sm:text-4xl md:text-5xl font-title font-extrabold mb-6 leading-[1.1] tracking-tight whitespace-normal sm:whitespace-nowrap">
              Sem taxas ocultas,
              <br />
              sem gestão complexa
            </h2>

            <p className="text-sm sm:text-lg md:text-xl font-title font-light text-white/90 leading-relaxed">
              Implementar um benefício de saúde corporativa não precisa ser
              uma dor de cabeça para o RH. Na verdade, com o{" "}
              <strong>GymClub</strong>, é exatamente o oposto.
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full lg:w-[620px] lg:flex-shrink-0">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">

              <h3 className="text-lg sm:text-2xl md:text-3xl font-title font-black text-gray-900 mb-6 uppercase text-center tracking-tight">
                CADASTRE SUA EMPRESA
              </h3>

              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
                noValidate
              >
                <input
                  type="text"
                  placeholder="Nome completo"
                  className={campoBase}
                />

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => marcar('email')}
                    aria-invalid={erroEmail}
                    className={`${campoBase} ${erroEmail ? campoErro : ''}`}
                  />
                  {erroEmail && (
                    <p className="text-xs font-title font-light text-red-500 mt-1.5 ml-1">
                      Digite um email válido, com @ e domínio.
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Celular com DDD"
                    value={telefone}
                    onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                    onBlur={() => marcar('telefone')}
                    aria-invalid={erroTelefone}
                    className={`${campoBase} ${erroTelefone ? campoErro : ''}`}
                  />
                  {erroTelefone && (
                    <p className="text-xs font-title font-light text-red-500 mt-1.5 ml-1">
                      Informe o DDD e o número completo.
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Nome da empresa"
                  className={campoBase}
                />

                {/* Estado vem antes porque a lista de cidades depende dele. */}
                <div className="flex gap-4">
                  <select
                    value={uf}
                    onChange={(e) => {
                      setUf(e.target.value);
                      setCidade('');
                    }}
                    aria-label="Estado"
                    className={`w-2/5 ${campoBase} ${uf ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    <option value="">Estado</option>
                    {UFS.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.sigla} — {estado.nome}
                      </option>
                    ))}
                  </select>

                  {falhouIbge ? (
                    <input
                      type="text"
                      placeholder="Cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className={`w-3/5 ${campoBase}`}
                    />
                  ) : (
                    <select
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      disabled={!uf || carregando}
                      aria-label="Cidade"
                      className={`w-3/5 ${campoBase} disabled:opacity-60 disabled:cursor-not-allowed ${
                        cidade ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      <option value="">
                        {!uf
                          ? 'Cidade'
                          : carregando
                            ? 'Carregando…'
                            : 'Cidade'}
                      </option>
                      {cidades.map((nome) => (
                        <option key={nome} value={nome}>
                          {nome}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
                    onBlur={() => marcar('cnpj')}
                    aria-invalid={erroCnpj}
                    className={`${campoBase} ${erroCnpj ? campoErro : ''}`}
                  />
                  {erroCnpj && (
                    <p className="text-xs font-title font-light text-red-500 mt-1.5 ml-1">
                      CNPJ inválido — confira os números.
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[13px] sm:text-lg font-title font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    Enviar cadastro
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
