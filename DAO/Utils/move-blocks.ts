import { network } from "hardhat";

export async function moveBlocks(amount: number) {
    console.log("Moving blocks --> ....");
    for (let i = 0; i < amount; i++) {
        /// move blocks forward
        /// https://hardhat.org/hardhat-network/docs/reference#evm-mine
        await network.provider.request({
            method: "evm_mine",
            params: [],
        });
    }
    console.log(".... <-- blocks moved");
}
