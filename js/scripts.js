(function() {
    let origBoard;
    const humanPlayer = 'O';
    const computerPlayer = 'X';
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




    function startGame() {
        document.querySelector('.endgame').style.display = 'none';
        origBoard = Array.from(Array(9).keys());
        for ( let i = 0; i < cells.length; i++ ) {
            cells[i].innerText = '';
            cells[i].style.removeProperty('background-color');
            cells[i].addEventListener('click', turnClick, false);
        }
    }

    function turnClick(square) {
        if(typeof origBoard[square.target.id] == 'number') {
            turn(square.target.id, humanPlayer);
            if (!checkTie()) turn(bestSpot(), computerPlayer)
        }
    }
    function bestSpot() {
        return minmax(origBoard, computerPlayer).index;
    }
    function emptySquares() {
        return origBoard.filter(s => typeof s == 'number');
    }
    function checkTie() {
        if(emptySquares().length === 0) {
            for ( let i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = 'green';
                cells[i].removeEventListener('click', turnClick, false);
            }
            declareWinner('Tie Game');
            return true;
        }
        return false;
    }
    function declareWinner(who) {
        document.querySelector('.endgame').style.display = 'block';
        document.querySelector('.endgame .text').innerText = who;
    }
    function turn(squareId, player) {
        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        let gameWon = checkWin(origBoard, player);
        if(gameWon) gameOver(gameWon);
    }

    function minmax(newBoard, player) {
        let availSpots = emptySquares(newBoard);
        if(checkWin(newBoard, player)) {
            return {score: -10};
        } else if(checkWin(newBoard, computerPlayer)) {
            return {score: 20}
        } else if(availSpots.length === 0) {
            return {score: 0};
        }
        const moves = [];
        for (let i =0; i < availSpots.length; i++) {
            let move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            if(player === computerPlayer) {
                var result = minmax(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                var result = minmax(newBoard, computerPlayer);
                move.score =result.score;
            }
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
        var bestMove;
        if(player === computerPlayer) {
            var bestScore = -1000;
            for(var i = 0; i < moves.length; i++) {
                if(moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 1000;
            for(var i = 0; i < moves.length; i++) {
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for(let [index, win] of winCombos.entries()) {
            if(win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }

    function gameOver(gameWon) {
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? 'blue' : 'red';
        }
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner(gameWon.player === humanPlayer ? 'You Win' : 'You Lose');
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
        restartBtn.addEventListener('click', startGame, false);

    }
})();