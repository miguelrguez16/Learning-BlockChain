import { ethers, network } from "hardhat";
import {
    NEW_STORE_VALUE, FUNC, PROPOSAL_DESCRIPTION, developmentChains
} from "../helper-hardhat-config";


/** ASYNC FUNCTION TO PROPOSE */
export async function propose(args: any[], functionToCall: string, proposalDescription: string) {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    const encodeFunctionBoxCall = box.interface.encodeFunctionData(
        functionToCall,
        args,
    );
    /** DATA CALLING */
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
    console.log(`Proposal Description ${proposalDescription}`);

    /** Send transaction */
    const proposeTx = await governor.propose(
        [box.address],                      // list of targets
        [0],                                // list of values
        [encodeFunctionBoxCall],            // bytes of propose
        proposalDescription                 // data
    );

    await proposeTx.wait(1);


    /**
     * Como se utiliza una blockchain local 
     * donde la ejecucion con los bloques no avanza
     * debemos hacer avance en el tiempo y en la generación de bloques
     * de manera "artificial"
     */

    if (developmentChains.includes(network.name)) {

    }



}

/** CALL PROPOSE  */
propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })