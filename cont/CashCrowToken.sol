// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CashCrowToken {
    string public constant name = "CashCrow Token";
    string public constant symbol = "CCT";
    uint8 public constant decimals = 18;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 public totalSupply;

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balances[msg.sender] = initialSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value && _value > 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0);
        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract WasteManagement {
    mapping(address => uint256) public points;
    uint256 public constant pointsPerToken = 100;

    function disposePlasticBottle() public {
        points[msg.sender] += 10;
    }

    function disposeOtherWaste() public {
        points[msg.sender] += 5;
    }

    function exchangePointsForTokens() public {
        require(points[msg.sender] >= pointsPerToken);
        points[msg.sender] -= pointsPerToken;
        CashCrowToken cct = CashCrowToken(0x10958A5c5E4D0609CB46b41681d81A5B2FEfB653);
        cct.transfer(msg.sender, 1);
    }
}
