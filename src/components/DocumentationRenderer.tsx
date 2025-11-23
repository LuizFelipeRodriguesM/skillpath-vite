import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import QuizSection from "./QuizSection";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface DocumentationRendererProps {
  markdown: string;
}

/**
 * Extrai quizzes do markdown e os renderiza de forma interativa
 */
export default function DocumentationRenderer({ markdown }: DocumentationRendererProps) {
  // Regex para encontrar seções de quiz no formato esperado
  const quizPattern = /### ✅ Quiz de Avaliação\s*([\s\S]*?)(?=\n##|$)/g;
  
  // Extrai todos os quizzes
  const quizzes: Array<{ topicTitle: string; questions: QuizQuestion[] }> = [];
  let match;
  
  while ((match = quizPattern.exec(markdown)) !== null) {
    const quizContent = match[1];
    const questions = parseQuizQuestions(quizContent);
    
    // Tenta extrair o título do tópico (procura pelo ## anterior)
    const beforeQuiz = markdown.substring(0, match.index);
    const topicMatch = beforeQuiz.match(/## Tópico \d+: (.+?)$/m);
    const topicTitle = topicMatch ? topicMatch[1] : "Tópico";
    
    if (questions.length > 0) {
      quizzes.push({ topicTitle, questions });
    }
  }

  // Remove os quizzes do markdown original para renderização
  const markdownWithoutQuizzes = markdown.replace(
    /### ✅ Quiz de Avaliação\s*[\s\S]*?(?=\n## |$)/g,
    "[[QUIZ_PLACEHOLDER]]"
  );

  // Divide o markdown em partes
  const parts = markdownWithoutQuizzes.split("[[QUIZ_PLACEHOLDER]]");

  return (
    <div className="w-full space-y-6">
      {parts.map((part, index) => (
        <div key={index}>
          {/* Renderiza o conteúdo markdown */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-code:text-cyan-500 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/15 prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline prose-li:text-foreground/80">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{part}</ReactMarkdown>
          </div>

          {/* Renderiza o quiz interativo correspondente */}
          {index < quizzes.length && (
            <QuizSection
              questions={quizzes[index].questions}
              topicTitle={quizzes[index].topicTitle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Parseia as questões do quiz do texto markdown
 */
function parseQuizQuestions(quizContent: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  
  // Regex para capturar cada questão
  const questionPattern = /\*\*Questão \d+:\*\* (.+?)\n([a-d]\).+?)(?=\n\*\*Questão|\n\*\*Respostas|$)/gs;
  
  let match;
  while ((match = questionPattern.exec(quizContent)) !== null) {
    const questionText = match[1].trim();
    const optionsText = match[2];
    
    // Extrai as opções
    const optionPattern = /([a-d])\) (.+?)(?=\n[a-d]\)|$)/gs;
    const options: string[] = [];
    let correctAnswerIndex = 0;
    
    let optionMatch;
    let optionIndex = 0;
    while ((optionMatch = optionPattern.exec(optionsText)) !== null) {
      let optionText = optionMatch[2].trim();
      
      // Verifica se é a resposta correta
      if (optionText.includes("CORRETA")) {
        optionText = optionText.replace(/\s*-?\s*CORRETA/gi, "").trim();
        correctAnswerIndex = optionIndex;
      }
      
      options.push(optionText);
      optionIndex++;
    }
    
    if (options.length === 4) {
      questions.push({
        question: questionText,
        options,
        correctAnswer: correctAnswerIndex,
      });
    }
  }
  
  // Se não conseguiu parsear pelo método acima, tenta método alternativo
  if (questions.length === 0) {
    const lines = quizContent.split("\n").filter(line => line.trim());
    let currentQuestion: Partial<QuizQuestion> = {};
    let currentOptions: string[] = [];
    let correctIndex = 0;
    
    for (const line of lines) {
      if (line.match(/\*\*Questão \d+:\*\*/)) {
        // Salva a questão anterior se existir
        if (currentQuestion.question && currentOptions.length === 4) {
          questions.push({
            question: currentQuestion.question,
            options: currentOptions,
            correctAnswer: correctIndex,
          });
        }
        
        // Inicia nova questão
        currentQuestion = {
          question: line.replace(/\*\*Questão \d+:\*\*/, "").trim(),
        };
        currentOptions = [];
        correctIndex = 0;
      } else if (line.match(/^[a-d]\)/)) {
        let optionText = line.substring(2).trim();
        
        if (optionText.includes("CORRETA")) {
          optionText = optionText.replace(/\s*-?\s*CORRETA/gi, "").trim();
          correctIndex = currentOptions.length;
        }
        
        currentOptions.push(optionText);
      }
    }
    
    // Adiciona a última questão
    if (currentQuestion.question && currentOptions.length === 4) {
      questions.push({
        question: currentQuestion.question,
        options: currentOptions,
        correctAnswer: correctIndex,
      });
    }
  }
  
  return questions;
}

