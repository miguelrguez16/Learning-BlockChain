import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { VOTING_DELAY, QUORUM_PERCENTAGE, VOTING_PERIOD } from '../helper-hardhat-config';
import { ethers } from 'hardhat';

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    // get address governance token
    const governanceToken = await ethers.getContractAt("GovernanceToken", (await get("GovernanceToken")).address)
    const timeLock = await ethers.getContractAt("TimeLock", (await get("TimeLock")).address)

    log("TimeLock address: ", timeLock.address);
    log("governanceToken address: ", governanceToken.address);


    log("Deploying governor contract. . . ");
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE
        ],
        log: true,
    })

}

export default deployGovernorContract;