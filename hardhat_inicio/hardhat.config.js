require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },

  defaultNetwork: "ganache",

  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    // polygon: {
    //   url: "urlparaPolygon",
    //   accounts: ["privateKey"]
    // }
  }
};

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
