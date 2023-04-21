"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const registerBtn = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
const userArrObj = JSON.parse(getFromStorage(KEY)) || [];
//convert array from localStorage to Instance array
const userArr = userArrObj.map((user) => parseUser(user));
const userNameArr = userArr.map((un) => un.firstName) || []; //username list to check

//event function for Register button
registerBtn.addEventListener("click", function (e) {
  //Collect data from the input forms
  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  //Check input field
  function validateData(userData) {
    //check firstName
    if (userData.firstName === "") {
      alert("Please input for firstName");
      return false;
    }

    //check lastName
    if (userData.lastName === "") {
      alert("Please input for firstName");
      return false;
    }

    //check userName
    if (userData.username === "") {
      alert("Please input for username");
      return false;
    }
    if (userNameArr.length > 0) {
      for (let i = 0; i < userNameArr.length; i++) {
        if (userData.username === userNameArr[i]) {
          alert("You have to select another username");
          return false;
        }
      }
    }

    //check password
    if (userData.password === "") {
      alert("Please input for password");
      return false;
    }
    if (userData.password.length < 8) {
      alert("Password must have at least 8 characters!");
      return false;
    }

    //check password confirm
    if (passwordConfirmInput.value !== passwordInput.value) {
      alert("Password do not match!");
      return false;
    }

    return true;
  }

  //validate data and store
  const validate = validateData(userData);
  if (validate) {
    userNameArr.push(userData.firstName); //add to username list
    userArr.push(parseUser(userData));
    console.log(userArr);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});

// localStorage.removeItem(KEY);
