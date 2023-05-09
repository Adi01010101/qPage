const retrieveDataButton = document.getElementById("retrieve-data");
const dataDisplay = document.getElementById("data-display");

retrieveDataButton.addEventListener("click", () => {
  const addressField = document.getElementById("address");
  console.log('A0:'+addressField)
  const address = encodeURIComponent(addressField.value.trim());
  console.log('A1:'+address)
  const apiUrl =  `https://api.multiversx.com/tokens/QWT-46ac01/transfers?size=10000&receiver=${address}&status=success&order=asc`;
  console.log('AA:'+apiUrl)

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      dataDisplay.textContent = JSON.stringify(data);
    })
    .catch(error => {
      dataDisplay.textContent = `Error: ${error}`;
    });
});
