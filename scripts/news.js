"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const modalContainer = document.getElementById("login-modal");

const KEYLOGIN = "USER_ACTIVE";
let currentAccount = JSON.parse(getFromStorage(KEYLOGIN));

///Get data from API
const getNews = async function (category, pageSize, currentPage) {
  try {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&page=${currentPage}&country=us&category=${category}&apiKey=4c1a0cf39f5547d4a4fedbeb75256212`
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
  alert("Please go back to Home page and login to get the news");
} else if (!currentAccount.category) {
  alert("Please setup your news first in Setting page");
} else if (currentAccount.category && currentAccount.pageSize) {
  btnPrev.style.display = "none";
  getNews(currentAccount.category, currentAccount.pageSize, 1);

  //Next button
  btnNext.addEventListener("click", function (e) {
    currentPage++;
    getNews(currentAccount.category, currentAccount.pageSize, currentPage);
  });
  //Previous button
  btnPrev.addEventListener("click", function (e) {
    currentPage--;
    getNews(currentAccount.category, currentAccount.pageSize, currentPage);
  });
}
