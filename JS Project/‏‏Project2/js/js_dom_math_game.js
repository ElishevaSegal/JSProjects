const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let n1 = getRandomIntInclusive(1, 10);
let n2 = getRandomIntInclusive(1, 10);

window.addEventListener("load", () => {
  let n1 = getRandomIntInclusive(1, 10);
  let n2 = getRandomIntInclusive(1, 10);
  let action = document.getElementById("selectAction").value;
  let divpopup = document.createElement("div");
  divpopup.className = "popup";
  document.querySelector(".container").appendChild(divpopup);

  document.getElementById("quest").innerText = `${n1} ${action} ${n2} = `;
  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault(); // Stop refresh
  });
  document.getElementById("submit").addEventListener("click", () => {
    let answer = document.getElementById("answer");
    let userAction = document.getElementById("selectAction").value;
    let correctAnswer;

    divpopup.innerHTML = "";
    if (userAction == "+") {
      correctAnswer = n1 + n2;
    } else if (userAction == "-") {
      correctAnswer = n1 - n2;
    } else if (userAction == "/") {
      correctAnswer = n1 / n2;
    } else if (userAction == "*") {
      correctAnswer = n1 * n2;
    }

    if (+answer.value == correctAnswer) {
      divpopup.innerHTML = "Right Answer";
      divpopup.style.color = "green";
    } else {
      divpopup.innerHTML = "Wrong Answer";
      divpopup.style.color = "red";
    }
  });

  document.getElementById("newQuest").addEventListener("click", () => {
    n1 = getRandomIntInclusive(1, 10);
    n2 = getRandomIntInclusive(1, 10);
    action = document.getElementById("selectAction").value;
    document.getElementById("quest").innerText = `${n1} ${action} ${n2} = `;
    let answer = document.getElementById("answer");
    if (answer) {
      answer.value = "";
    }
    let popups = document.querySelectorAll(".popup");
    for (let i of popups) {
      i.innerHTML = "";
    }
  });
});
