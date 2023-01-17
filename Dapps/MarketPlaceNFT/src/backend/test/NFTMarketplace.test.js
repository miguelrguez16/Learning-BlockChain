/* eslint-disable jest/valid-expect */
const { expect } = require('chai');
const { ethers } = require('hardhat');

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

// descripcion de un nuevo testin 
describe('NFTMarketplace', function () {
    let NFT;
    let nft;
    let Marketplace;
    let marketplace;
    let deployer;
    let addr1;
    let addr2;
    let addrs;
    let feePercent = 1;
    let URI = 'sample uri';

    beforeEach(async function () {
        NFT = await ethers.getContractFactory('NFT');
        Marketplace = await ethers.getContractFactory('Marketplace');
        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);

        // console.log(`
        //     Deployer: [${deployer.address}]
        //     addr1: [${addr1.address}]
        //     addr2: [${addr2.address}]
        // `)
    });


    describe("Deployment", function () {
        it('should track name and symbol of the nft collection', async function () {
            const nftName = 'FoolMeOnce';
            const nftSymbol = 'FMO';
            expect(await nft.name()).to.equal(nftName);
            expect(await nft.symbol()).to.equal(nftSymbol);
        });

        it('should track feePercent of the Marketplace', async function () {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        });
    });


    describe('Minting NFT', function () {
        it('should track each minted NFT', async function () {
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI);
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.tokenURI(2)).to.equal(URI);

        });
    });

    describe('Making MarketPlace Item', function () {
        let price = 1;
        const errorPrice = 'Price must be greater than zero';

        beforeEach(async function () {
            await nft.connect(addr1).mint(URI);
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
        });

        it('Should track newly created item', async function () {
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price)))
                .to.emit(marketplace, "Offered")
                .withArgs(1, nft.address, 1, toWei(price), addr1.address);

            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);
            const item = await marketplace.items(1);
            // console.log("Item: ", item);
            expect(item.itemId).to.equal(1);
            expect(item.tokenId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.price).to.equal(toWei(price));
            expect(item.sold).to.equal(false);
            expect(item.seller).to.equal(addr1.address);

        });


        it('Should fail if price is set to zero', async function () {
            await expect(marketplace.connect(addr1)
                .makeItem(nft.address, 1, 0))
                .to.be.revertedWith(errorPrice);
        });
    });


    describe('Purchaising MarketPlace Item', function () {
        let price = 2;
        let fee = (feePercent / 100) * price;
        let totalPriceInWei;

        beforeEach(async function () {
            await nft.connect(addr1).mint(URI);
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
            await marketplace.connect(addr1)
                .makeItem(nft.address, 1, toWei(price));
        })

        it('Should update item as sold, pay seller, transfer to buyer ,...', async function () {
            const sellerInitialBalance = await addr1.getBalance();
            const feeAccountInitialEthBal = await deployer.getBalance();

            totalPriceInWei = await marketplace.getTotalPrice(1);

            await expect(marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei }))
                .to.emit(marketplace, "Bought")
                .withArgs(1, nft.address, 1, toWei(price), addr1.address, addr2.address);


            const sellerFinalBalance = await addr1.getBalance();
            const feeAccountFinalEthBal = await deployer.getBalance();

            expect((await marketplace.items(1)).sold).to.equal(true); // just sold
            expect(+fromWei(sellerFinalBalance)).to.equal(+price + +fromWei(sellerInitialBalance)); // Selleer
            expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal)); // current owner
            expect(await nft.ownerOf(1)).to.equal(addr2.address);

        });
    });

})