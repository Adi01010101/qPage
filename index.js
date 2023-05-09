const retrieveDataButton = document.getElementById("retrieve-data");
const dataDisplay = document.getElementById("data-display");

retrieveDataButton.addEventListener("click", () => {
  const apiUrl = "https://api.elrond.com";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      dataDisplay.textContent = JSON.stringify(data);
    })
    .catch(error => {
      dataDisplay.textContent = `Error: ${error}`;
    });
});
