import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';


const deployBox: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    log("Deploying Box contract");

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    });

    const boxContract = await ethers.getContractAt("Box", box.address);
    const timeLock = await ethers.getContract("TimeLock");

    log(`Address boxContract is in: ${boxContract.address}`);
    log(`Address timeLock is ${timeLock.address}`);

    const transferTx = await boxContract.transferOwnership(timeLock.address);
    await transferTx.wait(1);
    log('Transfer Ownership of box to timeLock')


    log(`\nEnd succesfully`);
}


export default deployBox;
