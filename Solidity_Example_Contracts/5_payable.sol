// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

/// @author Miguel Rodriguez Gonzalez
contract EthSend {
    /**
     * Funciones payable
     * Esta preparado para enviar ether
     */
    constructor() payable {}

    /**
     * Funcion que se encarga de recivir el pago hacia un smart contract
     */
    receive() external payable {}

    // EVENTOS para el estado de las transacciones
    event SendStatus(bool);
    event CallStatus(bool, bytes);

    /** 3 formas de hacer envios
     *  1º Transfer
     * 2 send
     * 3 call
     * varian en la cantidad de gas (Estipendio),
     * que envian hacia el otro smart contract
     */

    // TRANSFER
    /**
     * funcion via transfer que envia a una direccion
     * por eso se marca como payable
     * una cantidad de ether
     * transfer: void
     * GAS: 2300 u de gas
     */
    function sendViaTransfer(address payable _to) public payable {
        _to.transfer(1 ether); // para mandar gas seria solo el numero
    }

    // SEND
    /**
     * funcion via send que envia a una direccion
     * por eso se marca como payable
     * una cantidad de ether
     * send: return --> bool
     * GAS: 2300 u de gas
     */
    function sendViaSend(address payable _to) public payable {
        bool wasSent = _to.send(1 ether); // para mandar gas seria solo el numero
        emit SendStatus(wasSent);
        // si no se completa, cortamos la ejecucion
        require(wasSent == true, "Envio ether error");
    }

    // CALL
    /**
     * funcion via send que envia a una direccion
     * por eso se marca como payable
     * una cantidad de ether
     * call: return --> DOS ARGUMENTOS
     * GAS: Envia todo el gas para que asi no este restringido
     */
    function sendViaCall(address payable _to) public payable {
        (bool success, bytes memory dataInfo) = _to.call{value: 1 ether}(""); //similar a _to.transfer(1 ether)
        emit CallStatus(success, dataInfo);
        require(success == true, "Envio ether error");
    }
}

contract EthReceiver {
    event AmountReceived(uint256 amount, uint256 gasLeft); // Dira la cantidad que recibe

    receive() external payable {
        // funcion que recibe ethers
        // va a gastar un gas que será enviado previamente por una de las funciones anteriores
        emit AmountReceived(address(this).balance, gasleft());
    }
}
