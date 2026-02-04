// simple email show/hide toggle

const btn = document.getElementById("toggleEmailBtn");
const emailText = document.getElementById("emailText");

let showing = false;

btn.addEventListener("click", function () {

  if (showing === false) {
    emailText.textContent = "vsidhu1002@gmail.com";
    btn.textContent = "Hide Email";
    showing = true;

  } else {
    emailText.textContent = "";
    btn.textContent = "Show Email";
    showing = false;
  }

});
