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
