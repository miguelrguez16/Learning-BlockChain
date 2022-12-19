// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Imports from OpenZepellin
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";

contract ArtToken is ERC721, Ownable {
    // Smart Contract Constructor
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    /************************************
        ATTRIBUTES AND DATA STRUCTURES
    ************************************/
    // NFT token counter
    uint256 COUNTER;

    // Price art work
    uint256 public fee = 5 ether;

    // Data Structure with the properties of the artwork
    struct Art {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarety;
    }

    // storage structure art for keepinmg artWorkjs
    Art[] public artWorks;

    // Event Declaration
    event NewArtWork(address indexed owner, uint256 id, uint256 dna);

    /************************************
                HELP FUNTIONS
    ************************************/

    // creation of a random number (requiered for the NFT properties)
    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        bytes32 hashRandomNum = keccak256(
            abi.encodePacked(block.timestamp, msg.sender)
        );
        uint256 randonNumber = uint256(hashRandomNum);
        return randonNumber % _mod;
    }

    /************************************
                NEW ART WORK 
    ************************************/

    // NFT creation (ArtWorks)
    function _createArtWork(string memory _name) internal {
        uint8 randRarity = uint8(_createRandomNum(10**3));
        uint256 randDNA = _createRandomNum(10**16);
        Art memory newArt = Art(_name, COUNTER, randDNA, 1, randRarity);
        artWorks.push(newArt);
        _safeMint(msg.sender, COUNTER);
        emit NewArtWork(msg.sender, COUNTER, randDNA);
        COUNTER++;
    }

    /************************************
                FEE MODIFIER
    ************************************/

    // NFT Token update Price
    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    /************************************
            BALANCE SMART CONTRACT
    ************************************/

    // Visualize the balance of the Smart Contract
    function infoSmartContract() external view onlyOwner returns (address, uint256)  {
        address smartContractAddress = address(this);
        uint256 smartContractMoney = address(this).balance / 10**18;

        return (smartContractAddress, smartContractMoney);
    }

    //obtain al NFT tokems (artworks)
    function getAllArtWorks() public view returns (Art[] memory) {
        return artWorks;
    }

    // Get NFT of a user
    function getOwnerArtWork(address _owner)
        public
        view
        returns (Art[] memory)
    {
        Art[] memory ownersArtWork = new Art[](balanceOf(_owner));
        uint256 count = 0;
        for (uint256 i = 0; i < artWorks.length; i++) {
            if (ownerOf(i) == _owner) {
                ownersArtWork[count] = artWorks[i];
                count++;
            }
        }
        return ownersArtWork;
    }

    /************************************
            NFT TOKEN DEVELOPMENT
    ************************************/

    // NFT Token payment
    function createRandomArtWork(string memory _name) public payable {
        require(
            msg.value >= fee,
            "Error: insuficient ethe to create an artwork"
        );
        _createArtWork(_name);
    }

    // Get Ether from the Smart Contract to the owner
    function withdraw() external payable onlyOwner {
        address payable _ownerToPay = payable(owner());
        _ownerToPay.transfer(address(this).balance);
    }

    // level up NFT artWork
    function(uint256 _idArtWok) external payable {
        require(OwnerOf(_idArtWok) == msg.sender, "Error: not owner of NFT");
        require(msg.value >= 1 ether, "Error: insuficient ether to level up")
        Art storage artToLevelUp = artWorks[_idArtWok];
        artToLevelUp.level++;
    }

}
