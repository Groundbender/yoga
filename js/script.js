"use strict";
// tabs
const tabPanel = document.querySelector(".info-header");
const tabs = document.querySelectorAll(".info-header-tab");
const tabContent = document.querySelectorAll(".info-tabcontent");

const hideTabContent = () => {
  tabContent.forEach((content, index) => {
    if (index != 0) {
      content.classList.remove("show");
      content.classList.add("hide");
    }
  });
};
hideTabContent();

tabPanel.addEventListener("click", (e) => {
  if (e.target.closest(".info-header-tab")) {
    const tabBtn = e.target.closest(".info-header-tab");
    tabs.forEach((tab, index) => {
      if (tab === tabBtn) {
        tabContent[index].classList.add("show");
        tabContent[index].classList.remove("hide");
      } else {
        tabContent[index].classList.remove("show");
        tabContent[index].classList.add("hide");
      }
    });
  }
});

// timer

let hours = timer.querySelector(".hours");
let minutes = timer.querySelector(".minutes");
let seconds = timer.querySelector(".seconds");

let timeInterval;
const getTimeRemaining = (endtime) => {
  let timeRemaining = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((timeRemaining / 1000) % 60);
  let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 60);

  return {
    timeRemaining,
    hours,
    minutes,
    seconds,
  };
};

const setCLock = (id, endtime) => {
  let timer = document.getElementById(id);
  function updateCLock() {
    let getTime = getTimeRemaining(endtime);
    const addZero = (elem) => {
      if (String(elem).length === 1) {
        return "0" + elem;
      } else {
        return String(elem);
      }
    };
    hours.textContent = addZero(getTime.hours);
    minutes.textContent = addZero(getTime.minutes);
    seconds.textContent = addZero(getTime.seconds);

    if (getTime.timeRemaining <= 0) {
      clearInterval(timeInterval);
      hours.textContent = addZero(0);
      minutes.textContent = addZero(0);
      seconds.textContent = addZero(0);
    }
  }
  timeInterval = setInterval(updateCLock, 1000);
  updateCLock();
};
setCLock("timer", "2023-03-4");

// modal

let modalBtn = document.querySelector(".more");
let modal = document.querySelector(".overlay");
let close = document.querySelector(".popup-close");

modalBtn.addEventListener("click", (e) => {
  modal.style.display = "block";
  e.target.classList.add("more-splash");
  document.body.style.overflow = "hidden";
});

modal.addEventListener("click", (e) => {
  if (
    !e.target.closest(".popup") ||
    e.target.classList.contains("popup-close")
  ) {
    modal.style.display = "none";
    modalBtn.classList.remove("more-splash");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Escape" && modalBtn.classList.contains("more-splash")) {
    modal.style.display = "none";
    modalBtn.classList.remove("more-splash");
    document.body.style.overflow = "";
  }
});

// anchors

const header = document.querySelector("header>.container");
const links = header.querySelectorAll("ul>li>a");

console.log(header);
console.log(links);

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let blockID = link.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  });
});

// sendForm
// let message = {
//   loading: "Загрузка...",
//   success: "Спасибо, скоро мы с вами свяжемся!",
//   failure: "Что-то пошло не так...",
// };

// let form = document.querySelector(".main-form");
// let input = form.getElementsByTagName("input");

// let statusMessage = document.createElement("div");

// statusMessage.classList.add("status");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   form.appendChild(statusMessage);

//   let request = new XMLHttpRequest();

//   request.open("POST", "server.php");
//   request.setRequestHeader("Content-type", "application/json; charset=utf-8");

//   let formData = new FormData(form);
//   let obj = {};

//   formData.forEach(function (value, key) {
//     obj[key] = value;
//   });

//   let json = JSON.stringify(obj);

//   request.send(json);

//   request.addEventListener("readystatechange", function () {
//     if (request.readyState < 4) {
//       statusMessage.innerHTML = message.loading;
//     } else if (request.readyState === 4 && request.status == 200) {
//       statusMessage.innerHTML = message.success;
//     } else {
//       statusMessage.innerHTML = message.failure;
//     }
//   });

//   for (let i = 0; i < input.length; i++) {
//     input[i].value = "";
//   }
// });

let message = {
  loading: "Загрузка...",
  success: "Спасибо, скоро мы с вами свяжемся!",
  failure: "Что-то пошло не так...",
};

let form = document.querySelector(".main-form");
let formBottom = document.querySelector("#form");
let input = form.getElementsByTagName("input");

let statusMessage = document.createElement("div");

statusMessage.classList.add("status");

function sendForm(elem) {
  elem.addEventListener("submit", function (e) {
    e.preventDefault();
    elem.appendChild(statusMessage);
    let formData = new FormData(elem);

    function postData(data) {
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader(
          "Content-type",
          "application/json; charset=utf-8"
        );

        request.onreadystatechange = function () {
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4) {
            if (request.status == 200 && request.status < 300) {
              resolve();
            } else {
              reject();
            }
          }
        };
        request.send(data);
      });
    }
    function clearInput() {
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
    }
    postData(formData)
      .then(() => (statusMessage.innerHTMl = message.loading))
      .then(() => {
        thanksModal.style.display = "block";
        mainModal.style.display = "none";
        statusMessage.innerHTML = "";
      })
      .catch(() => (statusMessage.innerHTML = message.failure))
      .then(clearInput);
  });
}
sendForm(form);
sendForm(formBottom);
