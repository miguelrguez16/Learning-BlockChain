// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    /** tiempo de espera antes de ejecutar */
    /** lista de direcciones que pueden proponer */
    /** lista de direcciones que pueden ejecutar una propuesta */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
// queremos esperar a que un voto sea "ejecutado"
// todo aquel que tenga tokens de governancia tiene que pagar 5 tokens
// Se da tiempo a los usuarios para "largarse" si no quieren una actualizacion en la governanza
