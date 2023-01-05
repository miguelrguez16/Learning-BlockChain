# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
  npx hardhat help
  npx hardhat test
  REPORT_GAS=true npx hardhat test
  npx hardhat node
  npx hardhat clean --global
  npx hardhat compile
  npx hardhat run scripts/deploy.js
```

## metodo listar cuentas

```shell
  npx hardhat accounts
```

Fichero hardhat.config.js

```JavaScript
  task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  });
```

## lanzar en ganache

```shell
npx hardhat run --network ganache scripts/deploy.js
```

## Consola de hardhat

```shell
npx hardhat console
```

- config: muestra en consola la configuracion
- ethers: info del plugin instalado
-
