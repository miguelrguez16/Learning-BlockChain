// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;


import "ERC20/ERC20.sol";

contract CustomERC20 is ERC20 {

    constructor() ERC20("MRG", "MRG"){}

    // creation tokens

    function createTookens() public {
        _mint(msg.sender, 1000); // 1000 tokens for a person

    }
}