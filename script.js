const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreElement = document.getElementById("score");

let playerPos = 135;
let score = 0;
let fallSpeed = 5;

// ✅ حركة الأسهم (كيبورد)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 10;
  } else if (e.key === "ArrowRight" && playerPos < 270) {
    playerPos += 10;
  }
  player.style.left = playerPos + "px";
});

// ✅ دعم السحب (بالماوس أو التاتش)
let isDragging = false;

player.addEventListener("mousedown", startDrag);
player.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function startDrag(e) {
  isDragging = true;
  e.preventDefault();
}

function stopDrag() {
  isDragging = false;
}

function drag(e) {
  if (!isDragging) return;

  let clientX = e.clientX || (e.touches && e.touches[0].clientX);
  let gameRect = game.getBoundingClientRect();

  let newLeft = clientX - gameRect.left - player.offsetWidth / 2;

  // تحديد الحد المسموح
  newLeft = Math.max(0, Math.min(newLeft, game.offsetWidth - player.offsetWidth));

  player.style.left = newLeft + "px";
  playerPos = newLeft; // لتحديث موضع اللاعب
}

// ✅ إنشاء العقبات
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = Math.floor(Math.random() * 270) + "px";
  game.appendChild(obstacle);

  let posY = 0;
  const move = setInterval(() => {
    posY += fallSpeed;
    obstacle.style.top = posY + "px";

    const playerLeft = parseInt(player.style.left);

    // التصادم
    if (
      posY > 360 &&
      posY < 400 &&
      Math.abs(parseInt(obstacle.style.left) - playerLeft) < 30
    ) {
      clearInterval(move);
      alert("انتهت اللعبة! نقاطك: " + score);
      location.reload();
    }

    // اجتاز العقبة
    if (posY > 400) {
      clearInterval(move);
      obstacle.remove();
      score++;
      scoreElement.innerText = "النقاط: " + score;
    }
  }, 30);
}

// إنشاء العقبات
setInterval(createObstacle, 1000);

// زيادة السرعة تدريجيًا
setInterval(() => {
  if (fallSpeed < 15) fallSpeed += 0.5;
}, 5000);
