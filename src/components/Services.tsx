export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center" id="services-heading">
        Como funciona o SkillPath
      </h2>
      <div className="mt-8 space-y-8 text-center max-w-4xl mx-auto">
        <p className="text-foreground/90 text-lg leading-relaxed">
          O SkillPath ajuda você a planejar sua trilha de aprendizado com clareza e etapas objetivas.
          Em poucos minutos, você recebe um plano semanal personalizado com conteúdos gratuitos
          e práticos para alcançar seus objetivos profissionais.
        </p>

        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Conte sobre você</h3>
              <p className="text-foreground/80">
                Responda a um formulário rápido sobre seu objetivo profissional, área de interesse, nível atual e tempo disponível por semana.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Receba sua trilha personalizada</h3>
              <p className="text-foreground/80">
                Nossa IA gera um plano semanal estruturado com conteúdos gratuitos e de qualidade, organizados por semanas e focados no seu ritmo de aprendizado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Evolua com confiança</h3>
              <p className="text-foreground/80">
                Acompanhe seu progresso semana a semana, com recomendações práticas e links para documentação, vídeos, cursos e exercícios aplicados ao mercado real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


