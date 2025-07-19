const questions = [
  {
    type: "mcq",
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    type: "fill",
    question: "Fill in the blank: The largest planet in our solar system is ____.",
    answer: "Jupiter"
  },
  {
    type: "mcq",
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    type: "mcq",
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"],
    answer: "Central Processing Unit"
  },
  {
    type: "fill",
    question: "Fill in the blank: The chemical symbol for water is ____.",
    answer: "H2O"
  },
  {
    type: "mcq",
    question: "Which of these is not a programming language?",
    options: ["Python", "Java", "HTML", "Ruby"],
    answer: "HTML"
  },
  {
    type: "mcq",
    question: "Which year did the World War II end?",
    options: ["1945", "1939", "1918", "1965"],
    answer: "1945"
  },
  {
    type: "fill",
    question: "Fill in the blank: The process of finding errors in software code is called ____.",
    answer: "Debugging"
  },
  {
    type: "mcq",
    question: "Who invented the light bulb?",
    options: ["Newton", "Einstein", "Thomas Edison", "Nikola Tesla"],
    answer: "Thomas Edison"
  },
  {
    type: "fill",
    question: "Fill in the blank: The fastest land animal is the ____.",
    answer: "Cheetah"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  if (q.type === "mcq") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="option" value="${opt}" /> ${opt}`;
      optionsEl.appendChild(label);
    });
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "fill";
    optionsEl.appendChild(input);
  }

  // Show submit button only at last question
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

function getAnswer() {
  const q = questions[currentQuestion];
  if (q.type === "mcq") {
    const selected = document.querySelector('input[name="option"]:checked');
    return selected ? selected.value : "";
  } else if (q.type === "fill") {
    const input = document.querySelector('input[name="fill"]');
    return input.value.trim();
  }
  return "";
}

function nextQuestion() {
  const answer = getAnswer();
  if (answer === "") return alert("Please select or type your answer.");

  userAnswers.push(answer);
  if (answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) score++;

  currentQuestion++;
  loadQuestion();
}

function submitQuiz() {
  const answer = getAnswer();
  if (answer === "") return alert("Please provide your answer.");

  userAnswers.push(answer);
  if (answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) score++;

  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("score-page").style.display = "block";
  document.getElementById("score").textContent = `Your Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  document.getElementById("score-page").style.display = "none";
  document.getElementById("review-page").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

function showReview() {
  document.getElementById("score-page").style.display = "none";
  const reviewContent = document.getElementById("review-content");
  reviewContent.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "review-item";

    const userAns = userAnswers[index];
    const correctAns = q.answer;
    const isCorrect = userAns.trim().toLowerCase() === correctAns.trim().toLowerCase();

    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <p>Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAns || 'Not answered'}</span></p>
      ${!isCorrect ? `<p>Correct Answer: <span class="correct">${correctAns}</span></p>` : ''}
    `;
    reviewContent.appendChild(div);
  });

  document.getElementById("review-page").style.display = "block";
}

function backToScore() {
  document.getElementById("review-page").style.display = "none";
  document.getElementById("score-page").style.display = "block";
}

// Load first question
loadQuestion();
