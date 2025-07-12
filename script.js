console.log("Script loaded");
window.addEventListener("DOMContentLoaded", () => {
});
const questions = [
  {
    q: "Where were you that night?",
    a: ["Home. Alone.", "Out with friends. They can vouch."]
  },
  {
    q: "Why was her blood on your clothes?",
    a: ["I found her like that.", "It’s not her blood."]
  },
  {
    q: "Do you know my wife?",
    a: ["We talked once or twice.", "We were coworkers."]
  },
  {
    q: "You ever been violent before?",
    a: ["No. Never.", "Only in self-defense."]
  },
  {
    q: "Do you feel guilty?",
    a: ["Yes. Even if I didn’t do it.", "No. I didn’t do anything."]
  }
];

const endings = {
  shoot: [
    "He slumps, silent. You stare at the body. The screen fades to black.",
    "He gasps, 'I didn’t—' before dying.",
    "He smiles. 'You made the right call,' he whispers, then dies.",
    "Footsteps echo behind you. Someone was watching.",
    "You fire. Nothing feels resolved."
  ],
  walk: [
    "He collapses, sobbing into your chest.",
    "You walk away. You hear a shot behind you.",
    "He takes the gun. You never see him again.",
    "He stands, shaking, and walks into the night.",
    "He grabs the gun, aims at you... and collapses from a heart attack."
  ]
};

let usedQuestions = [];
let perceptionScore = 0;

const dialogue = document.getElementById("dialogue-text");
const choices = document.getElementById("choices");
const startBtn = document.getElementById("start-button");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  nextQuestion();
});

function nextQuestion() {
  if (usedQuestions.length === questions.length) {
    showFinalChoice();
    return;
  }

  let index;
  do {
    index = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(index));

  usedQuestions.push(index);
  const q = questions[index];

  dialogue.innerText = q.q;
  choices.innerHTML = "";

  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Ask";
  continueBtn.addEventListener("click", () => {
    //Generate random answer from suspect
    const randomAnswer = q.a[Math.floor(Math.random() * q.a.length)];
    dialogue.innerText = `"${randomAnswer}"`;

    //Button with "Next Question"
    continueBtn.textContent = "Next";
    continueBtn.onclick = () => nextQuestion();
  });

  choices.appendChild(continueBtn);
}

function showFinalChoice() {
  dialogue.innerText = "You have one shot.  What do you do?";
  choices.innerHTML = "";
  
  const shootBtn = document.createElement("button");
  shootBtn.textContent = "Shoot Him";
  shootBtn.addEventListener("click", () => showEnding("shoot"));
  choices.appendChild(shootBtn);

  const walkBtn = document.createElement("button");
  walkBtn.textContent = "Walk Away";
  walkBtn.addEventListener("click", () => showEnding("walk"));
  choices.appendChild(walkBtn);
}

function showEnding(type) {
  dialogue.innerText = "";
  choices.innerHTML = "";
 
  const result = endings[type][Math.floor(Math.random() * endings[type].length)];
  dialogue.innerText = result;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Play Again";
  restartBtn.addEventListener("click", resetGame);
  choices.appendChild(restartBtn);
  

  //Reflection shown after short delay
  const reflection = document.getElementById("reflection");
  reflection.classList.remove("hidden");
  setTimeout(() => {
    reflection.classList.add("show");
  }, 3500); // wait ending to settle
}

function resetGame() {
  usedQuestions = [];
  dialogue.innerText = "You sit across from the man who may have killed your wife.";
  choices.innerHTML = "";
  startBtn.style.display = "block";

  const reflection = document.getElementById("reflection");
  reflection.classList.remove("show");
  reflection.classList.add("hidden");
}


