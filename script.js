const pages = document.querySelectorAll(".page");
const frames = document.querySelectorAll(".frame");
const homeContinue = document.getElementById("homeContinue");
const music = document.getElementById("bgMusic");

let clickedFrames = 0;

/* PAGE SWITCH */
function showPage(id){
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome(){
  showPage("home");
}

/* HOME FRAMES */
frames.forEach((frame, index) => {
  frame.addEventListener("click", () => {
    clickedFrames++;

    if(index === 0) showPage("recordPage");
    if(index === 1) showPage("typePage");
    if(index === 2) showPage("bottlePage");

    if(clickedFrames >= 3){
      homeContinue.classList.remove("hidden");
    }
  });
});

homeContinue.addEventListener("click", () => {
  showPage("valentinePage");
});

/* MUSIC (keeps playing because no reload happens) */
document.getElementById("recordPlayer")
.addEventListener("click", () => {
  music.play();
});

/* TYPEWRITER */
const typewriter = document.getElementById("typewriter");
const letter = document.getElementById("letter");

typewriter.addEventListener("click", () => {
  letter.classList.toggle("hidden");
});

/* BOTTLE GAME */
const bottle = document.getElementById("bottleGameImg");
const caption = document.getElementById("gameCaption");
const singleLetter = document.getElementById("singleLetter");
const lettersRow = document.getElementById("lettersRow");

let bottleStage = 0;

bottle.addEventListener("click", () => {

  if(bottleStage === 0){
    bottle.classList.remove("small-left");
    bottle.classList.add("center-large");
    caption.innerText =
      "Wow, looks like I left something in there... do you want to take a peek?";
    bottleStage = 1;
  }
  else if(bottleStage === 1){
    bottle.style.display = "none";
    singleLetter.classList.remove("hidden");
    caption.innerText =
      "Letters! They're actually addressed to you...";
    bottleStage = 2;
  }
});

singleLetter.addEventListener("click", () => {
  singleLetter.classList.add("hidden");
  lettersRow.classList.remove("hidden");
});

/* VALENTINE PAGE LOGIC */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sashaImg = document.getElementById("sashaImg");
const nikkiImg = document.getElementById("nikkiImg");
const finalMessage = document.getElementById("finalMessage");

let noCount = 0;

noBtn.addEventListener("click", () => {
  noCount++;

  if(noCount === 1){
    sashaImg.src =
    "https://64.media.tumblr.com/b90d565d98719c5bc5307028d2e32dcc/1b35f3673290b7c1-43/s500x750/3018a320352a8b959d9eaa4daf7f29c3fa3600c4.pnj";

    nikkiImg.src =
    "https://64.media.tumblr.com/76b51cc900a63363fa67f2e6fa41ecd8/1b35f3673290b7c1-ba/s400x600/329aadc1df1460c90a38bea32d18b48ce460efe3.pnj";
  }

  if(noCount >= 3){
    sashaImg.src =
    "https://64.media.tumblr.com/57472aeae7b6a45b81a7d9b846b8ee0b/1b35f3673290b7c1-4f/s400x600/d7057a7b051e50a7c17ce147d90ee9d7698f7430.pnj";
  }
});

yesBtn.addEventListener("click", () => {

  sashaImg.src =
  "https://64.media.tumblr.com/7085a53511be14de384795424d071785/1b35f3673290b7c1-20/s400x600/fba51ba32fbd1b69460b774ca17f473b67c73a57.pnj";

  nikkiImg.src =
  "https://64.media.tumblr.com/6cecd736eb1b7bf20f95e0ce4aa014e7/1b35f3673290b7c1-2b/s250x400/0acaf50da5f9519f13139876e5c36941446cdd90.pnj";

  finalMessage.classList.remove("hidden");
});
