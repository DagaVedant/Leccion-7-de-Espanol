import React from 'react';
import { GrammarSectionData } from '../types';
import { ConjugationTable } from './ConjugationTable';
import { QuizEngine } from './QuizEngine';
import { BookIcon, HomeIcon } from './Icons';

interface GrammarSectionProps {
  data: GrammarSectionData;
  userAnswers: { [key: number]: number };
  onAnswerSelect: (questionId: number, optionIndex: number) => void;
  onClearQuestion: (questionId: number) => void;
  onGoHome: () => void;
  sectionScore: number;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  data,
  userAnswers,
  onAnswerSelect,
  onClearQuestion,
  onGoHome,
  sectionScore
}) => {
  return (
    <div className="space-y-8 bg-[#FFF6CC]/30 p-4 md:p-6 rounded-2xl border border-yellow-100">
      {/* Section Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#4A90E2]/10 p-2.5 rounded-lg text-[#4A90E2]">
            <BookIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {data.titleEs}
            </h1>
            <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wider">
              {data.titleEn}
            </h2>
          </div>
        </div>
      </div>

      {/* Rules and Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-base font-bold text-slate-800 mb-3"> Usos y Significados </h3>
          <ul className="space-y-2 text-slate-700 text-sm">
            {data.explanation.map((item, idx) => {
              const isTrigger = item.startsWith("Common Triggers:");
              return (
                <li key={idx} className={`flex items-start gap-2 ${isTrigger ? 'bg-yellow-50 p-2 rounded-lg text-slate-800' : ''}`}>
                  <span className="text-[#4A90E2] font-bold">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\*(.*?)\*/g, '<em class="text-[#4A90E2] font-semibold font-mono">$1</em>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-base font-bold text-slate-800 mb-3"> Reglas de Conjugación </h3>
          <ol className="space-y-3 text-slate-700 text-sm list-decimal list-inside">
            {data.conjugationRules.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*(.*?)\*/g, '<em class="text-[#E76F51] font-semibold">$1</em>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#E76F51] font-bold font-mono">$1</strong>') }} />
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Conjugation Displays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex-1">
          <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b"> Verbo Regular </h3>
          <ConjugationTable table={data.regularTable} />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex-1">
          <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b"> Verbos Irregulares </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {data.irregularVerbs.map((item, idx) => (
              <div key={idx} className="bg-[#FFFDF5] border border-red-100 p-2.5 rounded-lg flex items-center justify-between text-sm">
                <span className="font-bold text-slate-600">{item.verb}</span>
                <span className="font-mono font-bold text-[#E76F51] bg-red-50 px-2.5 py-0.5 rounded text-xs">{item.yoForm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MCQ Quiz Engine */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <QuizEngine
          questions={data.questions}
          userAnswers={userAnswers}
          onAnswerSelect={onAnswerSelect}
          onClearQuestion={onClearQuestion}
          sectionScore={sectionScore}
        />
      </div>

      {/* Back to Home Button at the bottom */}
      <div className="text-center mt-4">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 px-4 py-2 rounded-lg cursor-pointer shadow-sm transition-all"
        >
          <HomeIcon size={14} /> Inicio
        </button>
      </div>
    </div>
  );
};
export default GrammarSection;
