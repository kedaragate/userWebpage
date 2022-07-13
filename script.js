const usersDiv = document.querySelector(".cards");
const card = document.querySelector(".card");
const message = document.querySelector("#message");
// let userButton = document.querySelectorAll(".card-btn");

let userData;

fetch("https://dummyapi.io/data/v1/user", {
  method: "GET",

  headers: {
    "app-id": "62c3859db3b09459b4b1f8a0",
  },
})
  .then((response) => response.json())
  .then((data) => {
    userData = data.data;
    // console.log(userData);
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
    const userCard = createUserCard(user);
    usersDiv.appendChild(userCard);

    /* usersDiv.style.display = "flex";*/
  });
};
let createUserCard = function (user) {
  let userDiv = document.createElement("div");
  userDiv.className = "card";
  userDiv.id = user.id;
  let userImage = document.createElement("img");
  userImage.className = "card-img";
  userImage.setAttribute("src", user.picture);
  userDiv.appendChild(userImage);
  let userName = document.createElement("h4");
  userName.className = "card-name";
  userName.textContent = `${user.title} ${user.firstName} ${user.lastName}`;
  userDiv.appendChild(userName);
  let userButton = document.createElement("button");
  userButton.className = "card-btn";
  userButton.id = user.id;
  userButton.textContent = "See More Details";

  userDiv.appendChild(userButton);
  // console.log(userButton);

  // console.log(userButton);

  return userDiv;
};

/*<div class="card">
  <img
    src="https://randomuser.me/api/portraits/women/58.jpg"
    alt=""
    class="card-img"
  />
  <h4 class="card-name">ms Sara Anderson</h4>
  <button class="card-btn">See More Details</button>
</div>;
*/

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
  buttonsList.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log(this.id);
      fetch(`https://dummyapi.io/data/v1/user/${this.id}`, {
        method: "GET",
        headers: {
          "app-id": "62c3859db3b09459b4b1f8a0",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          console.log(userInfo);
createUserModal(data);

        });

    });

    return this.id;
  });
};

// const userDetails = function () {
//   const buttonsList = document.getElementsByClassName("card-btn");
//   // console.log(buttonsList);
//   for (let i = 0; i < buttonsList.length; i++) {
//     buttonsList[i].addEventListener("click", function () {
//       console.log(this.id);
//     });
//   }
// };

//Creating user modal elements
/* <div class="userModal">
<button class="modalCloseBtn">X</button>
<div class="userDetails">
  <div class="userImg">
    <img src="https://randomuser.me/api/portraits/women/58.jpg" />
  </div>
  <div class="userPersonalInfo">
    <p>Name:ms Sara Andersen</p>
    <p>Gender:Female</p>
    <p>Phone:92694011</p>
    <p>Email:sara.andersen@example.com</p>
    <p>Location:Kongsvinger,Nordjylland,Denmark.</p>
  </div>
</div>
</div> */

const userModal = document.querySelector(".userModal");
const createUserModal = function (user) {
  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.className = "modalCloseBtn";
modalCloseBtn.textContent="X";
  userModal.appendChild(modalCloseBtn);
  const userModalSubDiv = document.createElement("div");
  userModalSubDiv.className = "userDetails";
  userModal.appendChild(userModalSubDiv);
userModal.classList.remove="hideModal";

  const userModalImg = document.createElement("img");
  userModalImg.className = "userImg";
  userModalSubDiv.appendChild(userModalImg);
  userModalImg.setAttribute("src", user.picture);
  const userPersonalInfo = document.createElement("div");
  userPersonalInfo.className = "userPersonalInfo";
  userModalSubDiv.appendChild(userPersonalInfo);
  const userName = document.createElement("p");

  userName.textContent = `${user.title} ${user.firstName} ${user.lastName}`;
  const userGender = document.createElement("p");
  userGender.textContent = user.gender;
  const userPhone = document.createElement("p");
  userPhone.textContent = user.phone;
  const userEmail = document.createElement("p");
  userEmail.textContent = user.email;
  userPersonalInfo.appendChild(userName);
  userPersonalInfo.appendChild(userGender);
  userPersonalInfo.appendChild(userPhone);
  userPersonalInfo.appendChild(userEmail);
};

modalCloseBtn.addEventListener("click", function(){
userModal.classList.add("hideModal")

})

