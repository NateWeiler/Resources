const frogger = document.getElementById('frogger')
let froggerY = 645;
frogger.style.top = froggerY + "px";
let froggerX = 325;
frogger.style.left = froggerX + "px";

function updateFroggerPosition() {
  frogger.style.left = froggerX + "px";
  frogger.style.top = froggerY + "px";
}
let ridingSprite = "";
document.getElementById('finalFrog1').style.display = "none";
document.getElementById('finalFrog2').style.display = "none";
document.getElementById('finalFrog3').style.display = "none";
document.getElementById('finalFrog4').style.display = "none";
document.getElementById('finalFrog5').style.display = "none";

function range(x, y, z) {
  result = [];
  if (x < y) {
    for (; x <= y; x++) {
      if (z != undefined) {
        if (x % z == 0) {
          result.push(x)
        }
      } else {
        result.push(x)
      }
    }

  } else {
    for (; y <= x; y++) {
      if (z != undefined) {
        if (y % z == 0) {
          result.push(y)
        }
      } else {
        result.push(y)
      }
    }
  }
  if (z < 0) {
    result.reverse()
  }
  return result;
}



window.addEventListener("keydown", event => {
  let button = event.key;
  switch (button) {
    case "w":
      frogger.style.transform = "rotate(180deg)"
      if (froggerY > 0) {
        ridingSprite = "";
        froggerY = froggerY - 50;
        addScore(10)
        updateFroggerPosition()
        checkFrogger()
        checkLogCollision()
        checkWaterCollision()
        break;
      }
      break;

    case "a":
      frogger.style.transform = "rotate(90deg)"
      if (froggerX > 25) {
        ridingSprite = "";
        froggerX = froggerX - 75;
        updateFroggerPosition()
        checkFrogger()
        checkWaterCollision()

      }
      break;
    case "s":
      frogger.style.transform = "rotate(0deg)"
      if (froggerY < 645) {
        ridingSprite = "";
        froggerY = froggerY + 50;
        updateFroggerPosition()
        checkFrogger()
        checkLogCollision()
        checkWaterCollision()
        break
      }

      break;
    case "d":
      frogger.style.transform = "rotate(270deg)"
      if (froggerX < 625) {
        ridingSprite = "";
        froggerX = froggerX + 75;
        updateFroggerPosition()
        checkFrogger()
        checkWaterCollision()


        break
      }
      break;
  }

});
let timeleft = 19;

function timer() {

  let timer = setInterval(function() {

    document.getElementById("second").innerHTML = "Sec: " + timeleft;
    if (stopTimer == false) {
      timeleft -= 1;
      if (timeleft <= 0) {
        death()
        timeleft = 19
      }
    }

  }, 1000);
}

function rightToLeftAnimation(className, speed, spaceBetweenSprites) {
  let elem = document.getElementsByClassName(className);
  for (let i = 0; i < elem.length; i++) {
    sprite = elem[i]
    start = 700 - (i * spaceBetweenSprites);
    animation(sprite, start, speed)
  }
}

function animation(sprite, start, speed) {
  sprite.style.left = start + 'px';
  let pos = parseInt(sprite.style.left, 10);
  let id = setInterval(frame, speed);


  function frame() {
    if (stopAnimation) {
      clearInterval(id)
    }

    pos--;
    sprite.style.left = pos + "px";


    if (parseInt(sprite.style.left, 10) >= parseInt(frogger.style.left, 10) - parseInt(getComputedStyle(sprite).width, 10) && parseInt(sprite.style.left) <= parseInt(frogger.style.left, 10) + parseInt(getComputedStyle(sprite).width, 10) / 2 && parseInt(getComputedStyle(sprite).top, 10) == froggerY + 5) {
      death()
    }

    if (pos == -parseInt((getComputedStyle(sprite).width), 10)) {
      pos = 700;
    }
  }
}

function leftToRightAnimation(className, speed, spaceBetweenSprites) {
  let elem = document.getElementsByClassName(className);
  for (let i = 0; i < elem.length; i++) {
    sprite = elem[i]
    start = 0 + (i * spaceBetweenSprites);
    reverseAnimation(sprite, start, speed)
  }
}

