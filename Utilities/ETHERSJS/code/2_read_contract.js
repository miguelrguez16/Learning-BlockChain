"use strict";
require('dotenv').config();

const { ethers } = require('ethers');
const urlProvider = process.env.API_INFURA;

const provider = new ethers.providers.JsonRpcProvider(urlProvider);

const addressSC = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const ERC20_ABI = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
];

const contract = new ethers.Contract(addressSC, ERC20_ABI, provider);

const main = async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const balance = await contract.balanceOf('0x2ae3e88eE257296859a91df7A7F25449E6170D77');

    console.log({
        nombre: name,
        simbolo: symbol,
        cantidad: totalSupply,
        balance: ethers.utils.formatEther(balance)
    });
};

main();