import data from "./menu.json" assert { type: "json" };
const mainDiv = document.querySelector("#container");
const sortButtons = document.querySelectorAll("button");

class menu {
  constructor(name, img, cons) {
    this.name = name;
    this.img = img;
    this.cons = cons;
  }
  static display(item) {
    const container = document.createElement("div");
    container.classList.add("container");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    const img = document.createElement("img");
    img.src = `${item.img}`;
    imgContainer.append(img);

    const secondDiv = document.createElement("div");

    const name = document.createElement("h3");
    name.innerText = `${item.name}`;
    const price = document.createElement("span");
    price.classList.add("price");
    price.innerText = `${item.price}`;
    name.append(price);
    const hr = document.createElement("hr");
    const description = document.createElement("p");
    description.innerText = `${item.description}`;
    secondDiv.append(name, hr, description);

    container.append(imgContainer, secondDiv);
    mainDiv.append(container);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  sortButtons[0].classList.add("active");
  data.menu.items.forEach((element) => {
    menu.display(element);
  });
});

sortButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    mainDiv.innerHTML = "";
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    if (event.target.innerText === "All") {
      data.menu.items.forEach((element) => {
        menu.display(element);
      });
    } else {
      data.menu.items
        .filter((item) => item.type === event.target.innerText)
        .forEach((element) => {
          menu.display(element);
        });
    }
  });
});
