# No need to generate any newer typings

## Deploying governance token

deploying "GovernanceToken" (tx: 0x8fb17050469d144a949e93d212ac84207db53b6d0455e19c68e86fa857953b89)...: deployed at

### 0x5FbDB2315678afecb367f032d93F642f64180aa3

with 1837566 gas
delegating governance token to: DEPLOYER 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Checkpoints 1
deployed

## Deploying TimeLock

deploying "TimeLock" (tx: 0x6430a312ed6918224d06b3f84c4e71574f4dad31ce0233731bd6a0e98b78f028)...: deployed at

### 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

with 1858478 gas
Deployed TimeLock contract to address: [0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0]
TimeLock address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
governanceToken address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

## Deploying governor contract

deploying "GovernorContract" (tx: 0xc5339e5f9cccad7977f85984d5f621d1de263c60ebf9eb23a264d10ca97c0746)...: deployed at

### 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

with 3485980 gas
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Setting up roles...
governor address to timeLock 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
An unexpected error occurred:

Error: ERROR processing C:\Users\migue\OneDrive\Escritorio\Learning-BlockChain\DAO\deploy\04-setup-governance-contract.ts:
Error: VM Exception while processing transaction: reverted with reason string 'AccessControl: account 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 is missing role 0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5'
at <UnrecognizedContract>.<unknown> (0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0)
at processTicksAndRejections (node:internal/process/task_queues:95:5)
