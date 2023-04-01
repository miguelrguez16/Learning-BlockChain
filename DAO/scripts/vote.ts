// TIME TO VOTE

import * as fs from 'fs';

// CONSTANTS
import {
    proposalsFile,
} from "../Utils/helper-hardhat-config";
const index = 0;

async function main(proposalIndex: number) {
    // get the list of proposals
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));


}

main(index).then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });