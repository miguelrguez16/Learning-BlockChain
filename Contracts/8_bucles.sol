// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

contract LoopsAndConditions {
    // suma de los 10 primeros nuemeros a partir de uno
    function sum(uint _number) public pure returns (uint)
    {
        uint aux_sum = 0;
        for (uint i = _number; i < _number + 10; i+=1) 
        {

            aux_sum+=i;
        }
        return aux_sum;
    }


    // suma de los 10 primero numero impares a partir de uno
    function oddSum(uint256 _base) public pure returns (uint256, uint256, uint256, uint256){
        uint aux_sum = 0;
        uint i_odd = 0;

        uint tmp = _base + 1;
        while(i_odd < 10){
            if(_base % 2 != 0){
                // es impar
                aux_sum+=_base;
                i_odd+=1;
            }

            _base = _base + 1;
        }
        return (_base, aux_sum, i_odd, tmp);
    }
}

