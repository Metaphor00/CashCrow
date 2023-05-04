// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract CashCrowToken is ERC20 {
    constructor() ERC20("CashCrow Token", "CCT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    function exchangePointsForTokens(uint256 points) public {
        require(points >= 100, "You must exchange at least 100 points for tokens.");
        uint256 tokensToTransfer = points / 100;
        _transfer(address(this), msg.sender, tokensToTransfer);
    }
}