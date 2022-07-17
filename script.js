const usersDiv = document.querySelector(".cards");
const card = document.querySelector(".card");
const message = document.querySelector("#message");

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

    hideMessage(message);
    displayCards(data.data);
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

//user modal

const userInfo = document.querySelector(".userDetails");

const userDetails = function () {
  const buttonsList = document.querySelectorAll(".card-btn");

  buttonsList.forEach((btn) => {
    btn.addEventListener("click", function () {
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
<button class="modalCloseBtn" >X</button> 
<div class="userDetails">
  <div class="userImg">
    <img src="${user.picture}" />
  </div>
  <div class="userPersonalInfo">
    <p>${user.title} ${user.firstName} ${user.lastName}</p>
    <p>Gender:${user.gender}</p>
    <p>Phone:${user.phone}</p>
    <p>Email:${user.email}</p>
    <p>Location:${user.location.city},${user.location.state},${user.location.country}</p>
  </div>
</div>
</div>`;

  usersDiv.insertAdjacentHTML("beforeend", userModalHtml);
  // closingModal();
};

// const closingModal = function () {
//   const modalCloseBtn = document.querySelector(".modalCloseBtn");
//   const userModal = document.querySelector(".userModal");
//   console.log(userModal);

//   modalCloseBtn.addEventListener("click", function () {
//     userModal.style.display = "none";
//   });
// };

const modalCloseBtn = document.querySelectorAll(".modalCloseBtn");
const userModal = document.querySelectorAll(".userModal");

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    userModal.setAttribute("style", "display:none");
  });
});
