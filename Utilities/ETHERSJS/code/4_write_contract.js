"use strict";

const { ethers } = require('ethers');
// HTTP://127.0.0.1:7545 GANACHE
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');

const account1 = '0xCD052B05A4Ee665b3A7977eF3B3DB8b2660018E9';
const account2 = '0x72C43A3c6f6fe0872ff33013f456907dD30F8Dc8';

const privateKey1 = 'd543ec3a5023daf4325c2d9ca89d5127f15e361597b39c7140f86993bc38bca8';

const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint256)"
];

/* from remix IDE  */
const customERC20address = '0xd3646A968990db104C5b8740e04eAD82b6bd81f7';


const contract = new ethers.Contract(customERC20address, ERC20_ABI, provider);

const main = async () => {
    let balance1 = await contract.balanceOf(account1);
    let balance2 = await contract.balanceOf(account2);

    const decimals = await contract.decimals();
    console.log(`Number of decimals: ${decimals}`);
    console.log(`Balance [${account1}]: [${balance1 / 10 ** decimals} CustomERC20]`);
    console.log(`Balance [${account2}]: [${balance2 / 10 ** decimals} CustomERC20]`);

    const contractWallet = contract.connect(wallet);
    const tx = await contractWallet.transfer(account2, balance1);
    await tx.wait();

    console.log("tx:", tx);

    balance1 = await contract.balanceOf(account1);
    balance2 = await contract.balanceOf(account2);
    console.log(`Balance [${account1}]: [${balance1 / 10 ** decimals} CustomERC20]`);
    console.log(`Balance [${account2}]: [${balance2 / 10 ** decimals} CustomERC20]`);

}
main();