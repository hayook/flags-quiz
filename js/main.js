const startBtn = document.querySelector('button.generate'); 
const countryFlag = document.querySelector('.flag-quiz img'); 
const loading = document.querySelector('.loading'); 
const choicesCont = document.querySelector('.choices')
const choicesDivs = document.querySelectorAll('.choices .choice');
const pleaseAnswer = document.querySelector('.please-answer');
const endBtn = document.querySelector('.end');

fetch('js/countries.json')
.then(response => response.json())
.then(data => ready(data))

function ready(data) {
    startBtn.style.cursor = 'pointer';
    startBtn.innerHTML = 'Start';
    startBtn.classList.add('unset');
    startGame(data) 
    endGame()
}

function startGame(data) {
    startBtn.addEventListener('click', function() {
        let countries = [...data]
        startBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>'; 
        endBtn.classList.add('view')

        // Choose 3 Random Countries
        let choices = randomChoices(countries);

        // The right Answer among the 3 choices
        let rightAnswer = choices[0];

        // Position the choices randomly
        choosePositions(choicesDivs, rightAnswer, choices);
        
        // Display the flag and the choices 
        countryFlag.src = rightAnswer.flag;
        choicesCont.classList.add('view');
        
        // Click the answer
        clickToAnswer(choicesDivs, rightAnswer);
    })
} 

function randomChoices(countries) {
    let choices = [];
        for (let i = 0; i < 3; i++) {
            choices.push(countries
                .splice(Math.trunc((Math.trunc(Math.random() * countries.length) + Math.trunc(Math.random() * countries.length)) / 2), 1)[0])
        }
    return choices; 
}

function choosePositions(choicesDivs, rightAnswer, choices) {
    let rightAnswerPosition = Math.trunc(Math.random() * 3); 
        choicesDivs[rightAnswerPosition].innerHTML = rightAnswer.name; 
        let k = 1; 
        for (let i = 0; i < 3; i++) {
            if (i !== rightAnswerPosition) {
                choicesDivs[i].innerHTML = choices[k].name; 
                k++; 
            }
        }
}

function clickToAnswer(choicesDivs, rightAnswer) {
    choicesDivs.forEach(div => { 

        div.classList.remove('true');
        div.classList.remove('false');
        div.classList.add('unset');

        div.onclick = function () {
            answered = true; 
            choicesDivs.forEach(div => {
                div.classList.remove('unset');
                div.classList.add(div.innerHTML === rightAnswer.name ? 'true' : 'false') 
            })
        }
    })
}

function endGame() {
    endBtn.addEventListener('click', function () {
        startBtn.innerHTML = 'Start';
        endBtn.classList.remove('view');
        countryFlag.src = '../images/quiz.png';
        choicesCont.classList.remove('view');
    })
}