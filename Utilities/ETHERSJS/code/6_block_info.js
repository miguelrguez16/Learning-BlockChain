"use strict";
require('dotenv').config();

const { ethers } = require('ethers');
const urlProvider = process.env.API_ETHEREUM;

const provider = new ethers.providers.JsonRpcProvider(urlProvider);

const main = async () => {
    const lastBlockNumber = await provider.getBlockNumber();
    console.log(`Last Block Number: [${lastBlockNumber}]`);

    const blockInfo = await provider.getBlock(lastBlockNumber);
    console.log(blockInfo);
    /** 
        const transactions = blockInfo.transactions;
        console.log("Transacciones _ 0", transactions[0]);
     */
    const { transactions } = await provider.getBlockWithTransactions(lastBlockNumber);
    console.log(transactions[0]);

}

main();