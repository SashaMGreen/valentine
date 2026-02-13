const fadeOverlay = document.getElementById("fadeOverlay");
const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");
const music = document.getElementById("bgMusic");
const recordPlayer = document.getElementById("recordPlayer");
const typewriter = document.getElementById("typewriter");
const letter = document.getElementById("letter");

const bottle = document.getElementById("bottle");
const bottleLetter = document.getElementById("bottleLetter");
const lettersRow = document.getElementById("lettersRow");
const stackLetters = document.querySelectorAll(".stackLetter");

const finalContinue = document.getElementById("finalContinue");

const sashaImg = document.getElementById("sashaImg");
const nikkiImg = document.getElementById("nikkiImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const valentineTopText = document.getElementById("valentineTopText");

let visitedPages = new Set();
let noClicks = 0;

/* On Load */
window.onload = () => {
  fadeOverlay.style.opacity = "0";
};

/* Page Transition */
function goToPage(id) {
  fadeOverlay.style.opacity = "1";

  setTimeout(() => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    fadeOverlay.style.opacity = "0";

    if (id === "recordPage" || id === "typePage" || id === "thirdPage") {
      visitedPages.add(id);
      if (visitedPages.size === 3) {
        finalContinue.classList.remove("hidden");
      }
    }

  }, 600);
}

/* Frame Click */
frames.forEach(frame => {
  frame.addEventListener("click", () => {
    goToPage(frame.dataset.target);
  });
});

/* Continue Buttons */
document.querySelectorAll(".continue").forEach(btn => {
  btn.addEventListener("click", () => {
    goToPage("home");
  });
});

/* Final Continue */
finalContinue.addEventListener("click", () => {
  goToPage("valentinePage");
});

/* Record Player */
recordPlayer.addEventListener("click", () => {
  music.currentTime = 0;
  music.play();
});

/* Typewriter */
typewriter.addEventListener("click", (e) => {
  e.stopPropagation();
  letter.classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (!letter.contains(e.target) && e.target !== typewriter) {
    letter.classList.add("hidden");
  }
});

/* Bottle */
bottle.addEventListener("click", (e) => {
  e.stopPropagation();
  bottleLetter.classList.remove("hidden");
});

bottleLetter.addEventListener("click", (e) => {
  e.stopPropagation();
  bottleLetter.classList.add("hidden");
  lettersRow.classList.remove("hidden");
});

stackLetters.forEach(letter => {
  letter.addEventListener("click", (e) => {
    e.stopPropagation();
    stackLetters.forEach(l => l.style.zIndex = 0);
    letter.style.zIndex = 10;
  });
});

/* Valentine Logic */
noBtn.addEventListener("click", () => {
  noClicks++;

  if (noClicks === 1) {
    sashaImg.src = "assets/sasha-mad.png";
    nikkiImg.src = "assets/nikki-shocked.png";
  }

  if (noClicks >= 3) {
    sashaImg.src = "assets/sasha-cry.png";
  }
});

yesBtn.addEventListener("click", () => {
  sashaImg.src = "assets/sasha-tongue.png";
  nikkiImg.src = "assets/nikki-tongue.png";
  valentineTopText.innerText =
    "yayyyy! now we're officially each other's valentine :D";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";
});
