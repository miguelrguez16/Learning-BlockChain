# Plantilla Dapps

Dapp Defi

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Biblioteca React](https://img.shields.io/badge/react-Biblioteca-blue)](https://es.reactjs.org/)
[![Ganache - BlockaChain Local](https://img.shields.io/static/v1?label=ganache&message=BlockaChain%20Local&color=5208F0&logo=ganache)](https://trufflesuite.com/)
![Truffle Herramienta](https://img.shields.io/static/v1?label=Truffle&message=Herramienta&color=5208F0&logo=truffle)

## Environment Variables

To run this project, you (probably) need to add the following environment variables to your .env file

`API_KEY`

## Tech Stack

**Client:** React
**Server:** Solidity
**Testing** Truffle and Ganache
**BlockChain** Polygon

## Instalar los paquetes del package.json

```shell
npm i package.json
```

## Lanzar compilacion de los smart contracts

```shell
npx truffle compile
```

## Utilizar la siguiente version de node con nvm

```shell
nvm use 16.19.0
```

## Correr react (development)

```shell
npm start
```

## Migrar contratos a Ganache (BlockChain)

```shell
npx truffle migrate --reset
npx truffle migrate --reset --compile-all
```

## Ejecutar el script para la emision de los tokens de recompensa

```shell
npx truffle exec scripts\issue-token.js
```

## Configuracion truffle red binance

```JavaScript
module.exports = {
  networks: {
    development: {
      ...
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  }
```

## Importante

Para hacer la siguiente parte se debe tener un archivo .secret que permita coger el mnemonic con
la contraseña de la cartera y dicha cartera accesible para el despliegue

## Migrar a la Tesnet Binance desde truffle

```bash
npx truffle migrate --reset --network bsc
```

## Emitir recompensas en BNC

```bash
npx truffle exec scripts\issue-token.js --network bsc
```

[Más Info](https://docs.bnbchain.org/docs/truffle-new/)
