"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const modalContainer = document.getElementById("login-modal");
const btnSubmit = document.getElementById("btn-submit");
const queryInput = document.getElementById("input-query");

const KEYLOGIN = "USER_ACTIVE";
let currentAccount;
if (getFromStorage(KEYLOGIN))
  currentAccount = JSON.parse(getFromStorage(KEYLOGIN));

///Get data from API
const getSearch = async function (keyword, pageSize, currentPage) {
  try {
    const news = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${currentPage}&apiKey=4c1a0cf39f5547d4a4fedbeb75256212`
    );
    // console.log(news);
    if (!news.ok) throw new Error("Problem getting from the sources!");
    const data = await news.json();

    renderNews(data, pageSize);
  } catch (err) {
    console.error(err);
  }
};
let currentPage = 1;
//Ask user to login and setup category, paga size before getting news
if (!currentAccount) {
  alert("Please go back to Home page and login to access this function");
} else if (!currentAccount.category) {
  alert("Please setup your news first in Setting page");
} else if (currentAccount.category && currentAccount.pageSize) {
  //Submit keyword
  btnSubmit.addEventListener("click", function (e) {
    //Check input field
    function validateData() {
      if (queryInput.value === "") {
        alert("Please input your keyword");
        return false;
      }
      return true;
    }

    //validate data and store
    const validate = validateData();
    if (validate) {
      currentAccount.keyword = queryInput.value;
      btnPrev.style.display = "none";
      getSearch(currentAccount.keyword, currentAccount.pageSize, 1);
    }
  });
  //Next button
  btnNext.addEventListener("click", function (e) {
    currentPage++;
    if (currentAccount.keyword)
      getSearch(currentAccount.keyword, currentAccount.pageSize, currentPage);
  });
  //Previous button
  btnPrev.addEventListener("click", function (e) {
    currentPage--;
    if (currentAccount.keyword)
      getSearch(currentAccount.keyword, currentAccount.pageSize, currentPage);
  });
}
