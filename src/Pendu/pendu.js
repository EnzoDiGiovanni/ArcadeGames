// Words Array
let words = [
  "galaxie",
  "planete",
  "astronaute",
  "comete",
  "satellite",
  "univers",
  "etoile",
  "nebuleuse",
  "quasar",
  "constellation",
  "orbite",
  "eclipse",
  "lumiere",
  "telescope",
  "voyageur",
  "exploration",
  "cosmos",
  "astéroïde",
];

let usedLetter = [];

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let imgStep = document.querySelector(".imagesStep");
let step = document.querySelector(".step");
let currentStep = 0;

// Random Word from Array
let randomWord = Math.floor(Math.random() * words.length);

// Changement du nombre de lettre à l'écran
const letterNbr = document.querySelector(".letterNbr");
letterNbr.innerText = words[randomWord].length;

// Transformation des lettres en tirets
let word = document.querySelector(".word");
writeWord();

console.log(words[randomWord]);

// Capturer les entrées au clique

document.querySelectorAll("button.letter").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset.letter);
    checkLetter(button.dataset.letter);
  });
});

// Verif des lettres dispo dans le mot
document.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (alphabet.includes(event.key)) {
    checkLetter(event.key);
  } else {
    console.log("Pas une lettre de l'alphabet");
  }
});

function checkLetter(letter) {
  if (usedLetter.includes(letter)) {
    return;
  }

  usedLetter.push(letter);
  console.log(usedLetter);
  document.querySelector(
    "button.letter[data-letter='" + letter + "']"
  ).disabled = true;

  if (words[randomWord].includes(letter)) {
    console.log("oui");
    writeWord();
    if (!word.textContent.includes("_")) {
      alert("Bravo vous avez trouvé le mot : " + words[randomWord]);
    }
  } else {
    console.log("non");
    currentStep += 1;
    step.textContent = currentStep;
    imgStep.src = "images/hangman-" + currentStep + ".svg";
    if (currentStep == 6) {
      alert("Perdu");
    }
  }
}

function writeWord() {
  let wordLetters = words[randomWord].split("");

  // Boucle sur chaque lettre du mot
  word.textContent = "";
  for (let i = 0; i < wordLetters.length; i++) {
    const letter = wordLetters[i];
    if (usedLetter.includes(letter)) {
      // ecrire la lettre
      word.textContent += " " + letter + " ";
    } else {
      // Sinon un tiret du 8
      word.textContent += " _ ";
    }
  }
}
