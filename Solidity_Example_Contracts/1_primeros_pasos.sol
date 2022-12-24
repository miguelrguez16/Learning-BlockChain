// SPDX-License-Identifier: MIT

// Version
pragma solidity ^0.8.4;

// Importar Smart COntract desde OpenZepellin
import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";

/// @author Miguel Rodriguez Gonzalez
// Declaracion Smart Contract
contract FirstContract is ERC721 {
    // Direccion Propiertario
    address public owner;
    enum TYPE_PROMISE {MUST, NOT_MUST}
    /*
     * Almacenamos en "owner" direccion de lla que
     * persona que despliega el contracto
     */
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        owner = msg.sender; //msg.sender
    }
}
