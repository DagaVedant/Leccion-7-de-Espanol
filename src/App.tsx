import { useState, useEffect } from 'react';
import { SectionId, ScoreState } from './types';
import { GRAMMAR_SECTIONS_DATA, VOCAB_BLANK_QUESTIONS, VOCAB_MATCH_ITEMS, VOCAB_ICON_MATCH_ITEMS } from './constants/data';
import { ProgressBar } from './components/ProgressBar';
import { VocabularySection } from './components/VocabularySection';
import { GrammarSection } from './components/GrammarSection';
import { BookIcon, BrainIcon, TrophyIcon, HomeIcon, GraduationCapIcon, RefreshCwIcon } from './components/Icons';
import { playCorrectSound, playIncorrectSound } from './utils/audio';
import confetti from 'canvas-confetti';

const INITIAL_SCORE_STATE: ScoreState = {
  vocabActivity1: { completed: false, score: 0, maxScore: 5, answers: [] },
  vocabActivity2: { completed: false, score: 0, maxScore: 7, answers: {} },
  vocabActivity3: { completed: false, score: 0, maxScore: 8, answers: {} },
  grammarFuture: { completed: false, score: 0, maxScore: 5, answers: {} },
  grammarFuturePerfect: { completed: false, score: 0, maxScore: 5, answers: {} },
  grammarPastSubjunctive: { completed: false, score: 0, maxScore: 5, answers: {} }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');
  const [scoreState, setScoreState] = useState<ScoreState>(INITIAL_SCORE_STATE);

  useEffect(() => {
    const saved = localStorage.getItem('spanish_assignment_score');
    if (saved) {
      try {
        setScoreState(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    if (activeSection === 'grading') {
      confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
      confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
    }
  }, [activeSection]);

  const saveState = (newState: ScoreState) => {
    setScoreState(newState);
    localStorage.setItem('spanish_assignment_score', JSON.stringify(newState));
  };

  const handleVocab1Answer = (answers: string[]) => {
    let score = 0;
    answers.forEach((ans, idx) => {
      const normalizedAns = ans.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const question = VOCAB_BLANK_QUESTIONS[idx];
      const isCorrect = question.acceptableAnswers.some(acc => {
        const normalizedAcc = acc.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedAns === normalizedAcc;
      });
      if (isCorrect) score++;
    });

    const newState = {
      ...scoreState,
      vocabActivity1: {
        ...scoreState.vocabActivity1,
        completed: true,
        score,
        answers
      }
    };
    saveState(newState);
  };

  const handleVocab2Answer = (answers: { [key: number]: string }) => {
    let score = 0;
    VOCAB_MATCH_ITEMS.forEach((item, idx) => {
      if (answers[idx] === item.english) {
        score++;
      }
    });

    const newState = {
      ...scoreState,
      vocabActivity2: {
        ...scoreState.vocabActivity2,
        completed: true,
        score,
        answers
      }
    };
    saveState(newState);
  };

  const handleVocab3Answer = (answers: { [key: string]: string }) => {
    let score = 0;
    VOCAB_ICON_MATCH_ITEMS.forEach(item => {
      if (answers[item.id] === item.label) {
        score++;
      }
    });

    const fullyCompleted = Object.keys(answers).length === VOCAB_ICON_MATCH_ITEMS.length;

    const newState = {
      ...scoreState,
      vocabActivity3: {
        ...scoreState.vocabActivity3,
        completed: fullyCompleted,
        score,
        answers
      }
    };
    saveState(newState);
  };

  const handleRetryVocabActivity = (activityId: 1 | 2 | 3) => {
    const actKey = `vocabActivity${activityId}` as keyof ScoreState;
    const newState = {
      ...scoreState,
      [actKey]: {
        completed: false,
        score: 0,
        maxScore: activityId === 1 ? 5 : activityId === 2 ? 7 : 8,
        answers: activityId === 1 ? [] : {}
      }
    };
    saveState(newState);
  };

  const handleGrammarAnswer = (sectionKey: keyof ScoreState, questionId: number, optionIndex: number) => {
    const currentSection = scoreState[sectionKey] as { answers: { [key: number]: number }; completed: boolean };
    const newAnswers = { ...currentSection.answers, [questionId]: optionIndex };
    
    let score = 0;
    const sectionData = GRAMMAR_SECTIONS_DATA.find(s => {
      if (sectionKey === 'grammarFuture') return s.id === 'grammar-future';
      if (sectionKey === 'grammarFuturePerfect') return s.id === 'grammar-future-perfect';
      if (sectionKey === 'grammarPastSubjunctive') return s.id === 'grammar-past-subjunctive';
      return false;
    });

    if (!sectionData) return;

    // Check individual question evaluation for audio chime
    const currentQuestion = sectionData.questions.find(q => q.id === questionId);
    const isThisCorrect = currentQuestion && currentQuestion.correctAnswer === optionIndex;

    if (isThisCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    sectionData.questions.forEach(q => {
      if (newAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const isCompleted = Object.keys(newAnswers).length === sectionData.questions.length;



    const newState = {
      ...scoreState,
      [sectionKey]: {
        ...currentSection,
        completed: isCompleted,
        score,
        answers: newAnswers
      }
    };
    saveState(newState);
  };

  const handleClearGrammarAnswer = (sectionKey: keyof ScoreState, questionId: number) => {
    const currentSection = scoreState[sectionKey] as { answers: { [key: number]: number }; completed: boolean };
    const newAnswers = { ...currentSection.answers };
    delete newAnswers[questionId];

    let score = 0;
    const sectionData = GRAMMAR_SECTIONS_DATA.find(s => {
      if (sectionKey === 'grammarFuture') return s.id === 'grammar-future';
      if (sectionKey === 'grammarFuturePerfect') return s.id === 'grammar-future-perfect';
      if (sectionKey === 'grammarPastSubjunctive') return s.id === 'grammar-past-subjunctive';
      return false;
    });

    if (!sectionData) return;

    sectionData.questions.forEach(q => {
      if (newAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const newState = {
      ...scoreState,
      [sectionKey]: {
        ...currentSection,
        completed: false,
        score,
        answers: newAnswers
      }
    };
    saveState(newState);
  };

  const handleRetryAll = () => {
    if (window.confirm("¿Estás seguro de que quieres reiniciar toda la tarea? (Are you sure you want to restart the whole assignment?)")) {
      saveState(INITIAL_SCORE_STATE);
      setActiveSection('dashboard');
    }
  };

  const isAllCompleted = 
    scoreState.vocabActivity1.completed &&
    scoreState.vocabActivity2.completed &&
    scoreState.vocabActivity3.completed &&
    scoreState.grammarFuture.completed &&
    scoreState.grammarFuturePerfect.completed &&
    scoreState.grammarPastSubjunctive.completed;

  const sectionsList = [
    {
      id: 'vocabulary' as SectionId,
      nameEs: 'Vocabulario',
      nameEn: 'Vocabulary',
      weight: '25%',
      icon: <BrainIcon size={18} className="text-[#E9C46A]" />,
      completed: scoreState.vocabActivity1.completed && scoreState.vocabActivity2.completed && scoreState.vocabActivity3.completed,
      score: `${scoreState.vocabActivity1.score + scoreState.vocabActivity2.score + scoreState.vocabActivity3.score} / 20`
    },
    {
      id: 'grammar-future' as SectionId,
      nameEs: 'El Futuro',
      nameEn: 'Future Tense',
      weight: '25%',
      icon: <BookIcon size={18} className="text-[#4A90E2]" />,
      completed: scoreState.grammarFuture.completed,
      score: `${scoreState.grammarFuture.score} / 5`
    },
    {
      id: 'grammar-future-perfect' as SectionId,
      nameEs: 'Futuro Perfecto',
      nameEn: 'Future Perfect',
      weight: '25%',
      icon: <BookIcon size={18} className="text-[#E76F51]" />,
      completed: scoreState.grammarFuturePerfect.completed,
      score: `${scoreState.grammarFuturePerfect.score} / 5`
    },
    {
      id: 'grammar-past-subjunctive' as SectionId,
      nameEs: 'Subjuntivo Pasado',
      nameEn: 'Past Subjunctive',
      weight: '25%',
      icon: <BookIcon size={18} className="text-[#E9C46A]" />,
      completed: scoreState.grammarPastSubjunctive.completed,
      score: `${scoreState.grammarPastSubjunctive.score} / 5`
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF6CC] text-[#2E2E2E] flex flex-col font-sans antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={() => setActiveSection('dashboard')} 
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-2 rounded-xl text-white shadow-md">
                <GraduationCapIcon size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs md:text-sm tracking-tight text-slate-800 leading-none">
                  PROFESIONES Y TIEMPOS VERBALES
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-1 font-medium text-sm">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${activeSection === 'dashboard' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <HomeIcon size={16} /> Inicio
              </button>
              
              {sectionsList.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all ${activeSection === s.id ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                >
                  {s.nameEs}
                  {s.completed && <span className="text-[#3CB371] text-xs font-bold ml-1">✓</span>}
                </button>
              ))}

              <button
                onClick={() => setActiveSection('grading')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${activeSection === 'grading' ? 'bg-green-100 text-green-800 font-bold' : 'text-[#E76F51] font-semibold hover:bg-red-50'}`}
              >
                <TrophyIcon size={16} /> Terminado
              </button>
            </nav>

            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`p-2 rounded-lg cursor-pointer ${activeSection === 'dashboard' ? 'bg-slate-100 text-slate-800' : 'text-slate-50'}`}
              >
                <HomeIcon size={20} />
              </button>
              <button
                onClick={() => setActiveSection('grading')}
                className={`p-2 rounded-lg cursor-pointer ${activeSection === 'grading' ? 'bg-green-100 text-green-700' : 'text-[#E76F51]'}`}
              >
                <TrophyIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 flex flex-col">
        {activeSection !== 'grading' && (
          <ProgressBar scoreState={scoreState} currentSectionId={activeSection === 'dashboard' ? undefined : activeSection} />
        )}

        <div className="flex-1">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF6CC] rounded-full -mr-12 -mt-12 opacity-50 mix-blend-multiply"></div>
                <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight">
                  Leccion 7 - Profesiones y Tiempos Verbales
                </h1>
                <p className="text-sm font-bold text-[#4A90E2] uppercase tracking-widest mt-1">
                  By: Vedant D, Ishan P, Nikita B, Shriya S
                </p>
                <p className="text-slate-600 mt-4 max-w-3xl text-sm md:text-base leading-relaxed">
                  Bienvenido! Press one of the 4 topics to get started and complete the activities. 
                </p>

                {isAllCompleted && (
                  <button
                    onClick={() => setActiveSection('grading')}
                    className="mt-6 bg-[#3CB371] hover:bg-[#2e935b] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-base"
                  >
                    <TrophyIcon size={20} /> Ver Calificación Final (View Final Grade)
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                  Lista de Tareas (Assignment List)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div 
                    onClick={() => setActiveSection('vocabulary')}
                    className={`border-2 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:shadow-md hover:border-[#E9C46A] relative bg-[#FFFDF5] ${sectionsList[0].completed ? 'border-[#3CB371] bg-green-50/20' : 'border-slate-100'}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="p-2 bg-[#E9C46A]/10 rounded-xl">{sectionsList[0].icon}</span>
                        <span className="text-xs font-bold text-slate-400">Peso: {sectionsList[0].weight}</span>
                      </div>
                      <h4 className="font-black text-slate-800 text-sm md:text-base">{sectionsList[0].nameEs}</h4>
                      <h5 className="text-2xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">{sectionsList[0].nameEn}</h5>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${sectionsList[0].completed ? 'bg-green-100 text-[#3CB371]' : 'bg-slate-100 text-slate-500'}`}>
                        {sectionsList[0].completed ? 'Completada' : 'Pendiente'}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{sectionsList[0].score} ptos</span>
                    </div>
                  </div>

                  {sectionsList.slice(1).map((s, idx) => {
                    const grammarKeys: Array<keyof ScoreState> = ['grammarFuture', 'grammarFuturePerfect', 'grammarPastSubjunctive'];
                    const stateKey = grammarKeys[idx];
                    const stateItem = scoreState[stateKey];
                    const isCompleted = stateItem.completed;

                    return (
                      <div 
                        key={s.id}
                        onClick={() => setActiveSection(s.id)}
                        className={`border-2 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:shadow-md hover:border-[#4A90E2] bg-[#FFFDF5] ${isCompleted ? 'border-[#3CB371] bg-green-50/20' : 'border-slate-100'}`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="p-2 bg-slate-100 rounded-xl">{s.icon}</span>
                            <span className="text-xs font-bold text-slate-400">Peso: {s.weight}</span>
                          </div>
                          <h4 className="font-black text-slate-800 text-sm md:text-base">{s.nameEs}</h4>
                          <h5 className="text-2xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">{s.nameEn}</h5>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                          <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${isCompleted ? 'bg-green-100 text-[#3CB371]' : 'bg-slate-100 text-slate-500'}`}>
                            {isCompleted ? 'Completada' : 'Pendiente'}
                          </span>
                          <span className="text-xs font-bold text-slate-700">{s.score} ptos</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => setActiveSection('grading')}
                    className={`font-bold px-6 py-2.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer text-sm ${isAllCompleted ? 'bg-[#E76F51] hover:bg-[#d55b3c] text-white' : 'bg-white border border-slate-200 text-slate-400 cursor-pointer hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    <TrophyIcon size={16} /> Generar Calificación Final (Generate Final Grade)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'vocabulary' && (
            <div className="space-y-6">
              <VocabularySection
                scoreState={scoreState}
                onVocab1Answer={handleVocab1Answer}
                onVocab2Answer={handleVocab2Answer}
                onVocab3Answer={handleVocab3Answer}
                onRetryActivity={handleRetryVocabActivity}
              />
              <div className="text-center mt-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 px-4 py-2 rounded-lg cursor-pointer shadow-sm transition-all"
                >
                  <HomeIcon size={14} /> Inicio
                </button>
              </div>
            </div>
          )}

          {activeSection === 'grammar-future' && (
            <GrammarSection
              data={GRAMMAR_SECTIONS_DATA[0]}
              userAnswers={scoreState.grammarFuture.answers}
              onAnswerSelect={(qId, optIdx) => handleGrammarAnswer('grammarFuture', qId, optIdx)}
              onClearQuestion={(qId) => handleClearGrammarAnswer('grammarFuture', qId)}
              onGoHome={() => setActiveSection('dashboard')}
              sectionScore={scoreState.grammarFuture.score}
            />
          )}

          {activeSection === 'grammar-future-perfect' && (
            <GrammarSection
              data={GRAMMAR_SECTIONS_DATA[1]}
              userAnswers={scoreState.grammarFuturePerfect.answers}
              onAnswerSelect={(qId, optIdx) => handleGrammarAnswer('grammarFuturePerfect', qId, optIdx)}
              onClearQuestion={(qId) => handleClearGrammarAnswer('grammarFuturePerfect', qId)}
              onGoHome={() => setActiveSection('dashboard')}
              sectionScore={scoreState.grammarFuturePerfect.score}
            />
          )}

          {activeSection === 'grammar-past-subjunctive' && (
            <GrammarSection
              data={GRAMMAR_SECTIONS_DATA[2]}
              userAnswers={scoreState.grammarPastSubjunctive.answers}
              onAnswerSelect={(qId, optIdx) => handleGrammarAnswer('grammarPastSubjunctive', qId, optIdx)}
              onClearQuestion={(qId) => handleClearGrammarAnswer('grammarPastSubjunctive', qId)}
              onGoHome={() => setActiveSection('dashboard')}
              sectionScore={scoreState.grammarPastSubjunctive.score}
            />
          )}

          {activeSection === 'grading' && (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-lg relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF6CC] rounded-full -mr-12 -mt-12 opacity-40 mix-blend-multiply"></div>
              <div className="p-4 bg-green-100 text-[#3CB371] rounded-full inline-flex mb-4 shadow-sm">
                <TrophyIcon size={40} />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                ¡Has completado todo!
              </h1>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1 mb-4">
                Task Completed Fully
              </p>
              <div className="border-t border-dashed border-slate-100 my-4 pt-4">
              </div>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed px-4">
                Has completado
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all w-full sm:w-auto justify-center"
                >
                  <HomeIcon size={14} /> Inicio
                </button>
                <button
                  onClick={handleRetryAll}
                  className="flex items-center gap-1.5 text-xs font-bold bg-[#E76F51] hover:bg-[#d55b3c] text-white px-4 py-2.5 rounded-xl cursor-pointer shadow-md transition-all w-full sm:w-auto justify-center"
                >
                  <RefreshCwIcon size={14} /> Reiniciar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
