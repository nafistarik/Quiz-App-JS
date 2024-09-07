let allData = [
  // JavaScript Questions
  {
      question: "Which of the following is a correct way to declare a JavaScript variable?",
      choices: ["var myVar", "declare myVar", "v myVar", "variable myVar"],
      correct: 0,
  },
  {
      question: "What does the '===' operator do in JavaScript?",
      choices: [
          "Compares both value and type",
          "Assigns a value",
          "Compares only value",
          "Converts value types",
      ],
      correct: 0,
  },
  {
      question: "Which built-in method is used to convert a string to lowercase in JavaScript?",
      choices: [
          "toLower()",
          "toLowerCase()",
          "changeCase()",
          "convertCase()",
      ],
      correct: 1,
  },
  {
      question: "What is the output of 'console.log(typeof [])' in JavaScript?",
      choices: ["array", "object", "undefined", "list"],
      correct: 1,
  },
  {
      question: "Which keyword is used to define a constant in JavaScript?",
      choices: ["let", "var", "const", "constant"],
      correct: 2,
  },

  // Node.js Questions
  {
      question: "What is Node.js built on?",
      choices: ["JavaScript Core", "V8 JavaScript engine", "SpiderMonkey", "Chakra"],
      correct: 1,
  },
  {
      question: "Which of the following is NOT a core module in Node.js?",
      choices: ["fs", "http", "os", "webpack"],
      correct: 3,
  },
  {
      question: "How do you import a module in Node.js?",
      choices: ["include 'module_name';", "require('module_name');", "import 'module_name';", "load('module_name');"],
      correct: 1,
  },
  {
      question: "Which of the following methods is used to create a server in Node.js?",
      choices: ["http.createServer()", "server.create()", "httpServer()", "net.createServer()"],
      correct: 0,
  },
  {
      question: "What is the default scope of variables in Node.js modules?",
      choices: ["Global", "Local to the module", "Local to the function", "Public"],
      correct: 1,
  },

  // Express.js Questions
  {
      question: "What is Express.js used for in Node.js applications?",
      choices: ["Handling database connections", "Building APIs and web applications", "Performing file operations", "Writing shell scripts"],
      correct: 1,
  },
  {
      question: "Which method is used to handle GET requests in Express.js?",
      choices: ["app.get()", "app.post()", "app.receive()", "app.fetch()"],
      correct: 0,
  },
  {
      question: "How do you define a route with parameters in Express.js?",
      choices: ["app.get('/user?id', ...)", "app.get('/user/:id', ...)", "app.route('/user').id(...)", "app.param('/user/:id', ...)"],
      correct: 1,
  },
  {
      question: "Which middleware is used for parsing JSON data in Express.js?",
      choices: ["express.urlencoded", "express.static", "express.json", "express.bodyParser"],
      correct: 2,
  },
  {
      question: "Which of the following is true about middleware in Express.js?",
      choices: ["Middleware functions are always asynchronous", "Middleware functions can access the request and response objects", "Middleware functions only handle errors", "Middleware functions are executed after sending the response"],
      correct: 1,
  },

  // React.js Questions
  {
      question: "What is JSX in React?",
      choices: ["A function to create components", "A syntax extension that looks similar to HTML", "A module bundler", "A JavaScript library"],
      correct: 1,
  },
  {
      question: "How do you create a functional component in React?",
      choices: ["function MyComponent() {...}", "var MyComponent = new Function() {...}", "const MyComponent = class {...}", "component MyComponent {...}"],
      correct: 0,
  },
  {
      question: "What hook is used for state management in functional components?",
      choices: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1,
  },
  {
      question: "Which of the following is NOT a lifecycle method in React class components?",
      choices: ["componentDidMount", "componentDidUpdate", "componentWillUnmount", "componentWillRender"],
      correct: 3,
  },
  {
      question: "How do you pass data from a parent to a child component in React?",
      choices: ["Using props", "Using state", "Using context", "Using refs"],
      correct: 0,
  },
];

var quizData = [];
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz Functions
function startQuizJS() {
    initializeQuiz(0, 5); // Start JavaScript Quiz
}

function startQuizNode() {
    initializeQuiz(5, 10); // Start Node.js Quiz
}

function startQuizExpress() {
    initializeQuiz(10, 15); // Start Express.js Quiz
}

function startQuizReact() {
    initializeQuiz(15, 20); // Start React.js Quiz
}

// Initialize Quiz
function initializeQuiz(startIndex, endIndex) {
    quizData = allData.slice(startIndex, endIndex);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementsByClassName("quiz-container")[0].style.display = "block";
    document.getElementsByClassName("home")[0].style.display = "none";
    getCurrentQuestion(); // Load the first question
}

// Display Current Question
function getCurrentQuestion() {
    if (currentQuestionIndex >= quizData.length) return;
    
    document.getElementById("question").innerHTML = currentQuestionIndex + 1 + '. ' + quizData[currentQuestionIndex].question;
    let choiceList = document.querySelectorAll("#choice");
    choiceList.forEach((choice, index) => {
        choice.innerHTML = quizData[currentQuestionIndex].choices[index];
        choice.classList.remove("correct", "incorrect");
        choice.disabled = false;
    });
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
}

// Handle Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        getCurrentQuestion();
    } else {
        document.getElementById("score").innerHTML = `Game Over! Your final score is ${score} out of ${quizData.length} (${(score / quizData.length) * 100}%)!`;
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("restartButton").style.display = "block";
        document.querySelectorAll("#choice").forEach((choice) => {
            choice.style.display = "none";
        });
        document.getElementById("question").style.display = "none";
    }
}

// Handle Choice Selection
function handleChoice(index) {
    document.getElementById("nextButton").style.display = "block";

    if (index === quizData[currentQuestionIndex].correct) {
        document.querySelectorAll("#choice")[index].classList.add("correct");
        score++;
        document.getElementById("question").innerHTML += " - Correct!";
    } else {
        document.querySelectorAll("#choice")[index].classList.add("incorrect");
        document.querySelectorAll("#choice")[quizData[currentQuestionIndex].correct].classList.add("correct");
        document.getElementById("question").innerHTML += " - Incorrect!";
    }
    document.querySelectorAll("#choice").forEach((choice) => {
        choice.disabled = true;
    });
}

// Restart Quiz
document.getElementById("restartButton").addEventListener("click", () => window.location.reload());
  