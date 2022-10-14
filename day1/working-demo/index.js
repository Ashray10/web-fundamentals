let inputText = document.getElementById("input-text");
let todoBtn = document.getElementById("todo-btn");
let list = document.getElementById("list");

function addListeners() {
  todoBtn.addEventListener("click", submitTODO);
}

function submitTODO() {
  let textValue = inputText.value;
  renderListWithNewItems(textValue);
}

function renderListWithNewItems(value) {
  let li = document.createElement("li");
  let btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.addEventListener("click", (ele) => {
    console.log(ele, li);
    list.removeChild(li);
  });
  let span = document.createElement("span");
  span.innerHTML = value;
  li.className = "list-item";
  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  inputText.innerHTML = "";
}

addListeners();
