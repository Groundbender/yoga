"use strict";
// tabs
const tabPanel = document.querySelector(".info-header");
const tabs = document.querySelectorAll(".info-header-tab");
const tabContent = document.querySelectorAll(".info-tabcontent");

const hideTabContent = () => {
  tabContent.forEach((content, index) => {
    console.log(tabContent[0]);
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
setCLock("timer", "2023-03-5");

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
