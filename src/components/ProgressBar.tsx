import React from 'react';
import { ScoreState } from '../types';

interface ProgressBarProps {
  scoreState: ScoreState;
  currentSectionId?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ scoreState, currentSectionId }) => {
  // 4 sections * 25% each
  const vocabScore = 
    scoreState.vocabActivity1.score + 
    scoreState.vocabActivity2.score + 
    scoreState.vocabActivity3.score;
    
  const vocabPercentage = Math.round((vocabScore / 20) * 100);

  const futurePercentage = Math.round((scoreState.grammarFuture.score / 5) * 100);
  const futurePerfectPercentage = Math.round((scoreState.grammarFuturePerfect.score / 5) * 100);
  const pastSubjunctivePercentage = Math.round((scoreState.grammarPastSubjunctive.score / 5) * 100);

  // Overall = 25% each
  const totalPercentage = Math.round(
    (vocabPercentage * 0.25) + 
    (futurePercentage * 0.25) + 
    (futurePerfectPercentage * 0.25) + 
    (pastSubjunctivePercentage * 0.25)
  );

  // Derive Current Section Stats
  let sectionLabel = 'Panel Principal';
  let sectionScoreString = '';
  let sectionPercentage = 0;

  if (currentSectionId === 'vocabulary') {
    sectionLabel = 'Vocabulario';
    sectionScoreString = `${vocabScore} / 20 ptos`;
    sectionPercentage = vocabPercentage;
  } else if (currentSectionId === 'grammar-future') {
    sectionLabel = 'El Futuro';
    sectionScoreString = `${scoreState.grammarFuture.score} / 5 ptos`;
    sectionPercentage = futurePercentage;
  } else if (currentSectionId === 'grammar-future-perfect') {
    sectionLabel = 'Futuro Perfecto';
    sectionScoreString = `${scoreState.grammarFuturePerfect.score} / 5 ptos`;
    sectionPercentage = futurePerfectPercentage;
  } else if (currentSectionId === 'grammar-past-subjunctive') {
    sectionLabel = 'Subjuntivo Pasado';
    sectionScoreString = `${scoreState.grammarPastSubjunctive.score} / 5 ptos`;
    sectionPercentage = pastSubjunctivePercentage;
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6 border border-slate-100 mb-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4A90E2]" />

      {/* SVG Overall Circle Gauge */}
      <div className="relative inline-flex items-center justify-center flex-shrink-0">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#4A90E2"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - totalPercentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-black text-slate-800">{totalPercentage}%</span>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total</div>
        </div>
      </div>

      {/* Section Specific Stats */}
      <div className="flex-1 text-center md:text-left space-y-2">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
          <h3 className="text-lg font-black text-slate-800 flex items-center justify-center md:justify-start gap-1.5">
            Progreso General
          </h3>
          {currentSectionId && (
            <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
              Evaluación Actual
            </span>
          )}
        </div>
        
        {currentSectionId ? (
          <div className="bg-[#FFFDF5] p-3 rounded-xl border border-yellow-100/50">
            <div className="flex justify-between items-center mb-1.5 text-sm font-bold">
              <span className="text-slate-700">{sectionLabel} (Peso: 25%)</span>
              <span className="text-[#4A90E2]">{sectionPercentage}% ({sectionScoreString})</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-[#4A90E2] transition-all duration-500 ease-out"
                style={{ width: `${sectionPercentage}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            Completa las 4 secciones ponderadas equitativamente (25% cada una) para obtener tu calificación final acumulada.
          </p>
        )}
      </div>
    </div>
  );
};
export default ProgressBar;
