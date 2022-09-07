const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y:undefined,
};

window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame(){
    setCanvasSize;

    game.font = elementsSize + 'px Verdana' ;
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[1];
    const mapRows = map.trim().split('\n');

    const mapCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize, canvasSize);

    mapCols.forEach((row, rowI)=> {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 10;
            const posY = elementsSize * (rowI + 1) - 5;

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                playerPosition.x =posX;
                playerPosition.y = posY;
                }
            }

            game.fillText(emoji, posX , posY);
        });
        
    }
    
    );
    
    movePlayer();
}
const map = maps[1];
window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

// Escuchar flechas

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

// Movimientos
function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
    console.log("Me quiero mover hacia arriba");
    if ((playerPosition.y - elementsSize) > (elementsSize - 10)){
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {
    console.log("Me quiero mover hacia la izquierda");
    if ((playerPosition.x - elementsSize) >= (elementsSize - 10)){
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    console.log("Me quiero mover hacia la derecha");
    if ((playerPosition.x + elementsSize) <= canvasSize + elementsSize){
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    console.log("Me quiero mover hacia abajo");
    if ((playerPosition.y + elementsSize) < canvasSize){
        playerPosition.y += elementsSize;
        startGame();
    }
}

