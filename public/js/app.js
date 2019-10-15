console.log("Client Side Javascript File is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const clearText = () => {
  messageOne.textContent = "";
  messageTwo.textContent = "";
};

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageOne.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    const json = response.json();
    json.then(data => {
      if (data.error) {
        clearText();
        messageTwo.textContent = data.error;
      } else {
        clearText();
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
});
