const Web3 = require('web3');
require('dotenv').config();
const proEther = process.env.API_INFURA;

var web3 = new Web3(proEther);
web3.eth.getBlockNumber().then(console.log);

web3.eth.getBlock("latest")
    .then((block) => {
        console.log(
            {
                blockHash: block.hash,
                blockNumber: block.number,
                Nonce: block.nonce,
                timestamp: block.timestamp
            });
    })