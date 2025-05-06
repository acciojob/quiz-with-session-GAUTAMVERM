document.addEventListener('DOMContentLoaded', function() {
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

  // Load progress from session storage
  let savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

  // Render questions
  function renderQuestions() {
    questionsElement.innerHTML = '';
    questions.forEach((q, qIndex) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      
      const questionText = document.createElement('h3');
      questionText.textContent = q.question;
      questionDiv.appendChild(questionText);
      
      const choicesDiv = document.createElement('div');
      choicesDiv.className = 'choices';
      
      q.choices.forEach((choice, cIndex) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${qIndex}`;
        radio.value = choice;
        radio.id = `q${qIndex}-c${cIndex}`;
        
        // Set checked state if this option was previously selected
        if (savedProgress[qIndex] === choice) {
          radio.checked = true;
          radio.setAttribute('checked', 'checked');
        }
        
        radio.addEventListener('change', () => {
          savedProgress[qIndex] = choice;
          sessionStorage.setItem('progress', JSON.stringify(savedProgress));
        });
        
        const label = document.createElement('label');
        label.htmlFor = radio.id;
        label.textContent = choice;
        
        choiceDiv.appendChild(radio);
        choiceDiv.appendChild(label);
        choicesDiv.appendChild(choiceDiv);
      });
      
      questionDiv.appendChild(choicesDiv);
      questionsElement.appendChild(questionDiv);
    });
  }

  // Calculate score
  function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
      if (savedProgress[index] === q.answer) {
        score++;
      }
    });
    
    scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score.toString());
    
    // Clear progress after submission
    sessionStorage.removeItem('progress');
    savedProgress = {};
  }

  // Check for previous score
  function checkPreviousScore() {
    const previousScore = localStorage.getItem('score');
    if (previousScore) {
      scoreElement.textContent = `Your previous score was ${previousScore} out of ${questions.length}.`;
    }
  }

  // Initialize quiz
  renderQuestions();
  checkPreviousScore();

  // Event listeners
  submitButton.addEventListener('click', calculateScore);
});