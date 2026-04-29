import { VocabBlankQuestion, VocabMatchItem, VocabIconMatchItem, GrammarSectionData } from '../types';

export const VOCAB_BLANK_QUESTIONS: VocabBlankQuestion[] = [
  {
    id: 1,
    textBefore: "___ _________",
    textAfter: " es una persona que ayuda a las personas con problemas legales.",
    answer: "El abogado",
    acceptableAnswers: ["el abogado", "El abogado", "abogado"],
    icon: "⚖️"
  },
  {
    id: 2,
    textBefore: "___ ____________",
    textAfter: " es una persona que ayuda a las personas a entender sus emociones, pensamientos y problemas personales.",
    answer: "El psicólogo",
    acceptableAnswers: ["el psicologo", "el psicólogo", "El psicologo", "El psicólogo", "psicólogo", "psicologo"],
    icon: "🧠"
  },
  {
    id: 3,
    textBefore: "___ ___________",
    textAfter: " es una persona que habla con el público sobre ideas, leyes y problemas importantes del país.",
    answer: "El político",
    acceptableAnswers: ["el politico", "el político", "El politico", "El político", "político", "politico"],
    icon: "🏛️"
  },
  {
    id: 4,
    textBefore: "___ _______",
    textAfter: " es una persona que ayuda a los estudiantes a aprender nuevas ideas y habilidades.",
    answer: "El maestro",
    acceptableAnswers: ["el maestro", "El maestro", "maestro", "el profesor", "El profesor", "profesor"],
    icon: "👨‍🏫"
  },
  {
    id: 5,
    textBefore: "___ _____",
    textAfter: " es una persona que prepara comidas deliciosas y trabaja con muchos ingredientes diferentes.",
    answer: "El cocinero",
    acceptableAnswers: ["el cocinero", "El cocinero", "cocinero", "el chef", "El chef", "chef"],
    icon: "👨‍🍳"
  }
];

export const VOCAB_MATCH_ITEMS: VocabMatchItem[] = [
  { id: "1", spanish: "el arquitecto", english: "architect", icon: "🏗️" },
  { id: "2", spanish: "el bombero", english: "firefighter", icon: "🚒" },
  { id: "3", spanish: "el consejero", english: "counselor", icon: "💬" },
  { id: "4", spanish: "el electricista", english: "electrician", icon: "⚡" },
  { id: "5", spanish: "el pintor", english: "painter", icon: "🎨" },
  { id: "6", spanish: "el reportero", english: "reporter", icon: "🎤" },
  { id: "7", spanish: "el diseñador", english: "designer", icon: "🖌️" }
];

export const VOCAB_ICON_MATCH_ITEMS: VocabIconMatchItem[] = [
  { id: "actor", label: "El actor", icon: "🎭" },
  { id: "carpintero", label: "El carpintero", icon: "🪚" },
  { id: "cientifico", label: "El científico", icon: "🔬" },
  { id: "contador", label: "El contador", icon: "📊" },
  { id: "corredor", label: "El corredor de bolsa", icon: "📈" },
  { id: "negocios", label: "El hombre de negocios", icon: "💼" },
  { id: "secretario", label: "El secretario", icon: "🗂️" },
  { id: "peluquero", label: "El peluquero", icon: "💇" }
];

