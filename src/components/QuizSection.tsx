import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // índice da resposta correta (0-3)
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  topicTitle: string;
}

export default function QuizSection({ questions, topicTitle }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (showResults) return; // Não permite mudar após ver resultados
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
  };

  const allAnswered = selectedAnswers.every((answer) => answer !== null);
  const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

  return (
    <div className="my-8 rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">✅</span>
        Quiz de Avaliação - {topicTitle}
      </h3>
      
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-3">
            <p className="font-medium text-foreground/90">
              <span className="text-cyan-500">Questão {qIndex + 1}:</span>{" "}
              {q.question}
            </p>
            
            <div className="space-y-2 pl-4">
              {q.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = oIndex === q.correctAnswer;
                const showCorrect = showResults && isCorrect;
                const showIncorrect = showResults && isSelected && !isCorrect;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswerSelect(qIndex, oIndex)}
                    disabled={showResults}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      showCorrect
                        ? "bg-green-500/20 border-green-500/50 text-green-300"
                        : showIncorrect
                        ? "bg-red-500/20 border-red-500/50 text-red-300"
                        : isSelected
                        ? "bg-cyan-500/20 border-cyan-500 text-foreground"
                        : "bg-white/5 border-white/15 hover:border-white/30 text-foreground/80"
                    } ${showResults ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(97 + oIndex)})
                    </span>
                    {option}
                    {showCorrect && " ✓"}
                    {showIncorrect && " ✗"}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {showResults && (
        <div className={`mt-6 p-4 rounded-lg border ${
          percentage >= 70
            ? "bg-green-500/10 border-green-500/30"
            : percentage >= 50
            ? "bg-yellow-500/10 border-yellow-500/30"
            : "bg-red-500/10 border-red-500/30"
        }`}>
          <p className="text-lg font-semibold mb-2">
            Resultado: {score} de {questions.length} corretas ({percentage.toFixed(0)}%)
          </p>
          <p className="text-sm text-foreground/70">
            {percentage >= 70
              ? "Excelente! Você dominou este tópico! 🎉"
              : percentage >= 50
              ? "Bom trabalho! Revise alguns conceitos para melhorar. 📚"
              : "Continue estudando! A prática leva à perfeição. 💪"}
          </p>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {!showResults ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              allAnswered
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110"
                : "bg-white/10 text-foreground/40 cursor-not-allowed"
            }`}
          >
            Enviar Respostas
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-foreground font-medium transition"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}


