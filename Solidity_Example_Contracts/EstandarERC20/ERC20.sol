// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";

contract TokenFungible is ERC20 {

    constructor(uint256 initialSupply) ERC20("MIGUEL", "MRG") {
        _mint(msg.sender, initialSupply);
    }
}