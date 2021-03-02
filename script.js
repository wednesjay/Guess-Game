const msgEl = document.getElementById(`msg`);
const randomNum = getRandomNumber();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log(`Number: ${randomNum}`);

// Initalize the Speech Recognition Object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new Instance called recognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener(`result`, onSpeak);

// capture user input
function onSpeak(e) {
    console.log(e);
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg);
}

// display user input into ui
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class = "box">${msg}</span>  
    `;
}

// check guess against the random number
function checkNumber(msg) {
    const num = +msg;

    // check number to see if it's valid
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>That is not a valid number!</div>`;
        return;
    }

    //Checks if the number is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }

    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class"play-again" id="play-again"> Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML = `<div>Go Lower</div>`;
    } else {
        msgEl.innerHTML = `<div>Go Higher</div>`;
    }
}

// End speech recognition service
recognition.addEventListener(`end`, () => recognition.start());

document.body.addEventListener(`click`, e => {
    if(e.target.id == `play-agin`) {
        window.location.reload();
    }
})