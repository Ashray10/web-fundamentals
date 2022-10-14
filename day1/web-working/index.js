let h1 = document.createElement("h1");
h1.textContent = "";

function addElementIn404Page(text) {
  let h1 = document.createElement("h1");
  h1.innerHTML = text;
  let div = document.createElement("div");
  div.className = "fof";
  div.appendChild(h1);
  let parentEle = document.getElementById("main");
  parentEle.appendChild(div);
}
window.addEventListener("load", () => {
  for (let i = 0; i < 1000000000; i++) {}
  addElementIn404Page("Test");
});
