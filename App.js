const quizData = [
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
];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function getCurrentQuestion() {
    document.getElementById("question").innerHTML = currentQuestionIndex+1+'. '+quizData[currentQuestionIndex].question;
    let choiceList = document.querySelectorAll("#choice");
    choiceList.forEach((choice, index) => {
      choice.innerHTML = quizData[currentQuestionIndex].choices[index];
      choice.classList.remove("correct", "incorrect");
      choice.disabled = false;
    });
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      getCurrentQuestion();
    } else {
      document.getElementById("score").innerHTML = `Game Over! Your final score is ${score} out of ${quizData.length} (${score/quizData.length*100}%)!`;
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("restartButton").style.display = "block";
      document.querySelectorAll("#choice").forEach((choice) => {
        choice.style.display = "none";
      });
      document.getElementById("question").style.display = "none";
    }
  }
  
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
  
  document.getElementById("restartButton").addEventListener("click", () => window.location.reload());
  
  window.onload = getCurrentQuestion;
  