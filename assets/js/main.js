const words = [
  "Test",
  //   "Abendbrot",
  //   "Brueckentag",
  //   "Erklaerungsnot",
  //   "Fingerspitzengefuehl",
  //   "Fremdschaemen",
  //   "Geborgenheit",
  //   "Geschmacksverirrung",
  //   "Schweinehund",
  //   "Kopfkino",
  //   "Kummerspeck",
  //   "Schnapsidee",
  //   "Torschlusspanik",
  //   "verabredet",
  //   "verschlimmbessern",
  //   "Vorfreude",
  //   "Weltschmerz",
  //   "Zeitgeist",
  //   "Zugzwang",
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

console.log("here", alphabetButtons);

console.log("here2", alphabetButtons[0].textContent);

// 3.- Add event listener to play button

let outputWord = [];
let wordLetters = [];

let letterContainer, letter;

playBtn.addEventListener("click", () => {
  // new game, remove word and disables buttons
  output.innerHTML = "";
  for (const letterButton of alphabetButtons) {
    letterButton.disabled = false;
  }

  // 3a.-Add to give a new Random word
  let randomWord = "";
  let randomNumber = Math.floor(Math.random() * words.length);
  randomWord = words[randomNumber].toUpperCase();
  console.log(randomWord);
  let wordArray = Array.from(randomWord);

  //   now we can use the array outside
  wordLetters = wordArray;
  //   3b.- create ein container and letter(inside)

  for (const letterButton of alphabetButtons) {
    letterButton.addEventListener("click", () => {
      // 2.b - if we click button ist after that disable
      letterButton.disabled = true;
      //   letterVisibilityOn();
      for (const letterContainer of outputWord) {
        let letterOut = letterContainer.textContent;
        if (letterOut === letterButton.textContent) {
          console.log(letterContainer);
          let letter = letterContainer.children[0];
          console.log("child", letter);
          letter.style.visibility = "visible";
          console.log("YES");
        } else {
          console.log("dont!");
        }
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
