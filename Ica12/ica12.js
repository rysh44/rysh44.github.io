const newQuoteButton = document.querySelector("#js-new-quote");
const answerButton = document.querySelector("#js-tweet");
const quoteText = document.querySelector("#js-quote-text");
const answerText = document.querySelector("#js-answer-text");

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let currentAnswer = "";

newQuoteButton.addEventListener("click", getQuote);
answerButton.addEventListener("click", showAnswer);

function displayQuote(question) {
  quoteText.textContent = question;
}

function displayAnswer(answer) {
  answerText.textContent = answer;
}

function showAnswer() {
  displayAnswer(currentAnswer);
}

function getQuote() {
  console.log("Button was clicked");

  fetch(endpoint)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      displayQuote(data.question);
      currentAnswer = data.answer;
      answerText.textContent = "";
    })
    .catch(function(error) {
      console.error("Error fetching trivia:", error);
      alert("Sorry, something went wrong while getting the trivia.");
    });
}

getQuote();