// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Ganache {
    // address owner
    address public owner;
    address public smartContract;

    //Mensaje
    string mensaje = "";

    // Eventos para capturar en el SC
    event NewContract(address indexed owner, address indexed sc);

    event NewMessage(string message);



    constructor() {
        owner = msg.sender;
        smartContract = address(this);
        emit NewContract(owner, smartContract);
    }


    function setMessageNew(string memory _message) public {
        mensaje = _message;
        emit NewMessage(mensaje);
    }

    function getMessage() public view returns (string memory){
        return mensaje;
    }

}