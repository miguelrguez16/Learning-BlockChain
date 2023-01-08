"use strict";
require('dotenv').config();

const { ethers } = require('ethers');
const urlProvider = process.env.API_INFURA;

const provider = new ethers.providers.JsonRpcProvider(urlProvider);
const addressSC = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI contract

const ERC20_ABI = [
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const contract = new ethers.Contract(addressSC, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const block = await provider.getBlockNumber();

  console.log({
    nombre: name,
    simbolo: symbol,
    cantidad: totalSupply,
    block: block
  });

  /** Filtrado de eventos recientes */
  const transferEvents = await contract.queryFilter('Transfer', block - 5, block);
  console.log("Eventos entre bloques ", transferEvents);
};

main();