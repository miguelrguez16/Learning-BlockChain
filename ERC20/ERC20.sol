// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

import "ERC20/IERC20.sol";

contract ERC20 is
    IERC20 //
{
    // Owner --> Tokens
    mapping(address => uint256) private _balance;
    // Owner -> Spender --> Amount
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSuply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    // VALOR = (VALOR / 10**18)
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSuply;
    }

    function getBalanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _balance[account];
    }

    function transfer(address to, uint256 amount)
        public
        view
        virtual
        override
        returns (bool)
    {
        address owner = msg.sender;
        _transfer(owner, to, amount); //llamada a metodo privado
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        returns (bool)
    {
        address owner = msg.sender;
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        returns (bool)
    {
        address owner = msg.sender;
        uint256 currentAllowance = _allowances[owner][spender];
        require(
            currentAllowance >= subtractedValue,
            "Error: decreased allowance bellow zero"
        );
        // ahorra gas en comprobaciones de solidity
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }
        return true;
    }

    // private functions

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "Error: transfer from the zero adress" );
        require(to != address(0), "Error: transfer to the zero adress" );
        _beforeTokenTransfer(from,to, amount); // hooks
        uint256 fromBalance = _balance[from];
        require(fromBalance >= amount, "Error: amount exceeds current balance");
        unchecked {
            _balance[from] = fromBalance - amount;
        }
        _balance[to] += amount;

        emit Transfer(from, to, amount);
        _afterTokenTransfer(from,to, amount); // hooks

    }
    //create token and assing them
    function _mint(address account, uint amount )internal virtual  {
        require(account != address(0), "Error: mint to the zero address");
        _beforeTokenTransfer(address(0),account, amount); // hooks
        _totalSuply +=amount;
        _balance[account] += amount;
        emit Transfer(address(0), account, amount);
        _afterTokenTransfer(address(0),account, amount); // hooks   
    }

    //burn tokens
    function _burn (address account, uint amount) internal virtual{
        require(account != address(0), "Error: burnt to the zero address");
        _beforeTokenTransfer(account, address(0), amount); // hooks
        uint256 accountBalance = _balance[account];
        require(accountBalance >= amount, "Error: burn amount exceeds current balance");
        unchecked {
            _balance[account] = accountBalance - amount;
        }
        _totalSuply -= amount;
        emit Transfer(account ,address(0),  amount);
        _afterTokenTransfer(account,address(0), amount); // hooks  
    }



}
