const cells = document.querySelectorAll('.title');
const playerX = "X";
const playerO = "O";

let turn = playerX;
let boardState = Array(cells.length).fill(null);

const strike = document.getElementById('strike');
const gameover = document.getElementById('gameover');
const gameText = document.getElementById('gameText');
const playagain = document.getElementById('playagain');

cells.forEach(cell => cell.addEventListener('click', cellClick));
playagain.addEventListener('click', resetGame);

function cellClick(event) {
    const cell = event.target;
    const index = Number(cell.dataset.index) - 1;
    if (gameover.classList.contains('visible') || cell.innerText !== "") return;
    cell.innerText = playerX;
    boardState[index] = playerX;
    if (checkWinner(playerX)) {
        endGame(playerX);
        return;
    }
    if (isDraw()) {
        endGame(null);
        return;
    }
    computerMove();
    if (checkWinner(playerO)) {
        endGame(playerO);
        return;
    }
    if (isDraw()) {
        endGame(null);
    }
}

function computerMove() {
    const emptyIndices = boardState
        .map((val, i) => val === null ? i : null)
        .filter(v => v !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const cell = cells[randomIndex];
    cell.innerText = playerO;
    boardState[randomIndex] = playerO;
}

function checkWinner(player) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === player);
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function endGame(winner) {
    gameover.classList.remove('hidden');
    gameover.classList.add('visible');

    if (winner === playerX) {
        gameText.innerText = "Winner is X";
    } else if (winner === playerO) {
        gameText.innerText = "Winner is O";
    } else {
        gameText.innerText = "Draw";
    }
}

function resetGame() {
    boardState = Array(cells.length).fill(null);
    cells.forEach(cell => cell.innerText = "");
    gameover.classList.remove('visible');
    gameover.classList.add('hidden');
    turn = playerX;
}
