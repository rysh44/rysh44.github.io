// Final.js

const slider = document.getElementById("slider");
const chosen = document.getElementById("chosen");
const actual = document.getElementById("actual");
const message = document.getElementById("message");
const confirmBtn = document.getElementById("confirmBtn");
const fakeFill = document.getElementById("fakeFill");
const box = document.querySelector(".box");
const trust = document.getElementById("trust");

let currentVolume = 50;
let trustScore = 100;
let pendingValue = null;
let lastMoveTime = Date.now();

let confirmedLock = false;
let pendingTimeouts = [];

message.textContent = "";
message.style.display = "none";

// ----------------------------
// MOVING BOX
// ----------------------------

let posX = 120;
let posY = 120;
let velocityX = 3.4;
let velocityY = 2.6;

function moveBox() {
  posX += velocityX;
  posY += velocityY;

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (posX <= 0) {
    posX = 0;
    velocityX *= -1;
  }

  if (posX + boxWidth >= screenWidth) {
    posX = screenWidth - boxWidth;
    velocityX *= -1;
  }

  if (posY <= 0) {
    posY = 0;
    velocityY *= -1;
  }

  if (posY + boxHeight >= screenHeight) {
    posY = screenHeight - boxHeight;
    velocityY *= -1;
  }

  box.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(moveBox);
}

box.style.left = "0px";
box.style.top = "0px";
box.style.position = "absolute";

moveBox();

// ----------------------------
// SLIDER CHAOS
// ----------------------------

slider.addEventListener("input", function () {
  confirmedLock = false;

  const value = Number(slider.value);
  chosen.textContent = value;

  const now = Date.now();
  const speed = now - lastMoveTime;
  lastMoveTime = now;

  if (speed < 80) {
    trustScore -= 10;

    if (trustScore < 0) {
      trustScore = 0;
    }

    trust.textContent = trustScore;

    if (Math.random() < 0.5) {
      currentVolume = 0;
    } else {
      currentVolume = 100;
    }

    actual.textContent = currentVolume;
  }

  fakeFill.style.width = "0%";
  let fakeProgress = 0;

  const fakeInterval = setInterval(() => {
    fakeProgress += Math.random() * 18;

    if (fakeProgress > 100) {
      fakeProgress = 100;
    }

    fakeFill.style.width = fakeProgress + "%";

    if (fakeProgress >= 100) {
      clearInterval(fakeInterval);
    }
  }, 350);

  pendingValue = value;

  const realDelay = Math.floor(Math.random() * 5) + 4;

  let finalValue = value;

  if (Math.random() < 0.3) {
    finalValue = 100 - value;
  }

  finalValue += Math.floor(Math.random() * 31) - 15;

  if (finalValue > 100) {
    finalValue = 100;
  }

  if (finalValue < 0) {
    finalValue = 0;
  }

  confirmBtn.style.opacity = "1";
  confirmBtn.style.pointerEvents = "auto";

  setTimeout(() => {
    confirmBtn.style.opacity = "0";
    confirmBtn.style.pointerEvents = "none";
  }, 1000);

  const timeoutId = setTimeout(() => {
    if (confirmedLock) {
      return;
    }

    if (Math.random() < 0.2) {
      return;
    }

    currentVolume = finalValue;
    actual.textContent = currentVolume;
  }, realDelay * 1000);

  pendingTimeouts.push(timeoutId);
});

// ----------------------------
// CONFIRM BUTTON
// ----------------------------

confirmBtn.addEventListener("click", function () {
  if (pendingValue === null) {
    return;
  }

  confirmedLock = true;

  pendingTimeouts.forEach(function (timeoutId) {
    clearTimeout(timeoutId);
  });

  pendingTimeouts = [];

  currentVolume = pendingValue;
  actual.textContent = currentVolume;
  chosen.textContent = pendingValue;

  confirmBtn.style.opacity = "0";
  confirmBtn.style.pointerEvents = "none";

  setTimeout(function () {
    confirmedLock = false;
  }, 2500);
});

// ----------------------------
// RANDOM VOLUME DRIFT
// ----------------------------

setInterval(() => {
  if (confirmedLock) {
    return;
  }

  const drift = Math.floor(Math.random() * 11) - 5;

  currentVolume += drift;

  if (currentVolume > 100) {
    currentVolume = 100;
  }

  if (currentVolume < 0) {
    currentVolume = 0;
  }

  actual.textContent = currentVolume;
}, 4000);

// ----------------------------
// RANDOM WHITEOUT FLASHES
// ----------------------------

function whiteoutScreen() {
  const flash = document.createElement("div");

  flash.style.position = "fixed";
  flash.style.top = "0";
  flash.style.left = "0";
  flash.style.width = "100vw";
  flash.style.height = "100vh";
  flash.style.backgroundColor = "white";
  flash.style.zIndex = "99999";
  flash.style.pointerEvents = "none";

  document.body.appendChild(flash);

  const duration = Math.random() * 700 + 250;

  setTimeout(() => {
    flash.remove();
  }, duration);
}

setInterval(() => {
  if (Math.random() < 0.28) {
    whiteoutScreen();
  }
}, 5500);