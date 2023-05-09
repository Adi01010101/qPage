const retrieveDataButton = document.getElementById("retrieve-data");
const dataDisplay = document.getElementById("data-display");

retrieveDataButton.addEventListener("click", () => {
  const addressField = document.getElementById("address");
  const address = encodeURIComponent(addressField.value.trim());
  const apiCount = `https://api.multiversx.com/tokens/QWT-46ac01/transfers/count?receiver=${address}&status=success`;
  var txCount=0
  
  fetch(apiCount)
    .then(response=>response.json())
    .then(data => {txCount=JSON.stringify(data);});
  
  const apiUrl = `https://api.multiversx.com/tokens/QWT-46ac01/transfers?size=${txCount}&receiver=${address}&status=success&order=asc`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const table = document.createElement("table");

      // Create table header row
      const headerRow = table.insertRow();
      const headerCells = ["TxHash", "Sender", "Receiver", "Amount", "Timestamp"];
      headerCells.forEach(cellText => {
        const cell = headerRow.insertCell();
        cell.textContent = cellText;
      });

      // Create table data rows
      data.forEach(transaction => {
        const row = table.insertRow();
        const cells = [
          transaction.txHash,
          transaction.sender,
          transaction.receiver,
          transaction.value,
          transaction.timestamp
        ];
        cells.forEach(cellText => {
          const cell = row.insertCell();
          cell.textContent = cellText;
        });
      });

      // Display table
      dataDisplay.innerHTML = "";
      dataDisplay.appendChild(table);
    })
    .catch(error => {
      dataDisplay.textContent = `Error: ${error}`;
    });
});
