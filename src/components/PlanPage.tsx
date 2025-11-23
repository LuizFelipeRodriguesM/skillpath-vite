import { Link } from "react-router-dom";
import DocumentationRenderer from "./DocumentationRenderer";

export default function PlanPage() {
  const markdown = (() => {
    try {
      return sessionStorage.getItem("generatedPlanMarkdown") || "";
    } catch {
      // ignore access issues
      return "";
    }
  })();

  if (!markdown) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Nenhuma trilha encontrada
        </h1>
        <p className="text-foreground/80 mb-6">
          Gere uma trilha primeiro para visualizar o conteúdo aqui.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
        >
          Voltar para início
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <DocumentationRenderer markdown={markdown} />
      
      <div className="mt-12 flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-6 py-3 text-sm font-medium text-foreground transition"
        >
          ← Voltar para início
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105"
        >
          🖨️ Imprimir Trilha
        </button>
      </div>
    </section>
  );
}

