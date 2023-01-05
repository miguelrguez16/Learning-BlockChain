// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Hello {
    string public message = "Hello World";
    address private owner;

    constructor() {
        owner = msg.sender;
        console.log("Owner", msg.sender);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
