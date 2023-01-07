"use strict";

const { ethers } = require('ethers');
// HTTP://127.0.0.1:7545 GANACHE
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');

const account1 = '0xCD052B05A4Ee665b3A7977eF3B3DB8b2660018E9';
const account2 = '0x72C43A3c6f6fe0872ff33013f456907dD30F8Dc8';

const privateKey1 = 'd543ec3a5023daf4325c2d9ca89d5127f15e361597b39c7140f86993bc38bca8';
const privateKey2 = '6e26703a549a964865f9d23312348d7470ae72b7398bc3f300b6bcb51f40db9e';

const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1);
    console.log(`Balance Account 1 before: ${ethers.utils.formatEther(senderBalanceBefore)} ETH`);
    const receiptBalanceBefore = await provider.getBalance(account2);
    console.log(`Balance Account 2 before: ${ethers.utils.formatEther(receiptBalanceBefore)} ETH`);

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    });

    await tx.wait();
    console.log(tx);

    const senderBalanceAfter = await provider.getBalance(account1);
    console.log(`Balance Account 1 After: ${ethers.utils.formatEther(senderBalanceBefore)} ETH`);
    const receiptBalanceAfter = await provider.getBalance(account2);
    console.log(`Balance Account 2 After: ${ethers.utils.formatEther(receiptBalanceBefore)} ETH`);

}
main();