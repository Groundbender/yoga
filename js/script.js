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

let deadline = "2023-03-2";

const getTimeRemaining = (endtime) => {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 60);

  return {
    total: t,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const setCLock = (id, endtime) => {
  let timer = document.getElementById(id);
  let hours = timer.querySelector(".hours");
  let minutes = timer.querySelector(".minutes");
  let seconds = timer.querySelector(".seconds");
  let timeInterval = setInterval(updateCLock, 1000);

  function updateCLock() {
    let t = getTimeRemaining(endtime);
    hours.textContent = t.hours;
    minutes.textContent = t.minutes;
    seconds.textContent = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
  updateCLock();
};
setCLock("timer", deadline);

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
