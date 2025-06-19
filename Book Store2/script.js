const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreElement = document.getElementById("score");

let playerPos = 135;
let score = 0;
let fallSpeed = 5;

// حركة اللاعب
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 10;
  } else if (e.key === "ArrowRight" && playerPos < 270) {
    playerPos += 10;
  }
  player.style.left = playerPos + "px";
});

// إنشاء العقبات
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = Math.floor(Math.random() * 270) + "px";
  game.appendChild(obstacle);

  let posY = 0;

  const move = setInterval(() => {
    posY += fallSpeed;
    obstacle.style.top = posY + "px";

    // التصادم
    if (
      posY > 360 &&
      posY < 400 &&
      Math.abs(parseInt(obstacle.style.left) - playerPos) < 30
    ) {
      clearInterval(move);
      alert("انتهت اللعبة! نقاطك: " + score);
      location.reload();
    }

    // نجح اللاعب بتفادي العقبة
    if (posY > 400) {
      clearInterval(move);
      obstacle.remove();
      score++;
      scoreElement.innerText = "النقاط: " + score;
    }
  }, 30);
}

// إنشاء العقبات بشكل مستمر
setInterval(createObstacle, 1000);

// زيادة تدريجية للسرعة
setInterval(() => {
  if (fallSpeed < 15) fallSpeed += 0.5;
}, 5000);