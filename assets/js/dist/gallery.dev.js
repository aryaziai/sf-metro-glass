"use strict";

document.addEventListener('keydown', function (event) {
  if (event.key === "Escape") {
    document.querySelector(".cssbox_close").click();
  }
});