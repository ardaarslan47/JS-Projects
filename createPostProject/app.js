const navBar = document.querySelector("nav");
navBar.innerHTML =
  "<ul><li><a href='main.html'>Main</a></li><li><a href='create.html'>Create</a></li></ul>";

const postContainer = document.querySelector(".allPosts");
const form = document.querySelector("form");

let posts = JSON.parse(localStorage.getItem("allPosts")) || [];
let myPosts = JSON.parse(localStorage.getItem("myPosts")) || [];
let postNumber = +localStorage.getItem("postNumber");

class Post {
  constructor(firstName, surName, header, post, number) {
    this.firstName = firstName;
    this.surName = surName;
    this.header = header;
    this.post = post;
    this.number = number;
  }
}

class UI {
  static display() {
    posts.forEach((post) => {
      myPosts.some((e) => e.number === post.number)
        ? UI.addMyPost(post)
        : UI.addPost(post);
    });
  }

  static addMyPost(post) {
    const container = document.createElement("div");
    container.classList.add("postContainer");
    container.id = post.number;

    container.innerHTML = `
        <div class="voteContainer">
          <span class="material-symbols-outlined">voting_chip</span><br>
          <span class="voteCount">0</span>
        </div>
        <div class="content">
          <p>${post.firstName} ${post.surName}<span class="closeBtn">X</span><span class="editBtn">Edit</span></p>
          <h3 class="header">${post.header}</h3>
          <p>
            ${post.post}
          </p>
        </div>
        `;
    postContainer.append(container);
  }

  static addPost(post) {
    const container = document.createElement("div");
    container.classList.add("postContainer");
    container.id = post.number;

    container.innerHTML = `
        <div class="voteContainer">
          <span class="material-symbols-outlined">voting_chip</span><br>
          <span class="voteCount">0</span>
        </div>
        <div class="content">
          <p>${post.firstName} ${post.surName}
          <h3 class="header">${post.header}</h3>
          <p>
            ${post.post}
          </p>
        </div>
        `;

    postContainer.append(container);
  }

  static deletePost(post) {
    document.getElementById(`${post.number}`).remove();
  }

  static edit(post) {
    const container = document.getElementById(`${post.number}`);
    container.classList.remove("postContainer");
    container.innerHTML = `
    <form action="/nowhere" id="form${post.number}">
    <h2>Edit Post</h2> 
    <label for="firstName">*FirstName: </label>
    <input type="text" id="firstName">
    <label for="surName">Surname: </label>
    <input type="text" id="surName">
    <h3 style="margin-bottom: 5px;">Header</h2>
    <input type="text" class="headerInput">
    <h2 style="margin-bottom: 5px;">*Post</h2>
    <textarea  rows="10" class="postInput" maxlength="550"></textarea>
    <button type="reset">CANCEL</button>
    <button type="submit">POST</button>
    </form>
    `;
    const editForm = document.getElementById(`form${post.number}`);
    editForm[0].value = post.firstName;
    editForm[1].value = post.surName;
    editForm[2].value = post.header;
    editForm[3].value = post.post;

    editForm.addEventListener("reset", (e) => {
      e.preventDefault();
      location.reload();
    });

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (editForm[0].value === "" || editForm[3].value === "") {
        alert("Fill all the details");
      } else {
        const newPost = new Post(
          editForm[0].value,
          editForm[1].value,
          editForm[2].value,
          editForm[3].value,
          post.number
        );
        Store.edit(post, newPost);
      }
    });
  }
}

class Store {
  static add(post) {
    posts.push(post);
    myPosts.push(post);
    localStorage.setItem("allPosts", JSON.stringify(posts));
    localStorage.setItem("myPosts", JSON.stringify(myPosts));
    Store.postNumber();
  }

  static delete(post) {
    posts.splice(posts.indexOf(post), 1);
    myPosts.splice(myPosts.indexOf(post), 1);
    localStorage.setItem("allPosts", JSON.stringify(posts));
    localStorage.setItem("myPosts", JSON.stringify(myPosts));
  }

  static postNumber() {
    postNumber++;
    localStorage.setItem("postNumber", postNumber);
  }

  static edit(post, newP) {
    posts.splice(posts.indexOf(post), 1);
    myPosts.splice(myPosts.indexOf(post), 1);
    posts.push(newP);
    myPosts.push(newP);
    localStorage.setItem("allPosts", JSON.stringify(posts));
    localStorage.setItem("myPosts", JSON.stringify(myPosts));
    location.reload();
  }
}

class Events {
  static delete(btn) {
    btn.addEventListener("click", () => {
      const post = posts.find(
        (x) => x.number === +btn.parentElement.parentElement.parentElement.id
      );

      UI.deletePost(post);
      Store.delete(post);
    });
  }

  static edit(btn) {
    btn.addEventListener("click", () => {
      const post = posts.find(
        (x) => x.number === +btn.parentElement.parentElement.parentElement.id
      );

      UI.edit(post);
    });
  }

  static vote(btn) {
    btn.addEventListener("click", (e) => {
      +e.target.nextSibling.nextSibling.nextSibling.innerText++;
    });
  }
}

// main.html

if (document.location.pathname === "/project/main.html") {
  document.querySelector('a[href="main.html"]').classList.add("active");

  function mainAfterLoaded() {
    UI.display();

    const closeBtns = document.querySelectorAll(".closeBtn");
    const editBtns = document.querySelectorAll(".editBtn");
    const voteBtns = document.querySelectorAll(".material-symbols-outlined");

    closeBtns.forEach((button) => Events.delete(button));
    editBtns.forEach((button) => Events.edit(button));
    voteBtns.forEach((button) => Events.vote(button));
  }

  document.addEventListener("DOMContentLoaded", () => mainAfterLoaded());
}

// create.html

else {
  document.querySelector('a[href="create.html"]').classList.add("active");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form[0].value === "" || form[3].value === "") {
      alert("Fill all the details");
    } else {
      const newPost = new Post(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].value,
        postNumber
      );
      Store.add(newPost);
      form[0].value = "";
      form[1].value = "";
      form[2].value = "";
      form[3].value = "";

      alert("Successfully Posted");
    }
  });
}