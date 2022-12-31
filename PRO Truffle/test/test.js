const customERC20 = artifacts.require("customERC20");

contract("customERC20", accounts => {
  // Table accounts
  //console.table(accounts);

  it("name", async () => {
    let instance = await customERC20.deployed();

    let _name = await instance.name.call();
    assert.equal("Miguel", _name, "Name must be equal");
  });


  it("symbol", async () => {
    let instance = await customERC20.deployed();

    let _symbol = await instance.symbol.call();
    assert.equal("MR", _symbol, "symbol must be equal");
  });

  it("decimals", async () => {
    let instance = await customERC20.deployed();

    let _decimals = await instance.decimals.call();
    assert.equal(18, _decimals, "decimals must be equal to 18");
  });

  it("newTokens", async () => {
    let instance = await customERC20.deployed();

    let _initialSupply = await instance.totalSupply.call();
    assert.equal(0, _initialSupply, "InitialSupply must be equal Zero in the init");

    await instance.crearTokens();

    let _afterFirstSupply = await instance.totalSupply.call();
    assert.equal(_afterFirstSupply, 1000, "First Supply equal to 1000");

    let _balance0 = await instance.balanceOf.call(accounts[0]);
    assert.equal(_balance0, 1000);

    let _balanceAddress1 = await instance.balanceOf.call(accounts[1]);
    assert.equal(_balanceAddress1, 0);
  });


  // test transfer 
  it("transfer", async () => {
    let instance = await customERC20.deployed();

    let _initialSupply = await instance.totalSupply.call();
    let _balancebefore0 = await instance.balanceOf.call(accounts[0]);
    let _balancebefore1 = await instance.balanceOf.call(accounts[1]);

    const AMOUNT_TO_TRANSFER = 10;

    // send transfer
    await instance.transfer(accounts[1], AMOUNT_TO_TRANSFER, { from: accounts[0] });
    let _balanceAfter0 = await instance.balanceOf.call(accounts[0]);
    let _balanceAfter1 = await instance.balanceOf.call(accounts[1]);

    assert.equal(_balancebefore0 - _balanceAfter0, AMOUNT_TO_TRANSFER);
    assert.equal(_balanceAfter1 - _balancebefore1, AMOUNT_TO_TRANSFER);
  });

  // test transfer 
  it("approve, allowance and transferFrom", async () => {
    let instance = await customERC20.deployed();

    let _initalAllowance = await instance.allowance(accounts[0], accounts[1]);
    assert.equal(_initalAllowance, 0);

    const AMOUNT_ALLOWANCE = 100;
    await instance.approve(accounts[1], AMOUNT_ALLOWANCE, { from: accounts[0] });

    let _current_allowance = await instance.allowance(accounts[0], accounts[1]);
    assert.equal(_current_allowance, AMOUNT_ALLOWANCE);

    await instance.transferFrom(accounts[0], accounts[2], AMOUNT_ALLOWANCE, { from: accounts[1] });

    let _allowance_after_transfer = await instance.allowance(accounts[0], accounts[1]);
    assert.equal(_allowance_after_transfer, 0); //ERROR



  });


})