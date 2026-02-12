const fadeOverlay = document.getElementById("fadeOverlay");
const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");
const music = document.getElementById("bgMusic");

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

    // Restart background video
    const video = newPage.querySelector(".bg-video");
    if (video) {
      video.currentTime = 0;
      video.play();
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
const recordPlayer = document.getElementById("recordPlayer");
const pianoScrap = document.getElementById("pianoScrap");

recordPlayer.addEventListener("click", () => {
  music.play();
  pianoScrap.classList.remove("hidden");
});

/* Typewriter */
const typewriter = document.getElementById("typewriter");
const letter = document.getElementById("letter");

typewriter.addEventListener("click", () => {
  letter.classList.remove("hidden");
});
