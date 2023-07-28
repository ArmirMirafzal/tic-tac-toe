"use strict";
/*----------- 22.03.23(53)--------- */
const game = document.querySelector(".game");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
let allPtags;
let board;
let cells;
let currentPlayer;
let number = 0;
let historyOfPositions = [];
let switchedidx;
let currentNumberP;
let winnerExist = false;
let winnerElm;

const positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function addListeners() {
  cells = game.querySelectorAll(".cell");
  winnerElm = game.querySelector(".winner");
  board = new Array(9).fill(NaN);
  currentPlayer = "X";

  function checkWinner() {
    for (let position of positions) {
      const [x, y, z] = position;
      if (board[x] === board[y] && board[y] === board[z]) return true;
    }
  }

  cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => {
      const value = cell.innerText;

      if (currentNumberP !== switchedidx && !value) {
        clearAfterMoves(switchedidx);
      }

      !value && number++;

      if (!winnerExist && !value) {
        createHistory(number);
        board[idx] = currentPlayer;
        cell.innerText = currentPlayer;
        // history.push([idx, currentPlayer]);
        addHistory(idx, currentPlayer);

        winnerExist = checkWinner();
        if (winnerExist) {
          winnerElm.innerText = `Winner: ${currentPlayer}`;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });
}

addListeners();

function createHistory(num) {
  let Pels = message.querySelectorAll(".history");
  Pels.forEach((item) => {
    item.classList.remove("current");
  });
  let pel = document.createElement("p");
  pel.classList.add("history", "current");

  pel.textContent = `Go to move #${num}`;
  message.appendChild(pel);
  allPtags = message.querySelectorAll(".history");
  allPtags.forEach((el, idx) => {
    el.addEventListener("click", () => {
      // console.log(idx);
      switchHistory(idx, num);
    });
  });
}

function clearAfterMoves(num) {
  for (let i = num + 1; i < allPtags.length; i++) {
    allPtags[i].remove();
  }
  historyOfPositions = [];
  number = num;
  console.log("num", num);
  currentNumberP = 0;
  switchedidx = 0;
  winnerExist = false;
  winnerElm.innerText = `Winner --`;
}

function switchHistory(idx, num) {
  clearXOboard();
  clearBoard();
  allPtags.forEach((el) => {
    el.classList.remove("current");
  });
  allPtags[idx].classList.add("current");
  fillBoard(idx);
  console.log(num, idx);
  currentNumberP = num;
  switchedidx = idx;
}

function fillBoard(idx) {
  if (idx !== 0) {
    let cutHist = historyOfPositions.slice(0, idx);
    for (let [index, gamerValue] of cutHist) {
      cells[index].textContent = gamerValue;
      board[index] = gamerValue;
    }
    currentPlayer = cutHist[cutHist.length - 1][1] == "X" ? "O" : "X";
  }
}

function clearXOboard() {
  cells.forEach((item) => {
    item.textContent = "";
  });
}

function clearBoard() {
  board = new Array(9).fill(NaN);
}

function addHistory(index, current) {
  let onePosition = [index, current];
  historyOfPositions.push(onePosition);
  console.log(historyOfPositions);
}
