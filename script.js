let questions = [
    {
        question: "Was ist eine Variable in der Programmierung?",
        answer_1: "Eine Möglichkeit, Code zu verstecken",
        answer_2: "Ein Datencontainer zur Speicherung von Informationen",
        answer_3: "Ein grafisches Element in der Benutzeroberfläche",
        answer_4: "Ein spezielles Zeichen in der Programmiersprache",
        correct_answer: 2,
        clicked: 0,
        finished: false,
    },
    {
        question: "Welches der folgenden ist kein datenbankbasiertes Modell?",
        answer_1: "SQL",
        answer_2: "NoSQL",
        answer_3: "XML",
        answer_4: "CSS",
        correct_answer: 4,
        clicked: 0,
        finished: false,
    },
    {
        question: "Was ist eine Funktion in der Programmierung?",
        answer_1: "Ein Kommentar im Code",
        answer_2: "Ein Speicherplatz für Konstanten",
        answer_3: "Eine wiederverwendbare Codeeinheit",
        answer_4: "Ein grafisches Element in der Benutzeroberfläche",
        correct_answer: 3,
        clicked: 0,
        finished: false,
    },
    {
        question: "Was bedeutet HTML in der Webentwicklung?",
        answer_1: "Hyperlink and Text Markup Language",
        answer_2: "High-Level Text Manipulation Language",
        answer_3: "Hypertext Markup Language",
        answer_4: "Hyperlink Transfer and Measurement Language",
        correct_answer: 3,
        clicked: 0,
        finished: false,
    }
]

let currentQuestion = 0;
let rightAnswers = 0;

function startQuiz() {
    document.getElementById("start-quiz").style = "display:none";
    document.getElementById("quiz-content").style = "display: flex;";
    renderQuestion(currentQuestion);
}

function renderQuestion(index) {
    document.getElementById("question").innerHTML = questions[index].question
    document.getElementById("answer-1").innerHTML = questions[index].answer_1
    document.getElementById("answer-2").innerHTML = questions[index].answer_2
    document.getElementById("answer-3").innerHTML = questions[index].answer_3
    document.getElementById("answer-4").innerHTML = questions[index].answer_4
    if(questions[index].finished) {
        let a = questions[index].clicked;
        if(questions[index].clicked == questions[index].correct_answer) {
            let answer = document.getElementById(`answer-${a}`);
            let parent = answer.parentElement;
            parent.classList.add("correct-answer-container")
            parent.children[0].classList.add("correct-answer")
        } else {
            let answer = document.getElementById(`answer-${a}`);
            let parent = answer.parentElement;
            parent.classList.add("wrong-answer-container")
            parent.children[0].classList.add("wrong-answer")
        }
    } else {
        for(let i = 1; i< 5;i++) {
            let a = document.getElementById(`answer-${i}`);
            let parent = a.parentElement;
            let child = parent.children[0];
            parent.classList.remove("correct-answer-container");
            parent.classList.remove("wrong-answer-container");
            child.classList.remove("correct-answer");
            child.classList.remove("wrong-answer");
        }
    }
}

function clickedAnswer(answer) {
    let a = answer;
    if(questions[currentQuestion].finished) {
        return;
    }
    if(questions[currentQuestion].correct_answer == answer) {
        let answer = document.getElementById(`answer-${a}`);
        let parent = answer.parentElement;
        parent.classList.add("correct-answer-container")
        parent.children[0].classList.add("correct-answer")
        rightAnswers++;
    } else {
        let answer = document.getElementById(`answer-${a}`);
        let parent = answer.parentElement;
        parent.classList.add("wrong-answer-container")
        parent.children[0].classList.add("wrong-answer")
    }
    questions[currentQuestion].finished = true;
    questions[currentQuestion].clicked = answer;
}

function nextQuestion() {
    if(questions[currentQuestion].finished) {
        if(currentQuestion + 1 < questions.length) {
            currentQuestion++;
            renderQuestion(currentQuestion);
        } else {
            document.getElementById("endscreen").style = "dispaly: flex;";
            document.getElementById("quiz-content").style = "display: none;";
            document.getElementById("score").innerHTML = `${rightAnswers} / ${questions.length}`
        }
    }
}

function lastQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
}

function replayQuiz() {
    currentQuestion = 0;
    rightAnswers = 0;
    for(let i = 0; i<questions.length;i++) {
        questions[i].clicked = 0;
        questions[i].finished = false;
    }
    for(let i = 1; i< 5;i++) {
        let a = document.getElementById(`answer-${i}`);
        let parent = a.parentElement;
        let child = parent.children[0];
        parent.classList.remove("correct-answer-container");
        parent.classList.remove("wrong-answer-container");
        child.classList.remove("correct-answer");
        child.classList.remove("wrong-answer");
    }
    document.getElementById("start-quiz").style = "display:none";
    document.getElementById("quiz-content").style = "display: flex;";
    document.getElementById("endscreen").style = "display: none;";
}