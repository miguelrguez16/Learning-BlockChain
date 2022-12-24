// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

/// @author Miguel Rodriguez Gonzalez
contract Maths {
    // view obtiene info de la cadena de bloques
    // ya  estña

    function suma(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function mul(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) public pure returns (uint256) {
        return a / b;
    }

    function exp(uint256 a, uint256 b) public pure returns (uint256) {
        return a**b;
    }

    function mod(uint256 a, uint256 b) public pure returns (uint256) {
        return a % b;
    }

    // (x +y ) mod k
    function _addmod(
        uint256 a,
        uint256 b,
        uint256 k
    ) public pure returns (uint256,uint256) {
        return (addmod(a, b, k), (a+b)%k);
    }

    // (x +y ) mod k
    function _mulmod(
        uint256 a,
        uint256 b,
        uint256 k
    ) public pure returns (uint256,uint256) {
        return (mulmod(a, b, k), (a*b)%k);
    }
}
