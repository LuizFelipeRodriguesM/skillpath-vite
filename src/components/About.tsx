export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center" id="about-heading">
        Sobre o SkillPath
      </h2>
      <div className="mt-8 space-y-6 text-center max-w-4xl mx-auto">
        <p className="text-foreground/90 text-lg leading-relaxed">
          Você é um jovem de 15 a 29 anos, estudando ou começando sua carreira, mas se sente perdido
          no meio de tantas possibilidades. Sabe que precisa aprender novas habilidades, mas não tem
          clareza de por onde começar ou como organizar seus estudos de forma eficiente.
        </p>
        <p className="text-foreground/90 text-lg leading-relaxed">
          O mercado de trabalho evolui mais rápido do que conseguimos acompanhar. Novas tecnologias
          surgem diariamente, mas a maioria das pessoas estuda sem direção clara — perdendo tempo
          com conteúdos desconectados dos seus objetivos profissionais. Empresas sofrem com falta
          de talentos preparados, e jovens sofrem com falta de oportunidades concretas.
        </p>
        <p className="text-foreground/90 text-lg leading-relaxed">
          O SkillPath resolve isso oferecendo trilhas de aprendizagem personalizadas com IA.
          Você responde a um formulário simples sobre seus objetivos, nível atual e tempo disponível,
          e recebe um plano semanal estruturado com conteúdos gratuitos e práticos. É uma forma
          acessível e democrática de preparar jovens para carreiras que ainda nem existem.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <h3 className="font-medium text-lg">Por que importa</h3>
          <p className="mt-3 text-sm text-foreground/70">
            O mercado evolui mais rápido do que conseguimos acompanhar. O SkillPath
            direciona seu estudo para o que realmente importa, economizando tempo e
            maximizando resultados.
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <h3 className="font-medium text-lg">Como ajuda</h3>
          <p className="mt-3 text-sm text-foreground/70">
            Planos semanais práticos, com conteúdos gratuitos e de qualidade, focados
            em objetivos profissionais reais e carreiras emergentes.
          </p>
        </div>
      </div>
    </section>
  );
}


