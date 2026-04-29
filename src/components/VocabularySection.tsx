import React, { useState } from 'react';
import { VOCAB_BLANK_QUESTIONS, VOCAB_MATCH_ITEMS, VOCAB_ICON_MATCH_ITEMS } from '../constants/data';
import { ScoreState } from '../types';
import { CheckIcon, XIcon, RefreshCwIcon, BrainIcon } from './Icons';
import { playCorrectSound, playIncorrectSound } from '../utils/audio';

interface VocabularySectionProps {
  scoreState: ScoreState;
  onVocab1Answer: (answers: string[]) => void;
  onVocab2Answer: (answers: { [key: number]: string }) => void;
  onVocab3Answer: (answers: { [key: string]: string }) => void;
  onRetryActivity: (activityId: 1 | 2 | 3) => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  scoreState,
  onVocab1Answer,
  onVocab2Answer,
  onVocab3Answer,
  onRetryActivity
}) => {
  // --- Activity 1 State ---
  const [act1Answers, setAct1Answers] = useState<string[]>(
    scoreState.vocabActivity1.answers.length > 0 
      ? [...scoreState.vocabActivity1.answers] 
      : Array(VOCAB_BLANK_QUESTIONS.length).fill('')
  );
  const [act1Checked, setAct1Checked] = useState(scoreState.vocabActivity1.completed);

  // --- Activity 2 State (Matching) ---
  const [selectedSpanishId, setSelectedSpanishId] = useState<string | null>(null);
  const [act2Matches, setAct2Matches] = useState<{ [key: string]: string }>(() => {
    const matches: { [key: string]: string } = {};
    const answers = scoreState.vocabActivity2.answers;
    Object.entries(answers).forEach(([vocabIdxStr, englishVal]) => {
      const idx = parseInt(vocabIdxStr);
      const item = VOCAB_MATCH_ITEMS[idx];
      if (item) {
        matches[item.id] = englishVal;
      }
    });
    return matches;
  });
  const [act2IncorrectPair, setAct2IncorrectPair] = useState<{ es: string; en: string } | null>(null);

  // --- Activity 1 Handler ---
  const handleAct1InputChange = (index: number, val: string) => {
    const next = [...act1Answers];
    next[index] = val;
    setAct1Answers(next);
  };

  const handleAct1Check = () => {
    let score = 0;
    act1Answers.forEach((ans, idx) => {
      const normalizedAns = ans.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const question = VOCAB_BLANK_QUESTIONS[idx];
      
      const isCorrect = question.acceptableAnswers.some(acc => {
        const normalizedAcc = acc.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedAns === normalizedAcc;
      });

      if (isCorrect) score++;
    });

    onVocab1Answer(act1Answers);
    setAct1Checked(true);

    if (score > 0) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }


  };

  const handleAct1Retry = () => {
    setAct1Answers(Array(VOCAB_BLANK_QUESTIONS.length).fill(''));
    setAct1Checked(false);
    onRetryActivity(1);
  };

  // --- Activity 2 Handlers (Matching) ---
  const handleSpanishClick = (id: string) => {
    if (scoreState.vocabActivity2.completed) return;
    if (act2Matches[id]) return; // already matched correctly
    setSelectedSpanishId(id);
    setAct2IncorrectPair(null);
  };

  const handleEnglishClick = (englishWord: string) => {
    if (scoreState.vocabActivity2.completed || !selectedSpanishId) return;

    const matchedItem = VOCAB_MATCH_ITEMS.find(item => item.id === selectedSpanishId);
    if (!matchedItem) return;

    if (matchedItem.english === englishWord) {
      // Correct Match!
      playCorrectSound();
      const newMatches = { ...act2Matches, [selectedSpanishId]: englishWord };
      setAct2Matches(newMatches);
      setSelectedSpanishId(null);

      const matchedCount = Object.keys(newMatches).length;
      if (matchedCount === VOCAB_MATCH_ITEMS.length) {
        const answersPayload: { [key: number]: string } = {};
        VOCAB_MATCH_ITEMS.forEach((item, idx) => {
          answersPayload[idx] = item.english;
        });
        onVocab2Answer(answersPayload);
      }
    } else {
      // Incorrect Match
      playIncorrectSound();
      setAct2IncorrectPair({ es: selectedSpanishId, en: englishWord });
      setTimeout(() => {
        setAct2IncorrectPair(null);
        setSelectedSpanishId(null);
      }, 1000);
    }
  };

  const handleAct2Retry = () => {
    setAct2Matches({});
    setSelectedSpanishId(null);
    setAct2IncorrectPair(null);
    onRetryActivity(2);
  };

  // --- Activity 3 Handlers (Icon Matching) ---
  const handleAct3Select = (id: string, label: string) => {
    if (scoreState.vocabActivity3.completed) return;

    const currentAnswers = { ...scoreState.vocabActivity3.answers, [id]: label };
    
    const targetItem = VOCAB_ICON_MATCH_ITEMS.find(item => item.id === id);
    if (targetItem && targetItem.label === label) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    const uniqueAnswersCount = Object.keys(currentAnswers).length;
    if (uniqueAnswersCount === VOCAB_ICON_MATCH_ITEMS.length) {
      onVocab3Answer(currentAnswers);
    } else {
      onVocab3Answer(currentAnswers);
    }
  };

  const handleAct3Retry = () => {
    onRetryActivity(3);
  };

  // Shuffled English words for Activity 2 (pre-calculated or sorted once)
  const act2EnglishWords = React.useMemo(() => {
    return [...VOCAB_MATCH_ITEMS]
      .map(item => item.english)
      .sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <div className="space-y-12 bg-[#FFF6CC]/30 p-4 md:p-6 rounded-2xl border border-yellow-100">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#E9C46A]/20 p-2.5 rounded-lg text-yellow-600">
            <BrainIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Sección de Vocabulario
            </h1>
            <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wider">
              Professions Vocabulary (Grade: 30%)
            </h2>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2 italic border-t border-slate-100 pt-3">
          Completa las tres actividades abajo para demostrar tu dominio de las profesiones. Cada actividad provee retroalimentación inmediata.
          (Complete the three activities below to demonstrate your mastery of professions. Each activity provides instant feedback.)
        </p>
      </div>

      {/* ACTIVITY 1 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase mr-2">
              Actividad 1
            </span>
            <h3 className="text-lg font-bold text-slate-800 inline-block">
              🧩 Rellenar los Espacios (Fill in the Blank)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">
              Puntos: {scoreState.vocabActivity1.score} / 5
            </span>
            {act1Checked && (
              <button
                onClick={handleAct1Retry}
                className="flex items-center gap-1 text-xs font-bold bg-white border border-slate-200 hover:border-[#4A90E2] text-slate-600 hover:text-[#4A90E2] px-2 py-1 rounded cursor-pointer"
              >
                <RefreshCwIcon size={12} /> Reiniciar
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Escribe el nombre de la profesión correcta en español (incluye el artículo: <strong>El</strong>).
          (Type the correct profession in Spanish, including the article 'El'.)
        </p>

        <div className="space-y-6">
          {VOCAB_BLANK_QUESTIONS.map((q, idx) => {
            const userAns = act1Answers[idx];
            const isChecked = act1Checked;
            const normalizedUserAns = userAns.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            const isCorrect = q.acceptableAnswers.some(acc => {
              const normalizedAcc = acc.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              return normalizedUserAns === normalizedAcc;
            });

            return (
              <div key={q.id} className="flex flex-col md:flex-row items-start md:items-center gap-2 text-base md:text-lg">
                <span className="text-2xl mr-1">{q.icon}</span>
                <div className="flex flex-wrap items-center gap-2 w-full">
                  <span className="font-semibold text-slate-700">{idx + 1}.</span>
                  
                  {/* Input or static display */}
                  <input
                    type="text"
                    disabled={isChecked}
                    value={userAns}
                    onChange={(e) => handleAct1InputChange(idx, e.target.value)}
                    placeholder="El profesio..."
                    className={`border-b-2 font-bold px-2 py-1 rounded-t md:w-48 text-center outline-none transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-[#3CB371] bg-green-50/50 text-[#3CB371]'
                          : 'border-[#E76F51] bg-red-50/50 text-[#E76F51]'
                        : 'border-slate-300 focus:border-[#4A90E2] bg-[#FFFDF5]'
                    }`}
                  />
                  
                  <span className="text-slate-700">{q.textAfter}</span>
                  
                  {/* Feedback icon & text */}
                  {isChecked && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold ml-2">
                      {isCorrect ? (
                        <span className="text-[#3CB371] flex items-center gap-0.5">
                          <CheckIcon size={16} /> ¡Correcto!
                        </span>
                      ) : (
                        <span className="text-[#E76F51] flex items-center gap-0.5">
                          <XIcon size={16} /> Resp. correcta: <span className="font-bold underline">{q.answer}</span>
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!act1Checked && (
          <button
            onClick={handleAct1Check}
            className="mt-6 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all cursor-pointer"
          >
            Verificar Respuestas (Check Answers)
          </button>
        )}
      </div>

      {/* ACTIVITY 2 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase mr-2">
              Actividad 2
            </span>
            <h3 className="text-lg font-bold text-slate-800 inline-block">
              🔗 Emparejar Términos (Matching Spanish → English)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">
              Puntos: {scoreState.vocabActivity2.score} / 7
            </span>
            {scoreState.vocabActivity2.completed && (
              <button
                onClick={handleAct2Retry}
                className="flex items-center gap-1 text-xs font-bold bg-white border border-slate-200 hover:border-[#4A90E2] text-slate-600 hover:text-[#4A90E2] px-2 py-1 rounded cursor-pointer"
              >
                <RefreshCwIcon size={12} /> Reiniciar
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Haz clic en una palabra en español, y luego haz clic en su traducción correspondiente en inglés.
          (Click a Spanish word, then click its English translation to pair them. Checked instantly!)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Spanish Column */}
          <div className="space-y-2">
            <h4 className="text-center font-bold text-slate-500 text-sm border-b pb-1 mb-3">ESPAÑOL</h4>
            {VOCAB_MATCH_ITEMS.map(item => {
              const isMatched = !!act2Matches[item.id];
              const isSelected = selectedSpanishId === item.id;
              const isIncorrect = act2IncorrectPair?.es === item.id;

              let btnClass = "bg-[#FFFDF5] hover:bg-yellow-50 border-slate-200 text-slate-700 cursor-pointer";
              let badge = <span>{item.icon}</span>;

              if (isMatched) {
                btnClass = "bg-green-50 border-[#3CB371] text-[#3CB371] cursor-not-allowed opacity-80 font-bold";
                badge = <CheckIcon size={16} className="text-[#3CB371]" />;
              } else if (isIncorrect) {
                btnClass = "bg-red-100 border-[#E76F51] text-[#E76F51] font-bold animate-pulse";
                badge = <XIcon size={16} className="text-[#E76F51]" />;
              } else if (isSelected) {
                btnClass = "bg-[#4A90E2] border-[#4A90E2] text-white font-bold ring-2 ring-blue-200";
              }

              return (
                <button
                  key={item.id}
                  disabled={isMatched || act2IncorrectPair !== null}
                  onClick={() => handleSpanishClick(item.id)}
                  className={`w-full text-left p-3 border rounded-xl flex items-center justify-between transition-all ${btnClass}`}
                >
                  <span className="font-medium">{item.spanish}</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm">{badge}</span>
                </button>
              );
            })}
          </div>

          {/* English Column */}
          <div className="space-y-2">
            <h4 className="text-center font-bold text-slate-500 text-sm border-b pb-1 mb-3">ENGLISH</h4>
            {act2EnglishWords.map(englishWord => {
              const matchingSpanId = Object.keys(act2Matches).find(k => act2Matches[k] === englishWord);
              const isMatched = !!matchingSpanId;
              const isIncorrect = act2IncorrectPair?.en === englishWord;
              const hasSelection = selectedSpanishId !== null;

              let btnClass = "bg-[#FFFDF5] border-slate-200 text-slate-700";
              
              if (isMatched) {
                btnClass = "bg-green-50 border-[#3CB371] text-[#3CB371] cursor-not-allowed opacity-80 font-bold";
              } else if (isIncorrect) {
                btnClass = "bg-red-100 border-[#E76F51] text-[#E76F51] font-bold animate-pulse";
              } else if (hasSelection) {
                btnClass = "bg-yellow-50 hover:bg-yellow-100 border-yellow-300 text-slate-700 cursor-pointer border-dashed";
              } else {
                btnClass = "bg-white border-slate-200 text-slate-400 border-dashed cursor-not-allowed";
              }

              return (
                <button
                  key={englishWord}
                  disabled={isMatched || !hasSelection || act2IncorrectPair !== null}
                  onClick={() => handleEnglishClick(englishWord)}
                  className={`w-full text-left p-3 border rounded-xl flex items-center justify-between transition-all ${btnClass}`}
                >
                  <span className="font-medium">{englishWord}</span>
                  {isMatched && <CheckIcon size={16} className="text-[#3CB371]" />}
                  {isIncorrect && <XIcon size={16} className="text-[#E76F51]" />}
                </button>
              );
            })}
          </div>
        </div>
        
        {scoreState.vocabActivity2.completed && (
          <div className="mt-4 p-3 bg-green-50 border border-[#3CB371] text-[#3CB371] text-center font-bold rounded-xl">
            🎉 ¡Excelente! Emparejaste correctamente todas las profesiones.
          </div>
        )}
      </div>

      {/* ACTIVITY 3 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase mr-2">
              Actividad 3
            </span>
            <h3 className="text-lg font-bold text-slate-800 inline-block">
              🖼️ Reconocimiento de Iconos (Image/Icon Matching)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">
              Puntos: {scoreState.vocabActivity3.score} / 8
            </span>
            {scoreState.vocabActivity3.completed && (
              <button
                onClick={handleAct3Retry}
                className="flex items-center gap-1 text-xs font-bold bg-white border border-slate-200 hover:border-[#4A90E2] text-slate-600 hover:text-[#4A90E2] px-2 py-1 rounded cursor-pointer"
              >
                <RefreshCwIcon size={12} /> Reiniciar
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Identifica la profesión correcta que representa cada icono seleccionándola del menú desplegable.
          (Identify the correct profession for each icon by selecting it from the dropdown menu.)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {VOCAB_ICON_MATCH_ITEMS.map(item => {
            const userSelection = scoreState.vocabActivity3.answers[item.id] || '';
            const isAnswered = !!userSelection;
            const isCorrect = userSelection === item.label;

            return (
              <div
                key={item.id}
                className={`border rounded-xl p-4 flex flex-col items-center text-center shadow-sm transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-green-50/30 border-[#3CB371]'
                      : 'bg-red-50/30 border-[#E76F51]'
                    : 'bg-[#FFFDF5] border-slate-200'
                }`}
              >
                {/* Large Icon */}
                <span className="text-5xl mb-4 bg-white shadow-sm p-4 rounded-full w-20 h-20 flex items-center justify-center">
                  {item.icon}
                </span>

                {/* Dropdown */}
                <select
                  disabled={scoreState.vocabActivity3.completed}
                  value={userSelection}
                  onChange={(e) => handleAct3Select(item.id, e.target.value)}
                  className={`w-full text-xs md:text-sm font-semibold p-2 border rounded-lg outline-none cursor-pointer bg-white ${
                    isAnswered
                      ? isCorrect
                        ? 'border-[#3CB371] text-[#3CB371]'
                        : 'border-[#E76F51] text-[#E76F51]'
                      : 'border-slate-300 text-slate-700 focus:border-[#4A90E2]'
                  }`}
                >
                  <option value="">-- Selecciona --</option>
                  {[...VOCAB_ICON_MATCH_ITEMS]
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map(opt => (
                      <option key={opt.id} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                </select>

                {/* Micro Feedback */}
                {isAnswered && (
                  <div className="mt-2 text-xs font-bold flex items-center gap-1">
                    {isCorrect ? (
                      <span className="text-[#3CB371] flex items-center gap-0.5">
                        <CheckIcon size={14} /> ¡Correcto!
                      </span>
                    ) : (
                      <span className="text-[#E76F51] flex flex-col items-center">
                        <span className="flex items-center gap-0.5"><XIcon size={14} /> Incorrecto</span>
                        <span className="text-[10px] font-normal text-slate-400">Era: {item.label}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
