import Groq from "groq-sdk";

// Read strictly from environment (no file scraping, no hardcoded fallback)
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

/**
 * Service for interacting with GROQ API
 */
class GroqService {
  constructor() {
    this.client = new Groq({
      apiKey: GROQ_API_KEY,
    });
    this.model = "llama-3.3-70b-versatile";
  }

  /**
   * Generate a learning path based on user profile
   */
  async generateLearningPath(profile) {
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(profile);

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    try {
      const completion = await this.client.chat.completions.create({
        messages,
        model: this.model,
        temperature: 0.7,
        max_tokens: 8000,
        top_p: 0.9,
      });

      const markdown = completion.choices[0]?.message?.content || "";

      return {
        markdown,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error calling GROQ API:", error);
      throw new Error("Falha ao gerar trilha de aprendizagem");
    }
  }

  /**
   * Build system prompt for the AI agent
   */
  buildSystemPrompt() {
    return `Você é um especialista em educação e desenvolvimento de carreira que cria trilhas de aprendizagem personalizadas para o SkillPath.

Sua missão é gerar uma trilha estruturada em formato de documentação técnica profissional, dividida em aproximadamente 8 tópicos principais. Cada tópico deve ser completo e bem estruturado como uma página de documentação.

ESTRUTURA OBRIGATÓRIA:

# 🎯 [Nome da Trilha Personalizada]

## 📋 Visão Geral
[Introdução motivadora sobre a trilha, objetivo final e contexto do usuário]

---

## 📚 Índice dos Tópicos

1. [Tópico 1 - Nome]
2. [Tópico 2 - Nome]
3. [Tópico 3 - Nome]
4. [Tópico 4 - Nome]
5. [Tópico 5 - Nome]
6. [Tópico 6 - Nome]
7. [Tópico 7 - Nome]
8. [Tópico 8 - Nome]

---

## Tópico 1: [Nome do Tópico]

### 🎯 Objetivo
[Descrição clara do que será aprendido neste tópico]

### 📖 Conceitos Fundamentais

#### [Conceito 1]
[Explicação detalhada e didática do conceito 1 - mínimo 3-4 parágrafos]

**Exemplo Prático:**
\`\`\`[linguagem]
[Código exemplo se aplicável]
\`\`\`

#### [Conceito 2]
[Explicação detalhada e didática do conceito 2 - mínimo 3-4 parágrafos]

**Pontos de Atenção:**
- [Ponto importante 1]
- [Ponto importante 2]
- [Ponto importante 3]

### 📚 Recursos Recomendados
- 📄 [Documentação oficial - link]
- 📖 [Artigo/Tutorial - link]
- 💻 [Curso gratuito - link (SEM YouTube)]

### 🎯 Projeto Prático
[Descrição detalhada de um projeto prático para aplicar o conhecimento - seja específico]

### ✅ Quiz de Avaliação

**Questão 1:** [Pergunta de múltipla escolha sobre conceito fundamental]
a) [Opção A]
b) [Opção B]
c) [Opção C - CORRETA]
d) [Opção D]

**Questão 2:** [Pergunta prática sobre aplicação]
a) [Opção A]
b) [Opção B - CORRETA]
c) [Opção C]
d) [Opção D]

**Questão 3:** [Pergunta de análise ou problema]
a) [Opção A - CORRETA]
b) [Opção B]
c) [Opção C]
d) [Opção D]

**Respostas:** 1-C, 2-B, 3-A

---

[REPITA A ESTRUTURA ACIMA PARA TODOS OS 8 TÓPICOS]

---

## 🎓 Conclusão e Próximos Passos

### Parabéns! 🎉
[Mensagem motivadora sobre o que foi aprendido]

### Próximos Desafios
1. [Sugestão de evolução 1]
2. [Sugestão de evolução 2]
3. [Sugestão de evolução 3]

### Continue Aprendendo
- [Recurso adicional 1]
- [Recurso adicional 2]
- [Comunidade/Fórum recomendado]

---

**REGRAS IMPORTANTES:**
- NÃO inclua links do YouTube em nenhum lugar
- Use APENAS: documentações oficiais, MDN, freeCodeCamp, artigos técnicos, cursos gratuitos (Coursera, edX, etc)
- Cada tópico deve ter conteúdo SUBSTANCIAL (não seja superficial)
- Cada quiz deve ter exatamente 3 perguntas com 4 alternativas
- Marque a resposta correta com "- CORRETA" ao lado
- Forneça as respostas ao final do quiz
- Use linguagem técnica mas didática
- Inclua exemplos de código quando relevante
- Seja específico nos projetos práticos
- Adapte a complexidade ao nível do usuário`;
  }

  /**
   * Build user prompt with profile data
   */
  buildUserPrompt(profile) {
    const formatsList = profile.preferredFormat?.join(", ") || "qualquer formato";
    const deadline = profile.deadlineWeeks
      ? `${profile.deadlineWeeks} semanas`
      : "flexível";

    return `Crie uma trilha de aprendizagem personalizada com os seguintes dados:

**Objetivo Profissional:** ${profile.objective}
**Área de Interesse:** ${profile.area}
**Nível Atual:** ${profile.level}
**Tempo Disponível:** ${profile.weeklyTime}h por semana
**Prazo:** ${deadline}
**Formato Preferido:** ${formatsList}

Gere uma trilha focada, realista e motivadora que leve a pessoa do ponto atual até o objetivo dela.`;
  }
}

// Singleton instance
const groqService = new GroqService();

export {
  groqService,
  GroqService,
};


