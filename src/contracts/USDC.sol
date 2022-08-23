// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor() ERC20("USDC Token", "USDC") {}

    function getTokensFromFaucet(uint256 _amount) public {
        require(
            _amount <= 10000000000000000000000,
            "Airdrop amount should be less than 10000 USDC"
        );
        _mint(msg.sender, _amount);
    }
}
