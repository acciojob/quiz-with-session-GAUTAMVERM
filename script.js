// Quiz data and elements
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

const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

// Initialize from session storage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || Array(questions.length).fill(null);

// Render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = '';
  
  questions.forEach((question, qIndex) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    
    const questionText = document.createElement('h3');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);
    
    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'choices';
    
    question.choices.forEach((choice, cIndex) => {
      const choiceDiv = document.createElement('div');
      choiceDiv.className = 'choice';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${qIndex}`;
      radio.value = choice;
      radio.id = `q${qIndex}-c${cIndex}`;
      
      // Set checked state from session storage
      if (userAnswers[qIndex] === choice) {
        radio.checked = true;
        radio.setAttribute('checked', 'checked'); // Explicit attribute for Cypress
      }
      
      radio.addEventListener('change', () => {
        userAnswers[qIndex] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
      
      const label = document.createElement('label');
      label.htmlFor = `q${qIndex}-c${cIndex}`;
      label.textContent = choice;
      
      choiceDiv.appendChild(radio);
      choiceDiv.appendChild(label);
      choicesDiv.appendChild(choiceDiv);
    });
    
    questionDiv.appendChild(choicesDiv);
    questionsElement.appendChild(questionDiv);
  });
}

// Calculate and display score
function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
  
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score.toString());
  
  // Clear progress after submission
  sessionStorage.removeItem('progress');
  userAnswers = Array(questions.length).fill(null);
}

// Check for previous score
function checkPreviousScore() {
  const savedScore = localStorage.getItem('score');
  if (savedScore) {
    scoreElement.textContent = `Your previous score was ${savedScore} out of ${questions.length}.`;
  }
}

// Initialize quiz
renderQuestions();
checkPreviousScore();

// Event listeners
submitButton.addEventListener('click', calculateScore);