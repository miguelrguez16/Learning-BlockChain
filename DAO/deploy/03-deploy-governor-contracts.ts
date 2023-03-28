import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { VOTING_DELAY, QUORUM_PERCENTAGE, VOTING_PERIOD } from '../helper-hardhat-config';


const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    // get address governance token
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");

    log("Deploying governor . . . ");
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