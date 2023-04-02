import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
} from "../Utils/helper-hardhat-config";
import { ethers } from "hardhat";

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  // get address governance token
  // const governanceToken = await ethers.getContractAt("GovernanceToken", (await get("GovernanceToken")).address)
  // const timeLock = await ethers.getContractAt("TimeLock", (await get("TimeLock")).address)

  const governanceToken = await ethers.getContract("GovernanceToken");
  const timeLock = await ethers.getContract("TimeLock");

  // const governanceToken = await get("GovernanceToken");
  // const timeLock = await get("TimeLock");
  log("TimeLock address: ", timeLock.address);
  log("governanceToken address: ", governanceToken.address);

  const args = [
    governanceToken.address,
    timeLock.address,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
  ];

  log("Deploying governor contract. . . ");
  log("Args: ", args);
  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args,
    log: true,
  });
};

export default deployGovernorContract;
