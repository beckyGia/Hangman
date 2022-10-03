const programming_languages = [
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "c",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
];

//what the answer is
let answer = "";
// amount of rounds you have
let maxWrong = 6;
// how many mistakes you have made
let mistakes = 0;
//the letters that have already been guessed
let guessed = [];
//Word that was just guessed
let wordStatus = null;

// Randomly selects a word from programming_languages
function randomWord() {
  answer =
    programming_languages[
      Math.floor(Math.random() * programming_languages.length)
    ];
}

// generate the buttons for the keyboard
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button class="btn btn-lg btn-primary m-2" 
    id="${letter}" onClick='handleGuess("${letter}")'>${letter}</button>`
    )
    .join("");
  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

//Show the word you just guessed in the DOM
function guessedWord() {
  // seeing how many letters are needed to be guessed in the word you are guessing
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

//Handle the guessed letter
function handleGuess(chosenLetter) {
  //if the letter has not been guessed then put it into the guessed array
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  //once you press a letter, it disables it do you can't press it again
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = `./images/${mistakes}.jpg`;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("keyboard").innerHTML = "You Lost!!";
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + answer;
  }
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.jpg";

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

//Include Max wrong guesses
document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