function reverseAnimation(sprite, start, speed) {
  sprite.style.left = start + 'px';
  let pos = parseInt(sprite.style.left, 10);
  let id = setInterval(frame, speed);


  function frame() {
    if (stopAnimation) {
      clearInterval(id)
    }
    pos++;
    sprite.style.left = pos + "px";

    if (parseInt(sprite.style.left, 10) >= parseInt(frogger.style.left, 10) - parseInt(getComputedStyle(sprite).width, 10) + 10 && parseInt(sprite.style.left) <= parseInt(frogger.style.left, 10) + parseInt(getComputedStyle(sprite).width, 10) - 10 && parseInt(getComputedStyle(sprite).top, 10) == froggerY + 5) {
      death()
    }
    if (pos == 700) {
      pos = -parseInt((getComputedStyle(sprite).width));
    }
  }
}

let topPos = "45px";
let next = [range(5, 40), range(145, 205), range(295, 340), range(455, 505), range(600, 645)]
let winPos = []


//froggerY
function checkFrogger() {
  if (froggerY == 45) {
    let check = 0
    for (let i = 0; i < next.length; i++) {
      if (next[i].includes(froggerX)) {
        winPos.push(next[i])
        next.splice(i, 1)
        addScore(50 * timeleft)
        if (range(5, 40).includes(froggerX)) {
          document.getElementById('finalFrog1').style.display = "block";
        } else if (range(145, 205).includes(froggerX)) {
          document.getElementById('finalFrog2').style.display = "block";
        } else if (range(295, 340).includes(froggerX)) {
          document.getElementById('finalFrog3').style.display = "block";
        } else if (range(455, 505).includes(froggerX)) {
          document.getElementById('finalFrog4').style.display = "block";
        } else if (range(600, 645).includes(froggerX)) {
          document.getElementById('finalFrog5').style.display = "block";
        }

        froggerY = 645;
        frogger.style.top = froggerY + "px";
        froggerX = 325;
        frogger.style.left = froggerX + "px";
        timeleft = 20;
        break;
      } else {

        check++;
      }
      if (check == next.length) {
        death()
      }
    }
  }
  if (next.length == 0) {
    console.log('stage cleared')
    stageClear()
  }

}






function LogFloatLeftToRight(sprite, speed) {
  let pos = parseInt(frogger.style.left, 10)
  let id = setInterval(frame, speed);



  function frame() {
    let pos = parseInt(frogger.style.left, 10)
    pos++;
    froggerX = pos;
    updateFroggerPosition();
    if (froggerX == 650) {
      death()
      updateFroggerPosition()
    } else if (parseInt(getComputedStyle(sprite).top, 10) != froggerY - 5) {
      if (froggerY == 645) {
        clearInterval(id)
        froggerX = 325
      }
      clearInterval(id)
      updateFroggerPosition()
    }
  }
}


function LogFloatRightToLeft(sprite, speed) {
  let id = setInterval(frame, speed);
  let pos = parseInt(frogger.style.left, 10)


  function frame() {
    let pos = parseInt(frogger.style.left, 10)
    pos--;
    froggerX = pos;
    updateFroggerPosition();
    if (froggerX == 0) {
      clearInterval(id)
      death()
    } else if (parseInt(getComputedStyle(sprite).top, 10) != froggerY - 5) {
      if (froggerY == 645) {
        froggerX = 325
      }
      clearInterval(id)
      updateFroggerPosition()
    }
  }
}

function checkLogCollision() {
  let elem = document.getElementsByClassName("float")
  for (let i = 0; i < elem.length; i++) {
    sprite = elem[i]


    if (parseInt(frogger.style.left, 10) >= (parseInt(sprite.style.left, 10) - 5) && parseInt(frogger.style.left, 10) <= (parseInt(sprite.style.left) + parseInt(getComputedStyle(sprite).width, 10)) && parseInt(getComputedStyle(sprite).top, 10) == froggerY - 5) {
      ridingSprite = sprite;
      if (sprite.className.includes("longLog") || sprite.className.includes("twoturtles") || sprite.className.includes("mediumLog")) {

        if (sprite.className.includes("twoturtles")) {

          LogFloatRightToLeft(sprite, turtleSpeed)
        } else {

          LogFloatRightToLeft(sprite, logSpeed)
        }
        console.log('going left')

      } else {
        if (sprite.className.includes("threeturtles")) {
          LogFloatLeftToRight(sprite, turtleSpeed)
        } else {
          LogFloatLeftToRight(sprite, logSpeed)
        }
        console.log('going right')
      }

    }
  }
}


