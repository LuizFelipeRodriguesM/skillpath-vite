# 🚀 SkillPath - IA que cria trilhas de aprendizagem para as carreiras do futuro

*"Aprenda hoje o que o futuro vai exigir amanhã."*

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Sobre o Projeto

SkillPath é uma plataforma que utiliza IA para gerar trilhas de aprendizagem personalizadas, preparando jovens para carreiras emergentes. O usuário responde a um questionário simples e recebe uma jornada estruturada com tópicos, recursos e desafios práticos.

### 🎯 Problema que Resolve

O mercado evolui mais rápido do que as pessoas conseguem acompanhar. Muitos jovens não sabem:
- Quais habilidades desenvolver
- Como se preparar para carreiras que estão nascendo
- Onde estudar e por onde começar

### 💡 Nossa Solução

SkillPath democratiza o acesso ao conhecimento, oferecendo:
- **Personalização com IA**: Trilhas adaptadas ao perfil individual
- **Conteúdo Acessível**: Foco em recursos gratuitos e de qualidade
- **Abordagem Prática**: Projetos e quizzes por tópico
- **Simplicidade**: Processo intuitivo em poucos minutos

## 🏗️ Arquitetura e Tecnologias

### Stack Tecnológico

- **Frontend**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS 3.4 com design system customizado
- **IA**: Groq SDK (modelo Llama 3.3 70B Versatile)
- **Validação**: Zod para schemas robustos
- **Markdown**: React Markdown + remark-gfm
- **Roteamento**: React Router

### Estrutura do Projeto

```
skillpath/
├── src/                          # Frontend (Vite + React)
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── LearningPathGenerator.tsx
│   │   ├── DocumentationRenderer.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── main.tsx
│   ├── globals.css
│   └── index.css
├── api/                          # Serviços e tipos usados pela API
│   ├── services/groq.service.ts
│   ├── types/
│   └── validators/
├── server.js                     # API HTTP (Node) em :3001
├── vite.config.ts                # Proxy /api → http://127.0.0.1:3001
├── index.html                    # Entrada do Vite
└── dist/                         # Build do frontend
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+
- npm (ou yarn)
- Chave da API Groq (obtenha em `https://console.groq.com/`)

### Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/skillpath.git
   cd skillpath
   ```
2. Instale as dependências
   ```bash
   npm install
   ```
3. Configure o `.env` (recomendado)
   - Crie um arquivo `.env` na raiz do projeto com:
     ```
     GROQ_API_KEY=SuaChaveAqui
     ```
   - O servidor já carrega o `.env` automaticamente via `import 'dotenv/config'` em `server.js`.
   - Alternativa via shell (macOS/Linux):
     ```bash
     export GROQ_API_KEY="sua_chave_aqui"
     ```
   - Importante: não versione o `.env`. Em produção, configure `GROQ_API_KEY` no provedor de hospedagem.

### Execução em Desenvolvimento

Execute API e Frontend em terminais separados:

- Terminal A (API em :3001)
  ```bash
  npm run api
  # ou
  npm run dev:api
  ```
- Terminal B (Frontend em :5173, com proxy para /api)
  ```bash
  npm run dev
  ```

Abra `http://localhost:5173`.

O `vite.config.ts` já configura proxy de `/api` para `http://127.0.0.1:3001`, então o frontend chama simplesmente `/api/generate-path`.

### Build e Preview

```bash
npm run build    # Gera build do frontend (dist/)
npm run preview  # Servidor de preview do Vite (somente frontend)
```

Para rodar a API em produção:
```bash
node server.js
```

## 📖 Como Usar

### Fluxo do Usuário

1. Landing Page
2. Formulário de Perfil (objetivo, área, nível, tempo)
3. Geração da Trilha com IA
4. Resultado em formato de documentação técnica (Markdown)

### Funcionalidades Principais

- **🧠 Geração com IA**: prompt educacional otimizado
- **📚 Trilhas Personalizadas**: 8 tópicos detalhados
- **✅ Avaliação**: Quiz de 3 questões por tópico
- **🎨 Design System**: cores, glassmorphism, responsivo

## 🔌 API

- **Endpoint**: `POST /api/generate-path`
- **Via proxy (dev)**: `http://localhost:5173/api/generate-path`
- **Direto na API**: `http://127.0.0.1:3001/api/generate-path`

### Payload (validação via Zod)
```json
{
  "objective": "Conseguir vaga como desenvolvedor front-end",
  "area": "Desenvolvimento Web",
  "level": "iniciante",
  "weeklyTime": 10,
  "deadlineWeeks": 12,
  "preferredFormat": ["artigo", "curso", "documentação"]
}
```

Restrições principais:
- `objective`: 5–120 caracteres
- `area`: "Desenvolvimento Web" | "IA/ML" | "Dados" | "Design" | "DevOps"
- `level`: "iniciante" | "intermediário" | "avançado"
- `weeklyTime`: 1–20
- `deadlineWeeks` (opcional): 2–26
- `preferredFormat` (opcional): itens em ["vídeo", "artigo", "curso", "documentação"]

### Exemplo (cURL)
```bash
curl -X POST http://127.0.0.1:3001/api/generate-path \
  -H "Content-Type: application/json" \
  -d '{
    "objective": "Migrar para carreira em dados",
    "area": "Dados",
    "level": "intermediário",
    "weeklyTime": 8,
    "deadlineWeeks": 10,
    "preferredFormat": ["artigo","documentação"]
  }'
```

### Resposta (shape)
```json
{
  "success": true,
  "data": {
    "markdown": "# 🎯 [Nome da Trilha] ...",
    "generatedAt": "2025-01-01T12:34:56.000Z"
  }
}
```

## 🤖 Integração com IA (Groq)

- Modelo: `llama-3.3-70b-versatile`
- Temperatura: 0.7 | `max_tokens`: 8000 | `top_p`: 0.9
- Prompts estruturados para conteúdo educacional técnico (com tópicos, recursos, projeto e quiz)

Exemplo de início do system prompt:
```text
Você é um especialista em educação e desenvolvimento de carreira que cria trilhas de aprendizagem personalizadas para o SkillPath...
```

## 📱 Componentes Principais (Frontend)

- **LearningPathGenerator**: formulário multi-etapas (validação, estado, UX)
- **DocumentationRenderer**: renderização de Markdown (GFM) com sanitização
- **Layout/Hero/Sections**: landing e páginas de apresentação

### Design System
Variáveis de cores:
```css
--brand-primary: #71BBD4;
--brand-secondary: #345F97;
```

## 🔧 Scripts Disponíveis

```bash
npm run dev       # Frontend (Vite) em :5173
npm run dev:api   # API (Node) em :3001
npm run api       # Alias para API
npm run build     # Build do frontend
npm run preview   # Preview do frontend (estático)
npm run lint      # ESLint
```

## 🚀 Deploy

- **Frontend (estático)**: Vercel, Netlify, GitHub Pages (servir `dist/`)
- **API (Node)**: Render, Railway, Fly.io, VPS ou Docker
- Configure `GROQ_API_KEY` no ambiente da API

---

**SkillPath** - Democratizando o acesso ao conhecimento e preparando jovens para o futuro do trabalho.

Desenvolvido com ❤️ por Equipe FIAP
