const fadeOverlay = document.getElementById("fadeOverlay");
const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");
const music = document.getElementById("bgMusic");

window.onload = () => {
  fadeOverlay.style.opacity = "0";

  if(localStorage.getItem("frame1") === "true") {
    document.querySelector(".frame1").classList.add("visited");
  }
  if(localStorage.getItem("frame2") === "true") {
    document.querySelector(".frame2").classList.add("visited");
  }

  if(localStorage.getItem("frame1") === "true" &&
     localStorage.getItem("frame2") === "true") {
      document.querySelector(".frame3").classList.add("glow");
  }
};

/* PAGE TRANSITION */
function goToPage(id) {
  fadeOverlay.style.opacity = "1";
  setTimeout(() => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    fadeOverlay.style.opacity = "0";
  }, 600);
}

/* FRAME CLICKS */
frames.forEach(frame => {
  frame.addEventListener("click", () => {
    goToPage(frame.dataset.target);
  });
});

/* CONTINUE BUTTONS */
document.querySelectorAll(".continue").forEach(btn => {
  btn.addEventListener("click", () => {
    goToPage("home");
  });
});

/* RECORD PLAYER */
const recordPlayer = document.getElementById("recordPlayer");
const pianoScrap = document.getElementById("pianoScrap");

recordPlayer.addEventListener("click", () => {
  if(!localStorage.getItem("musicStarted")) {
    music.play();
    localStorage.setItem("musicStarted", "true");
  }

  pianoScrap.classList.remove("hidden");
  document.querySelector("#recordPage .continue").classList.remove("hidden");

  localStorage.setItem("frame1", "true");
  document.querySelector(".frame1").classList.add("visited");
});

/* TYPEWRITER */
const typewriter = document.getElementById("typewriter");
const letter = document.getElementById("letter");

typewriter.addEventListener("click", () => {
  letter.classList.add("active");
  letter.classList.remove("hidden");

  document.querySelector("#typePage .continue").classList.remove("hidden");

  localStorage.setItem("frame2", "true");
  document.querySelector(".frame2").classList.add("visited");

  if(localStorage.getItem("frame1") === "true") {
    document.querySelector(".frame3").classList.add("glow");
  }
});
