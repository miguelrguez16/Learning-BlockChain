// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

contract Padre {
    // almacenamiento de la info del FACTORY
    mapping(address => address) public personalContrato; // padre genera un nuevo hijo

    // emision nuevo smart contract
    function factory() public {
        address addrPersonalContract = address(
            new Hijo(msg.sender, address(this))
        );
        personalContrato[msg.sender] = addrPersonalContract;
    }
}
// desplegar padre, obtener con la direccion del usuario del despliegue
// la nueva direccion del Hijo
// cambiar al Hijo y buscar por At address
contract Hijo {
    // ED del Propietario
    Owner public propietario;

    struct Owner {
        address _owner;
        address _smartContractPadre;
    }

    // Datos recibdios para el nuevo contrato
    constructor(address _account, address _accountSmartContract) {
        propietario._owner = _account;
        propietario._smartContractPadre = _accountSmartContract;
    }
}
