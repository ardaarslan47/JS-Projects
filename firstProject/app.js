const firstNumber = document.getElementById("firstN");
const secondNumber = document.getElementById("secondN");
const submit = document.getElementById("submitBtn");
const result = document.getElementById("result");

const add = (a = 0, b = 0) => a + b;

submit.addEventListener("click", () => {
  result.innerText = add(+firstNumber.value, +secondNumber.value);
});