function checkWaterCollision() {
  let elem = document.getElementsByClassName("float")
  for (let i = 0; i < elem.length; i++) {
    sprite = elem[i]
    if (parseInt(frogger.style.left, 10) >= (parseInt(sprite.style.left, 10) - 5) && parseInt(frogger.style.left, 10) <= (parseInt(sprite.style.left) + parseInt(getComputedStyle(sprite).width, 10)) && parseInt(getComputedStyle(sprite).top, 10) == froggerY - 5) {
      ridingSprite = sprite;
    }
  }
  if (45 < froggerY && froggerY < 345) {
    console.log("in da water")
    console.log(froggerY)
    if (ridingSprite == "") {
      death();
    }
  }

}




function death() {
  lives--;
  document.getElementById("lives").innerHTML = "LIVES: " + lives;
  timeleft = 20;
  if (lives == 0) {
    document.getElementById('gameOver').style.display = "block";
    stopAnimation = true
    stopTimer = true;
    document.getElementById('frogger').style.display = "none";
    document.getElementById('continue').style.display = "block";

  }
  froggerY = 645;
  froggerX = 325;
  updateFroggerPosition()
}
let counter = 1;
let newLife = 8500

function addScore(amount) {
  score = score + amount;
  if (score >= newLife * counter) {
    lives = lives + 1;
    counter++;
    document.getElementById("lives").innerHTML = "LIVES: " + lives;
  }
  document.getElementById("score").innerHTML = "Score: " + score;
}

let stopAnimation = false;
let lives = 3;
let world = 1;
let stage = 1;
let score = 0;
let turtleSpeed = 7;
let logSpeed = 10;
let firetruckSpeed = 25;
let copCarSpeed = 10;
let slowCarSpeed = 25;
let slowCar2Speed = 20;
let largeTruckSpeed = 25;
document.getElementById("second").innerHTML = "Sec: " + 20;
document.getElementById("lives").innerHTML = "LIVES: " + lives;
document.getElementById("stage").innerHTML = "STAGE: " + world + " - " + stage;
document.getElementById("score").innerHTML = "Score: " + score;



function RESET() {
  document.getElementById('reset').style.display = "none";
  document.getElementById('finalFrog1').style.display = "none";
  document.getElementById('finalFrog2').style.display = "none";
  document.getElementById('finalFrog3').style.display = "none";
  document.getElementById('finalFrog4').style.display = "none";
  document.getElementById('finalFrog5').style.display = "none";
  document.getElementById("stage").innerHTML = "STAGE: " + world + " - " + stage;

  timeleft = 20;
  stopAnimation = false;
  leftToRightAnimation("slowCar2", slowCar2Speed, 250);
  rightToLeftAnimation("largeTruck", largeTruckSpeed, 350);
  rightToLeftAnimation("slowCar", slowCarSpeed, 250);
  leftToRightAnimation("copCar", copCarSpeed, 500);
  rightToLeftAnimation("fireTruck", firetruckSpeed, 500);
  rightToLeftAnimation("longLog", logSpeed, 500);
  leftToRightAnimation("smallLog", logSpeed, 250);
  rightToLeftAnimation("mediumLog", logSpeed, 300);
  leftToRightAnimation("threeturtles", turtleSpeed, 450);
  rightToLeftAnimation("twoturtles", turtleSpeed, 450);
}

