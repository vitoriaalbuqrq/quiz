const questions = [
  {
    question: "Qual é a capital do Brasil?",
    choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
    answer: "Brasília",
  },
  {
    question: "Qual é a capital da Argentina?",
    choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
    answer: "Buenos Aires",
  },
  {
    question: "Qual é a capital da França?",
    choices: ["Roma", "Madri", "Paris", "Londres"],
    answer: "Paris",
  },
  {
    question: "Qual é a capital da Espanha?",
    choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
    answer: "Madri",
  },
  {
    question: "Qual é a capital da Itália?",
    choices: ["Veneza", "Milão", "Roma", "Nápoles"],
    answer: "Roma",
  },
  {
    question: "Qual é a capital do Canadá?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: "Ottawa",
  },
  {
    question: "Qual é a capital dos Estados Unidos?",
    choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
    answer: "Washington D.C.",
  },
  {
    question: "Qual é a capital do Reino Unido?",
    choices: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
    answer: "Londres",
  },
];

const questionElement = document.getElementById("question");
const choiceElements = Array.from(document.getElementsByClassName("choice"));
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const pScore = document.getElementById("p-score");
const wrongElement = document.getElementById("wrong");
const pWrong = document.getElementById("p-wrong");
const progressBar = document.querySelector(".progress-bar div");
const feedback = document.querySelector(".feedback");

const totalQuestions = questions.length;
let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;

function updateProgressBar() {
  const percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + "%";
}

function loadQuestion() {
  if (currentQuestion < questions.length) {
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerText = currentQuestionData.question;

    // Remove a "selected" class from all buttons
    choiceElements.forEach((element) => {
      element.classList.remove("selected");
    });

    const choices = shuffleArray(currentQuestionData.choices);
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].innerText = choices[i];
    }
    answerChosen = false; // reset flag when loading new question

    showElements();
    feedback.innerText = ""; // clear the feedback
    updateProgressBar();

  } else {
    hideElements();
    nextButton.innerText = "Reiniciar";
    feedback.innerText =
      "Fim do Quiz! Você acertou " +
      score +
      " de " +
      questions.length +
      " perguntas.";
    progressBar.style.width = "100%";
  }
}

function checkAnswer(e) {
  if (answerChosen) return; // prevent multiple answers
  answerChosen = true;

  if (e.target.innerText === questions[currentQuestion].answer) {
    score++;
    scoreElement.innerText = score;
    feedback.innerText = "Correto!";
  } else {
    wrong++;
    wrongElement.innerText = wrong;
    feedback.innerText =
      "Errado! A resposta correta é " + questions[currentQuestion].answer + ".";
  }
  e.target.classList.add("selected");
  updateProgressBar();
}

choiceElements.forEach((element) => {
  element.addEventListener("click", checkAnswer);
});

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  wrong = 0;
  scoreElement.innerText = "0";
  wrongElement.innerText = "0";
  nextButton.innerText = "Próxima";
  feedback.innerText = "";
  loadQuestion();
}

nextButton.addEventListener("click", () => {
  if (!answerChosen) {
    feedback.innerText = "Por favor, escolha uma resposta antes de prosseguir.";
    return;
  }

  if (nextButton.innerText === "Próxima") {
    currentQuestion++;
    loadQuestion();
  } else if (nextButton.innerText === "Reiniciar") {
    restartQuiz();
  }
});

function hideElements() {
  questionElement.style.display = "none";
  choiceElements.forEach((element) => {
    element.style.display = "none";
  });
  scoreElement.style.display = "none";
  pScore.style.display = "none";
  pWrong.style.display = "none";
  wrongElement.style.display = "none";
  progressBar.style.width = "0%";
}

function showElements() {
  questionElement.style.display = "block";
  choiceElements.forEach((element) => {
    element.style.display = "block";
  });
  scoreElement.style.display = "block";
  pScore.style.display = "block";
  wrongElement.style.display = "block";
  pWrong.style.display = "block";
}

function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

loadQuestion();

