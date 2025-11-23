import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ContactData {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  objective: string;
  area: string;
  level: string;
  weeklyTime: number;
  deadlineWeeks?: number;
  preferredFormat?: string[];
}

interface ApiResponse {
  success: boolean;
  data?: {
    markdown: string;
    generatedAt: string;
  };
  error?: string;
  details?: Array<{ field: string; message: string }>;
}

export default function LearningPathGenerator() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const navigate = useNavigate();
  
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
  });

  const [formData, setFormData] = useState<FormData>({
    objective: "",
    area: "",
    level: "",
    weeklyTime: 5,
    deadlineWeeks: undefined,
    preferredFormat: [],
  });

  const [generatedPath, setGeneratedPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validação simples
    if (!contactData.name || !contactData.email || !contactData.phone) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    // Avança para o próximo passo
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPath(null);

    try {
      const response = await fetch("/api/generate-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        // Guarda o markdown e redireciona para /plan
        try {
          sessionStorage.setItem("generatedPlanMarkdown", result.data.markdown);
        } catch {
          // fallback silencioso
        }
        setGeneratedPath(result.data.markdown);
        navigate("/plan");
      } else {
        setError(result.error || "Erro ao gerar trilha");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormatToggle = (format: string) => {
    setFormData((prev) => {
      const current = prev.preferredFormat || [];
      const updated = current.includes(format)
        ? current.filter((f) => f !== format)
        : [...current, format];
      return { ...prev, preferredFormat: updated };
    });
  };

  // O componente não renderiza mais a trilha gerada aqui
  // Isso é feito na página /plan
  if (generatedPath) {
    return null;
  }

  // Step 1: Formulário de Contato
  if (currentStep === 1) {
    return (
      <form onSubmit={handleContactSubmit} className="space-y-4 justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Vamos começar! Informe seus dados
        </h2>

        {/* Nome */}
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-foreground/80">
            Nome completo *
          </label>
          <input
            type="text"
            id="name"
            required
            maxLength={100}
            placeholder="Digite seu nome completo"
            value={contactData.name}
            onChange={(e) =>
              setContactData({ ...contactData, name: e.target.value })
            }
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-cyan-500/60"
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-foreground/80">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="seu.email@exemplo.com"
            value={contactData.email}
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
            }
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-cyan-500/60"
          />
        </div>

        {/* Telefone */}
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm text-foreground/80">
            Telefone para contato *
          </label>
          <input
            type="tel"
            id="phone"
            required
            placeholder="(00) 00000-0000"
            value={contactData.phone}
            onChange={(e) =>
              setContactData({ ...contactData, phone: e.target.value })
            }
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-cyan-500/60"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
        >
          Continuar para criar trilha
        </button>
      </form>
    );
  }

  // Step 2: Formulário de Geração da Trilha
  return (

    
    <form onSubmit={handleSubmit} className="space-y-4 justify-center items-center">

<div className="flex items-center justify-between">
  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Crie sua trilha de aprendizagem
      </h2>
      <button
        type="button"
        onClick={() => setCurrentStep(1)}
        className="text-sm text-foreground/60 hover:text-foreground transition underline"
      >
        ← Voltar
      </button>
    </div>

      {/* Objetivo profissional */}
      <div className="grid gap-2">
        <label htmlFor="objective" className="text-sm text-foreground/80">
          Objetivo profissional *
        </label>
        <input
          type="text"
          id="objective"
          required
          maxLength={120}
          placeholder="Ex.: Desenvolvedor Frontend júnior"
          value={formData.objective}
          onChange={(e) =>
            setFormData({ ...formData, objective: e.target.value })
          }
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-[var(--brand-primary)]/60"
        />
      </div>

      {/* Área de interesse */}
      <div className="grid gap-2">
        <label htmlFor="area" className="text-sm text-foreground/80">
          Área de interesse *
        </label>
        <select
          id="area"
          required
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--brand-primary)]/60"
        >
          <option value="">Selecione uma área</option>
          <option value="Desenvolvimento Web">Desenvolvimento Web</option>
          <option value="IA/ML">IA/ML</option>
          <option value="Dados">Dados</option>
          <option value="Design">Design</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>

      {/* Nível atual */}
      <div className="grid gap-2">
        <label htmlFor="level" className="text-sm text-foreground/80">
          Nível atual *
        </label>
        <select
          id="level"
          required
          value={formData.level}
          onChange={(e) =>
            setFormData({ ...formData, level: e.target.value })
          }
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--brand-primary)]/60"
        >
          <option value="">Selecione seu nível</option>
          <option value="iniciante">Iniciante</option>
          <option value="intermediário">Intermediário</option>
          <option value="avançado">Avançado</option>
        </select>
      </div>

      {/* Grid de 2 colunas */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Tempo disponível */}
        <div className="grid gap-2">
          <label htmlFor="weeklyTime" className="text-sm text-foreground/80">
            Tempo semanal (horas) *
          </label>
          <input
            type="number"
            id="weeklyTime"
            required
            min={1}
            max={20}
            value={formData.weeklyTime}
            onChange={(e) =>
              setFormData({ ...formData, weeklyTime: Number(e.target.value) })
            }
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-cyan-500/60"
          />
        </div>

        {/* Prazo */}
        <div className="grid gap-2">
          <label htmlFor="deadlineWeeks" className="text-sm text-foreground/80">
            Prazo (semanas)
          </label>
          <input
            type="number"
            id="deadlineWeeks"
            min={2}
            max={26}
            placeholder="Opcional"
            value={formData.deadlineWeeks || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                deadlineWeeks: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-cyan-500/60"
          />
        </div>
      </div>

      {/* Formato preferido */}
      <div className="grid gap-2">
        <label className="text-sm text-foreground/80">
          Formato preferido (opcional)
        </label>
        <div className="flex flex-wrap gap-2">
          {["vídeo", "artigo", "curso", "documentação"].map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => handleFormatToggle(format)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                formData.preferredFormat?.includes(format)
                  ? "bg-cyan-500 border-cyan-500 text-white"
                  : "bg-white/5 border-white/15 hover:border-cyan-500"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--brand-secondary)]/20 transition hover:brightness-[1.05] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/60 disabled:opacity-60"
      >
        {isLoading ? "Gerando sua trilha..." : "Gerar trilha"}
      </button>
    </form>
  );
}

