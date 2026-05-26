const playBtn = document.getElementById("playBtn");
const radioPlayer = document.getElementById("radioPlayer");
const musicBars = document.getElementById("musicBars");

const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const heroCover = document.getElementById("heroCover");

const radioCards = document.querySelectorAll(".radio-card");

let isPlaying = false;

/* PLAY BUTTON */

playBtn.addEventListener("click", async () => {

  try{

    if(!isPlaying){

      await radioPlayer.play();

      isPlaying = true;

      playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

      musicBars.classList.add("active");

    }else{

      radioPlayer.pause();

      isPlaying = false;

      playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

      musicBars.classList.remove("active");

    }

  }catch(error){

    alert("No se pudo reproducir la radio");

  }

});

/* CHANGE RADIO */

radioCards.forEach(card => {

  card.addEventListener("click", async () => {

    radioCards.forEach(c => c.classList.remove("active-radio"));

    card.classList.add("active-radio");

    const name = card.dataset.name;
    const stream = card.dataset.stream;
    const image = card.dataset.image;
    const description = card.dataset.description;

    heroTitle.textContent = name;
    heroDescription.textContent = description;
    heroCover.src = image;

    radioPlayer.pause();

    radioPlayer.src = stream;

    radioPlayer.load();

    try{

      await radioPlayer.play();

      isPlaying = true;

      playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

      musicBars.classList.add("active");

    }catch(error){

      console.log(error);

    }

  });

});
