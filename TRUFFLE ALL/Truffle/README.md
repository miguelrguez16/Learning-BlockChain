# Inicio con Truffle

Iniciar un nuevo proyecto de Truffle

```bash
truffle init
```

Compilar contratos

```bash
truffle compile
```

Desplegar en red

```bash
truffle deploy

truffle migrate
```

Recompilar para relanzar

```bash
truffle migrate --reset --compile-all
```

Lanzar Test:

```bash
truffle test
```

Lanzar desde consola con js

```JavasCript
truffle console

truffle(development)> test
truffle(development)> let instanceGanache = await Ganache.deployed()
truffle(development)> instance # imprime toda la informacion
```
