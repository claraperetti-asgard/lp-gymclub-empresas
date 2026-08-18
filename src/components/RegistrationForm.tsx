import { useEffect, useState } from 'react';

 
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

 function formatarTelefone(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11);

  if (!d) return '';
  if (d.length <= 2) return `(${d}`;

  const ddd = d.slice(0, 2);
  const resto = d.slice(2);

   const corte = d.length > 10 ? 5 : 4;

  if (resto.length <= corte) return `(${ddd}) ${resto}`;

  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

 function formatarCnpj(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 14);

  if (d.length > 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  if (d.length > 8) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  }

  if (d.length > 5) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  }

  if (d.length > 2) {
    return `${d.slice(0, 2)}.${d.slice(2)}`;
  }

  return d;
}

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

  return (
    digito(d.slice(0, 12)) === Number(d[12]) &&
    digito(d.slice(0, 13)) === Number(d[13])
  );
}

const emailValido = (valor: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

const campoBase =
  'w-full bg-gray-100 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-title font-light outline-none transition-all placeholder:text-gray-400';

const campoErro =
  'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-300';

export default function RegistrationForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');


  const [tocado, setTocado] = useState<Record<string, boolean>>({});


  const [tentouEnviar, setTentouEnviar] = useState(false);

  const marcar = (campo: string) =>
    setTocado((t) => ({ ...t, [campo]: true }));

  const [cidades, setCidades] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [falhouIbge, setFalhouIbge] = useState(false);


  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);


  const limparCampos = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setEmpresa('');
    setCnpj('');
    setUf('');
    setCidade('');
    setTocado({});
    setTentouEnviar(false);
  };

   
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

      
        setFalhouIbge(true);
        setCarregando(false);
      });

    return () => {
      cancelado = true;
      ctrl.abort();
    };
  }, [uf]);

  /* Todos os campos são obrigatórios: a mensagem de "faltando" vem primeiro,
     e só depois a de formato inválido. */
  const erros: Record<string, string> = {
    nome: !nome.trim()
      ? 'Informe seu nome completo.'
      : '',

    email: !email.trim()
      ? 'Informe seu email.'
      : !emailValido(email)
        ? 'Digite um email válido.'
        : '',

    telefone: !telefone.trim()
      ? 'Informe seu celular com DDD.'
      : telefone.replace(/\D/g, '').length < 10
        ? 'Informe o DDD e o número completo.'
        : '',

    empresa: !empresa.trim()
      ? 'Informe o nome da empresa.'
      : '',

    uf: !uf
      ? 'Selecione o estado.'
      : '',

    cidade: !cidade.trim()
      ? 'Informe a cidade.'
      : '',

    cnpj: !cnpj.trim()
      ? 'Informe o CNPJ.'
      : !cnpjValido(cnpj)
        ? 'CNPJ inválido — confira os números.'
        : '',
  };

  const formularioInvalido = Object.values(erros).some(Boolean);

  /* O erro só aparece depois que a pessoa saiu do campo ou tentou enviar —
     assim ninguém vê tudo vermelho antes de começar a preencher. */
  const mostrarErro = (campo: string) =>
    (tocado[campo] || tentouEnviar) && erros[campo] ? erros[campo] : '';

  const erroNome = mostrarErro('nome');
  const erroEmail = mostrarErro('email');
  const erroTelefone = mostrarErro('telefone');
  const erroEmpresa = mostrarErro('empresa');
  const erroUf = mostrarErro('uf');
  const erroCidade = mostrarErro('cidade');
  const erroCnpj = mostrarErro('cnpj');

  const mensagemErro = (texto: string) =>
    texto ? (
      <p className="text-xs font-title font-light text-red-500 mt-1.5 ml-1">
        {texto}
      </p>
    ) : null;

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
                onSubmit={async (e) => {
                  e.preventDefault();

                  const form = e.currentTarget;

                  setEnviado(false);
                  setErroEnvio(false);
                  setTentouEnviar(true);

                  /* Nada sai daqui com campo em branco ou inválido. */
                  if (formularioInvalido) {
                    const primeiro = [
                      'nome',
                      'email',
                      'telefone',
                      'empresa',
                      'uf',
                      'cidade',
                      'cnpj',
                    ].find((campo) => erros[campo]);

                    form
                      .querySelector<HTMLElement>(`[name="${primeiro}"]`)
                      ?.focus();

                    return;
                  }

                  const dados = Object.fromEntries(
                    new FormData(form).entries()
                  );

                  console.log('Enviando para o n8n:', dados);

                  setEnviando(true);

                  try {
                    const resposta = await fetch(
                      'https://n8n.cimerianofficial.com/webhook/gymclub-lp-empresas',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dados),
                      }
                    );

                    console.log(
                      'Resposta do n8n:',
                      resposta.status,
                      resposta.statusText
                    );

                    if (!resposta.ok) throw new Error(String(resposta.status));


                    form.reset();
                    limparCampos();
                    setEnviado(true);
                  } catch (erro) {
                    console.error(
                      'Erro ao enviar formulário para o n8n:',
                      erro
                    );

                    setErroEnvio(true);
                  } finally {
                    setEnviando(false);
                  }
                }}
                noValidate
              >
                <div>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    onBlur={() => marcar('nome')}
                    aria-invalid={Boolean(erroNome)}
                    className={`${campoBase} ${erroNome ? campoErro : ''}`}
                  />

                  {mensagemErro(erroNome)}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => marcar('email')}
                    aria-invalid={Boolean(erroEmail)}
                    className={`${campoBase} ${
                      erroEmail ? campoErro : ''
                    }`}
                  />

                  {mensagemErro(erroEmail)}
                </div>

                <div>
                  <input
                    type="tel"
                    name="telefone"
                    inputMode="numeric"
                    placeholder="Celular com DDD"
                    value={telefone}
                    onChange={(e) =>
                      setTelefone(formatarTelefone(e.target.value))
                    }
                    onBlur={() => marcar('telefone')}
                    aria-invalid={Boolean(erroTelefone)}
                    className={`${campoBase} ${
                      erroTelefone ? campoErro : ''
                    }`}
                  />

                  {mensagemErro(erroTelefone)}
                </div>

                <div>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Nome da empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    onBlur={() => marcar('empresa')}
                    aria-invalid={Boolean(erroEmpresa)}
                    className={`${campoBase} ${erroEmpresa ? campoErro : ''}`}
                  />

                  {mensagemErro(erroEmpresa)}
                </div>

                 <div className="flex gap-4">
                  <div className="w-2/5">
                    <select
                      name="uf"
                      value={uf}
                      onChange={(e) => {
                        setUf(e.target.value);
                        setCidade('');
                      }}
                      onBlur={() => marcar('uf')}
                      aria-label="Estado"
                      aria-invalid={Boolean(erroUf)}
                      className={`${campoBase} ${
                        uf ? 'text-gray-900' : 'text-gray-400'
                      } ${erroUf ? campoErro : ''}`}
                    >
                      <option value="">Estado</option>

                      {UFS.map((estado) => (
                        <option
                          key={estado.sigla}
                          value={estado.sigla}
                        >
                          {estado.sigla} — {estado.nome}
                        </option>
                      ))}
                    </select>

                    {mensagemErro(erroUf)}
                  </div>

                  <div className="w-3/5">
                    {falhouIbge ? (
                      <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        onBlur={() => marcar('cidade')}
                        aria-invalid={Boolean(erroCidade)}
                        className={`${campoBase} ${
                          erroCidade ? campoErro : ''
                        }`}
                      />
                    ) : (
                      <select
                        name="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        onBlur={() => marcar('cidade')}
                        disabled={!uf || carregando}
                        aria-label="Cidade"
                        aria-invalid={Boolean(erroCidade)}
                        className={`${campoBase} disabled:opacity-60 disabled:cursor-not-allowed ${
                          cidade
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        } ${erroCidade ? campoErro : ''}`}
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

                    {mensagemErro(erroCidade)}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    name="cnpj"
                    inputMode="numeric"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) =>
                      setCnpj(formatarCnpj(e.target.value))
                    }
                    onBlur={() => marcar('cnpj')}
                    aria-invalid={Boolean(erroCnpj)}
                    className={`${campoBase} ${
                      erroCnpj ? campoErro : ''
                    }`}
                  />

                  {mensagemErro(erroCnpj)}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={enviando}
                    className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[13px] sm:text-lg font-title font-bold transition-all hover:shadow-xl hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {enviando ? 'Enviando…' : 'Enviar cadastro'}
                  </button>
                </div>
              </form>

              {/* Aviso pós-envio: o formulário continua no lugar (já limpo),
                  então a pessoa pode cadastrar de novo se errou algum dado. */}
              {enviado && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 flex items-start gap-3 rounded-2xl bg-green-50 border border-green-200 px-4 sm:px-5 py-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-5 h-5 shrink-0 mt-0.5 text-green-600"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>

                  <p className="text-sm sm:text-base font-title font-light text-green-800 leading-relaxed">
                    Seu cadastro foi enviado com sucesso! Aguarde que um dos
                    nossos atendentes entrará em contato com você.
                  </p>
                </div>
              )}

              {erroEnvio && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 px-4 sm:px-5 py-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-5 h-5 shrink-0 mt-0.5 text-red-500"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>

                  <p className="text-sm sm:text-base font-title font-light text-red-700 leading-relaxed">
                    Não foi possível enviar seu cadastro agora. Confira os dados
                    e tente novamente em instantes.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}