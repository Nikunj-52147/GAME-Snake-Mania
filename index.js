
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("./music/food.mp3");
const gameoverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
const board = document.getElementById('board');
const highScore = document.getElementById('highScore');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};
let score = 0;

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    
    lastPaintTime =  ctime;
    gameEngine();
}

// Amazing Quote: A man with no control over his impulses will always be someone else’s puppet. You can’t lead others if you can’t lead yourself.

function isCollide(snakeArr){
    // If snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }
    }

    // If snake bumps into wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x < 0 || snakeArr[0].y >=18 || snakeArr[0].y < 0){
        return true;
    }

    return false;
}

function gameEngine(){

    musicSound.play();

    // Updating the snake array and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over, Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
        currentScore.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increament score and generate new food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            highScore.innerHTML = "Hi Score: " + hiscoreVal;
        }
        currentScore.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

        let a = 2;
        let b = 16;
        food = {x: Math.round( a + (b - a) * Math.random()), y: Math.round( a + (b - a) * Math.random())};
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Displaying snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
       
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
let hiscoreVal = 0;
if(hiscore === null){
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
}
else{
    hiscoreVal = JSON.parse(hiscore);
    highScore.innerHTML = "Hi Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x:0, y:1}; // Game Starts
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            console.log("Something went wrong");
    }
})