import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { ZERO_ADDRESS } from '../Utils/helper-hardhat-config';


const setupGovernanceContract: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments } = hre;
    const { log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    // const governanceToken = await ethers.getContractAt("GovernanceToken", (await get("GovernanceToken")).address)
    // const timeLock = await ethers.getContractAt("TimeLock", (await get("TimeLock")).address)
    // const governor = await ethers.getContractAt("GovernorContract", (await get("GovernorContract")).address)

    // const governanceToken = await ethers.getContractAt("GovernanceToken", deployer)
    // const timeLock = await ethers.getContractAt("TimeLock", deployer)
    // const governor = await ethers.getContractAt("GovernorContract", deployer)

    const governanceToken = await ethers.getContract("GovernanceToken");
    const timeLock = await ethers.getContract("TimeLock");
    const governor = await ethers.getContract("GovernorContract");

    log("Time lock ", timeLock.address)
    log("Setting up roles ...");

    // get rols from timelock
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    console.log(`
    ROLS 
        executorRole:   ${executorRole},
        proposerRole:   ${proposerRole}, 
        adminRole:      ${adminRole}
    `)

    // fix the rols
    // set governor as the admin of timeLock
    log(`governor address to timeLock -> Address Deployer ${deployer}`)

    const proposerTx = await timeLock.grantRole(proposerRole, deployer);
    await proposerTx.wait(1);

    // everybody can execute
    const executorTx = await timeLock.grantRole(executorRole, ZERO_ADDRESS);
    await executorTx.wait(1);

    // revoke permission
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);


}
export default setupGovernanceContract;
