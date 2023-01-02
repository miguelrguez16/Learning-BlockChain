# Truffle Pro

```bash
truffle init # creacion de un nuevo proyecto avanzado
```

1. Configurar archivo truffle-config.js a la **version:** ^0.8.4 y deployment configurar **ip** más **puerto**
2. Configurar archivo configuracion de _migrations_ para _customERC20.sol_:

   ```JavaScript
   const customERC20 = artifacts.require("customERC20");

   module.exports = function (deployer) {
        deployer.deploy(customERC20, "Miguel", "MR");
   };
   ```

3. Compilar:

   ```bash
   truffle compile
   ```

4. Lanzar migracion:

   ```bash
   truffle migrate --reset
   ```

   En caso de fallo se puede relanzar recompilando también con:

   ```bash
   truffle migrate --reset --compile-all
   ```

## Pruebas con truffle console

```JavasCript
truffle console
truffle(development)> let instance = await customERC20.deployed()
truffle(development)> instance
truffle(development)> await instance.crearTokens()
```

Respuesta:

```JavaScript

{
  tx: '0x0150dcc41565e79dab3c7c5155dacafbb4c963513e828ce92a50edca46371b7a',
  receipt: {
    transactionHash: '0x0150dcc41565e79dab3c7c5155dacafbb4c963513e828ce92a50edca46371b7a',
    transactionIndex: 0,
    blockHash: '0x8e3617fa4d89e5a580782c9d6917fcdf3f6ab4e76e17da20e1202be1623ec230',
    blockNumber: 110,
    from: '0xcd052b05a4ee665b3a7977ef3b3db8b2660018e9',
000000000000000000000000000000000000000000000000000000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,      transactionHash: '0x0150dcc41565e79dab3c7c5155dacafbb4c963513e828ce92a50edca46371b7a',        blockHash: '0x8e3617fa4d89e5a580782c9d6917fcdf3f6ab4e76e17da20e1202be1623ec230',              blockNumber: 110,      address: '0x30DE9a62f1C491cc605bE42100e381D1f3B2dA73',      type: 'mined',
      id: 'log_3ed92dfa',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
```

## Ejemplo Web 3: Get accounts Info

```JavasCript
truffle(development)>let accounts = web3.eth.getAccounts()
undefined
```

```JavasCript
truffle(development)> accounts
```

Respuesta:

```JavaScript
[
'0xCD052B05A4Ee665b3A7977eF3B3DB8b2660018E9',
'0x72C43A3c6f6fe0872ff33013f456907dD30F8Dc8',
'0x29da8F3A2Db30472EdB8046a60CCD0F71b42F399',
'0x7959842a57Ea4FA24CfF15587c7ecb8d9559fF84',
'0xEC211121535cA4693540407E78b310557008D75d',
'0x8aA58926A60E832C6fD0fd6AcC445a570baFfF67',
'0xE882daAeF89670ED17E56A2953611a6624B35bD1',
'0xE2CA2BE7E921A99301B97a459C9A410De42d1Ea2',
'0x05731fBEe2B5f9E0B9fbf832dcB274F540286f59',
'0x211A36342263692C44CC4D750C24caa3a2b5E3a2'
]
```

### Ejemplo Web 3: Get transaccion Info

```JavasCript
truffle(development)> web3.eth.getTransaction('0x0150dcc41565e79dab3c7c5155dacafbb4c963513e828ce92a50edca46371b7a')
```

Respuesta:

```JavaScript
{
   hash: '0x0150dcc41565e79dab3c7c5155dacafbb4c963513e828ce92a50edca46371b7a',
   nonce: 99,
   blockHash: '0x8e3617fa4d89e5a580782c9d6917fcdf3f6ab4e76e17da20e1202be1623ec230',
   blockNumber: 110,
   transactionIndex: 0,
   from: '0xCD052B05A4Ee665b3A7977eF3B3DB8b2660018E9',
   to: '0x30DE9a62f1C491cc605bE42100e381D1f3B2dA73',
   value: '0',
   gas: '0x13fca',
   gasPrice: '20000000000',
   input: '0x467bc5c0',
   v: '0x25',
   r: '0x955a3e6eea51dbd35dd3f64bad9d314758aee2915664dbe5509056aa68c75a0c',
   s: '0x699016a2137ff32a5ff039c4014fb2865e4ca360afc6c6e69071ae327a5d6909'
}
```

## Ejemplo Web 3: Get Chain and Node Info

```JavasCript
truffle(development)> web3.eth.getChainId()
1337
truffle(development)> web3.eth.getNodeInfo()
"EthereumJS TestRPC/v2.13.1/ethereum-js"
truffle(development)>
```

## Ejemplo Web 3: Utils

```JavaScript
# Generar números aleatorios con Web3
truffle(development)> web3.utils.randomHex(10);
"0xd64c8c1670ae5bce4f25"
```

## Recursos

- [Web3 Documentation](https://web3js.readthedocs.io/en/v1.8.1/)
