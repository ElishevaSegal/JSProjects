let newElemArr = [];
const createNewElem = (
  tagName,
  width,
  height,
  content,
  color,
  size,
  backgroundColor,
  border
) => {
  let newElem = document.createElement(tagName);
  let pageDiv = document.getElementById("pageDiv");
  pageDiv.appendChild(newElem);
  newElem.style.width = width;
  newElem.style.height = height;
  newElem.innerHTML = content;
  newElem.style.color = color;
  newElem.style.fontSize = size;
  newElem.style.backgroundColor = backgroundColor;
  newElem.style.border = border;
};
const restorePage = () => {
  newElemArr = []; // clear the array
  let fromStorageArr = []; // clear the array
  let jsonStr = localStorage.getItem("Elements"); // get string json from localStorage
  fromStorageArr = JSON.parse(jsonStr); //convert from json to array
  console.log("fromStorageArr", fromStorageArr);
  for (let item of fromStorageArr) {
    createNewElem(
      item.tagName,
      item.width,
      item.height,
      item.content,
      item.color,
      item.size,
      item.backgrondColor,
      item.border
    );
  }
};
window.addEventListener("load", () => {
  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document.getElementById("submitBtn").addEventListener("click", () => {
    let inputTag = document.getElementById("inputTag");
    let inputWidth = document.getElementById("inputWidth");
    let inputHeight = document.getElementById("inputHeight");
    let inputContent = document.getElementById("inputContent");
    let inputColor = document.getElementById("inputColor");
    let inputSize = document.getElementById("inputSize");
    let inputBackgrondColor = document.getElementById("inputBackgrondColor");
    let inputBorder = document.getElementById("inputBorder");
    createNewElem(
      inputTag.value,
      inputWidth.value,
      inputHeight.value,
      inputContent.value,
      inputColor.value,
      inputSize.value,
      inputBackgrondColor.value,
      inputBorder.value
    );
    let newObj = {
      tagName: inputTag.value,
      width: inputWidth.value,
      height: inputHeight.value,
      content: inputContent.value,
      color: inputColor.value,
      size: inputSize.value,
      backgrondColor: inputBackgrondColor.value,
      border: inputBorder.value,
    };
    newElemArr = [...newElemArr, newObj];
  });
  document.getElementById("clearBtn").addEventListener("click", () => {
    let pageDiv = document.getElementById("pageDiv");
    let inputs = document.querySelectorAll(".form-control");
    pageDiv.innerHTML = "";
    for (let input of inputs) {
      input.value = "";
    }
  });
  document.getElementById("saveBtn").addEventListener("click", () => {
    let newElemArrJson = JSON.stringify(newElemArr);
    localStorage.setItem("Elements", newElemArrJson);
  });
  restorePage(); //when restoring the page this function creates the old elements which were saved on the local storage
});
