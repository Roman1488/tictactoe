function buildGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const table = document.createElement('table');
    gameBoard.appendChild(table);

    for (let i = 0; i <= 8; i++) {
        if(i % 3 === 0) {
            const tableCell = document.createElement('tr')
            table.appendChild(tableCell);
        }
    }
}

buildGameBoard();