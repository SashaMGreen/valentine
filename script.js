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

/* On Load */
window.onload = () => {
  fadeOverlay.style.opacity = "0";
};

/* Page Transition */
function goToPage(id) {
  fadeOverlay.style.opacity = "1";

  setTimeout(() => {
    pages.forEach(p => p.classList.remove("active"));

    const newPage = document.getElementById(id);
    newPage.classList.add("active");

    const video = newPage.querySelector(".bg-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.play().catch(err => console.log(err));
    }

    fadeOverlay.style.opacity = "0";
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

/* Record Player */
recordPlayer.addEventListener("click", () => {
  music.currentTime = 0;
  music.play().catch(err => console.log(err));
});

/* Typewriter Letter */
typewriter.addEventListener("click", (e) => {
  e.stopPropagation();
  letter.classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (!letter.contains(e.target) && e.target !== typewriter) {
    letter.classList.add("hidden");
  }
});

/* Bottle Logic */
bottle.addEventListener("click", (e) => {
  e.stopPropagation();
  bottleLetter.classList.remove("hidden");
});

bottleLetter.addEventListener("click", (e) => {
  e.stopPropagation();
  bottleLetter.classList.add("hidden");
  lettersRow.classList.remove("hidden");
});

/* Close letters if clicking outside */
document.addEventListener("click", (e) => {
  if (!lettersRow.contains(e.target) && e.target !== bottleLetter) {
    lettersRow.classList.add("hidden");
  }
});

/* Stack interaction */
stackLetters.forEach(letter => {
  letter.addEventListener("click", (e) => {
    e.stopPropagation();
    stackLetters.forEach(l => l.style.zIndex = 0);
    letter.style.zIndex = 10;
  });
});
