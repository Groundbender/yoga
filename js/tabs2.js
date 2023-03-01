"use strict";

let tab = document.querySelectorAll(".info-header-tab");
let info = document.querySelector(".info-header");
let tabContent = document.querySelectorAll(".info-tabcontent");

const hideTabContent = (a) => {
  for (let i = a; i < tabContent.length; i++) {
    tabContent[i].classList.remove("show");
    tabContent[i].classList.add("hide");
  }
};

hideTabContent(a);

const showTabContent = (b) => {
  if (tabContent[b].classList.contains("hide")) {
    tabContent[b].classList.add("show");
    tabContent[b].classList.remove("hide");
  }
};

info.addEventListener("click", (e) => {
  let target = e.target;
  if (target && target.classList.contains("info-header-tab")) {
    for (let i = 0; i < tab.length; i++) {
      if (target === tab[i]) {
        hideTabContent(0);
        showTabContent(i);
        break;
      }
    }
  }
});
