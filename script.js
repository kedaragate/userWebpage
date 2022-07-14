const usersDiv = document.querySelector(".cards");
const card = document.querySelector(".card");
const message = document.querySelector("#message");
// let userButton = document.querySelectorAll(".card-btn");
const mainSection = document.querySelectorAll(".main");
let userData;

fetch("https://dummyapi.io/data/v1/user", {
  method: "GET",

  headers: {
    "app-id": "62cfb1be39dcdcb090d3bb2f",
  },
})
  .then((response) => response.json())
  .then((data) => {
    userData = data.data;
    // console.log(userData);
    hideMessage(message);
    displayCards(data.data);
    // console.log(userData);
  })
  .then(() => {
    userDetails();
  });

let hideMessage = function () {
  message.style.display = "none";
};

let displayCards = function (users) {
  users.forEach((user) => {
    createUserCard(user);
  });
};
let createUserCard = function (user) {
  const userCardHtml = `<div class="card">
      <img
      src="${user.picture}"
      alt=""
      class="card-img"
  />
      <h4 class="card-name">${user.title} ${user.firstName} ${user.lastName}</h4>
      <button class="card-btn" id="${user.id}">See More Details</button>
  </div>`;
  usersDiv.insertAdjacentHTML("afterbegin", userCardHtml);
  return userCardHtml;
};

// Search facility

const searchText = document.querySelector("#searchText");
const searchButton = document.querySelector(".searchBtn");

searchText.addEventListener("keyup", function () {
  const searchValue = this.value.toLowerCase();

  const searchUser = userData.filter((user) => {
    return user.firstName.toLowerCase().startsWith(searchValue);
  });
  removeExistingUsers();
  displayCards(searchUser);
});

const removeExistingUsers = function () {
  usersDiv.innerHTML = "";
};

//Switching modes
const modeButton = document.querySelector("#lightModeBtn");

const switchMode = function () {
  let lightBackground = "white";
  let darkText = "gray";
  let darkBackground = "black";
  let lightText = "white";
  if (modeButton.textContent == "LM") {
    modeButton.textContent = "DM";
    // modeButton.style.backgroundColor = "white";
    // modeButton.style.color = "black";
    document.body.style.backgroundColor = lightBackground;
    document.body.style.color = darkText;
    usersDiv.style.backgroundColor = lightBackground;
    card.style.backgroundColor = lightBackground;

    // message.style.color = "white";
    // card.style.color = "white";
  } else if (modeButton.textContent == "DM") {
    modeButton.textContent = "LM";

    document.body.style.backgroundColor = darkBackground;
    document.body.style.color = lightText;
    usersDiv.style.backgroundColor = darkBackground;
    card.style.backgroundColor = darkBackground;

    // message.style.color = "white";
  }
};

modeButton.addEventListener("click", switchMode);

/*
- Attach an event listeners to buttons inside 
- When a button is clicked 
   - Check which user is clicked 
   - make a API call with /user/id
   - add/create a modal component with the data from the users 
   - show the model 
- Add a X button at the top right of the modal 
  - when this button is clicked : the model should be hidden   
*/

//user modal

const userInfo = document.querySelector(".userDetails");

const userDetails = function () {
  const buttonsList = document.querySelectorAll(".card-btn");
  // const buttons = Array.from(buttonsList);
  // console.log(buttonsList);
  buttonsList.forEach((btn) => {
    btn.addEventListener("click", function () {
      // console.log(btn);
      // console.log(this.id);
      fetch(`https://dummyapi.io/data/v1/user/${this.id}`, {
        method: "GET",
        headers: {
          "app-id": "62cfb1be39dcdcb090d3bb2f",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          createUserModal(data);
        });
    });
  });

  return this.id;
};

const createUserModal = function (user) {
  const userModalHtml = `<div class="userModal">
<button class="modalCloseBtn">X</button>

  
<div class="userDetails">
  <div class="userImg">
    <img src="${user.picture}" />
  </div>
  <div class="userPersonalInfo">
    <p>${user.title} ${user.firstName} ${user.lastName}</p>
    <p>Gender:${user.gender}</p>
    <p>Phone:${user.phone}</p>
    <p>Email:${user.email}</p>
    <p>Location:Kongsvinger,Nordjylland,Denmark.</p>
  </div>
</div>
</div>`;
  // console.log(usersDiv);
  usersDiv.insertAdjacentHTML("beforeend", userModalHtml);
  console.log(usersDiv);
};
const modalCloseBtn = document.querySelector(".modalCloseBtn");
const userModal = document.querySelector(".userModal");

modalCloseBtn.addEventListener("click", function () {
  userModal.classList.add("hideModal");
});
