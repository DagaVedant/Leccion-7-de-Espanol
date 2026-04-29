export type SectionId = 'dashboard' | 'vocabulary' | 'grammar-future' | 'grammar-future-perfect' | 'grammar-past-subjunctive' | 'grading';

export interface ScoreState {
  vocabActivity1: { completed: boolean; score: number; maxScore: number; answers: string[] };
  vocabActivity2: { completed: boolean; score: number; maxScore: number; answers: { [key: number]: string } };
  vocabActivity3: { completed: boolean; score: number; maxScore: number; answers: { [key: string]: string } };
  grammarFuture: { completed: boolean; score: number; maxScore: number; answers: { [key: number]: number } };
  grammarFuturePerfect: { completed: boolean; score: number; maxScore: number; answers: { [key: number]: number } };
  grammarPastSubjunctive: { completed: boolean; score: number; maxScore: number; answers: { [key: number]: number } };
}

export interface VocabBlankQuestion {
  id: number;
  textBefore: string;
  textAfter: string;
  answer: string;
  acceptableAnswers: string[];
  icon: string;
}

export interface VocabMatchItem {
  id: string;
  spanish: string;
  english: string;
  icon: string;
}

export interface VocabIconMatchItem {
  id: string;
  label: string;
  icon: string;
}

export interface ConjugationRow {
  pronoun: string;
  form: string;
}

export interface ConjugationTable {
  title: string;
  verb: string;
  conjugations: ConjugationRow[];
}

export interface IrregularVerb {
  verb: string;
  yoForm: string;
}

export interface GrammarMCQ {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GrammarSectionData {
  id: SectionId;
  titleEs: string;
  titleEn: string;
  explanation: string[];
  conjugationRules: string[];
  regularTable: ConjugationTable;
  irregularVerbs: IrregularVerb[];
  questions: GrammarMCQ[];
}
