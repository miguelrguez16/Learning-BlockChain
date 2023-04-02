# DAO

Organización Autónoma Descentralizada para almacenar un dato en un smart contract pasando por todos los estados de propuesta, voto y ejecución.

- [DAO](#dao)
  - [STEPS](#steps)
    - [First: Run Blockchain on localhost](#first-run-blockchain-on-localhost)
    - [Second: Run Scripts](#second-run-scripts)
      - [New Proposal](#new-proposal)
      - [Time to Vote](#time-to-vote)
      - [Check state from console](#check-state-from-console)
      - [Queue and Execute](#queue-and-execute)

<!-- ## TODO

1. Write the smart contract s
2. Write deployment scripts
3. Write scripts to interact with them -->

## STEPS

### First: Run Blockchain on localhost

`$ npx hardhat node --show-stack-traces`

### Second: Run Scripts

#### New Proposal

`$ npx hardhat run .\scripts\propose.ts --network localhost`

#### Time to Vote

`$ npx hardhat run .\scripts\vote.ts --network localhost`

#### Check state from console

`$ npx hardhat console --network localhost`

```bash
> const governor = await ethers.getContract("GovernorContract");
undefined
> await governor.state("90220404988540913470101718141013050912703515079583293957642033883372164516948");
4
```

Valor de state es recogido de proposals.json

4 indica que la propuesta es succeeded --> IGovernor.sol --> Enum ProposalState

#### Queue and Execute

`$ npx hardhat run .\scripts\queue-execute.ts --network localhost`
