"use strict";

const btnLogin = document.getElementById("btn-submit");
const inputLoginUsername = document.getElementById("input-username");
const inputLoginPassword = document.getElementById("input-password");

const KEY = "USER_ARRAY";
const KEYLOGIN = "USER_ACTIVE";
const userArrObj = JSON.parse(getFromStorage(KEY)) || [];
//convert array from localStorage to Instance array
const userArr = userArrObj.map((user) => parseUser(user));

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //to prevent the page reloading

  //Check input field
  function validateData() {
    //check username
    if (inputLoginUsername.value === "") {
      alert("Please input for username");
      return false;
    }

    //check password
    if (inputLoginPassword.value === "") {
      alert("Please input for password");
      return false;
    }
    return true;
  }

  //validate data and login
  const validate = validateData();
  if (validate) {
    currentAccount = userArr.find(
      (user) => user.username === inputLoginUsername.value
    );
    console.log(currentAccount);
    if (currentAccount?.password === inputLoginPassword.value) {
      saveToStorage(KEYLOGIN, JSON.stringify(currentAccount));
      window.location.href = "../index.html";
    } else {
      alert(
        "The password does not match the user account or the account does not exist. Please verify both the user name and password and try again."
      );
    }
  }
});
