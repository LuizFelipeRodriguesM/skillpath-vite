import { Link } from "react-router-dom";
import logo from "../assets/white-logo.png";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen">
      <header className="absolute inset-x-0 top-0 z-10 mt-8">
        <div className="mx-auto max-w-7xl px-8 py-6 relative flex items-center justify-center">
          <Link to="/" className="absolute left-8 top-1/2 -translate-y-1/2">
            <img src={logo} alt="SkillPath" width={28} height={28} />
          </Link>
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-14 text-sm text-foreground/80">
            <a href="#home" aria-label="Ir para o início da página" className="transition-colors hover:text-white">Início</a>
            <a href="#about" aria-label="Ir para a seção sobre" className="transition-colors hover:text-white">Sobre</a>
            <a href="#services" aria-label="Ir para a seção de serviços" className="transition-colors hover:text-white">Serviços</a>
            <a href="#contact" aria-label="Ir para a seção de contato" className="transition-colors hover:text-white">Contato</a>
          </nav>
          <a
            href="#contact"
            aria-label="Criar trilha de aprendizagem personalizada"
            className="hidden md:inline-flex absolute right-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
          >
            Criar minha trilha
          </a>
          <button
            aria-label="Abrir menu"
            className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-foreground/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M4 7.5h16M4 12h16M4 16.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="rounded-2xl p-8 md:p-14 text-center">
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Aprenda hoje o que o futuro<br className="hidden md:block" /> vai exigir amanhã
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-foreground/90">
            Trilha de estudos personalizada com IA. Simples, prática e focada no seu objetivo profissional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              Criar minha trilha
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground/90 shadow-sm transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Como funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


