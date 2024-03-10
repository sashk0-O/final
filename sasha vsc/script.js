let question_field = document.querySelector(".question")
let answer_buttons = document.querySelectorAll('.answer')
let container_main = document.querySelector(".main")
let container_start = document.querySelector(".start")
let container_h3 = document.querySelector(".container_h3")
let start_button = document.querySelector(".start-btn")

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function shaffle(array){
    let currentIndex = array.length, randomIndex;
    while (currentIndex !=0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]]
    }
    return array
}

let signs = ['+', '-', '*', '/']
function getRandomSign() {
    return signs[randint(0, 3)]
}


class Question {
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {this.correct = a + b}
        else if (sign == '-') {this.correct = a - b}
        else if (sign == '*') {this.correct = a * b}
        else if (sign == '/') {this.correct = a / b}
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15)
        ]
        shaffle(this.answers)
    }


    display(){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}
let correct_answer_given
let total_answers_given
let current_question

start_button.addEventListener('click',function(){
    container_start.style.display = 'none'
    container_main.style.display = 'flex'
    current_question = new Question()
    current_question.display()

    correct_answer_given = 0
    total_answers_given = 0

    setTimeout(function(){
         container_main.style.display = 'none'
        container_start.style.display = 'flex'
         container_h3.innerHTML = `<h3>Ви дали ${correct_answer_given} правильних відповідей з ${total_answers_given} Точність - ${Math.round(correct_answer_given * 100/ total_answers_given)}%</h3>`
    
    }, 10000)
})



for(let i = 0; i < answer_buttons.length; i +=1){
    answer_buttons[i].addEventListener('click',function(){
        if (answer_buttons[i].innerHTML == current_question.correct){
            correct_answer_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration:500,
                delay: 100,
                easing: 'linear'
            })
        }else {
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_given += 1
        current_question = new Question( )
        current_question.display()
    })
}

// for (let i = 0; i < answer_buttons.length; i += 1){
//     answer_buttons[i].addEventListener('click', function(){
//         if (answer_buttons[i].innerHTML == currrent_question.correct){
//             console.log("Правильно")
//         } else {
//             console.log('Не правильно')
//         }


//         total_answers_given += 1
//         currrent_question = currrent_questions[total_answers_given]
//         currrent_question.display()
//     })
// }