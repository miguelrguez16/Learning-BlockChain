# Learning BlockChain, Ethereum, Solidity and more

Aquí dejaré recursos que vaya encontrando sobre este gran mundo y espero tenerlo siempre actualizado

## Documentación

### Solidity

- [Documentation Solidity v 0.8.17](https://docs.soliditylang.org/en/v0.8.17/)
- [Remix IDE](https://remix.ethereum.org/)
- [Solidity CheatSheet](https://github.com/manojpramesh/solidity-cheatsheet)
- [Bool: Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)
- [More Documentation](https://github.com/bkrem/awesome-solidity)
- [Solidity by Example](https://solidity-by-example.org/)
- [¿Por qué fallback y receive?](https://blog.soliditylang.org/2020/03/26/fallback-receive-split/)
- [OpenZeppelin tokens ERC](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token)
- [ERC721 Docs OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721)

#### Programando

- [Hashing](https://docs.soliditylang.org/en/v0.8.13/units-and-global-variables.html?highlight=ripemd#mathematical-and-cryptographic-functions)
- [Send & Recept Ethe](https://docs.soliditylang.org/en/v0.8.13/security-considerations.html?#sending-and-receiving-ether)
- [using Counters for Counters.Counter;](https://ethereum.stackexchange.com/questions/97186/what-is-the-reason-behind-writing-using-counters-for-counters-counters-when-us)

### Other Resources

- [StackOverflow web3 -> stackexchange](https://stackexchange.com/)
- [RoadMap BlockChain](https://roadmap.sh/blockchain)
- [Web3 collection Resources](https://www.web3collection.app/)

### Ganache

Ser trata de una blockChain

#### Ganache CLI

Es la version de linea de comandos de Ganache, su blockChain personal para el desarrollo de Ethereum.
Ganacha CLI utiliza _ethereum.js_ para simular el comportamiento completo del cliente y hacer que el desarrollo de aplicaciones Ethereum sea más rápido, fácil, sencillo y seguro.

#### Ganache GUI

La version con interfaz gráfica

### Truffle

- [Documentacion Truffle](https://trufflesuite.com/docs/truffle/)

### Comandos

#### Migración

Migracion -> Desplegar en una BlockChain

```bash
truffle migrate
```

#### Testing

```bash
truffle test
```

```bash
truffle test <path_file_test>
```

Se permite ejecutar test en modo CI/CD

### Beneficios del uso de Truffle

1. Proporcion un enrono para el desarrollo, integracion y producción de aplicaciones (testing también)
2. Proporicion una orma automatizada de testear Smart Contracts -> `bash truffle test`
3. Los entornos de desarrollo, integracion y producción pueden configurarse para que puedan reutilizarse
4. Permite a los desarrolladores codificar en idiomas que ya dominan. (js, solidity, ts)
5. Gestión de redes para que le permite deplegar en redes públicas y privadas

### Tech Stack

**Lenguaje para Ethereum:** Solidity [![solidity - v0.8.13](https://img.shields.io/static/v1?label=solidity&message=v0.8.13&color=2ea44f&logo=solidity)](https://github.com/manifoldfinance)



**Pruebas despligue Smart Contracts:** Ganache

**Wallet:** MetaMask

**Entornos de desarrollo:** Truffle
