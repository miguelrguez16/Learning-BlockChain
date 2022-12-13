// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Funciones {
    uint256 x = 100;

    /*
     * PURE: NO se llama a la blockchain
     */
    function getName() public pure returns (string memory) {
        return "Miguel";
    }

    /*
     * VIEW: Se llama a la blockchain
     */
    function getNumber() public view returns (uint256) {
        return x * 2;
    }
}
