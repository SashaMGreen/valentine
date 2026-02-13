const fadeOverlay = document.getElementById("fadeOverlay");
const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");
const music = document.getElementById("bgMusic");
const recordPlayer = document.getElementById("recordPlayer");
const pianoScrap = document.getElementById("pianoScrap");
const typewriter = document.getElementById("typewriter");
const letter = document.getElementById("letter");

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
      video.play().catch(err => console.log("Video error:", err));
    }

    fadeOverlay.style.opacity = "0";
  }, 600);
}

/* Frame Clicks */
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

/* Freeze Videos on Last Frame */
document.querySelectorAll(".bg-video").forEach(video => {
  video.addEventListener("ended", () => {
    video.pause();
  });
});

/* Record Player */
recordPlayer.addEventListener("click", () => {

  pianoScrap.classList.remove("hidden");

  music.currentTime = 0;
  music.play().catch(error => {
    console.log("Music failed:", error);
  });

});




/* THIRD PAGE LOGIC */

const bottle = document.getElementById("bottle");
const bottleLetter = document.getElementById("bottleLetter");
const thirdCaption = document.getElementById("thirdCaption");
const lettersRow = document.getElementById("lettersRow");
const stackLetters = document.querySelectorAll(".stackLetter");

let bottleStage = 0;

bottle.addEventListener("click", () => {

  if(bottleStage === 0) {
    bottle.classList.add("center");
    thirdCaption.innerText = "Open the bottle!";
    bottleStage = 1;
  }
  else if(bottleStage === 1) {
    bottle.style.opacity = "0";
    setTimeout(() => {
      bottle.classList.add("hidden");
      bottleLetter.classList.remove("hidden");
      thirdCaption.innerText = "Open the letters.";
      bottleStage = 2;
    }, 600);
  }
});

bottleLetter.addEventListener("click", () => {
  bottleLetter.classList.add("hidden");
  lettersRow.classList.remove("hidden");
});

/* LETTER STACK INTERACTION */

stackLetters.forEach(letter => {
  letter.addEventListener("click", () => {
    stackLetters.forEach(l => l.style.zIndex = 0);
    letter.style.zIndex = 10;
  });
});

/* Typewriter */
typewriter.addEventListener("click", () => {
  letter.classList.remove("hidden");
});

