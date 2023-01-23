require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  // defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    polygon: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/ ',
      accounts: [privateKey]
    },
    hardhat: {
    },

  },
};

// npx hardhat run src/backend/scripts/deploy.js --network polygon
// Deploying contracts with the account: 0xfdF3BE754f88500Dce5A85369E5fF6487Aa8297A
// Account balance: 700000000000000000