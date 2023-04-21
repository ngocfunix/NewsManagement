"use strict";

const modalContainer = document.getElementById("login-modal");
const contentContainer = document.getElementById("main-content");
const labelWelcome = document.getElementById("welcome-message");
const logOutBtn = document.getElementById("btn-logout");

const KEYLOGIN = "USER_ACTIVE";
let currentAccount;
if (getFromStorage(KEYLOGIN))
  currentAccount = parseUser(JSON.parse(getFromStorage(KEYLOGIN)));

//Show the login modal or Welcome messsage
if (currentAccount) {
  modalContainer.style.display = "none";
  labelWelcome.textContent = `Welcome , ${
    currentAccount.firstName //to tacke only firstname
  }`;
} else contentContainer.style.display = "none";

//Logout
logOutBtn.addEventListener("click", function (e) {
  localStorage.removeItem(KEYLOGIN);
  window.location.href = "../pages/login.html";
});
