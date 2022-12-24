// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

/// @title Token for Staking
/// @author Miguel Rodriguez Gonzalez
contract JamToken {

    // atributtes
    string public name = "JAM TOKEN";
    string public symbol = "JAMT";
    uint8 public decimals = 18; // decimals for totalSuply
    uint256 public totalSuplay = 1000000000000000000000000; //10**6 Tokens

    // Events
    // Event for User's token Transfer
    event TransferUserToken(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // Event for the approval of an operator
    event ApprovalOperator(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );


    // DATA STRUCTURES
    // balanceOf [address] = uint256
    mapping(address => uint256) public balanceOf;

    // Allowances
    //map[addressOwner][addressSpender] = amount
    mapping(address => mapping(address => uint256)) public allowance;


    // CONTRUCTOR

    // Once Deployed balance of Smart Contract= total suplay
    constructor() {
        balanceOf[msg.sender] = totalSuplay;
    }

    // Transfer Functions
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Error: transfer not enough balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit TransferUserToken(msg.sender, _to, _value);
        return true;
    }

    // transfer with an approve to move tokens
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(balanceOf[_from] >= _value, "Error: transfer not enough balance");
        // check allowances
        require(allowance[_from][msg.sender] >= _value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit TransferUserToken(_from, _to, _value);
        return true;
    }

    // Control Functions
    function approveOrIncreaseAllowance(address _spender, uint256 _amount )public returns (bool) {
        require(balanceOf[msg.sender] >= _amount, "Error: not enought balances");
        allowance[msg.sender][_spender] +=_amount;
        emit ApprovalOperator(msg.sender, _spender, _amount);
        return true;
    }

}
