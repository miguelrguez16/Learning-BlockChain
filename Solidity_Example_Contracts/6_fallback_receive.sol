// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FallBack_Receive {
    event Log(
        string _name,
        address _sender,
        uint256 _amountReceived,
        bytes _data
    );

    // msg.data -> NO VACIO
    fallback() external payable {
        emit Log("fallback", msg.sender, msg.value, msg.data);
    }

    receive() external payable {
        emit Log("receive", msg.sender, msg.value, "");
    }
}

/*
    Envios economicos (ether)

    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data está vacio?
              / \
            si  no
            /     \
existe receive()?  fallback()
         /   \
        si   no
        /      \
    receive()   fallback()

    msg.data --> el calldata completo, que es un area no modificable 
    y no persistente en la que se almacenan los argumentos de 
    la funcion y que se comporta principalmente como la memoria
    Area de la transasccion

*/
