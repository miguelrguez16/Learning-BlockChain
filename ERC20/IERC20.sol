// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

// interfaz con las operaciones necesarios para nuestro token
// view permite que con la herencia se pueda hacer override
interface IERC20 {

    function totalSupply() external view returns (uint256);

    function getBalanceOf(address account) external view returns (uint256);

    function transfer(address _to, uint256 amount) external returns (bool);

    // owner lends some tokens to the spender
    // @returns uint value of tokens to use by the spender
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256) external returns (bool);

    function transferFrom(
        address _from,
        address _to,
        uint256 amount
    ) external returns (bool); 


    // EVENTS

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
