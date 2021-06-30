const viewStatus = document.querySelector('.turnStatus');
const viewWin = document.querySelector('.winner');
const winDisplay = function () { return `"${player}" WON`};
const drawDisplay = function () { return `DRAW`};
const turnDisplay = function () { return ` "${player}" TURN`};
const delay = 300;

let gameActive = true;
let player = 'X';
let desk = new Array (9).fill('');

viewStatus.innerHTML = turnDisplay();

function onBoardPlayed(clickedBoard, clickedBoardIndex) {
    desk[clickedBoardIndex] = player;
    clickedBoard.innerHTML = player;
}

function nextTurn() {
    player = player === "X" ? "O" : "X";
    viewStatus.innerHTML = turnDisplay();
}

function checkWinRow () {
    const winRow = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
           
    let roundWon = false;
    
    for (const row of winRow) {
        const [a, b, c] = row;

        if (desk[a] === '' || desk[b] === '' || desk[c] === ''){
            continue;
        }
        if (desk[a] === desk[b] && desk[a] === desk[c]){           
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        viewWin.innerHTML = winDisplay();
        gameActive = false;
        setTimeout("document.getElementById('overlay').style.display='block'", delay); 
        return;
    }

    let roundDraw = !desk.includes("");
    if (roundDraw) {
        viewWin.innerHTML = drawDisplay();
        setTimeout("document.getElementById('overlay').style.display='block'", delay); 
        return;
    }
    
    nextTurn();

}

function onBoardClick(clickedBoardEvent) {
    const clickedBoard = clickedBoardEvent.target;
    const clickedBoardIndex = parseInt(clickedBoard.getAttribute('data-index'));

    if (desk[clickedBoardIndex] !== "" || !gameActive) {
        return;
    } 

    onBoardPlayed(clickedBoard, clickedBoardIndex);
    checkWinRow();
}

function restartGame() {
    gameActive = true;
    player = 'X';
    desk = new Array (9).fill('');
    viewStatus.innerHTML = turnDisplay();
    document.querySelectorAll('.board').forEach(board => board.innerHTML = "");
}

document.querySelectorAll('.board').forEach(board => board.addEventListener('click', onBoardClick));
document.querySelector('.restart').addEventListener('click', restartGame);
