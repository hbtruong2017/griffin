pragma solidity ^0.5.8;

contract StandardPayment {
    // This contract will be used for StandardPayment and LeavePayment
    address transferFrom;
    address payable transferTo;
    uint256 id;
    uint256 standardRate;
    uint256 deductHours;
    uint256 public paymentAmount;
    
    constructor() public {
        transferFrom = msg.sender;
    }
    
    event TransferFund(address payable _transferTo, address _transferFrom, uint paymentAmount);
    function transferFund(address payable _transferTo) public payable returns (bool){
        transferTo = _transferTo;
        transferTo.transfer(msg.value);
        emit TransferFund(transferTo, transferFrom, msg.value);
        return true;
    }
    
    function calPaymentAmount(uint _standardRate, uint _deductHours) public{
        paymentAmount = _standardRate * (8 - _deductHours);
    }
    
    function getBalanceOfCurrentAccount() public payable returns (uint) {
        return transferFrom.balance;
    }
}

contract OvertimePayment {
    // This contract will be used for OvertimePayment
    address transferFrom;
    address payable transferTo;
    uint256 id;
    uint256 overtimeRate;
    uint256 workHours;
    uint256 public paymentAmount;
    
    constructor() public {
        transferFrom = msg.sender;
    }
    
    event TransferFund(address payable _transferTo, address _transferFrom, uint paymentAmount);
    function transferFund(address payable _transferTo) public payable returns (bool){
        transferTo = _transferTo;
        transferTo.transfer(msg.value);
        emit TransferFund(transferTo, transferFrom, msg.value);
        return true;
    }
    
    function calPaymentAmount(uint _overtimeRate, uint _workHours) public{
        paymentAmount = _overtimeRate * _workHours;
    }
    
    function getBalanceOfCurrentAccount() public payable returns (uint) {
        return transferFrom.balance;
    }
}

contract BonusPayment {
    // This contract will be used for BonusPayment and ClaimPayment
    address transferFrom;
    address payable transferTo;
    uint256 id;
    uint256 public paymentAmount;
    
    constructor() public {
        transferFrom = msg.sender;
    }
    
    event TransferFund(address payable _transferTo, address _transferFrom, uint paymentAmount);
    function transferFund(address payable _transferTo) public payable returns (bool){
        transferTo = _transferTo;
        transferTo.transfer(msg.value);
        emit TransferFund(transferTo, transferFrom, msg.value);
        return true;
    }
    
    function calPaymentAmount(uint _amount) public{
        paymentAmount = _amount;
    }
    
    function getBalanceOfCurrentAccount() public payable returns (uint) {
        return transferFrom.balance;
    }
}

// 1. standard payment / leave: standard rate, deduct hours, hour = 8, 
// 2. overtime payment: overtime rate and hours
// 3. bonus rate / claim: specify amount based on condition met 
// id, account 
// 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c