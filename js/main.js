const generateBtn = document.querySelector('button.generate'); 
const countryFlag = document.querySelector('.flag-quiz img'); 
const loading = document.querySelector('.loading'); 
const choicesCont = document.querySelector('.choices')
const choicesDivs = document.querySelectorAll('.choices .choice');

fetch('https://restcountries.com/v2/all')
.then(response => response.json())
.then(data => generate(data))

let playing = false;

function generate(data) {
    generateBtn.style.cursor = 'pointer';
    generateBtn.innerHTML = 'Start';
    generateBtn.classList.add('unset');

    generateBtn.addEventListener('click', function () {
        generateBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>'; 
        let choices = [];
        for (let i = 0; i < 3; i++) {
            choices.push(data
                .splice(Math.trunc((Math.trunc(Math.random() * data.length) + Math.trunc(Math.random() * data.length)) / 2), 1)[0])
        }
        let rightAnswer = choices[0];
        console.log(`Right Answer : ${rightAnswer.name}`)
        let rightAnswerPosition = Math.trunc(Math.random() * 3); 
        choicesDivs[rightAnswerPosition].innerHTML = rightAnswer.name; 
        let k = 1; 
        for (let i = 0; i < 3; i++) {
            if (i !== rightAnswerPosition) {
                choicesDivs[i].innerHTML = choices[k].name; 
                k++; 
            }
        }
        countryFlag.src = rightAnswer.flag;
        choicesCont.classList.add('view');
        

        choicesDivs.forEach(div => { 

            div.classList.remove('true');
            div.classList.remove('false');
            div.classList.add('unset');

            div.onclick = function () {
                choicesDivs.forEach(div => {
                    div.classList.remove('unset');
                    div.classList.add(div.innerHTML === rightAnswer.name ? 'true' : 'false')
                })
            }
        })
    })
}

