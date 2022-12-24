// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13 .0;

import "DeFi/JamToken.sol";
import "DeFi/StellartToken.sol";

/// @title Controller DeFi
/// @author Miguel Rodriguez Gonzalez
contract TokenFarm {
    string public name = "Stellar Token Farm";
    address public owner;

    JamToken public jamToken; // Staking
    StellartToken public stellartToken; // Rewards

    // DATA STRUCTURES
    address[] public stakers;
    mapping(address => uint256) stakingBalance;
    mapping(address => bool) hasStaked;
    mapping(address => bool) isStaking;

    // CONSTRUCTURE
    constructor(StellartToken _stellartToken, JamToken _jamToken) {
        owner = msg.sender;
        stellartToken = _stellartToken;
        jamToken = _jamToken;
    }

    // Functions

    // Set stake tokens in the SM
    // Previous msg.sender -> approveOrIncreaseAllowance
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Error: amunt is letter than zero");
        //Transferir tokens JAM al Smart Contract principal
        jamToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // retirar staking
    function unStakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "Error: balance stake is letter than 0");

        // send tokens back
        jamToken.transfer(msg.sender, balance);

        // reset data controll
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // Emit rewards
    function rewardTokens() public {
        require(msg.sender == owner, "Error: not the owner");
        for (uint256 i = 0; i < stakers.length; i++) 
        {
            address tmpUserRewarded = stakers[i];
            uint256 balance = stakingBalance[tmpUserRewarded];
            if (balance > 0 ){
                stellartToken.transfer(tmpUserRewarded, balance);
            }
        }
    }

}
