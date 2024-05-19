const questions = [
  {
    question: "what is the output => console.log([] == []);",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "null", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question:
      "what is the output => let obj = {x : 5 , getX: function(){return this.x}}; console.log(obj.getX()); ",
    answers: [
      { text: "10", correct: false },
      { text: "true", correct: false },
      { text: "undefined", correct: false },
      { text: "5", correct: true },
    ],
  },
  {
    question: "what is the answer => this array let x = [1,2] is equal to ? ",
    answers: [
      { text: "new Array(1,2)", correct: false },
      { text: "new Object(1,2)", correct: false },
      { text: "function X (number){this.number = [1,2]}", correct: false },
      { text: "answer 1 and 2", correct: true },
    ],
  },
  {
    question:
      "what is the the prototype of every object in javascript engine based on NodeJS",
    answers: [
      { text: "Broswer object model", correct: false },
      { text: "golobal Object", correct: true },
      { text: "Document object model", correct: false },
      { text: "answer 1 and 3", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
