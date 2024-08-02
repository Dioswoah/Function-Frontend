// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    mapping(address => uint256) public balances;

    // Structure to store transaction details
    struct Transaction {
        address account;
        uint256 amount;
        string txType; // "Deposit" or "Withdraw"
        uint256 timestamp;
    }

    // Mapping to store transaction history
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    function getBalance(address account) public view returns(uint256){
        return balances[account];
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balances[msg.sender];
        balances[msg.sender] += _amount;
        assert(balances[msg.sender] == _previousBalance + _amount);

        // Record transaction
        transactions[transactionCount] = Transaction({
            account: msg.sender,
            amount: _amount,
            txType: "Deposit",
            timestamp: block.timestamp
        });
        transactionCount++;

        emit Deposit(msg.sender, _amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        uint _previousBalance = balances[msg.sender];
        if (balances[msg.sender] < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balances[msg.sender],
                withdrawAmount: _withdrawAmount
            });
        }

        balances[msg.sender] -= _withdrawAmount;
        assert(balances[msg.sender] == (_previousBalance - _withdrawAmount));

        // Record transaction
        transactions[transactionCount] = Transaction({
            account: msg.sender,
            amount: _withdrawAmount,
            txType: "Withdraw",
            timestamp: block.timestamp
        });
        transactionCount++;

        emit Withdraw(msg.sender, _withdrawAmount);
    }

    function getTransaction(uint256 _id) public view returns (Transaction memory) {
        return transactions[_id];
    }
}
