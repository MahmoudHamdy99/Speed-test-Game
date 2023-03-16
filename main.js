const words = [
    "JavaScript",
    "Programming",
    "Developer",
    "Website",
    "Python",
    "React",
    "Proect",
    "Responsive",
    "Databases"
]
// seteng levels
const lvls = {
    "Esey": 7,
    "Normal": 4,
    "Hard": 3
}
// default level



// Catch selectors
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

document.querySelector("select").addEventListener('change', rooo);

function rooo(){
    let levelSlect = document.querySelector("select").value;
    let defaultLevelName = levelSlect;
    let defaultLevelSeconds = lvls[defaultLevelName];
    // seteng levels Name + Seconds + score
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
};

input.onpaste = function () {
    return false;
};

// Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords()
};

function genWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove Wordfrom Array
    words.splice(wordIndex, 1);
    // Showe The Random Word
    theWord.innerHTML = randomWord
    // Emty Upcoming Words
    upcomingWords.innerHTML = '';
    // Generate Words
    for (let i = 0; i < words.length; i++) {
        // Creat Div Element 
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Cole Start Play Funshen
    startPlay ()
};

function startPlay () {
    rooo()
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if ( timeLeftSpan.innerHTML === "0") {
            // Stop
            clearInterval(start);
            //compaer word
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                // Empty Input Field
                input.value = '';
                // Incrase Score
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    // Coll Genearet Word Functin
                    genWords();
                }else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("Congratz");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = 'bad';
                let text = document.createTextNode("Game Over");
                span.appendChild(text);
                finishMessage.appendChild(span);
            };
        };
    }, 1000);
};

buttons.onclick = function() {
    window.location.reload();
};