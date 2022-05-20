const quizData = [{
        question: "Which country does the flag in Figure 1 belong to?",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "a",
    },
    {
        question: "Which country does the flag in Figure 2 belong to?",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "b",
    },
    {
        question: "Which country does the flag in Figure 3 belong to?",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "c",
    },
    {
        question: "Which country does the flag in Figure 4 belong to?",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "d",
    },


];

const quiz = document.getElementById('quiz')
const answers = document.querySelectorAll('.answer')
const questions = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {

    CheckAnswers()

    const currentQuizData = quizData[currentQuiz]

    questions.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    fetch("https://restcountries.com/v3.1/all").then(r => r.json())
        .then(r => r.forEach(el => {

            if (el.name.common == 'Ghana') {

                a_text.innerText += `${el.name.common}`
            }
            if (el.name.common == 'Paraguay') {

                b_text.innerText += ` ${el.name.common }`;
            }
            if (el.name.common == 'Gambia') {

                c_text.innerText += ` ${el.name.common }`;
            }
            if (el.name.common == 'Djibouti') {

                d_text.innerText += ` ${el.name.common }`;
            }

        }))

}

function CheckAnswers() {
    answers.forEach(x => x.checked = false)
}

function getSelected() {
    let answer
    answers.forEach(x => {
        if (x.checked) {
            answer = x.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        } else {

        }

        currentQuiz++

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
        }
    }
})