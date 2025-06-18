const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let localQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

  // Set Author
  authorText.innerText = quote.author || "Unknown";

  // Set Quote Text
  if (quote.quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.innerText = quote.quote;

  complete();
}

// Get Quotes from local JSON file
async function getQuotes() {
  loading();
  try {
    const response = await fetch("quote.json");
    localQuotes = await response.json();
    newQuote();
  } catch (error) {
    quoteText.innerText = "Failed to load quotes.";
    authorText.innerText = "";
    complete();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
