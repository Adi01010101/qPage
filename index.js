const retrieveDataButton = document.getElementById("retrieve-data");
const dataDisplay = document.getElementById("data-table").getElementsByTagName('tbody')[0];

retrieveDataButton.addEventListener("click", () => {
  const addressField = document.getElementById("address");
  const address = encodeURIComponent(addressField.value.trim());

  fetch(`https://api.multiversx.com/accounts/${address}/transfers/count?token=QWT-46ac01&status=success`)
    .then(response => response.json())
    .then(countData => {
      const txCount = countData;
      console.log('C:'+txCount);

      fetch(`https://api.multiversx.com/accounts/${address}/transfers?size=${txCount}&token=QWT-46ac01&status=success`)
        .then(response => response.json())
        .then(data => {
          dataDisplay.innerHTML = '';
          data.forEach(item => {
            const row = dataDisplay.insertRow();
            row.insertCell().textContent = new Date(item.timestamp * 1000).toLocaleString('en-GB');
            row.insertCell().textContent = item.txHash;
            row.insertCell().textContent = item.gasLimit;
            row.insertCell().textContent = item.gasPrice;
            row.insertCell().textContent = item.gasUsed;
            row.insertCell().textContent = item.miniBlockHash;
            row.insertCell().textContent = item.nonce;
            row.insertCell().textContent = item.receiver;
            row.insertCell().textContent = item.sender;
            row.insertCell().textContent = item.status;
            row.insertCell().textContent = item.value;
            row.insertCell().textContent = item.fee;
            row.insertCell().textContent = item.senderAssets;
          });
        })
        .catch(error => {
          dataDisplay.innerHTML = `<tr><td colspan="12">Error: ${error}</td></tr>`;
        });
    })
    .catch(error => {
      dataDisplay.innerHTML = `<tr><td colspan="12">Error: ${error}</td></tr>`;
    });
});
