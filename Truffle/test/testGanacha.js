const ganache = artifacts.require("ganache");

contract("ganache", accounts => {
    console.table(accounts);

    it('owner', async () => {
        let instance = await ganache.deployed();
        const _owner = await instance.owner.call();
        assert.equal(_owner, accounts[0], "Must be equal");
    });

    it('getMessage', async () => {
        let instance = await ganache.deployed();
        // console.log("Instance", instance);
        const _getMessage = await instance.getMessage.call();
        assert.equal(_getMessage, "", "Must be equal");
    });

    it('setMessage & getMessage', async () => {
        let instance = await ganache.deployed();
        const message = "Holaaaa.";
        const _setMessage = await instance.setMessage(message, { from: accounts[0] });
        // console.log("_setMessage: ", _setMessage);
        const _getMessage = await instance.getMessage.call();
        assert.equal(message, _getMessage, "Must be equal");
    });

    it('SmartContract Address', async () => {
        let instance = await ganache.deployed();
        const _addressSC = instance.address;
        const _smartContract = await instance.smartContract.call();
        assert.equal(_addressSC, _smartContract, "Must be equal");
    });




})