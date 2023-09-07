let hamb = document.querySelector(".hamb");
console.log();
let ul = document.querySelector("ul");
hamb.addEventListener("click", () => {
  ul.classList.toggle("active");
});
