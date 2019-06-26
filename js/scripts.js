var origBoard;
const player = 'O';
const computer = 'X';
const winCombos = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [6, 4, 2]
];
buildGameBoard();
const cells = document.querySelectorAll('.cell');
startGame();


console.log(cells);




function startGame() {
    document.querySelector('.endgame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    turn(square.target.id, player);
}
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce
}
function buildGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const table = document.createElement('table');
    gameBoard.appendChild(table);
    let counter = 0;
    for (let i = 0; i <= 2; i++) {
        const tableRow = document.createElement('tr');
        table.appendChild(tableRow);
        for (let j = 0; j <= 2; j++) {
            const tableCell = document.createElement('td');
            tableCell.classList.add('cell');
            tableCell.id = counter++;
            tableRow.appendChild(tableCell);
        }
    }
    const endGame = document.createElement('div');
    endGame.classList.add('endgame');
    const endGameText = document.createElement('div');
    endGameText.classList.add('text');
    endGame.appendChild(endGameText);
    gameBoard.appendChild(endGame);

    const restartBtn = document.createElement('button');
    restartBtn.id = 'restart-btn';
    restartBtn.textContent = 'Restart';
    restartBtn.classList.add('restart-btn');
    gameBoard.appendChild(restartBtn);
    restartBtn.addEventListener('click', function (e) {
        startGame();
    });

}