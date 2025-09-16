const questions = [
    {
        question: "which is largest animal in the world?",
        answers: [
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Great White Shark", correct: false }
        ]
    },
    {
        question: "which is largest country in the world?",
        answers: [
            { text: "Goa", correct: false},
            { text: "India", correct: true },
            { text: "Mizoram", correct: false },
            { text: "Haryana", correct: false }
        ]
    },
    {
        question: "which is largest desert in the world?",
        answers: [
            { text: "sahar", correct: true },
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Antarctica", correct: false }
        ]
    }, 
    {
        question: "which is smallest contient in the world?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Austrlia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }  
        button.addEventListener("click", selectAnswer);
        
    })

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});


// nextButton.addEventListener("click", () => {
//     if(currentQuestionIndex < questions.length - 1)
//         handleNextButton();
//     else
//         startQuiz();
// });

startQuiz();