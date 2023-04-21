"use strict";

//Create Class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

//Change JS Object to Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

function parseTask(taskData) {
  const task = new Task(
    taskData.task,
    taskData.owner,
    taskData.isDone,
    taskData.date
  );

  return task;
}

//Render news from API
const renderNews = function (data, pageSize) {
  newsContainer.innerHTML = "";
  for (let i = 0; i < data.articles.length; i++) {
    const html = `<div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src=${data.articles[i].urlToImage}
          class="card-img"
          alt=${data.articles[i].title}>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.articles[i].title}</h5>
          <p class="card-text">${data.articles[i].content}</p>
          <a href=${data.articles[i].url}
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
    newsContainer.insertAdjacentHTML("beforeend", html);
  }
  const totalPage = Math.ceil(data.totalResults / pageSize);
  pageNum.textContent = currentPage;

  if (currentPage >= totalPage) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "inline";
  }

  if (currentPage <= 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "inline";
  }
};

//Create Class Task
class Task {
  constructor(task, owner, isDone, date) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
    this.date = date;
  }
}
