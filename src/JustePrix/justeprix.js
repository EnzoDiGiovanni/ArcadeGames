// Le juste prix
const userGuess = document.querySelector("#userGuess");
const attempsLeft = document.querySelector(".attempsLeft");
const moreLessText = document.querySelector(".moreLess");
const result = document.querySelector("#result");
const resultMessage = document.querySelector(".resultMessage");
const restartGameBtn = document.querySelector(".restartGame");

let attemps = 5;

const submitGuess = document.getElementById("submitGuess");
submitGuess.addEventListener("click", checkValue);

let nbr = Math.floor(Math.random() * 100);

function checkValue() {
  console.log(userGuess.value);
  if (attemps > 0) {
    if (userGuess.value < nbr) {
      attemps--;
      attempsLeft.textContent = "Tentatives restantes : " + attemps;
      moreLessText.textContent = "C'est plus !";
      moreLessText.classList.remove("moreLessLess");
      moreLessText.classList.add("moreLessMore");
      checkWin();
    } else if (userGuess.value > nbr) {
      attemps--;
      attempsLeft.textContent = "Tentatives restantes : " + attemps;
      moreLessText.textContent = "C'est moins !";
      moreLessText.classList.remove("moreLessMore");
      moreLessText.classList.add("moreLessLess");
      checkWin();
    } else {
      moreLessText.textContent = "Bravo ! Vous avez trouvé le juste prix.";
      moreLessText.classList.remove("moreLessLess", "moreLessMore");
      submitGuess.removeEventListener("click", checkValue);
      checkWin();
    }
  } else {
    moreLessText.textContent = "Game Over ! Le juste prix était " + nbr + ".";
    moreLessText.classList.remove("moreLessLess", "moreLessMore");
    submitGuess.removeEventListener("click", checkValue);
  }
}

function checkWin() {
  if (attemps === 0) {
    attempsLeft.textContent = "Plus de tentatives restantes.";
    endGame();
  } else if (userGuess.value == nbr) {
    endGame();
  }
}

function endGame() {
  if (userGuess.value == nbr) {
    resultMessage.textContent =
      "Bravo ! le juste prix était bien " + nbr + " !";
  } else {
    document.querySelector(".victorySmiley").src = "images/defeat.webp";
    resultMessage.textContent = "Perdu ! le juste prix était " + nbr + " !";
  }
  result.style.top = "50%";
  result.style.left = "50%";
  result.style.transform = "translate(-50%, -50%)";
  result.style.display = "block";
}

restartGameBtn.addEventListener("click", restartGame);

function restartGame() {
  location.reload();
}
