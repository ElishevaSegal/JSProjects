let listarr = []; //for all the li of the list
let savedList = document.querySelector("#savedList");

const restorePage = () => {
  let localArr = localStorage.getItem("Old List");
  let dataFromLocalStorage = JSON.parse(localArr);
  savedList.innerHTML = ` <img id="thumbtack" src="./images/red.png" alt="thumbtack"><br> </br> `;
  for (let li of dataFromLocalStorage) {
    savedList.innerHTML += "- " + li + "<hr>";
  }
};
window.addEventListener("load", () => {
  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  restorePage();
  document.getElementById("addBtn").addEventListener("click", () => {
    const text = document.querySelector("#itemInput").value;
    let li = document.createElement("li");
    let clear = document.createElement("button");
    clear.innerHTML = "x";
    clear.className = "clearLine";
    li.innerHTML = text;
    li.className = "list-group-item"; // set class from bs
    let list = document.getElementById("list");
    listarr.push(text);
    const index = listarr.length - 1;
    if (list) {
      list.appendChild(li);
      li.appendChild(clear);
      clear.addEventListener("click", (e) => {
        li.remove();
        // need to remove the li from the arr
        listarr.splice(index, 1);
      });
    }

    li.addEventListener("mouseenter", (e) => {
      e.target.classList.add("active"); //set class from bs
    });
    li.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("active");
    });
  });
  let saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      savedList.innerHTML = ` <img  id="thumbtack" src="./images/red.png" alt="thumbtack"><br> </br> `;
      for (let li of listarr) {
        savedList.innerHTML += "- " + li + "<hr>";
      }

      let stringlist = JSON.stringify(listarr);
      localStorage.setItem("Old List", stringlist);

      listarr = [];

      let lis = document.querySelectorAll(".list-group-item");
      for (li of lis) {
        li.remove();
      }
      let itemInput = document.getElementById("itemInput");
      if (itemInput) {
        itemInput.value = " ";
      }
    });
  }
});
