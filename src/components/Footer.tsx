export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-foreground/70 md:flex-row">
          <p>© {new Date().getFullYear()} SkillPath. Todos os direitos reservados.</p>
          <nav className="flex items-center gap-6">
            <a href="#about" className="transition-colors hover:text-foreground/90">Sobre</a>
            <a href="#services" className="transition-colors hover:text-foreground/90">Como funciona</a>
            <a href="#contact" className="transition-colors hover:text-foreground/90">Criar trilha</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