function stageClear() {
  document.getElementById('reset').style.display = "block";
  stopAnimation = true;
  stage++;
  updateFroggerPosition()
  if (stage % 4 == 0) {
    stage = 1;
    world++;
    if (world == 2) {
      document.getElementById("background").src = "images/swamp.jpg"
      document.body.style.backgroundColor = "rgb(169,100,22)" //R: 169 G: 100 B: 22
      //#a96416
    } else {
      document.getElementById("background").src = "images/finalWorld.jpg"
      document.body.style.backgroundColor = "rgb(112,112,115)" //R: 112 G: 112 B: 115
      //background color #707073
    }
  }
  addScore(1000)
  froggerY = 645;
  froggerX = 325;
  topPos = "45px";
  next = [range(5, 40), range(145, 205), range(295, 340), range(455, 505), range(600, 645)]
  winPos = []

  turtleSpeed-- //= 7;
  logSpeed-- //= 10;
  firetruckSpeed = 4; //= 25;
  copCarSpeed-- //= 10;
  slowCarSpeed = slowCarSpeed - 2 //= 25;
  slowCar2Speed = slowCar2Speed - 2 //= 20;
  largeTruckSpeed = largeTruckSpeed - 2 //= 25;
}

function gameOver() {
  window.location.reload();
}

function continueGame() {

  document.getElementById('finalFrog1').style.display = "none";
  document.getElementById('finalFrog2').style.display = "none";
  document.getElementById('finalFrog3').style.display = "none";
  document.getElementById('finalFrog4').style.display = "none";
  document.getElementById('finalFrog5').style.display = "none";
  document.getElementById('frogger').style.display = "block";
  lives = 3;
  counter = 1;
  froggerY = 645;
  froggerX = 325;
  topPos = "45px";
  next = [range(5, 40), range(145, 205), range(295, 340), range(455, 505), range(600, 645)]
  winPos = []
  stopAnimation = false;
  stopTimer = false
  updateFroggerPosition()
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("lives").innerHTML = "LIVES: " + lives;
  document.getElementById('reset').style.display = "none";
  document.getElementById('gameOver').style.display = "none";
  document.getElementById('continue').style.display = "none";
  leftToRightAnimation("slowCar2", slowCar2Speed, 250);
  rightToLeftAnimation("largeTruck", largeTruckSpeed, 350);
  rightToLeftAnimation("slowCar", slowCarSpeed, 250);
  leftToRightAnimation("copCar", copCarSpeed, 500);
  rightToLeftAnimation("fireTruck", firetruckSpeed, 500);
  rightToLeftAnimation("longLog", logSpeed, 500);
  leftToRightAnimation("smallLog", logSpeed, 250);
  rightToLeftAnimation("mediumLog", logSpeed, 300);
  leftToRightAnimation("threeturtles", turtleSpeed, 450);
  rightToLeftAnimation("twoturtles", turtleSpeed, 450);
}
//document.getElementById("imageid").src="../template/save.png";
let stopTimer = true

function startGame() {
  let gameElements = document.getElementById("gameElements")
  let children = gameElements.children;
  for (let i = 0; i < children.length; i++) {
    let sprite = children[i]
    console.log(children[i])
    console.log(children[i].style.display = 'block')
  }
  stopTimer = false

  document.getElementById('finalFrog1').style.display = "none";
  document.getElementById('finalFrog2').style.display = "none";
  document.getElementById('finalFrog3').style.display = "none";
  document.getElementById('finalFrog4').style.display = "none";
  document.getElementById('finalFrog5').style.display = "none";
  document.getElementById('start').style.display = "none";
  document.getElementById("background").src = "images/frogger_background";






  timer();
  leftToRightAnimation("slowCar2", slowCar2Speed, 250);
  rightToLeftAnimation("largeTruck", largeTruckSpeed, 350);
  rightToLeftAnimation("slowCar", slowCarSpeed, 250);
  leftToRightAnimation("copCar", copCarSpeed, 500);
  rightToLeftAnimation("fireTruck", firetruckSpeed, 500);
  rightToLeftAnimation("longLog", logSpeed, 500);
  leftToRightAnimation("smallLog", logSpeed, 250);
  rightToLeftAnimation("mediumLog", logSpeed, 300);
  leftToRightAnimation("threeturtles", turtleSpeed, 450);
  rightToLeftAnimation("twoturtles", turtleSpeed, 450);

}
let gameElements = document.getElementById("gameElements")

let children = gameElements.children;

for (let i = 0; i < children.length; i++) {
  let sprite = children[i]
  console.log(children[i])
  console.log(children[i].style.display = 'none')
}

document.getElementById('reset').style.display = "none";
document.getElementById('gameOver').style.display = "none";
document.getElementById('continue').style.display = "none";
document.getElementById("background").src = "images/giphy.gif"