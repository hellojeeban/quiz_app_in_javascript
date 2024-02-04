const questions = [
    {
        question : "Greatest animal in the world",
        answer : [
            {text : "Shark", correct : false},
            {text : "Blue Whale", correct : true},
            {text : "Elephant", correct : false},
            {text : "Giraffe", correct : false},
            {text : "Giraffe", correct : false}
        ]
    },
    {
        question : "Smallest animal in the world",
        answer : [
            {text : "Shark", correct : false},
            {text : "Blue Whale", correct : false},
            {text : "Etruscan shrew", correct : true},
            {text : "Giraffe", correct : false}
        ]
    },
    {
        question : "The smallest breed of cow is ",
        answer : [
            {text : "Shark", correct : false},
            {text : "Blue Whale", correct : false},
            {text : "Elephant", correct : false},
            {text : " Vechur", correct : true}
        ]
    },
    {
        question : "The world’s smallest chicken is",
        answer : [
            {text : "Serama", correct : true},
            {text : "Blue Whale", correct : false},
            {text : "Elephant", correct : false},
            {text : "Giraffe", correct : false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currQuesIndex = 0;
let score = 0;

function startQuiz(){
    currQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currQues = questions[currQuesIndex];
    let questionNo = currQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currQues.question;

    currQues.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrest = selectedBtn.dataset.correct === "true";

    if(isCorrest){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handelNextButton(){
    currQuesIndex++;
    if(currQuesIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
       resetState();
       questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
       nextButton.innerHTML = "Play Again";
       nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currQuesIndex < questions.length){
        handelNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();