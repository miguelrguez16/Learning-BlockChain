import {
  FUNC_STORE,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  MIN_DELAY,
} from "../Utils/helper-hardhat-config";

import { moveBlocks } from "../Utils/move-blocks";
import { moveTime } from "../Utils/move-time";

import { ethers, network } from "hardhat";

export async function queueAndExecute() {
  const box = await ethers.getContract("Box");
  const governor = await ethers.getContract("GovernorContract");

  const args = [NEW_STORE_VALUE];

  const encodeFunctionBoxToCall = box.interface.encodeFunctionData(
    FUNC_STORE,
    args
  );

  const descriptionProposalHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );

  console.log("Queuing ...");

  const queueTx = await governor.queue(
    [box.address], // list of targets
    [0], // list of values
    [encodeFunctionBoxToCall], // bytes of propose
    descriptionProposalHash // data hashed
  );

  await queueTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(1);
  }

  console.log("Executing -- > ....");
  const executeTx = await governor.execute(
    [box.address], // list of targets
    [0], // list of values
    [encodeFunctionBoxToCall], // bytes of propose
    descriptionProposalHash // data hashed
  );

  await executeTx.wait(1);

  /// check if in the box contract exists the new value
  const boxNewValue = await box.retrieve();
  console.log(`New Box Value: ${boxNewValue.toString()}`);
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
