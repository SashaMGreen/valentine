/* DOM refs */
const fadeOverlay = document.getElementById("fadeOverlay");
const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");

const music = document.getElementById("bgMusic");

/* page-specific */
const recordPlayer = document.getElementById("recordPlayer");
const typewriter = document.getElementById("typewriter");
const letter-paper = document.getElementById("letter-paper");

const bottle = document.getElementById("bottle");
const bottleLetter = document.getElementById("bottleLetter");
const lettersRow = document.getElementById("lettersRow");
const stackLetters = document.querySelectorAll(".stackLetter");

const finalContinue = document.getElementById("finalContinue");

/* valentine */
const sashaImg = document.getElementById("sashaImg");
const nikkiImg = document.getElementById("nikkiImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const valentineTopText = document.getElementById("valentineTopText");

/* state */
let visitedPages = new Set();
let bottleStage = 0; // 0 initial, 1 centered, 2 bottleLetter visible, 3 lettersRow visible
let noClicks = 0;

/* on load */
window.onload = () => {
  fadeOverlay.style.opacity = "0";
  // show home by default
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("home").classList.add("active");
};

/* page transition helper */
function goToPage(id) {
  fadeOverlay.style.opacity = "1";

  setTimeout(() => {
    // pause and reset videos on the pages we are leaving
    pages.forEach(p => {
      p.classList.remove("active");
      const vid = p.querySelector("video");
      if (vid) {
        try { vid.pause(); vid.currentTime = 0; } catch (e) { /* ignore */ }
      }
    });

    const newPage = document.getElementById(id);
    newPage.classList.add("active");

    // play new page video if it exists
    const newVideo = newPage.querySelector("video");
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(e => {
        // autoplay might be blocked until user interacts; that's fine
        // console.warn("video play blocked", e);
      });
    }

    fadeOverlay.style.opacity = "0";

    // track visited content pages to reveal finalContinue
    if (id === "recordPage" || id === "typePage" || id === "thirdPage") {
      visitedPages.add(id);
      if (visitedPages.size === 3) {
        finalContinue.classList.remove("hidden");
      }
    }
  }, 600);
}

/* frame click -> page */
frames.forEach(frame => {
  frame.addEventListener("click", () => {
    const target = frame.dataset.target;
    if (target) goToPage(target);
  });
});

/* Continue buttons in pages go back to home */
document.querySelectorAll(".continue").forEach(btn => {
  btn.addEventListener("click", () => {
    goToPage("home");
  });
});

/* finalContinue -> valentinePage */
if (finalContinue) {
  finalContinue.addEventListener("click", () => {
    goToPage("valentinePage");
  });
}

/* ---------------- RECORD PLAYER ---------------- */
/* clicking the record player starts music (user gesture) and it persists */
if (recordPlayer) {
  recordPlayer.addEventListener("click", (e) => {
    e.stopPropagation();
    try {
      music.currentTime = 0;
      music.play();
    } catch (err) {
      console.log("Audio play error:", err);
    }
  });
}

/* ---------------- TYPEWRITER / LETTER ---------------- */
/* clicking typewriter shows letter centered above everything */
if (typewriter && letter-paper) {
  typewriter.addEventListener("click", (e) => {
    e.stopPropagation();
    letter.classList.remove("hidden");
    letter.style.display = "block"; // ensure visible
    letter.style.zIndex = 20;
  });

  // click outside to hide letter
  document.addEventListener("click", (e) => {
    if (!letter.contains(e.target) && e.target !== typewriter) {
      letter.classList.add("hidden");
      letter.style.display = "none";
    }
  });
}

/* ---------------- BOTTLE GAME ---------------- */
if (bottle) {
  bottle.addEventListener("click", (e) => {
    e.stopPropagation();
    // stage 0 -> 1: center and enlarge
    if (bottleStage === 0) {
      bottle.classList.add("center");
      bottleStage = 1;
      // update caption text
      const caption = document.getElementById("thirdCaption");
      if (caption) caption.innerText = "Oh, look! Letters! perhaps we should open the bottle?";
    }
    // stage 1 -> 2: replace with bottle-letter
    else if (bottleStage === 1) {
      bottle.style.display = "none";
      bottleLetter.classList.remove("hidden");
      bottleLetter.style.display = "block";
      bottleStage = 2;
      const caption = document.getElementById("thirdCaption");
      if (caption) caption.innerText = "They seem to be addressed to you... so maybe you should open the letters?";
    }
  });
}

/* clicking bottle letter -> show stacked letters */
if (bottleLetter) {
  bottleLetter.addEventListener("click", (e) => {
    e.stopPropagation();
    bottleLetter.classList.add("hidden");
    bottleLetter.style.display = "none";
    lettersRow.classList.remove("hidden");
    // ensure visible
    lettersRow.style.display = "flex";
    bottleStage = 3;
  });
}

/* click outside with letters open hides them (user-friendly) */
document.addEventListener("click", (e) => {
  if (lettersRow && !lettersRow.contains(e.target) && e.target !== bottleLetter && e.target !== bottle) {
    lettersRow.classList.add("hidden");
    lettersRow.style.display = "none";
  }
});

/* letter stacking/flipping: clicking a letter brings it to front */
stackLetters.forEach((ltr, idx) => {
  ltr.addEventListener("click", (e) => {
    e.stopPropagation();
    stackLetters.forEach(l => l.style.zIndex = 0);
    ltr.style.zIndex = 10;
  });
});

/* ---------------- VALENTINE PAGE ---------------- */
/* yes / no behaviour */
if (noBtn) {
  noBtn.addEventListener("click", () => {
    noClicks++;
    if (noClicks === 1) {
      sashaImg.src = "assets/sasha-mad.png";
      nikkiImg.src = "assets/nikki-shocked.png";
    } else if (noClicks >= 3) {
      sashaImg.src = "assets/sasha-cry.png";
    }
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    sashaImg.src = "assets/sasha-tongue.png";
    nikkiImg.src = "assets/nikki-tongue.png";
    valentineTopText.innerText = "yayyyy! now we're officially each other's valentine :D";
    // hide buttons after yes
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  });
}

