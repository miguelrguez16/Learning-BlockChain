const customERC20 = artifacts.require("customERC20");

contract("customERC20", accounts => {

  console.table(accounts);

  it("name", async () => {
    let instance = await customERC20.deployed();

    let _name = await instance.name.call();
    assert.equal("Miguel", _name, "Name must be equal");
  })


  it("symbol", async () => {
    let instance = await customERC20.deployed();

    let _symbol = await instance.symbol.call();
    assert.equal("MR", _symbol, "symbol must be equal");
  })

  it("decimals", async () => {
    let instance = await customERC20.deployed();

    let _decimals = await instance.decimals.call();
    assert.equal(18, _decimals, "decimals must be equal to 18");
  })

  it("newTokens", async () => {
    let instance = await customERC20.deployed();

    let _initialSupply = await instance.totalSupply.call();
    assert.equal(0, _initialSupply, "InitialSupply must be equal Zero");
  })
})