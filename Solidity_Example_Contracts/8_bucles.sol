// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

/// @author Miguel Rodriguez Gonzalez
contract LoopsAndConditions {
    // suma de los 10 primeros nuemeros a partir de uno
    function sum(uint256 _number) public pure returns (uint256) {
        uint256 aux_sum = 0;
        for (uint256 i = _number; i < _number + 10; i += 1) {
            aux_sum += i;
        }
        return aux_sum;
    }

    // suma de los 10 primero numero impares a partir de uno
    function oddSum(uint256 _base)
        public
        pure
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 aux_sum = 0;
        uint256 i_odd = 0;

        uint256 tmp = _base + 1;
        while (i_odd < 10) {
            if (_base % 2 != 0) {
                // es impar
                aux_sum += _base;
                i_odd += 1;
            }

            _base = _base + 1;
        }
        return (_base, aux_sum, i_odd, tmp);
    }

    function sum_rest(
        string memory typeOperation,
        uint256 a,
        uint256 b
    ) public pure returns (uint256) {
        bytes32 hashOperation = keccak256(abi.encodePacked(typeOperation));
        bytes32 hashSuma = keccak256(abi.encodePacked("suma"));
        bytes32 hashResta = keccak256(abi.encodePacked("resta"));

        if (hashOperation == hashSuma) {
            return a + b;
        } else if (hashOperation == hashResta) {
            return a - b;
        } else {
            return 0;
        }
    }
}
