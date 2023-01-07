"use strict";
const provider = 'https://mainnet.infura.io/v3/' + process.env.API_INFURA;
const Web3 = require('web3');
const web3 = new Web3(provider); //nodo infura

// Utilities sha3
console.log("sha3('HOLIII') ->", web3.utils.sha3("HOLIII"));
// Utilities keccak256
console.log("keccak256('HOLIII') ->", web3.utils.keccak256("HOLIII"));
// Utilities SoliditySHA3
console.log("SoliditySHA3('HOLIII') ->", web3.utils.soliditySha3("HOLIII"));
// Utilities SoliditySHA3 2 inputs
console.log("SoliditySHA3('HOLIII', 'Miguel') ->", web3.utils.soliditySha3("HOLIII", "Miguel"));
// Utilitis multiple parameters
console.log("SoliditySHA3('{type: 'string', value: 'helloworld'},{type: 'string', value: '01'}'",
  web3.utils.soliditySha3({ type: 'string', value: 'helloworld' }, { type: 'string', value: '01' }));

// Utilities random Hex
console.log("randomHex(2) ->", web3.utils.randomHex(2));

// Utilities isHex
console.log("isHex(2) ->", web3.utils.isHex(2));
// Utilities isAddres, checksum correct
console.log("isAddress(0xc1912fee45d61c87cc5ea59dae31190fffff232d) ->", web3.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d'));
