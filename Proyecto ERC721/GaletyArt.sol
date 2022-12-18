// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Imports from OpenZepellin
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";

contract ArtToken is ERC721, Ownable {

    // Smart Contract Constructor
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    /*
        ATTRIBUTES AND DATA STRUCTURES
    */
    // NFT token counter
    uint256 COUNTER;

    // Price art work
    uint256 fee = 5 ether;

    // Data Structure with the properties of the artwork
    struct Art {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarety;
    }

    // storage structure art for keepinmg artWorkjs
    Art[] public artWorks;

    // Event Declaration
    event NewArtWork(address indexed owner, uint256 id, uint256 dna);


    /*
        HELP FUNTIONS
    */

}
