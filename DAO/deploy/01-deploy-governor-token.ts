import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function
    (hre: HardhatRuntimeEnvironment) {
    // code here
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying governance token . . . ");

    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        // wait Confirmations:
    });

    // verify in etherscan
    log(`Deployed governance token to address: [${governanceToken.address}]`)
    // log(network);
    await delegate(governanceToken.address, deployer);
    log("deployed")
};

const delegate = async (governanceTokenAddress: string, deletedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const tx = await governanceToken.delegate(deletedAccount);
    await tx.wait();
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(deletedAccount)} `)
}


export default deployGovernanceToken;