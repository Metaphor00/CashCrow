// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CashCrowToken.sol";
contract WasteManagement {
    mapping(address => uint256) public points;
    uint256 public constant plasticBottlePoints = 10;
    uint256 public constant otherWastePoints = 5;
    uint256 public constant pointsPerToken = 100;
    CashCrowToken public token;
    constructor(address tokenAddress) {
        token = CashCrowToken(tokenAddress);
    }
    function disposePlasticBottle() public {
        points[msg.sender] += plasticBottlePoints;
    }
    function disposeOtherWaste() public {
        points[msg.sender] += otherWastePoints;
    }
    function exchangePointsForTokens() public {
        require(points[msg.sender] >= pointsPerToken, "Not enough points to exchange for tokens");
        uint256 tokensToTransfer = points[msg.sender] / pointsPerToken;
        points[msg.sender] -= tokensToTransfer * pointsPerToken;
        address(token).transfer(msg.sender,tokensToTransfer);
    }
    
}