export default function RegistrationForm() {
  return (
    <section
      id="cadastro"
      className="relative min-h-[834px] flex items-center py-12 bg-gym-orange overflow-hidden"
    >
      {/* Background Graphic elements inspired by the brand's vibrant curves */}
      {/* Background Graphic elements inspired by the brand's vibrant curves */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[800px] md:w-[1200px] aspect-square rounded-full bg-[#f7e92a] pointer-events-none" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[1000px] md:w-[1500px] aspect-square rounded-full border-[60px] md:border-[100px] border-[#c2f463] pointer-events-none opacity-80" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] md:translate-x-[15%] w-[1200px] md:w-[1800px] aspect-square rounded-full border-[60px] md:border-[100px] border-[#3ad9c5] pointer-events-none opacity-40" />

      {/* Overlay gradient to ensure text readability on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-gym-orange via-gym-orange/80 to-transparent pointer-events-none" />

      {/* Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="w-full lg:flex-1 text-white">
            <h2 className="text-4xl md:text-5xl font-title font-extrabold mb-6 leading-[1.1] tracking-tight whitespace-nowrap">
              Sem taxas ocultas,
              <br />
              sem gestão complexa
            </h2>

            <p className="text-lg md:text-xl font-title font-light text-white/90 leading-relaxed">
              Implementar um benefício de saúde corporativa não precisa ser
              uma dor de cabeça para o RH. Na verdade, com o{" "}
              <strong>GymClub</strong>, é exatamente o oposto.
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full lg:w-[620px] lg:flex-shrink-0">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">

              <h3 className="text-2xl md:text-3xl font-title font-black text-gray-900 mb-6 uppercase text-center tracking-tight">
                CADASTRE SUA EMPRESA
              </h3>

              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                />

                <input
                  type="tel"
                  placeholder="Celular com DDD"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Nome da empresa"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                />

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="w-2/3 bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="UF"
                    maxLength={2}
                    className="w-1/3 bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400 uppercase"
                  />
                </div>

                <input
                  type="text"
                  placeholder="CNPJ"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gym-orange rounded-2xl px-5 py-4 font-title font-light outline-none transition-all placeholder:text-gray-400"
                />

              

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-title font-bold transition-all hover:shadow-xl hover:-translate-y-1"
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