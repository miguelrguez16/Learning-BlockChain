// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @author Miguel Rodriguez Gonzalez
contract variableModifiers {
    uint256 a;
    uint8 public b = 8;

    int256 grande = 3;
    int256 c = 2;
    int256 public d = -65;

    string str;
    string public str_public = "str_public";
    string private str_private = "str_private";

    bool buleano;
    bool public buleano_true = true;
    bool private buleano_private = false;

    bytes32 first_bytes;
    bytes4 s_bytes;
    bytes1 bytes_1;

    // Algoritmo de hash
    // abi encode packed transforma a bytes lo introducido
    bytes32 public hassing_keccak256 = keccak256(abi.encodePacked("Hola", "joan"));
    bytes32 public hassing_sha256 = sha256(abi.encodePacked("Hola", "joan"));
    bytes20 public hassing_ripemd160_bytes20 = ripemd160(abi.encodePacked("Hola", "joan"));
    bytes32 public hassing_ripemd160_bytes32 = ripemd160(abi.encodePacked("Hola", "joan"));


    address my_address;
    address public addPublic = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address public another = msg.sender;

    // ENUMS
    enum options {
        ON,
        OFF,
        UNKNOWN
    }
    options state;
    options constant defaultChoice = options.OFF;

    function turnOn() public {
        state = options.ON;
    }

    function turnOff() public {
        state = options.OFF;
    }

        function turnOnknown() public {
        state = options.UNKNOWN;
    }

    function displayState() public view returns (options) {
        return state;
    }
}
