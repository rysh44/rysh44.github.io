const slider = document.getElementById("slider");
const chosen = document.getElementById("chosen");
const actual = document.getElementById("actual");
const message = document.getElementById("message");

slider.addEventListener("input", function () {
  const value = slider.value;
  chosen.textContent = value;

  const delay = Math.floor(Math.random() * 6) + 5; // 5 to 10 seconds
  message.textContent = "Volume will change in " + delay + " seconds...";

  setTimeout(function () {
    actual.textContent = value;
    message.textContent = "Volume updated.";
  }, delay * 1000);
});