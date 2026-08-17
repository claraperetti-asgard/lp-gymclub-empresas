import { Activity, Building2, LayoutDashboard, PiggyBank, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <PiggyBank className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-yellow-orange",
    title: 'Pague só pelo que usar',
    description: 'Sem taxas fixas sobre quem não usa. A empresa paga apenas a coparticipação pelos colaboradores ativos.',
  },
  {
    icon: <Zap className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-orange",
    title: 'Alto valor percebido',
    description: 'O valor investido pela empresa vira desconto direto na mensalidade, ajudando de verdade no bolso do colaborador.',
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-green",
    title: 'Gestão Simplificada',
    description: 'Implementar um benefício de saúde não precisa ser dor de cabeça. Plataforma fácil para o RH administrar.',
  },
  {
    icon: <Users className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-yellow-orange",
    title: 'Para empresas de todo tamanho',
    description: 'Sem exigência de quantidade mínima. Escale o benefício conforme o crescimento e a adesão do seu time.',
  },
  {
    icon: <Activity className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-orange",
    title: 'Mais saúde e engajamento',
    description: 'Incentive a qualidade de vida com impacto positivo na produtividade e no clima organizacional.',
  },
  {
    icon: <Building2 className="w-6 h-6 text-gray-900" />,
    iconBg: "bg-gradient-green",
    title: 'Coparticipação Flexível',
    description: 'Você decide com quanto quer contribuir. O formato gera maior percepção de benefício.',
  },
];

export default function Features() {
  return (
    <section id="vantagens" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6">
            Diferente de tudo que você já viu no mercado
          </h2>
          <p className="text-lg font-title font-light text-gray-600">
            Enquanto outros aplicativos cobram uma taxa fixa por colaborador cadastrado apenas para liberar o acesso, no GymClub a sua empresa participa ativamente do benefício.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-100/50"
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="font-title font-light text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
