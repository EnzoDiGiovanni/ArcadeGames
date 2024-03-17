const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const playerVictory = document.querySelector(".playerVictory");
document.querySelector("#restartButton").addEventListener("click", restartGame);

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;

let gameActive = true;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(event) {
  const cell = event.target;
  const currentClass = xTurn ? "X" : "O";

  placeMark(cell, currentClass);

  if (checkForWin(currentClass)) {
    endGame(false);
  } else if (checkForDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    playerVictory.innerHTML = "Egalité !";
  } else {
    playerVictory.innerHTML = `${xTurn ? "X" : "O"} Wins!`;
  }
}

function placeMark(cell, currentClass) {
  cell.innerHTML = currentClass;
}

function swapTurns() {
  xTurn = !xTurn;
}

function checkForWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML === currentClass;
    });
  });
}

function checkForDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML === "X" || cell.innerHTML === "O";
  });
}

function restartGame() {
  gameActive = true;
  xTurn = true;
  playerVictory.innerHTML = "";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}