export const GRAMMAR_SECTIONS_DATA: GrammarSectionData[] = [
  {
    id: "grammar-future",
    titleEs: "El Futuro",
    titleEn: "Future Tense",
    explanation: [
      "El Futuro is used to talk about actions that will happen at a later time.",
      "Usage: To make predictions about the future (E.g., *El mundo cambiará* - The world will change).",
      "Usage: For career planning and goals (E.g., *Seré abogado* - I will be a lawyer).",
      "Usage: To express probability in the present (E.g., *¿Qué hora será?* - I wonder what time it is).",
      "Common Triggers: *mañana* (tomorrow), *el próximo año* (next year), *en el futuro* (in the future), *luego* (later)."
    ],
    conjugationRules: [
      "For regular verbs (-AR, -ER, -IR), do not remove the infinitive ending! Keep the whole verb.",
      "Add the future endings directly to the infinitive for ALL verbs (-AR, -ER, and -IR use the EXACT SAME endings).",
      "The endings are: **-é, -ás, -á, -emos, -éis, -án**.",
      "All endings except the *nosotros* form have a written accent! (e.g., yo hablar**é**, tú hablar**ás**)."
    ],
    regularTable: {
      title: "Trabajar (to work)",
      verb: "Trabajar",
      conjugations: [
        { pronoun: "Yo", form: "trabajaré" },
        { pronoun: "Tú", form: "trabajarás" },
        { pronoun: "Él / Ella / Ud.", form: "trabajará" },
        { pronoun: "Nosotros", form: "trabajaremos" },
        { pronoun: "Vosotros", form: "trabajaréis" },
        { pronoun: "Ellos / Ellas / Uds.", form: "trabajarán" }
      ]
    },
    irregularVerbs: [
      { verb: "Tener", yoForm: "Yo tendré" },
      { verb: "Saber", yoForm: "Yo sabré" },
      { verb: "Hacer", yoForm: "Yo haré" },
      { verb: "Poder", yoForm: "Yo podré" },
      { verb: "Decir", yoForm: "Yo diré" }
    ],
    questions: [
      {
        id: 1,
        question: "Yo ________ (trabajar) como abogado en el futuro.",
        options: ["trabajaré", "trabajarás", "trabajará", "trabajaremos"],
        correctAnswer: 0,
        explanation: "Correct! The 'Yo' ending in the future tense is always '-é' added to the infinitive (trabajar + é = trabajaré)."
      },
      {
        id: 2,
        question: "El año que viene, ella ________ (tener) su propio negocio de diseño.",
        options: ["tenerá", "tendrá", "tendra", "teneré"],
        correctAnswer: 1,
        explanation: "Correct! 'Tener' is an irregular verb in the future tense; its stem changes to 'tendr-' before adding the ending '-á' for él/ella/usted."
      },
      {
        id: 3,
        question: "Nosotros ________ (saber) las respuestas antes de la reunión de negocios.",
        options: ["saberemos", "sabremos", "sabrá", "sabré"],
        correctAnswer: 1,
        explanation: "Correct! 'Saber' has an irregular stem in the future tense: 'sabr-'. Adding the 'nosotros' ending '-emos' results in 'sabremos'."
      },
      {
        id: 4,
        question: "¿Tú ________ (estudiar) para ser psicólogo algún día?",
        options: ["estudiarás", "estudiarías", "estudias", "estudiaste"],
        correctAnswer: 0,
        explanation: "Correct! For 'Tú', the future tense ending is '-ás' added directly to the infinitive (estudiar + ás = estudiarás)."
      },
      {
        id: 5,
        question: "Los científicos ________ (descubrir) la cura para la enfermedad el próximo año.",
        options: ["descubrirán", "descubren", "descubriremos", "descubrieron"],
        correctAnswer: 0,
        explanation: "Correct! For 'ellos/ellas/ustedes' (los científicos), the future tense ending is '-án' added to the infinitive (descubrir + án = descubrirán)."
      }
    ]
  },
  {
    id: "grammar-future-perfect",
    titleEs: "El Futuro Perfecto",
    titleEn: "Future Perfect Tense",
    explanation: [
      "El Futuro Perfecto is used to describe an action that **will have been completed** before another action or before a specific point in the future.",
      "Usage: Expresses what will have happened by a certain deadline (E.g., *Habré terminado mi carrera* - I will have finished my career).",
      "Usage: Career milestones and accomplishments (E.g., *Habrán invertido su dinero* - They will have invested their money).",
      "Structure: Future of the auxiliary verb **haber** + **past participle** of the main verb.",
      "Common Triggers: *para el lunes* (by Monday), *para el año 2030* (by the year 2030), *antes de* (before), *dentro de* (within)."
    ],
    conjugationRules: [
      "Step 1: Conjugate the auxiliary verb *haber* in the future tense: **habré, habrás, habrá, habremos, habréis, habrán**.",
      "Step 2: Form the past participle of the main verb: drop the infinitive ending and add **-ado** for -AR verbs, or **-ido** for -ER and -IR verbs."
    ],
    regularTable: {
      title: "Haber + Trabajar (to work)",
      verb: "Trabajar (Participle: trabajado)",
      conjugations: [
        { pronoun: "Yo", form: "habré trabajado" },
        { pronoun: "Tú", form: "habrás trabajado" },
        { pronoun: "Él / Ella / Ud.", form: "habrá trabajado" },
        { pronoun: "Nosotros", form: "habremos trabajado" },
        { pronoun: "Vosotros", form: "habréis trabajado" },
        { pronoun: "Ellos / Ellas / Uds.", form: "habrán trabajado" }
      ]
    },
    irregularVerbs: [
      { verb: "Escribir", yoForm: "Yo habré escrito" },
      { verb: "Hacer", yoForm: "Yo habré hecho" },
      { verb: "Ver", yoForm: "Yo habré visto" },
      { verb: "Resolver", yoForm: "Yo habré resuelto" }
    ],
    questions: [
      {
        id: 1,
        question: "Para el año 2030, yo ya ________ (terminar) mi carrera universitaria.",
        options: ["habré terminado", "habré terminar", "he terminado", "habré terminando"],
        correctAnswer: 0,
        explanation: "Correct! The future perfect uses the future of 'haber' for 'Yo' (habré) plus the regular past participle of 'terminar' (terminado)."
      },
      {
        id: 2,
        question: "Antes de jubilarse, el contador ________ (auditar) cientos de empresas.",
        options: ["habrán auditado", "habrá auditado", "habrá auditar", "he auditado"],
        correctAnswer: 1,
        explanation: "Correct! 'El contador' is él/ella, so we use 'habrá' + the participle 'auditado' (audited)."
      },
      {
        id: 3,
        question: "Nosotros ________ (resolver) el problema para mañana.",
        options: ["habremos resuelto", "habremos resolvido", "hemos resuelto", "habrán resuelto"],
        correctAnswer: 0,
        explanation: "Correct! 'Resolver' has an irregular past participle: 'resuelto'. The future of haber for 'nosotros' is 'habremos'."
      },
      {
        id: 4,
        question: "¿Cuándo ________ (escribir) los autores el nuevo libro sobre política?",
        options: ["habrán escrito", "habrá escrito", "habrán escribido", "habré escrito"],
        correctAnswer: 0,
        explanation: "Correct! 'Los autores' is ellos/ellas, which takes 'habrán'. 'Escribir' has the irregular past participle 'escrito'."
      },
      {
        id: 5,
        question: "Para el próximo mes, tú ________ (ahorrar) suficiente dinero para invertir en bolsa.",
        options: ["habrás ahorrado", "habrás ahorrando", "has ahorrado", "habrías ahorrado"],
        correctAnswer: 0,
        explanation: "Correct! For 'Tú', we use 'habrás' + the regular participle of 'ahorrar' (ahorrado)."
      }
    ]
  },
  {
    id: "grammar-past-subjunctive",
    titleEs: "El Subjuntivo Pasado (Imperfecto)",
    titleEn: "Past Subjunctive",
    explanation: [
      "El Subjuntivo Pasado is used to express doubt, wishes, hypothetical situations, or emotions about past events.",
      "Usage: To describe hypothetical situations (E.g., *Si yo fuera rico...* - If I were rich...).",
      "Usage: Triggered by WEIRDOS (Wishes, Emotions, Doubt) in the past tense.",
      "Common Triggers: *Si yo...* (If I...), *Ojalá que...* (I wish that / hopefully...)."
    ],
    conjugationRules: [
      "Step 1: Go to the 3rd person plural (ellos / ellas / ustedes) of the PRETERITE past tense.",
      "Step 2: Drop the **-ron** from the end to find your past subjunctive stem.",
      "Step 3: Add the past subjunctive endings! Set: **-ra, -ras, -ra, -ramos, -rais, -ran**."
    ],
    regularTable: {
      title: "Trabajar (Preterite: trabajaron)",
      verb: "Trabajar (Stem: trabaja-)",
      conjugations: [
        { pronoun: "Yo", form: "trabajara" },
        { pronoun: "Tú", form: "trabajaras" },
        { pronoun: "Él / Ella / Ud.", form: "trabajara" },
        { pronoun: "Nosotros", form: "trabajáramos" },
        { pronoun: "Vosotros", form: "trabajarais" },
        { pronoun: "Ellos / Ellas / Uds.", form: "trabajaran" }
      ]
    },
    irregularVerbs: [
      { verb: "Ser / Ir", yoForm: "Yo fuera" },
      { verb: "Tener", yoForm: "Yo tuviera" },
      { verb: "Hacer", yoForm: "Yo hiciera" },
      { verb: "Saber", yoForm: "Yo supiera" }
    ],
    questions: [
      {
        id: 1,
        question: "Si yo ________ (ser) abogado, defendería los derechos humanos.",
        options: ["fuera", "sea", "seré", "sería"],
        correctAnswer: 0,
        explanation: "Correct! This is a hypothetical condition. The preterite for 'ellos' is 'fueron', so the stem is 'fue-' + ending '-ra' = 'fuera'."
      },
      {
        id: 2,
        question: "El maestro quería que sus alumnos ________ (estudiar) más para el examen.",
        options: ["estudiaran", "estudien", "estudiarán", "estudiarían"],
        correctAnswer: 0,
        explanation: "Correct! The main verb 'quería' triggers the past subjunctive. 'Ellos' (los alumnos) ending is '-ran' (estudiar → estudiaron → estudiaran)."
      },
      {
        id: 3,
        question: "Si nosotros ________ (tener) más dinero, invertiríamos en la bolsa de valores.",
        options: ["tuviéramos", "tengamos", "tendremos", "tendríamos"],
        correctAnswer: 0,
        explanation: "Correct! Preterite of 'tener' is 'tuvieron'. Drop the '-ron' to get 'tuvie-' and add '-ramos'. Needs a written accent: 'tuviéramos'."
      },
      {
        id: 4,
        question: "Me sorprendió que el político no ________ (saber) responder a la pregunta.",
        options: ["supiera", "sepa", "sabría", "supo"],
        correctAnswer: 0,
        explanation: "Correct! Expressing emotion in the past triggers past subjunctive. 'Saber' preterite 'supieron' → 'supie-' + '-ra' = 'supiera'."
      },
      {
        id: 5,
        question: "Si tú ________ (dormir) ocho horas, te sentirías mucho mejor en el trabajo.",
        options: ["durmieras", "duermas", "dormirás", "dormirías"],
        correctAnswer: 0,
        explanation: "Correct! Hypothesizing with 'Si' + Past Subjunctive. The preterite for 'dormir' is 'durmieron' → 'durmie-' + '-ras' = 'durmieras'."
      }
    ]
  }
];
