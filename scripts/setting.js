"use strict";

const modalContainer = document.getElementById("login-modal");
const mainContainer = document.getElementById("main");
const btnSubmit = document.getElementById("btn-submit");
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

const KEYLOGIN = "USER_ACTIVE";
let currentAccount;
if (getFromStorage(KEYLOGIN))
  currentAccount = parseUser(JSON.parse(getFromStorage(KEYLOGIN)));

if (currentAccount) {
  modalContainer.style.display = "none";
} else mainContainer.style.display = "none";

//submit setting
btnSubmit.addEventListener("click", function (e) {
  const setting = {
    pageSize: pageSizeInput.value,
    category: categoryInput.value,
  };

  //Check input field
  function validateData() {
    if (pageSizeInput.value < 1 || pageSizeInput.value > 30) {
      alert("Page size should be between 1 and 30 for bettet display");
      return false;
    }
    return true;
  }

  //validate data and store
  const validate = validateData();
  if (validate) {
    currentAccount.pageSize = pageSizeInput.value;
    currentAccount.category = categoryInput.value;
    saveToStorage(KEYLOGIN, JSON.stringify(currentAccount));
    window.location.href = "../pages/news.html";
  }
});
