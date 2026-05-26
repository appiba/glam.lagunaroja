const homeScreen =
document.getElementById("homeScreen");

const radioScreen =
document.getElementById("radioScreen");

const enterRadiosBtn =
document.getElementById("enterRadiosBtn");

const backBtn =
document.getElementById("backBtn");

const playBtn =
document.getElementById("playBtn");

const radioPlayer =
document.getElementById("radioPlayer");

const bars =
document.getElementById("bars");

const radioName =
document.getElementById("radioName");

const coverImage =
document.getElementById("coverImage");

const radioCards =
document.querySelectorAll(".radio-card");

const introVideoBox =
document.getElementById("introVideoBox");

const introVideo =
document.getElementById("introVideo");

const skipVideoBtn =
document.getElementById("skipVideoBtn");

const playerCard =
document.getElementById("playerCard");

let isPlaying = false;

/* STOP RADIO */

function stopRadio(){

  radioPlayer.pause();

  isPlaying = false;

  playBtn.textContent = "▶";

  bars.classList.remove("active");
}

/* PLAY RADIO */

async function playRadio(){

  try{

    await radioPlayer.play();

    isPlaying = true;

    playBtn.textContent = "❚❚";

    bars.classList.add("active");

  }catch(error){

    isPlaying = false;

    playBtn.textContent = "▶";

    bars.classList.remove("active");
  }
}

/* SHOW PLAYER */

function showPlayer(){

  introVideo.pause();

  introVideo.currentTime = 0;

  introVideoBox.classList.add("hidden");

  playerCard.classList.remove("hidden");

  playRadio();
}

/* INTRO VIDEO */

function showIntroVideo(videoSrc){

  stopRadio();

  if(!videoSrc){

    introVideoBox.classList.add("hidden");

    playerCard.classList.remove("hidden");

    return;
  }

  playerCard.classList.add("hidden");

  introVideoBox.classList.remove("hidden");

  introVideo.src = videoSrc;

  introVideo.load();

  introVideo.play().catch(() => {

    showPlayer();

  });
}

/* ENTER RADIOS */

enterRadiosBtn.addEventListener("click", () => {

  homeScreen.classList.remove("active");

  radioScreen.classList.add("active");

  const activeCard =
  document.querySelector(".radio-card.active-radio");

  showIntroVideo(activeCard.dataset.video);
});

/* BACK */

backBtn.addEventListener("click", () => {

  stopRadio();

  introVideo.pause();

  introVideo.currentTime = 0;

  radioScreen.classList.remove("active");

  homeScreen.classList.add("active");
});

/* PLAY BUTTON */

playBtn.addEventListener("click", async () => {

  if(!isPlaying){

    await playRadio();

  }else{

    stopRadio();
  }
});

/* SKIP VIDEO */

skipVideoBtn.addEventListener("click", showPlayer);

/* VIDEO ENDED */

introVideo.addEventListener("ended", showPlayer);

/* CHANGE RADIO */

radioCards.forEach(card => {

  card.addEventListener("click", () => {

    const name =
    card.dataset.name;

    const stream =
    card.dataset.stream;

    const image =
    card.dataset.image;

    const video =
    card.dataset.video;

    radioCards.forEach(item => {

      item.classList.remove("active-radio");

    });

    card.classList.add("active-radio");

    radioName.textContent = name;

    coverImage.src = image;

    radioPlayer.pause();

    radioPlayer.src = stream;

    radioPlayer.load();

    showIntroVideo(video);

  });

});
