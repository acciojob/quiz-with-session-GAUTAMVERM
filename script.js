// Initialize user answers from session storage or empty object
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = '';
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    
    const questionText = document.createElement("h3");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);
    
    const choicesContainer = document.createElement("div");
    choicesContainer.className = "choices";
    
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      
      const choiceContainer = document.createElement("div");
      choiceContainer.className = "choice";
      
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      choiceElement.id = `q${i}-c${j}`;
      
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      
      choiceElement.addEventListener('change', () => {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
      
      const choiceLabel = document.createElement("label");
      choiceLabel.htmlFor = `q${i}-c${j}`;
      choiceLabel.textContent = choice;
      
      choiceContainer.appendChild(choiceElement);
      choiceContainer.appendChild(choiceLabel);
      choicesContainer.appendChild(choiceContainer);
    }
    
    questionElement.appendChild(choicesContainer);
    questionsElement.appendChild(questionElement);
  }
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  
  // Store just the score number in localStorage to match test expectation
  localStorage.setItem('score', score.toString());
  
  // Clear session storage after submission
  sessionStorage.removeItem('progress');
  userAnswers = {};
}

// Check for previous score in local storage
function checkPreviousScore() {
  const previousScore = localStorage.getItem('score');
  if (previousScore) {
    scoreElement.textContent = `Your previous score was ${previousScore} out of ${questions.length}.`;
  }
}

// Initialize the quiz
renderQuestions();
checkPreviousScore();

// Event listener for submit button
submitButton.addEventListener('click', calculateScore);