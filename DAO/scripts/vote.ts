// TIME TO VOTE

import * as fs from "fs";
import { network, ethers } from "hardhat";

// CONSTANTS
import {
  proposalsFile,
  developmentChains,
  VOTING_PERIOD,
} from "../Utils/helper-hardhat-config";
import { moveBlocks } from "../Utils/move-blocks";

const index = 1;

async function voteMain(proposalIndex: number) {
  // get the list of proposals
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  const proposalId = proposals[network.config.chainId!.toString()].at(-1);
  // docs: see castVoteBySig

  /// AGAINST = 0; FOR = 1; ABSTAIN = 2
  const voteWay = 1;
  const reasonVote = "I like 16, that's the reason";
  const governor = await ethers.getContract("GovernorContract");

  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reasonVote
  );

  await voteTxResponse.wait(1); // just me vote
  // move blocks forward
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }

  // check state
  // IGovernor.sol -> enum ProposalState
  const stateProposal = await governor.state(proposalId);
  console.log(`STATE proposal ${proposalId} is ${stateProposal}`);

  console.log("Voted👌 > Finished");
}

voteMain(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
