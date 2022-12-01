// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract data_structures {
    // client struct
    struct Customer {
        uint256 id;
        string name;
        string email;
    }

    // Variable de tipo Customer
    Customer customer_1 = Customer(1, "Samue", "prueba@gmail.com");

    /**
     *       ARRAYS
     */
    // Arrays de uint y logn fija
    uint256[5] public fixed_list_uints = [1, 2, 43, 5, 2];

    // Arrays dinamicos
    uint256[] public dynamic_list_uints;

    Customer[] public array_clients;

    function add_client(
        uint256 _id,
        string memory _name,
        string memory _email
    ) public {
        //array_clients.push( Customer(_id, _name, _email));
        // con memory hacemos que no se guarde en la blockChain
        Customer memory random_customer = Customer(_id, _name, _email);
        array_clients.push(random_customer);
    }

    /**
     *       MAPPINGS
     */

    // como una wallet
    mapping(address => uint256) public address_amount;
    //una wallet con multiples cantidades
    mapping(string => uint256[]) public string_list_amount;
    // relacionamos los datos de una person con sus datos
    mapping(address => Customer) public address_customer;

    // asingar un numero a una direccion
    function assingAmountToAddress(uint256 _amount) public {
        address_amount[msg.sender] = _amount;
    }

    // asingar un numero a una direccion
    function assingAmountToList(string memory _name, uint256 _number) public {
        string_list_amount[_name].push(_number);
    }

    // asingar estructura a una direccion
    function assignDataStructure(
        uint256 _id,
        string memory _name,
        string memory _email
    ) public {
        address_customer[msg.sender] = Customer(_id, _name, _email);
    }
}
