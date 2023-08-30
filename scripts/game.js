const fieldElem = $(`<img src="../png/l${localStorage.level_p9}.png"/>`);
let traceLength = 0;
let time = 30;
let playing = true;

$(".balance").html(localStorage.balance_p9);
$(".level").html("Level " + localStorage.level_p9);

let gameInterval = initInterval();

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

const canvas = document.querySelector(".board");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

canvas.addEventListener("touchstart", (e) => {
  isPainting = true;
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
});

canvas.addEventListener("touchend", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("touchmove", draw);

function draw(e) {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
  ctx.stroke();
}

$(".game").on("touchstart", function (event) {
  const shineElem = $(`<img src="../png/shine${localStorage.selected_p9}.png" class="shine"/>`);
  shineElem.css({
    left: event.touches[0].pageX - $(this).offset().left - 40,
    top: event.touches[0].pageY - $(this).offset().top - 40
  });
  $(".game").append(shineElem);
});

$(".game").on("touchmove", function (event) {
  $(".shine").css({
    left: event.touches[0].pageX - $(this).offset().left - 40,
    top: event.touches[0].pageY - $(this).offset().top - 40
  });

  // const traceElem = $(`<div class="trace"></div>`);
  // traceElem.css({
  //   left: event.touches[0].pageX - $(this).offset().left - 5,
  //   top: event.touches[0].pageY - $(this).offset().top - 5
  // });
  // $(".game").append(traceElem);
  traceLength++;
});

$(".game").on("touchend", function (event) {
  $(".shine").remove();
});

$(".game").append(fieldElem);

$(".re").click(function () {
  if (time === 0) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  traceLength = 0;
  $(".trace").remove();

  time = 30;
  $(".time").html(30);

  clearInterval(gameInterval);
  gameInterval = initInterval();
});

$(".ok").click(function () {
  gameOver();
});

function gameOver() {
  playing = false;
  const win = traceLength > 300;
  if (win) {
    changeBalance(500);
    $(".modal .lose").remove();
  } else {
    $(".modal .win").remove();
  }
  $(".modal").removeClass("hidden");

  if (+localStorage.level_p9 === 5) {
    localStorage.level_p9 = 1;
  } else {
    localStorage.level_p9 = +localStorage.level_p9 + 1;
  }
}

function changeBalance(amount) {
  localStorage.balance_p9 = +localStorage.balance_p9 + amount;
  $(".balance").html(localStorage.balance_p9);
}

function initInterval() {
  return setInterval(() => {
    if (time === 0 || !playing) {
      clearInterval(gameInterval);
      gameOver();
      return;
    }
    time--;
    $(".time").html(time);
  }, 1000);
}
