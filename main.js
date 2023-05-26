// hidden/visible toggle button
const btn = document.querySelector("#toggleBtn");
const cardDiv = document.querySelector("#cardDiv");

btn.addEventListener("click", () => {
  if (cardDiv.classList.contains("hide")) {
    cardDiv.classList.remove("hide");
    cardDiv.classList.add("visible");
  } else {
    cardDiv.classList.remove("visible");
    cardDiv.classList.add("hide");
  }
});

// add elements dinamically
const divElem = document.createElement("div");
divElem.setAttribute("id", "card");

const h2Elem = document.createElement("h2");
h2Elem.textContent = "Gandalf";

const attr = document.createElement("a");
attr.setAttribute("href", "#");
attr.textContent = "Go to profile";

divElem.append(h2Elem, attr);
document.body.appendChild(divElem);

// quiz game
const quizWrapper = document.querySelector(".quizWrapper");
const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");

const questionArr = [
  {
    id: 1,
    question: "1 + 1",
    answers: ["1", "2", "3", "4"],
    answer: 2,
  },
  {
    id: 2,
    question: "1 + 2",
    answers: ["1", "2", "3", "4"],
    answer: 3,
  },
  {
    id: 3,
    question: "1 + 3",
    answers: ["1", "2", "3", "4"],
    answer: 4,
  },
];

let currentQuestion = 0;
let score = 0;

function quiz(questions) {
  function displayQuestion() {
    const currQuestionObj = questions[currentQuestion];

    questionElement.textContent = currQuestionObj.question;

    // display answers
    answersElement.innerHTML = "";
    for (let i = 0; i < currQuestionObj.answers.length; i++) {
      const answerBtn = document.createElement("button");
      answerBtn.classList.add("answer");
      answerBtn.textContent = currQuestionObj.answers[i];
      answerBtn.addEventListener("click", checkAnswer);
      answersElement.appendChild(answerBtn);
    }
  }
  displayQuestion();

  function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.textContent;
    const currQuestionObj = questions[currentQuestion];
    const resultElement = document.querySelector(".result");

    if (
      selectedAnswer === currQuestionObj.answers[currQuestionObj.answer - 1]
    ) {
      resultElement.textContent = "Correct!";
      selectedChoice.style.backgroundColor = "#59da59";
      score++;
    } else {
      resultElement.textContent = "Wrong!";
      selectedChoice.style.backgroundColor = "#dc143c";
    }

    // disable click when answer selected
    const answerButtons = document.getElementsByClassName("answer");
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].removeEventListener("click", checkAnswer);
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(displayQuestion, 1000); // next question
    } else {
      setTimeout(displayResult, 1000); // final result
    }
  }

  function displayResult() {
    quizWrapper.innerHTML = "";
    const resultElement = document.createElement("h3");
    resultElement.textContent = "Quiz completed. Score: " + score;
    quizWrapper.appendChild(resultElement);
  }
}

quiz(questionArr);
