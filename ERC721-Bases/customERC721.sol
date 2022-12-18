// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

// Importancion de SC de OpenZepellin
import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";


contract CustomNFT is ERC721{

    // Contadores para los IDs de los NFTs
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; //Counter of NFTs created

    // constructor con llamada al super
    constructor( string memory _name, string memory _symbol) ERC721(_name, _symbol){}


    // Send a NFT

    function sendNFT(address _account) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(_account, newItemId); // send it
    }
}

// Persona 1 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 --> Owner
// Persona 2 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2  --> Operador