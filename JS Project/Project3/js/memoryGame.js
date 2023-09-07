let countClick = [];
let whoPlayNow;
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let player1Scores = document.getElementById("player1Scores");
let player2Scores = document.getElementById("player2Scores");
let cardsContainer = document.querySelector("#cardsContainer");
let popup = document.querySelector("#popup");

game12Arr = [
  "💜",
  "💜",
  "🧡",
  "🧡",
  "💛",
  "💛",
  "💚",
  "💚",
  "💙",
  "💙",
  "🖤",
  "🖤",
];
game18Arr = [
  "🍉",
  "🍉",
  "🍏",
  "🍏",
  "🍓",
  "🍓",
  "🍌",
  "🍌",
  "🥝",
  "🥝",
  "🍍",
  "🍍",
  "🍇",
  "🍇",
  "🥥",
  "🥥",
  "🍋",
  "🍋",
];
game24Arr = [
  "🍕",
  "🍕",
  "🥨",
  "🥨",
  "🥐",
  "🥐",
  "🍫",
  "🍫",
  "🧁",
  "🧁",
  "🍧",
  "🍧",
  "🍰",
  "🍰",
  "🍩",
  "🍩",
  "🧃",
  "🧃",
  "🍭",
  "🍭",
  "🧀",
  "🧀",
  "🥞",
  "🥞",
];

const getRandomIntInclusive = (min, max) => {
  /*
    generate random number between min and max 
    */
  min = Math.ceil(min); //round up
  max = Math.floor(max); //round down
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//this function shuffle the array each time when starting new game
const fillCards = (array) => {
  let cards = document.querySelectorAll(".cardDiv");
  for (let i = 0; i < array.length; i++) {
    let rn = getRandomIntInclusive(0, array.length - 1);
    let temp = array[i];
    array[i] = array[rn];
    array[rn] = temp;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = array[i];
  }

  playGame(cards);
};

const playGame = (allCardsArr) => {
  for (let i of allCardsArr) {
    i.id = i.innerHTML;
    i.innerHTML = "";
    i.addEventListener("click", () => {
      i.innerHTML = i.id;
      countClick.push(i);
      if (countClick.length == 2) {
        //stops after 2 clicks to check if the cards match
        checkClick();
      }
    });
  }
};

const ifEndGame = () => {
  let cards = document.querySelectorAll("#cardsContainer>div");
  let allCards = 0;
  for (let i of cards) {
    if (i.className == "remove") {
      allCards++;
    }
  }
  if (cards.length == allCards) {
    let scoresP1 = player1Scores.innerHTML;
    let scoresP2 = player2Scores.innerHTML;
    if (scoresP1 > scoresP2) {
      popup.style.display = "block";
      popup.innerHTML = `${player1.value}  won the game`;
    } else if (scoresP1 < scoresP2) {
      popup.style.display = "block";
      popup.innerHTML = `${player2.value}  won the game`;
    } else {
      popup.style.display = "block";
      popup.innerHTML = `Teco, play again`;
    }
  }
};

//3 options of games 12 cards-easy, 18-middle,24-hard
const howManycards = () => {
  let btn12 = document.querySelector("#btn12");
  let btn18 = document.querySelector("#btn18");
  let btn24 = document.querySelector("#btn24");
  let cardsContainer = document.querySelector("#cardsContainer");
  let winnerTable = document.querySelector("#winnerTable");
  if (!btn12 && !btn18 && !btn24 && !cardsContainer) {
    return;
  }
  btn12.addEventListener("click", () => {
    if (player1.value && player2.value) {
      p1.innerHTML = player1.value;
      p2.innerHTML = player2.value;
    } else {
      alert("please fill in players name");
      return;
    }
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      //create the cards per the amount selected by the user
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }
    fillCards(game12Arr);
  });
  btn18.addEventListener("click", () => {
    if (player1.value && player2.value) {
      p1.innerHTML = player1.value;
      p2.innerHTML = player2.value;
    } else {
      alert("please fill in players name");
      return;
    }
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }

    fillCards(game18Arr);
    whoPlayNow = player1.value;
  });
  btn24.addEventListener("click", () => {
    if (player1.value && player2.value) {
      p1.innerHTML = player1.value;
      p2.innerHTML = player2.value;
    } else {
      alert("please fill in players name");
      return;
    }
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 24; i++) {
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }
    fillCards(game24Arr);
    whoPlayNow = player1.value;
  });
};

const checkClick = () => {
  if (
    countClick[0].innerHTML == countClick[1].innerHTML &&
    countClick[0].innerHTML != ""
  ) {
    setTimeout(() => {
      //the cards do match so need to remove them from board
      countClick[0].className = "remove";
      countClick[1].className = "remove";
      countClick[1].innerHTML = "";
      countClick[0].innerHTML = "";
      countClick[1].id = "";
      countClick[0].id = "";
      countClick[0].style.backgroundColor = "";
      countClick[1].style.backgroundColor = "";
      countClick = []; //clear the array
      ifEndGame(); //check if game end
    }, 500);
    if (whoPlayNow == player1.value) {
      player1Scores.innerHTML++;
    } else {
      player2Scores.innerHTML++;
    }
  } else {
    setTimeout(() => {
      countClick[0].innerHTML = ""; //the card didnt match so take the innerHTML back to their ID (so they will not be shown)
      countClick[1].innerHTML = "";
      countClick = []; //clear the array
    }, 500);
    whoPlayNow == player2.value
      ? (whoPlayNow = player1.value)
      : (whoPlayNow = player2.value);
  }
};

const playAgain = () => {
  let playAgainBtn = document.getElementById("playAgainBtn");
  playAgainBtn.addEventListener("click", () => {
    cardsContainer.innerHTML = "";
    player1Scores.innerHTML = "";
    player2Scores.innerHTML = "";
    popup.style.display = "none";
  });
};

window.addEventListener("load", () => {
  player1.value = "";
  player2.value = "";
  howManycards();
  playAgain();
});
