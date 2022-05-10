console.log('testing')
//declare all variables
let game = document.querySelector('#game');
let leaderBoard = document.querySelector('#leaderboard')
let scoreBoard = document.querySelector('#score');
let newGame = document.querySelector('#newGame')
let up = document.querySelector('#up')
let down = document.querySelector('#down')
let left = document.querySelector('#left')
let right = document.querySelector('#right')
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2,1,0];
let direction = 1;
let score = 0;
let speed = 1.0;
let intervalTime = 0;
let interval = 0;

//w3
function userInput() {
    var text;
    let person = prompt("Please enter your name:", "");
    if (person == null || person == "") {
      text = "Good luck!";
    } else {
      text = "Good luck " + person + "!";
    }
    document.getElementById("name").innerHTML = text;
    start();
  }

//"DOMContentLoaded" runs when website is loaded(game board creation)
document.addEventListener("DOMContentLoaded", function () {
    createBoard();
    newGame.addEventListener("click", replay);
});

function createBoard() {
    for (let i = 0; i <400; i++) {
        let div = document. createElement('div');
        game.appendChild(div)
    }
}
function start() {
    let grid = document.querySelectorAll("#game div");
    applePosition(grid);
    direction = 1;
    scoreBoard.innerHTML = score;
    intervalTime = 500;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach((index) => grid[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    let grid = document.querySelectorAll('#game div');
    if (checkForHits(grid)) {
        alert("HAHA! LOSER!");
        // popup.style.display = 'flex';
       //trying to add name to leaderboard once game over--leaderboard or failed players..
        // var li = person;
        // document.getElementById("names").appendChild(li);
        return clearInterval(interval);
    } else {
        moveSnake(grid);
    }
}
function checkForHits(grid) {
    if (
        (currentSnake[0] + width >= width * width && direction ===width) ||
        (currentSnake[0] % width === width - 1 && direction ===1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        grid[currentSnake[0] + direction].classList.contains("snake")
      ) {
        return true;
      } else {
        return false;
      }
}
function moveSnake(grid) {
    let tail = currentSnake.pop();
    grid[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(grid, tail);
    grid[currentSnake[0]].classList.add("snake");
}
//snake is treated like an array, .push tail(snake) to add one after each apple eaten
function eatApple(grid, tail) {
    if (grid[currentSnake[0]].classList.contains("apple")) {
      grid[currentSnake[0]].classList.remove("apple");
      grid[tail].classList.add("snake");
      currentSnake.push(tail);
      applePosition(grid);
      score+=10; //increase score by 10
      scoreBoard.textContent = score; //input score to scoreboard displayed on html
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }

  //random apple placement along vertical axis using Math
  function applePosition(grid) {
      do {
          appleIndex = Math.floor(Math.random() * grid.length);
      } while (grid[appleIndex].classList.contains("snake"));
      grid[appleIndex].classList.add('apple');
  }

  function replay() {
      game.innerHTML= "";
      createBoard()
      userInput()
      scoreBoard.textContent = 0
  }

  //arrow buttons on screen
  const upBtn = document.getElementById('up');
  const downBtn = document.getElementById('down')
  const leftBtn = document.getElementById('left')
  const rightBtn = document.getElementById('right')

  upBtn.addEventListener('click', () => (direction = -width));
  downBtn.addEventListener('click', () => (direction = +width));
  leftBtn.addEventListener('click', () => (direction = -1));
  rightBtn.addEventListener('click', () => (direction = 1));

  //arrow keys functions linked to buttons

