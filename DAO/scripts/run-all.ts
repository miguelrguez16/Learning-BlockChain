import {
  FUNC_STORE,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
} from "../Utils/helper-hardhat-config";
import { propose } from "./propose";
import { queueAndExecute } from "./queue-execute";
import { voteMain } from "./vote";

const index = 1;

propose([NEW_STORE_VALUE], FUNC_STORE, PROPOSAL_DESCRIPTION)
  .then(() => console.log("STAGE 1: Complete"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

voteMain(0)
  .then(() => console.log("STAGE 2: Complete"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
