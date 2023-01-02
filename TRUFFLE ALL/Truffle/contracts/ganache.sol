// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ganache {
    // address owner
    address public owner;
    address public smartContract;

    string message = "";

    // Eventos para capturar en el SC
    event NewContract(address indexed owner, address indexed smartContract);
    event NewMessage(string message);

    constructor() {
        owner = msg.sender;
        smartContract = address(this);
        emit NewContract(owner, smartContract);
    }

    function setMessage(string memory _message) public {
        message = _message;
        emit NewMessage(message);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
