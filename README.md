# Simple Smart Contract Project

## Overview

This project demonstrates a simple Ethereum smart contract with two functions. The contract stores a message and a number, which can be updated and retrieved through the contract's functions.

## Smart Contract

The smart contract is located in `contracts/SimpleContract.sol`. It has the following functions:
- `setMessage(string memory _message)`
- `setNumber(uint256 _number)`
- `message()`
- `number()`

## Frontend

The frontend is a simple HTML page that interacts with the smart contract using Web3.js. It displays the current values of the message and number stored in the contract and allows users to update them.

## How to Run

1. Clone the repository:
    ```sh
    git clone https://github.com/Dioswoah/Solidity1.git
    cd Solidity1
    ```

2. Compile and deploy the contract using Truffle:
    ```sh
    truffle compile
    truffle migrate
    ```

3. Open `frontend/index.html` in a browser to interact with the contract.

## Video Walkthrough

A video walkthrough of the project can be found [here](https://loom.com).

## Deployment Details

Contract Address: `YOUR_DEPLOYED_CONTRACT_ADDRESS`
