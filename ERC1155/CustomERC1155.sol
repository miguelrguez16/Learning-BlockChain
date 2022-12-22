// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

import "@openzeppelin/contracts@4.5.0/token/ERC1155/ERC1155.sol";

contract CustomERC1155 is ERC1155{
    // Situacion
    // publicacion de unos tokens a una MarketPlace

    uint256 public constant  GOLD_POKEMON = 0;
    uint256 public constant  SILVER_POKEMON = 1;
    uint256 public constant  THOR_HAMMER = 2;
    uint256 public constant  SWORD = 3;
    uint256 public constant  SHIELD = 4;


    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD_POKEMON, 10**18, "");
        _mint(msg.sender, SILVER_POKEMON, 10**27, "");
        _mint(msg.sender, THOR_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**8, "");
    }


}