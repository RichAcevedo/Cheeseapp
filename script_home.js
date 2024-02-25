function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  generateFixedCheeseBoard();
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function showApp() {
  document.getElementById("welcomeScreen").style.display = "none";

  document.querySelector(".tab").style.display = "block";
  document.getElementById("SelectorDeQuesos").style.display = "block";
  document.querySelector(".tab").style.display = "flex";
  openTab(event, "SelectorDeQuesos");
}

document.addEventListener("DOMContentLoaded", function () {
  openTab(event, "SelectorDeQuesos");
});
