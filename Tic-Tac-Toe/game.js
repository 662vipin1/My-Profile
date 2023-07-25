log = console.log;
const winState = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
];
let players;
let cells = document.querySelectorAll('.cell');
let btn = document.getElementById('restart-button');
startGame();
function startGame(){
    players = { cross:[], circle:[] }
    cells.forEach(cell => cell.addEventListener('click', cellListener, true));
    btn.addEventListener('click', btnListener, true);
}

function cellListener(event){
    event.target.removeEventListener('click', cellListener, true);
    placeMark(event.target);
    gameStatus();
    switchTurn();
}
function btnListener(event){
    event.target.removeEventListener('click', btnListener, true);
    cells.forEach(cell => cell.classList.remove('cross', 'circle') );
    document.getElementById('game-modal').style.setProperty('display', 'none');
    startGame();
}
function placeMark(target){
    let board = document.getElementById('board');
    let cellNumber = target.getAttribute('data-cell');
    if(board.classList.contains('cross-turn')){
        target.classList.add('cross');
        players.cross.push(cellNumber);
    }
    else if(board.classList.contains('circle-turn')){
        target.classList.add('circle');
        players.circle.push(cellNumber);
    }
}
function gameStatus(){
    let board = document.getElementById('board');
    let isWinner = winState.some(state => 
        state.every(item => {
            let board = document.getElementById('board');
            if(board.classList.contains('cross-turn')){
                return players.cross.indexOf(String(item)) > -1;
            }
            else if(board.classList.contains('circle-turn')){
                return players.circle.indexOf(String(item)) > -1;
            }
        })
    );
    if(isWinner){
        let message;
        if(board.classList.contains('cross-turn')){
            message = 'X Win!';
        }
        else if(board.classList.contains('circle-turn')){
            message = 'O Win!';
        }
        cells.forEach(cell => cell.removeEventListener('click', cellListener, true));
        document.getElementById('message').innerText = message;
        setTimeout(() => document.getElementById('game-modal').style.setProperty('display', 'flex'), 700);
        
    }
}
function switchTurn(){
    let board = document.getElementById('board');
    board.classList.toggle('cross-turn');
    board.classList.toggle('circle-turn');
}