import {
  germanWords,
  germanAlphabet,
  spanishWords,
  spanishAlphabet,
  englishWords,
  englishAlphabet,
} from "./data.js";

let words = [];
let alphabet = [];

words = germanWords;
alphabet = germanAlphabet;

//  EXTRA MULTILINGUAL: Save button container at the beginning, to remove the contain if we change the language and labels that will change

const alphabetContainer = document.querySelector('[data-js="alphabet-btn"]');
const title = document.querySelector('[data-js="title"]');
const playBtn = document.querySelector('[data-js="play-btn"]');
const roundCounter = document.querySelector('[data-js="round-counter"]');

let alphabetButtons = [];
alphabetContainer.innerHTML = `<p class="alert">Please choose your language</p><br><p class="alert" >Bitte wählen sie ihre Sprache</p><br><p class="alert">Por favor elija su idioma</p><br>`;

// EXTRA MULTILINGUAL main function

let winMessage = "";
let lostMessage = "";

const changeLanguage = () => {
  // remove old values
  roundCounter.innerHTML = "0";
  alphabetContainer.innerHTML = "";
  output.innerHTML = "";
  winOutput.innerHTML = "";
  let germanTrue = german.checked;
  let englishTrue = english.checked;
  let spanishTrue = spanish.checked;
  switch (true) {
    case germanTrue:
      alphabet = germanAlphabet;
      words = germanWords;
      playBtn.textContent = "spielen";
      title.textContent = "Galgen";
      break;
    case englishTrue:
      alphabet = englishAlphabet;
      words = englishWords;
      playBtn.textContent = "play";
      title.textContent = "Hangman";
      break;
    case spanishTrue:
      alphabet = spanishAlphabet;
      words = spanishWords;
      playBtn.textContent = "jugar";
      title.textContent = "Ahorcado";
      break;
    default:
      alphabet = germanAlphabet;
      words = germanWords;
      title.textContent = "Galgen";
      break;
  }
  createLetterButtons();
};

//   1.-Save Variables

const winOutput = document.querySelector('[data-js="win-output"]');
const output = document.querySelector('[data-js="output"]');

// EXTRA-MULTILINGUAL:

const german = document.querySelector('[data-js="german"]');
const english = document.querySelector('[data-js="english"]');
const spanish = document.querySelector('[data-js="spanish"]');

german.addEventListener("change", changeLanguage);
english.addEventListener("change", changeLanguage);
spanish.addEventListener("change", changeLanguage);

// 2.- Create Alphabet buttons

const createLetterButtons = () => {
  for (const letter of alphabet) {
    let letterButton = document.createElement("button");
    alphabetContainer.append(letterButton);
    letterButton.textContent = letter;
    letterButton.classList.add("letter-btn");
    alphabetButtons.push(letterButton);
  }
  return alphabetContainer;
};

// 3.- Create help Variables & add eventListener for play button

let outputWord = [];
let letterContainer, letter;

playBtn.addEventListener("click", () => {
  // MULTILINGUAL lost/win message save

  let germanTrue = german.checked;
  let englishTrue = english.checked;
  let spanishTrue = spanish.checked;

  switch (true) {
    case germanTrue:
      winMessage = `<p class="win-output">Sie haben gewonnen 🏆</p>`;
      lostMessage = `<p class="lost-output">Sie haben verloren!</p>`;
      break;
    case englishTrue:
      winMessage = `<p class="win-output">You WIN 🏆</p>`;
      lostMessage = `<p class="lost-output">You LOST!</p>`;
      break;
    case spanishTrue:
      winMessage = `<p class="win-output">Ganaste 🏆</p>`;
      lostMessage = `<p class="lost-output">Perdiste</p>`;
      break;
    default:
      winMessage = `<p class="win-output">Sie haben gewonnen 🏆</p>`;
      lostMessage = `<p class="lost-output">Sie haben verloren!</p>`;
      break;
  }

  // new game, remove word, disables buttons and win/lost output
  output.innerHTML = "";
  winOutput.innerHTML = "";
  roundCounter.innerHTML = 0;
  for (const letterButton of alphabetButtons) {
    letterButton.disabled = false;
  }

  // 3a.-Add to give a new Random word and check round value

  let randomWord = "";
  let randomNumber = Math.floor(Math.random() * words.length);
  randomWord = words[randomNumber].toUpperCase();
  let wordArray = Array.from(randomWord);

  console.log(randomWord);

  // 3a.-the lenght of the Array give the rounds for the word with initial value of 6;
  let wordArrayLenghtAndInitialValue = wordArray.length + 6;
  roundCounter.textContent = wordArrayLenghtAndInitialValue;
  let numberCounter = roundCounter.textContent;

  //   3b.- Click event for each Alphabet button,

  for (const letterButton of alphabetButtons) {
    letterButton.addEventListener("click", () => {
      // 3.b1 - if we click letter button ist after that disable
      letterButton.disabled = true;
      let allLettersVisible = true;
      // 3.b2 - handle the counter: we need a if statement because otherwise we get negative values.
      let newCounter;
      if (numberCounter >= 0) {
        newCounter = numberCounter--;
        roundCounter.textContent = newCounter;
      }
      //  3.b3 - handle lost message
      if (newCounter === 0) {
        winOutput.innerHTML = lostMessage;
        roundCounter.textContent = 0;
        console.log("roundCounter", roundCounter.textContent);
      }
      // 3.b4 - change the visibility of the output letter if we hit the correct letter
      for (const letterContainer of outputWord) {
        let letterOut = letterContainer.textContent;
        if (letterOut === letterButton.textContent) {
          let letter = letterContainer.children[0];
          letter.style.visibility = "visible";
          console.log("YES");
        } else {
          console.log("dont!");
        }
        //  3.b5 - Win handle: here we check of all letter are visible for the output win

        if (letterContainer.children[0].style.visibility !== "visible") {
          allLettersVisible = false;
        }
      }
      if (allLettersVisible && newCounter >= 0) {
        console.log("win!");
        winOutput.innerHTML = winMessage;
        roundCounter.textContent = 0;
      }

      return outputWord;
    });
  }

  //   3c.- Map the word array and create for each word one container and letter inside
  outputWord = wordArray.map((letterInArray) => {
    letterContainer = document.createElement("div");
    letterContainer.classList.add("border-bottom");
    letter = document.createElement("span");
    letter.classList.add("letter");
    letter.textContent = letterInArray;
    letter.style.visibility = "hidden";
    letterContainer.append(letter);
    output.append(letterContainer);
    return letterContainer;
  });

  return outputWord;
});
