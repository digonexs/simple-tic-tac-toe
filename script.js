// script.js
const board = document.getElementById("game-board");
const cells = document.querySelectorAll("[data-cell]");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "x";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(player) {
  return winPatterns.some((pattern) => {
    return pattern.every((index) => cells[index].classList.contains(player));
  });
}

function checkDraw() {
  return [...cells].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function handleClick(event) {
  const cell = event.target;
  const index = [...cells].indexOf(cell);

  if (cell.classList.contains("x") || cell.classList.contains("o")) return;

  cell.classList.add(currentPlayer);
  boardState[index] = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = `Jogador ${currentPlayer.toUpperCase()} venceu!`;
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
  } else if (checkDraw()) {
    status.textContent = "Empate!";
  } else {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    status.textContent = `É a vez do Jogador ${currentPlayer.toUpperCase()}`;
  }
}

function restartGame() {
  cells.forEach((cell) => cell.classList.remove("x", "o"));
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "x";
  status.textContent = `É a vez do Jogador ${currentPlayer.toUpperCase()}`;
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);

restartGame(); // Initialize the game
