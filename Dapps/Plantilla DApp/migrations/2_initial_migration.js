const JamToken = artifacts.require("JamToken");
const StellartToken = artifacts.require("StellartToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {

    // Despligue de Smart Contracts
    await deployer.deploy(JamToken);
    const jamToken = await JamToken.deployed();

    await deployer.deploy(StellartToken);
    const stellartToken = await StellartToken.deployed();

    await deployer.deploy(TokenFarm, stellartToken.address, jamToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // Transferir tokens a TokenFarm
    // ( 1 millon de tokens de recompensa)
    await stellartToken.transfer(tokenFarm.address, '100000000000000000000');

    // Transeferencia de Tokens para Staking
    // await jamToken.transfer(accounts[1], '100000000000000000000');




};
