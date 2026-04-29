import React from 'react';
import { GrammarMCQ } from '../types';
import { CheckIcon, XIcon, RefreshCwIcon } from './Icons';

interface QuizEngineProps {
  questions: GrammarMCQ[];
  userAnswers: { [key: number]: number };
  onAnswerSelect: (questionId: number, optionIndex: number) => void;
  onClearQuestion?: (questionId: number) => void;
  sectionScore: number;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  userAnswers,
  onAnswerSelect,
  onClearQuestion,
  sectionScore
}) => {
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          📝 Práctica: Opción Múltiple
        </h3>
        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          Sección: {sectionScore} / {questions.length} ptos
        </span>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedAnswer = userAnswers[q.id];
          const isAnswered = selectedAnswer !== undefined;
          const isCorrect = selectedAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-green-50/20 border-[#3CB371]'
                    : 'bg-red-50/20 border-[#E76F51]'
                  : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex gap-3">
                <span className="flex items-center justify-center bg-slate-100 text-slate-600 font-bold w-6 h-6 rounded-full text-xs flex-shrink-0">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-800 mb-3">{q.question}</p>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((option, optIdx) => {
                      const isOptionSelected = selectedAnswer === optIdx;
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      
                      let btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer";
                      let badge = null;

                      if (isAnswered) {
                        if (isCorrect) {
                          if (isOptionCorrect) {
                            btnClass = "bg-[#3CB371] border-[#3CB371] text-white font-bold cursor-not-allowed";
                            badge = <CheckIcon size={16} className="text-white" />;
                          } else {
                            btnClass = "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed";
                          }
                        } else {
                          if (isOptionSelected) {
                            btnClass = "bg-[#E76F51] border-[#E76F51] text-white font-bold cursor-pointer";
                            badge = <XIcon size={16} className="text-white" />;
                          } else {
                            btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer";
                          }
                        }
                      }

                      const isDisabled = isAnswered && isCorrect;

                      return (
                        <button
                          key={optIdx}
                          disabled={isDisabled}
                          onClick={() => onAnswerSelect(q.id, optIdx)}
                          className={`w-full text-left p-2.5 rounded-lg border flex items-center justify-between text-sm transition-all ${btnClass}`}
                        >
                          <span>{option}</span>
                          {badge}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswered && (
                    <div className={`p-2.5 rounded-lg flex gap-2 text-xs font-medium ${isCorrect ? 'bg-green-100/50 text-green-800' : 'bg-red-100/50 text-red-800'}`}>
                      <span className="font-bold">{isCorrect ? '¡Correcto!' : 'Incorrecto.'}</span>
                      <span>{q.explanation}</span>
                    </div>
                  )}

                  {/* Reset Question Button if answered */}
                  {isAnswered && onClearQuestion && (
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => onClearQuestion(q.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-[#4A90E2] border border-slate-100 hover:border-blue-100 px-2 py-1 rounded bg-white shadow-3xs cursor-pointer transition-all"
                      >
                        <RefreshCwIcon size={10} /> Reiniciar Pregunta
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default QuizEngine;
