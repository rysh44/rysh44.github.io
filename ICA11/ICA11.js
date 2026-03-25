// Complete variable definitions and random function

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const characters = ["Zara the Explorer", "Captain Noodle", "Dr. Pixel"];
const places = ["a hidden cave", "an abandoned arcade", "a floating island"];
const events = [
  "discovered a glowing portal",
  "triggered a mysterious alarm",
  "accidentally unleashed a swarm of tiny robots",
];

function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `It was 86 Fahrenheit outside, so ${randomCharacter} set out on an adventure. When they arrived at ${randomPlace}, they paused for a moment, then ${randomEvent}. Alex witnessed everything, but wasn’t shocked — ${randomCharacter} carries 220 pounds of gear, and the heat made things unpredictable.`;

  return storyText;
}

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Alex", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(220 / 14)} stone`;
    const temperature = `${Math.round((86 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("220 pounds", weight);
    newStory = newStory.replace("86 Fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}