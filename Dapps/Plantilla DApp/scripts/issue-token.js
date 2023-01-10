// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require('TokenFarm');

// Emision de Tokens (recompensas)
module.exports = async function (callback) {
    const tokenFarm = await TokenFarm.deployed();
    console.log('token farm info: ', tokenFarm)
    await tokenFarm.issueTokens();
    console.log("Tokens emitidos");

    callback();
}
