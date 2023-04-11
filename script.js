"use strict";

// **********************************************************************
// ***************** GLOBAL VARIABLES ***********************************
// **********************************************************************

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// **********************************************************************
// ***************** SHOW QUOTE *****************************************
// **********************************************************************

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Anonymous'
  authorText.textContent = !quote.author ? "Anonymous" : quote.author;

  // Check Quote length to determine styling
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// **********************************************************************
// ***************** GET QUOTES FROM API ********************************
// **********************************************************************

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    getQuote();
  }
}

// **********************************************************************
// ***************** BUTTON FUNCTIONS ***********************************
// **********************************************************************

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// **********************************************************************
// ***************** ON LOAD ********************************************
// **********************************************************************

getQuote();
