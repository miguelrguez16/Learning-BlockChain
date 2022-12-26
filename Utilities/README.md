# UTILITIES

## GANACHE

- [Ganache npm](https://www.npmjs.com/package/ganache)
- [GitHub Ganache](https://github.com/trufflesuite/ganache)
- [Readme Ganache](https://github.com/trufflesuite/ganache/tree/develop/src/packages/ganache#readme)

instalar ganache:

```bash
npm install ganache
```

De manera global:

```bash
npm install ganache --global
```

### Lanzar Ganache

Se necesita en Windows un package.json para lanzar ganache

```json
{
  "scripts": {
    "ganache": "ganache --wallet.seed default --chain.allowUnlimitedContractSize"
  }
}
```

Correr Ganache con:

```bash
npm run ganache
```
