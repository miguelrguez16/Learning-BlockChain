// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


// guardar de alguna manera la imagen del NFT de manera descentralzida
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
// guardaremos la uri en ipfs

contract NFT is ERC721URIStorage {
    uint public tokenCount = 0;

    constructor() ERC721("dApp NFT","MRG"){}

    function mint(string memory _tokenUri) external returns (uint){
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenUri);
        return tokenCount;
    }

}