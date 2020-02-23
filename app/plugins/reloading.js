
window.addEventListener("storage", function (event) {
  if (event.key == "reloading") {
    location.reload();
  }
});