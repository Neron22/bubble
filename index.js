const counterDisplay = document.querySelector("h3");
let counter = 0;

const mousemove = document.querySelector(".mousemove");

const pause = document.querySelector(".boutons");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

const timerElement = document.querySelector(".timer");
let departMinutes = 0.5;
let temps = departMinutes * 60;

// ---- Création des bulles
const bubbleMaker = () => {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  const size = Math.random() * 200 + 100 + "px";
  bubble.style.height = size;
  bubble.style.width = size;

  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  bubble.addEventListener("click", () => {
    counter++;
    counterDisplay.textContent = counter;
    bubble.remove();
  });
};

//---- Création timer
const timerFinal = () => {
  let minutes = parseInt(temps / 60, 10);
  let secondes = parseInt(temps % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;

  timerElement.innerText = `${minutes}:${secondes}`;

  if (temps <= 0) {
    temps = 0;
    clearInterval(stopBouton);
  } else {
    temps = temps - 1;
  }
};

// Création fonction start avec démarrage des bulles au clic
const ftnStart = () => {
  stopBouton = setInterval(bubbleMaker, 200);
  temps = 30;
  stopTimer = setInterval(timerFinal, 1000);
  startBtn.disabled = true;
};

// Création fonction stop et appel de la fonction stop au click Stop
const ftnStop = () => {
  clearInterval(stopBouton);
  clearInterval(stopTimer);
  startBtn.disabled = false;
};

// Création fonction reset et appel de la fonction reset au click Stop avec remise à 0 compteur
const ftnReset = () => {
  startBtn.disabled = false;
  clearInterval(bubbleMaker);
  clearInterval(timerFinal);
  counter = 0;
  counterDisplay.textContent = counter;
};

startBtn.addEventListener("click", () => {
  ftnStart();
  timerElement.classList.remove("hidden-timer");
  timerElement.classList.add("show-timer");
});

stopBtn.addEventListener("click", () => {
  ftnStop();
  timerElement.classList.add("hidden-timer");
  timerElement.classList.remove("show-timer");
});

resetBtn.addEventListener("click", () => {
  ftnReset();
  timerElement.classList.remove("hidden-timer");
});
