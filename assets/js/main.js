const words = [
  "Test",
  "Abendbrot",
  // "Brueckentag",
  // "Erklaerungsnot",
  // "Fingerspitzengefuehl",
  // "Fremdschaemen",
  // "Geborgenheit",
  // "Geschmacksverirrung",
  // "Schweinehund",
  // "Kopfkino",
  // "Kummerspeck",
  // "Schnapsidee",
  // "Torschlusspanik",
  // "verabredet",
  // "verschlimmbessern",
  // "Vorfreude",
  // "Weltschmerz",
  // "Zeitgeist",
  // "Zugzwang",
];

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "ß",
];

//   1.-Save Variables data-js="round-counter", data-js="alphabet-btn", "play-btn"

const roundCounter = document.querySelector('[data-js="round-counter"]');
const winLostOutput = document.querySelector('[data-js="round-container"]');
const winOutput = document.querySelector('[data-js="win-output"]');
const output = document.querySelector('[data-js="output"]');
const playBtn = document.querySelector('[data-js="play-btn"]');

// 2.- Create Alphabet buttons
const alphabetContainer = document.querySelector('[data-js="alphabet-btn"]');

let alphabetButtons;

const createLetterButtons = () => {
  alphabetButtons = [];
  for (const letter of alphabet) {
    let letterButton = document.createElement("button");
    alphabetContainer.append(letterButton);
    letterButton.textContent = letter;
    letterButton.classList.add("letter-btn");
    alphabetButtons.push(letterButton);
  }
  return alphabetContainer;
};

createLetterButtons();

// 3.- Create help Variables & add eventListener for play button

let outputWord = [];
// let wordLetters = [];
let letterContainer, letter;

playBtn.addEventListener("click", () => {
  // new game, remove word and disables buttons
  output.innerHTML = "";
  winOutput.innerHTML = "";

  for (const letterButton of alphabetButtons) {
    letterButton.disabled = false;
  }

  // 3a.-Add to give a new Random word and check round value

  let randomWord = "";
  let randomNumber = Math.floor(Math.random() * words.length);
  randomWord = words[randomNumber].toUpperCase();
  let wordArray = Array.from(randomWord);

  // 3a.-the lenght of the Array give the rounds for the word;
  let wordArrayLenghtAndInitialValue = wordArray.length + 6;
  roundCounter.textContent = wordArrayLenghtAndInitialValue;
  let numberCounter = roundCounter.textContent;

  //   3b.- Click event for each Alphabet button,

  for (const letterButton of alphabetButtons) {
    letterButton.addEventListener("click", () => {
      // 2.b - if we click button ist after that disable
      letterButton.disabled = true;
      let allLettersVisible = true;

      // need a if statement becouse the counter go to negativ values
      let newCounter;

      if (numberCounter >= 0) {
        newCounter = numberCounter--;
        roundCounter.textContent = newCounter;
      }

      if (newCounter === 0) {
        winOutput.innerHTML = `<p class="lost-output">You LOST!</p>`;
        roundCounter.textContent = 0;
      }

      for (const letterContainer of outputWord) {
        let letterOut = letterContainer.textContent;
        if (letterOut === letterButton.textContent) {
          let letter = letterContainer.children[0];
          letter.style.visibility = "visible";
          console.log("YES");
        } else {
          console.log("dont!");
        }
        // here we check of all letter are visible for the output win/lost
        if (letterContainer.children[0].style.visibility !== "visible") {
          allLettersVisible = false;
        }
      }
      if (allLettersVisible && newCounter >= 0) {
        console.log("win!");
        winOutput.innerHTML = `<p class="win-output">You WIN 🏆</p>`;
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

// console.log("ARRAY", outputWord);
// Add Buttons eventL
