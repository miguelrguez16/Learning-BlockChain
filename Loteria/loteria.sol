// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13. 0;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

/// @dev gestion de tokens
contract Loteria is ERC20, Ownable {

    // direcion contrato NFT project
    address public nft;

    // Constructor
    constructor() ERC20("lotery", "ONCE") {
        _mint(address(this), 1000);
        nft = address(new LoteriaNFT());
    }

    // Winner of the lotery
    address public winner;

    // Data Structures
    // User[addressUser] = addressContract
    mapping(address => address) userContracts;


    // Precio tokens ERC-20
    function precioTokens(uint256 _numTokens) internal pure returns(uint256){
        return _numTokens * (0.00005 ether);
    }

    // controlar el balance de una persona
    function balanceTokens(address _account) public view returns(uint256){
        return balanceOf(_account);
    }

    // controlar el balance del smart contract
    function balanceTokensSC() public view returns(uint256){
        return balanceOf(address(this));
    }

    function balanceEtherSmartContract() public view returns(uint256){
        return address(this).balance / 10**18;
    }

    // Creacion de nuevos tokens
    function mint(uint256 _amount) public onlyOwner {
        _mint(address(this), _amount);
    }

    // register user [AUTOMATIC]
    function register() internal {
        address addressUser = msg.sender;
        address adddr_personal_contract = address(new BoletosNFTs(addressUser, address(this), nft));
        userContracts[addressUser] = adddr_personal_contract;
    }


    // save info of the new user
    function userInfo(address _account) public view returns (address){
        return userContracts[_account];
    }


    // adquire tokens by the user
    function buyTokens(uint256 _numTokens) public payable {
        // is NOT register
        if(userContracts[msg.sender] == address(0)){
            register();
        }
        uint256 cost = precioTokens(_numTokens);
        require(msg.value >= cost, "Error: not enought ethers");

        uint256 balance = balanceTokensSC();
        require(_numTokens <= balance, "Compra un numero menor de tokens");

        uint256 returnTokenValue = msg.value - cost;
        // return the overCost
        payable(msg.sender).transfer(returnTokenValue);

        // envio de los tokens al cliente/usuari

        _transfer(address(this), msg.sender, _numTokens);
    }



}

contract LoteriaNFT is ERC721 {


    address public addressLotery;

    constructor() ERC721("lotery", "STE") {
        addressLotery = msg.sender;
    }

    // create an NFT(address and id)
    function safeMint(address _propietario, uint256 _numeroDeBoleto) public {
        require(msg.sender == Loteria(addressLotery).userInfo(_propietario) , "Error: solo el propietario");
        _safeMint(_propietario, _numeroDeBoleto);
    }


}

contract BoletosNFTs {

    struct BoletoPropietario {
        address propietarioBoleto;
        address contractPather;
        address contractNFT;
        address contratoUsuario;
    }
    BoletoPropietario public propietario;

    constructor(address _propietarioBoleto, address _contractPather, address _contractNFT){
        propietario = BoletoPropietario(_propietarioBoleto,_contractPather,_contractNFT, address(this));
    }


    function mintBoleto(address _propietario,uint256 _boletoId) public {
        // CONTRATO (Su direccion) + metodos
        require(msg.sender == propietario.contractPather, "Error: Not the propietary" );
        // solo ejecutado por el contrato principal
        LoteriaNFT(propietario.contractNFT).safeMint(_propietario, _boletoId);
    } 
}