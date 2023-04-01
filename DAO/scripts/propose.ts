import { ethers, network } from "hardhat";
import * as fs from 'fs';

// CONSTANTS
import {
    NEW_STORE_VALUE,
    FUNC_STORE,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    VOTING_DELAY,
    proposalsFile,
} from "../Utils/helper-hardhat-config";

// FUNCTIONS
import { moveBlocks } from "../Utils/move-blocks";

/** ASYNC FUNCTION TO PROPOSE */
export async function propose(
    args: any[],
    functionToCall: string,
    proposalDescription: string
) {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    const encodeFunctionBoxCall = box.interface.encodeFunctionData(
        functionToCall,
        args
    );
    /** DATA CALLING */
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
    console.log(`Proposal Description ${proposalDescription}`);

    /** Send transaction */
    const proposeTx = await governor.propose(
        [box.address], // list of targets
        [0], // list of values
        [encodeFunctionBoxCall], // bytes of propose
        proposalDescription // data
    );

    const proposeReceipt = await proposeTx.wait(1);

    /**
     * Como se utiliza una blockchain local
     * donde la ejecucion con los bloques no avanza
     * debemos hacer avance en el tiempo y en la generación de bloques
     * de manera "artificial"
     */

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1);
    }

    // get the proposalId from the event emitted on governor.propose
    const proposalId = proposeReceipt.events[0].args.proposalId;

    storeProposalId(proposalId);

}

function storeProposalId(proposalId: any) {
    // network.config.chainId! -> Indica que es para incidir en que existirá un chainID
    const chainId = network.config.chainId!.toString();
    let proposals: any;

    if (fs.existsSync(proposalsFile)) {
        // read all the current proposal
        proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
        console.log("File proposals exists");
    } else {
        proposals = {};
        proposals[chainId] = [];
    }
    // save the proposalId
    proposals[chainId].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8");
}



/** CALL PROPOSE  */
propose([NEW_STORE_VALUE], FUNC_STORE, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
