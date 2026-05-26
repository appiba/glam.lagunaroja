const homeScreen = document.getElementById("homeScreen");
const radiosScreen = document.getElementById("radiosScreen");
const playerScreen = document.getElementById("playerScreen");

const openRadiosBtn = document.getElementById("openRadiosBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const backRadiosBtn = document.getElementById("backRadiosBtn");

const radioCards = document.querySelectorAll(".radio-card[data-stream]");

const radioName = document.getElementById("radioName");
const coverImage = document.getElementById("coverImage");

const introVideoBox = document.getElementById("introVideoBox");
const introVideo = document.getElementById("introVideo");
const skipVideoBtn = document.getElementById("skipVideoBtn");

const playerCard = document.getElementById("playerCard");
const playBtn = document.getElementById("playBtn");
const bars = document.getElementById("bars");
const radioPlayer = document.getElementById("radioPlayer");

let isPlaying = false;

function goTo(screen){
  homeScreen.classList.remove("active");
  radiosScreen.classList.remove("active");
  playerScreen.classList.remove("active");
  screen.classList.add("active");
}

function stopAll(){
  radioPlayer.pause();
  introVideo.pause();

  isPlaying = false;
  playBtn.textContent = "▶";
  bars.classList.remove("active");
}

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

function showPlayer(){
  introVideo.pause();
  introVideo.currentTime = 0;

  introVideoBox.classList.add("hidden");
  playerCard.classList.remove("hidden");

  playRadio();
}

function openRadio(card){
  const name = card.dataset.name;
  const stream = card.dataset.stream;
  const image = card.dataset.image;
  const video = card.dataset.video;

  stopAll();

  radioName.textContent = name;
  coverImage.src = image;

  radioPlayer.src = stream;
  radioPlayer.load();

  goTo(playerScreen);

  if(video){
    playerCard.classList.add("hidden");
    introVideoBox.classList.remove("hidden");

    introVideo.src = video;
    introVideo.load();

    introVideo.play().catch(() => {
      showPlayer();
    });
  }else{
    introVideoBox.classList.add("hidden");
    playerCard.classList.remove("hidden");
    playRadio();
  }
}

openRadiosBtn.addEventListener("click", () => {
  goTo(radiosScreen);
});

backHomeBtn.addEventListener("click", () => {
  stopAll();
  goTo(homeScreen);
});

backRadiosBtn.addEventListener("click", () => {
  stopAll();
  goTo(radiosScreen);
});

radioCards.forEach(card => {
  card.addEventListener("click", () => {
    openRadio(card);
  });
});

skipVideoBtn.addEventListener("click", () => {
  showPlayer();
});

introVideo.addEventListener("ended", () => {
  showPlayer();
});

playBtn.addEventListener("click", async () => {
  if(isPlaying){
    radioPlayer.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
    bars.classList.remove("active");
  }else{
    await playRadio();
  }
});
