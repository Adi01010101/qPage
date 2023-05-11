const namedAddress = {
  'erd1qqqqqqqqqqqqqpgq50dge6rrpcra4tp9hl57jl0893a4r2r72jpsk39rjj':'xExchange: Metabonding Rewards',
  'erd1qqqqqqqqqqqqqpgqjsnxqprks7qxfwkcg2m2v9hxkrchgm9akp2segrswt':'xExchange: Fees Collector',
  'erd1nu0xq58kdevp48mkrjdg8kqdtnx8qny2pgun0kq9ee624q5kly6qa6jrx5':'qowattowner',
  'erd1qqqqqqqqqqqqqpgqq66xk9gfr4esuhem3jru86wg5hvp33a62jps2fy57p':'xExchange: Router (SWAP)',
  'erd1qqqqqqqqqqqqqpgq5fj4ttp8vylx8napuuruye5rewflqr542jpsv8tauj':'xExchange: QWT/WEGLD Liquidity Pool',
  'erd1qqqqqqqqqqqqqpgqjeuna0798825adm5z3a6j3gmtf9nxmmnr2jqfss7sh':'QoWatt Staking SC',
  'erd1qqqqqqqqqqqqqpgqd3r2mh64wzcmuqtpmqs3tyluxsencr9w0y8qft6uyv':'JEXchange: Staking module (deprecated)',
  'erd1hmfwpvsqn8ktzw3dqd0ltpcyfyasgv8mr9w0qecnmpexyp280y8q47ca9d':'JEXchange: P2P swaps module',
  'erd1qqqqqqqqqqqqqpgqawkm2tlyyz6vtg02fcr5w02dyejp8yrw0y8qlucnj2':'JEXchange: P2P swaps module (deprecated)',
  'erd1qqqqqqqqqqqqqpgqr8z5hkwek0pmytcvla86qjusn4hkufjlrp8s7hhkjk':'EsdtMarket: P2P swaps module',
  'erd1kpc8u0fzxj20vgnjcqem8p6fm46jq5t74esfepy42j22g3cy9hgqawhqyh':'QoWatt Treasury',
  'erd1qqqqqqqqqqqqqpgq7dcgyej6vr8ex6u545kq58yh3nsa3t8c83gqu7aj3c':'Presale 1&2',
  'erd1qqqqqqqqqqqqqpgqexdsysjydm4v76xja4jalyp5fz5vms2z83gq9d9q0v':'Presale 3&4',
  'erd1qqqqqqqqqqqqqpgqmwwgn45jqqr5g3m5ydm8cccxynfx0r7x83gqxhhxga':'Presale 5',
  'erd1tvfx40l73kxvsz7gsy8394ke5wny66tgmwg6w9m9dyzp9c5xchxqzuypa3':'QoWatt',
  'erd1qqqqqqqqqqqqqpgq6wegs2xkypfpync8mn2sa5cmpqjlvrhwz5nqgepyg8':'XOXNO Marketplace',
  'erd1n6uyqy045djhd8u5vf2ldcfz9q9ap237zp6upjtzg0ys2yqvyawqlk2yst':'FrameIt'
};

function getNamefromAddress(adr) {
  if (namedAddress[adr]===undefined) {
    return adr;
  }
  else {
    return namedAddress[adr];
  }
}

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
            row.insertCell().textContent = getNamefromAddress(item.receiver);
            row.insertCell().textContent = getNamefromAddress(item.sender);
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
