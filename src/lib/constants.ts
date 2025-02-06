export const PROJECT_ID = 'maschine-quiz';
export const PROJECT_TITLE = "Maschine Quiz";
export const PROJECT_DESCRIPTION = "Discover Maschine's capabilities through an interactive quiz";

export const QUIZ_QUESTIONS = [
  {
    question: "What can Maschine currently do?",
    answers: [
      "Create frames without databases",
      "Deploy smart contracts",
      "Handle complex user authentication",
      "Store large media files"
    ],
    correct: 0
  },
  {
    question: "What's NOT supported by Maschine yet?",
    answers: [
      "Simple button interactions",
      "On-chain transactions",
      "Basic frame navigation", 
      "Text-based content"
    ],
    correct: 1
  },
  {
    question: "Which feature requires external services?",
    answers: [
      "Static content display",
      "Persistent user storage",
      "Button click tracking",
      "Quiz progression"
    ],
    correct: 1
  }
];

export const QUIZ_LIMITATIONS = [
  "❌ No database integrations",
  "❌ No custom smart contracts",
  "❌ No complex backend logic",
  "✅ Simple interactive frames",
  "✅ Basic quiz functionality",
  "✅ On-frame content updates"
];
