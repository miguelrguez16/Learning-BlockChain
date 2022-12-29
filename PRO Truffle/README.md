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
