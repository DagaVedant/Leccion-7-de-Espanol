# Leccion 7 - Spanish 2 Interactive Assignment

This is a school project built as an interactive unit review for Spanish 2, Leccion 7: Profesiones y Tiempos Verbales en Accion. It was created to help review and practice the vocabulary and grammar concepts covered in the unit before assessment. Students complete four weighted sections and receive a cumulative final grade based on their answers.

Live Site: https://dagavedant.github.io/Leccion-7-de-Espanol/

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI component framework |
| TypeScript | Type-safe JavaScript |
| Vite 7 | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| canvas-confetti | Confetti animation on completion |
| gh-pages | GitHub Pages deployment |

---

## Project Structure

```
src/
├── App.tsx                   # Root component, state management, routing logic
├── main.tsx                  # React entry point
├── index.css                 # Global styles and Tailwind imports
├── types/
│   └── index.ts              # TypeScript interfaces (ScoreState, SectionId, etc.)
├── constants/
│   └── data.ts               # All question data, vocabulary lists, grammar content
├── components/
│   ├── VocabularySection.tsx  # Hosts all 3 vocabulary activities
│   ├── GrammarSection.tsx     # Grammar explanation + quiz layout
│   ├── ConjugationTable.tsx   # Renders conjugation tables with highlighted endings
│   ├── QuizEngine.tsx         # Multiple choice quiz component with feedback
│   ├── ProgressBar.tsx        # Global progress tracker / score ring
│   └── Icons.tsx              # Custom SVG icon components
└── utils/
    └── audio.ts               # Web Audio API sounds for correct/incorrect answers
```

---

## Website Sections

### Panel (Dashboard)
The landing page. Shows a checklist of all 4 assignment sections with their completion status, current score, and weight. Each card links to its section. A "Generate Final Grade" button appears at the bottom and becomes active once all sections are complete.

---

### Vocabulario (Vocabulary) - 25%
Three progressive activities testing knowledge of Spanish professions vocabulary covered in the unit.

**Actividad 1 - Rellenar los Espacios (Fill in the Blank)**
- 5 questions with a sentence and a blank
- Student types the profession in Spanish including the article (El)
- Answer normalization strips accents for flexible matching
- Immediate feedback shown per question on submit

**Actividad 2 - Emparejar Terminos (Matching)**
- 7 Spanish profession terms paired with their English translations
- Click-to-select interaction: click a Spanish word, then click the matching English word
- Incorrect pairs flash red and reset; correct pairs lock green
- Completes automatically when all 7 are matched

**Actividad 3 - Reconocimiento de Iconos (Icon Matching)**
- 8 profession icons, each with a dropdown selector
- Student selects the matching profession label per icon
- Instant per-answer feedback with correct/incorrect indicator

---

### El Futuro (Future Tense) - 25%
Reviews the Spanish simple future tense from the unit.

- Full explanation of usage with trigger words
- Conjugation rules with step-by-step breakdown
- Regular conjugation table for trabajar with color-highlighted endings
- Irregular verb quick-reference panel (tener, hacer, poder, saber, decir)
- 5-question multiple choice quiz with per-answer audio feedback and explanations

---

### Futuro Perfecto (Future Perfect Tense) - 25%
Reviews the compound future perfect tense (haber + past participle).

- Explanation of usage with trigger phrases
- Two-step conjugation rule breakdown
- Conjugation table for haber + trabajar
- Irregular past participle reference (escrito, hecho, visto, resuelto)
- 5-question multiple choice quiz

---

### Subjuntivo Pasado (Past Subjunctive) - 25%
Reviews the imperfect subjunctive (-ra forms) from the unit.

- Explanation of WEIRDOS triggers and hypothetical Si clauses
- Three-step derivation rule from preterite ellos form
- Conjugation table for trabajar with stem and ending highlighted
- Irregular verb reference (fuera, tuviera, hiciera, supiera)
- 5-question multiple choice quiz

---

### Entregar (Submit / Final Grade)
Displayed after all sections are attempted. Shows a completion message with a confetti animation. Includes a reset button to clear all progress and start over.

---

## Scoring

| Section | Max Points | Weight |
|---|---|---|
| Vocabulario (3 activities) | 20 pts | 25% |
| El Futuro | 5 pts | 25% |
| Futuro Perfecto | 5 pts | 25% |
| Subjuntivo Pasado | 5 pts | 25% |

The progress ring in the header displays a live cumulative weighted percentage across all four sections.

---

## State and Persistence

All score and answer state is managed in React via useState in App.tsx and persisted to localStorage under the key spanish_assignment_score. Progress is automatically restored on page reload.

---

## Local Development

```bash
npm install
npm run dev       # Start dev server at localhost:5173
npm run build     # Build to dist/
npm run deploy    # Build and push to GitHub Pages (gh-pages branch)
```

---

## Deployment

The site is deployed to GitHub Pages using the gh-pages npm package. The gh-pages branch is auto-generated from the built dist/ folder and should never be edited manually. All source code lives on the main branch.
