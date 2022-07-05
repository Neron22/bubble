// récuperer h3 du compteur de point
const counterDisplay = document.querySelector("h3");
let counter = 0;

// récupérer mouv souris
const mousemove = document.querySelector(".mousemove");

// récupérer boutons
const pause = document.querySelector(".boutons");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

// récupérer timer
const timerElement = document.querySelector(".timer");
// départ à 0.5 min
let departMinutes = 0.5;
let temps = departMinutes * 60;

// ---- Création des bulles
const bubbleMaker = () => {
  // on crée un tag span
  const bubble = document.createElement("span");
  // on y ajoute la classe bubble
  bubble.classList.add("bubble");
  // on l'ajoute au body
  document.body.appendChild(bubble);

  // on crée une taille random en px
  const size = Math.random() * 200 + 100 + "px";
  // on l'attribue au height et width de bubble
  bubble.style.height = size;
  bubble.style.width = size;

  // on met une apparition random en top et left
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  // on ajoute un addeventlistener au click sur bubble
  bubble.addEventListener("click", () => {
    // Qui augmente le compte
    counter++;
    // et on l'affiche en html
    counterDisplay.textContent = counter;
    // enfin on supprime la bulle
    bubble.remove();
  });
};

//---- Création timer
const timerFinal = () => {
  // on fait des minutes et des secondes à partir de temps
  let minutes = parseInt(temps / 60, 10);
  let secondes = parseInt(temps % 60, 10);

  // on gère l'affichage selon 00:00
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;

  // on affiche le temps en interpollant
  timerElement.innerText = `${minutes}:${secondes}`;

  // si temps inférieur à 0
  if (temps <= 0) {
    // on remet à 0
    temps = 0;
    // on arrete le setinterval de stopbouton
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
