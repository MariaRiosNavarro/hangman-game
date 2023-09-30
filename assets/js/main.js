const words = [
  "Abendbrot",
  "Brueckentag",
  "Erklaerungsnot",
  "Fingerspitzengefuehl",
  "Fremdschaemen",
  "Geborgenheit",
  "Geschmacksverirrung",
  "Schweinehund",
  "Kopfkino",
  "Kummerspeck",
  "Schnapsidee",
  "Torschlusspanik",
  "verabredet",
  "verschlimmbessern",
  "Vorfreude",
  "Weltschmerz",
  "Zeitgeist",
  "Zugzwang",
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

for (const letter of alphabet) {
  const letterButton = document.createElement("button");
  alphabetContainer.append(letterButton);
  letterButton.textContent = letter;
  letterButton.classList.add("letter-btn");
  letterButton.addEventListener("click", () => {
    //   if we click button ist after that disable
    letterButton.disabled = true;
  });
}
