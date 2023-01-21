# IPFS [InterPlanetary File System]

- Busqueda por contenido

**How IPFS Works:**
When you add a file to IPFS, your file is split into smaller chunks, cryptographically hashed, and given a unique fingerprint called a content identifier (CID). This CID acts as a permanent record of your file as it exists at that point in time.

## Configuracion de IPFS desktop

Fichero yml, necesitamos configurar API y Gateway

La API:

```yml
"API": {
    "HTTPHeaders": {
        "Access-Control-Allow-Methods": [
            "POST",
            "PUT",
            "GET"
        ],
        "Access-Control-Allow-Origin": [
            "https://webui.ipfs.io",
            "http://webui.ipfs.io.ipns.localhost:8080",
            "http://localhost:3000"
        ]
    }
},
```

Gateway:

```yml
"Gateway": {
    "APICommands": [
        "*"
    ],
    "HTTPHeaders": {
        "Access-Control-Allow-Headers": [
            "*"
        ],
        "Access-Control-Allow-Methods": [
            "GET",
            "POST",
            "PUT"
        ],
        "Access-Control-Allow-Origin": [
            "http://localhost:3000"
        ]
    },
```

Conexion por Javascript:

```Javascript
import { create } from 'ipfs-http-client';


// conect to localhost
const clientIpfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http'
});

const cid = await clientIpfs.add(currentFile);
const uri = `http://127.0.0.1:8080/ipfs/${result.path}`;

```
