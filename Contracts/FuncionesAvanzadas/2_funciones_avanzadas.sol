// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

contract Food {
    // Estructura de datos
    struct dinnerPlate {
        string name;
        string ingredients;
    }

    // Menu del dia
    dinnerPlate[] public menu;

    // Creacion de un nuevo menu
    function newMenu(string memory _name, string memory _ingredients) internal {
        menu.push(dinnerPlate(_name, _ingredients));
    }
}

contract Hamburguer is Food {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Cocinar una hamburguesa desde el Smart Contract principal
    function doHamburguer(string memory _ingredients, uint256 _units) external {
        require(_units <= 5, "Ups, no puedes pedir tantas hamburguesas");
        newMenu("hamburger", _ingredients);
    }

    // Modifier: permitir el acceso unicamente al owner y solo al owner
    modifier onlyOwner() {
        require(
            owner == msg.sender,
            "No tienes permisos para ejecutar esta funcion"
        );
        _;
    }

    // Restriccion a la ejecucion (solo puede el owner)
    function hashPrivateNumber(uint256 _number)
        public
        view
        onlyOwner
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_number));
    }
}
