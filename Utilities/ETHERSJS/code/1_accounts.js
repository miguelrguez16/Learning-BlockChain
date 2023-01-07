"use strict";
require('dotenv').config();

const { ethers } = require('ethers');
const urlProvider = process.env.API_INFURA;

const provider = new ethers.providers.JsonRpcProvider(urlProvider);

const addressAccount = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8';

const mainAccount = async () => {
    let balanceAccount = await provider.getBalance(addressAccount);
    console.log(`\nBalance (ETH): (${addressAccount}: ${ethers.utils.formatEther(balanceAccount)})`);
};

mainAccount();
