// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract Loteria is ERC20, Ownable {
    // #############################
    // GESTION DE TOKENS
    // #############################

    // direcion contrato NFT project
    address public nft;

    // Constructor
    constructor() ERC20("lotery", "ONCE") {
        _mint(address(this), 1000);
        nft = address(new LoteriaNFT());
    }

    // Winner of the lotery
    address public winner;

    // Data Structures
    // User[addressUser] = addressContract
    mapping(address => address) userContracts;
}

contract LoteriaNFT is ERC721 {
    // Constructor
    constructor() ERC20("lotery", "STE") {}
}
