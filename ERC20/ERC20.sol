// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

import "ERC20/IERC20.sol";

contract ERC20 is IERC20 {
    // Owner --> Tokens
    mapping(address => uint256) private _balances;
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
        return _balances[account];
    }

    function transfer(address to, uint256 amount)
        public
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
        _spendAllowance(from, spender, amount); // llama _approve y modifica _allowances
        _transfer(from, to, amount); // modifica el balance de cada uno
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

    // modifica el numero de tokens, disminuye el del from y aumenta el to
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "Error: transfer from the zero adress");
        require(to != address(0), "Error: transfer to the zero adress");
        _beforeTokenTransfer(from, to, amount); // hooks
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Error: amount exceeds current balance");
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        emit Transfer(from, to, amount);
        _afterTokenTransfer(from, to, amount); // hooks
    }

    //create token and assing them
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "Error: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount); // hooks
        _totalSuply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
        _afterTokenTransfer(address(0), account, amount); // hooks
    }

    //burn tokens
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "Error: burnt to the zero address");
        _beforeTokenTransfer(account, address(0), amount); // hooks
        uint256 accountBalance = _balances[account];
        require(
            accountBalance >= amount,
            "Error: burn amount exceeds current balance"
        );
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSuply -= amount;
        emit Transfer(account, address(0), amount);
        _afterTokenTransfer(account, address(0), amount); // hooks
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "Error: approve from zero address");
        require(spender != address(0), "Error: spender has a zero address");
        _allowances[owner][spender] = amount; // asign the amount
        emit Approval(owner, spender, amount); // emit amount was traspased to the spender
    }

    // transferFrom() call it
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            // si no es el maximo asignable
            require(
                currentAllowance >= amount,
                "Error: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, amount);
            }
        }
    }

    // Estas funciones seran utilizadas en el momento que se quiera heredar dicho contrato
    // por ello se han marcado como virtual
    // de esta manera ell contrato es modificable ante entradas el Overrided de 
    function _beforeTokenTransfer(address from, address to,uint256 amount) internal virtual{}
    function _afterTokenTransfer(address from, address to,uint256 amount) internal virtual{}

}
