let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote");
let loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  if (!quote.author) {
    quoteText.textContent = "Unknown";
    console.log("Author not found");
  } else {
    authorText.textContent = quote.author.split(",")[0];
  }

  if (quote.length > 30) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;

  complete();
}

async function getQuotes() {
  loading();

  const url = "https://type.fit/api/quotes";

  try {
    let response = await fetch(url);
    response = await response.json();
    // console.log(response);
    apiQuotes = response;
    newQuote();
  } catch (error) {
    console.log("Error: " + error);
  }
}

// function newQuote() {
//   loading();
//   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//   // Check if author is available
//   if (!quote.author) {
//     authorText.textContent = "Unknown";
//   } else {
//     authorText.textContent = quote.author.split(",")[0];
//   }

//   if (quote.text.length > 100) {
//     quoteText.classList.add("long-quote");
//   } else {
//     quoteText.classList.remove("long-quote");
//   }

//   // //   //   Set quote, Hide loader
//   quoteText.textContent = quote.text;
//   complete();
// }

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();

// function getQuotes() {
//   fetch("https://type.fit/api/quotes")
//     .then((res) => res.json())
//     .then((data) => {
//       const quote = data[Math.floor(Math.random() * data.length)];
//       quoteText.textContent = quote.text;
//       authorText.textContent = quote.author.split(",")[0];
//     });
// }

// getQuotes();

// newQuoteBtn.addEventListener("click", getQuotes);

///////////////////////////////
