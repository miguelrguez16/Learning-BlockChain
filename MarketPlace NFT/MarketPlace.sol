// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts@4.6.0/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts@4.6.0/security/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {
    address payable public immutable feeAccount; // recibira los pagos en esta direccion
    uint256 public immutable feePercent;

    uint256 public itemCount = 0;

    struct Item {
        uint256 id;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;
    }

    mapping(uint256 => Item) public items;

    event OfferedNFT(
        uint256 itemId,
        address indexed nft,
        uint256 tokendId,
        uint256 price,
        address indexed seller
    );

    event Bought(
        uint256 itemId,
        address indexed nft,
        uint256 tokendId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint256 _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC721 _nft,uint256 _tokendId, uint256 _price
    ) external nonReentrant {
        require(_price > 0, "Error. price must be greater than zero");

        itemCount++; // increment count of NFT in the market
        _nft.transferFrom(msg.sender, address(this), _tokendId); // transfer the NFT to the market

        // Save data of NFT
        items[itemCount] = Item(
            itemCount,_nft, _tokendId, _price, payable(msg.sender),false
        );

        emit OfferedNFT(itemCount, address(_nft), _tokendId, _price, msg.sender);
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint priceItem = getTotalPrice(_itemId);
        require(msg.value >= priceItem, "Error: ethers not enought for purchase this item");
        Item storage itemNFT = items[_itemId];
        require(!itemNFT.sold , "Error: NFT is not for sale");
        itemNFT.seller.transfer(itemNFT.price);
        feeAccount.transfer(priceItem - itemNFT.price);
        emit Bought(_itemId, address(itemNFT.nft), itemNFT.tokenId, itemNFT.price, itemNFT.seller, msg.sender);
    }

    function getTotalPrice(uint _itemId) public view returns (uint){
        require(_itemId > 0 && _itemId <= itemCount, "Error: item not found");
        return items[_itemId].price * (100 + feePercent) / 100;
    }
}
