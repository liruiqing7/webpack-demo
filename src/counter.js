function number() {
  var number = document.createElement("div");
  number.setAttribute("id", "number");
  number.innerHTML = 110210;
  document.body.appendChild(number);
}

function counter() {
  var div = document.createElement("div");
  div.setAttribute("id", "counter");
  div.innerHTML = 1;
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div);
}

export { number, counter };
