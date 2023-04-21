"use strict";

//Save data to LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
//Get data from LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
