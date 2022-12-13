// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

import "ERC20/InterfazERC20.sol";

contract ERC20 is IERC20{   //
    // Owner --> Tokens 
    mapping (address => uint256) private _balance ;
    // Owner -> Spender --> Amount
    mapping (address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSuply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view returns (string memory){
        return _name;
    }


    function symbol() public view returns (string memory){
        return _symbol;
    }
}