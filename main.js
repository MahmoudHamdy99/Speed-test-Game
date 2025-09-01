
const words_en = [
    "JavaScript",
    "Programming",
    "Developer",
    "Website",
    "Python",
    "React",
    "Project",
    "Responsive",
    "Databases",
    "Algorithm",
    "Function",
    "Variable",
    "Object",
    "Array",
    "Component"
];

const lvls = {
    "Esey": 7,
    "Normal": 4,
    "Hard": 3
};


let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let scoreTime = document.querySelector("#score__time");
let buttons = document.querySelector(".button");

let langSelect = document.getElementById("lang__select");
let trainingCheckbox = document.getElementById("training__mode");
let highScoreDiv = document.getElementById("high__score");
let statsCorrect = document.getElementById("stats__correct");
let statsWrong = document.getElementById("stats__wrong");
let statsTotal = document.getElementById("stats__total");

let words = [...words_en] 
let trainingMode = trainingCheckbox ? trainingCheckbox.checked : false;


let stats = { correct: 0, wrong: 0, total: 0 };

function updateStats(correct) {
    stats.total++;
    if (correct) stats.correct++;
    else stats.wrong++;
    if (statsCorrect) statsCorrect.innerHTML = ` Correct : ${stats.correct}`;
    if (statsWrong) statsWrong.innerHTML = ` Wrong : ${stats.wrong}`;
    if (statsTotal) statsTotal.innerHTML = ` Total : ${stats.total}`;
}

function saveHighScore(score) {
    let highScore = localStorage.getItem("high__score") || 0;
    if (score > highScore) {
        localStorage.setItem("high__score", score);
    }
}

function updateStats(correct) {
    stats.total++;
    if (correct) {
        stats.correct++;
        saveHighScore(stats.correct); 
    } else {
        stats.wrong++;
    }
    if (statsCorrect) statsCorrect.innerHTML = `Correct: ${stats.correct}`;
    if (statsWrong) statsWrong.innerHTML = `Wrong: ${stats.wrong}`;
    if (statsTotal) statsTotal.innerHTML = `Total: ${stats.total}`;
}

function showHighScore() {
    let highScore = localStorage.getItem("high__score") || 0;
    if (highScoreDiv){
        highScoreDiv.innerHTML = `High score: ${highScore}`;
    } 
}

function rooo() {
    let levelSlect = document.querySelector("select").value;
    let defaultLevelName = levelSlect;
    let defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = trainingMode ? "∞" : defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
}

if (trainingCheckbox) {
    trainingCheckbox.addEventListener('change', function () {
        trainingMode = trainingCheckbox.checked;
        rooo();
    });
}

document.querySelector("select").addEventListener('change', rooo);

input.onpaste = function () {
    return false;
};

startButton.onclick = function () {
    this.remove();
    input.focus();
    showHighScore();
    if (statsCorrect) statsCorrect.innerHTML = stats.correct;
    if (statsWrong) statsWrong.innerHTML = stats.wrong;
    if (statsTotal) statsTotal.innerHTML = stats.total;
    genWords();
};

function genWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = '';
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    startPlay();
}

function startPlay() {
    rooo();
    if (trainingMode) {
        input.onkeydown = function (e) {
            if (e.key === "Enter") {
                let correct = theWord.innerHTML.toLowerCase() === input.value.toLowerCase();
                updateStats(correct);
                if (correct) {
                    input.value = '';
                    scoreGot.innerHTML++;
                    if (words.length > 0) {
                        genWords();
                    } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finishMessage.appendChild(span);
                        upcomingWords.remove();
                        saveHighScore(scoreGot.innerHTML);
                        showHighScore();
                    }
                } else {
                    input.value = ''; 
                }
            }
        };
    } else {
        let start = setInterval(() => {
            timeLeftSpan.innerHTML--;
            if (timeLeftSpan.innerHTML === "0") {
                clearInterval(start);
                let correct = theWord.innerHTML.toLowerCase() === input.value.toLowerCase();
                updateStats(correct);
                if (correct) {
                    input.value = '';
                    scoreGot.innerHTML++;
                    if (words.length > 0) {
                        genWords();
                    } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finishMessage.appendChild(span);
                        upcomingWords.remove();
                        saveHighScore(scoreGot.innerHTML);
                        showHighScore();
                    }
                } else {
                    let span = document.createElement("span");
                    span.className = 'bad';
                    let text = document.createTextNode("Game Over");
                    span.appendChild(text);
                    finishMessage.appendChild(span);
                    saveHighScore(scoreGot.innerHTML);
                    showHighScore();
                }
            }
        }, 1000);
    }
}

buttons.onclick = function () {
    window.location.reload();
};

document.addEventListener("DOMContentLoaded", function () {
    showHighScore();
    if (statsCorrect) statsCorrect.innerHTML = `Correct: ${stats.correct}`;
    if (statsWrong) statsWrong.innerHTML = `Wrong: ${stats.wrong}`;
    if (statsTotal) statsTotal.innerHTML = `Total: ${stats.total}`;
});
