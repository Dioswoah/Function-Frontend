# Simple ATM Application

## Overview

Welcome to the Simple ATM application! This project features a basic ATM built using Solidity smart contracts and React for the frontend. The application allows users to deposit and withdraw ETH, track their balance, and view transaction history. The project is designed for educational purposes and demonstrates basic interactions with Ethereum smart contracts.

## Description

This ATM application includes a smart contract written in Solidity that manages deposits and withdrawals, tracks balances, and stores transaction history. The frontend is built with React, providing users with an intuitive interface to interact with the smart contract.

### Features

- **Deposit ETH:** Users can deposit ETH into their account.
- **Withdraw ETH:** Users can withdraw ETH from their account.
- **View Balance:** Users can check their current balance.
- **Transaction History:** Users can view details of past transactions.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Installation

1. **Clone the Repository:**
   Clone this repository to your local machine or open it in Gitpod.

   ```bash
   git clone [repository-url]
   cd [repository-directory]
   ```

2. **Install Dependencies:**
   Install the required npm packages.

   ```bash
   npm install
   ```

### Running the Application

1. **Start Hardhat Node:**
   Open a terminal and start the local Hardhat blockchain node.

   ```bash
   npx hardhat node
   ```

2. **Deploy the Contract:**
   Open another terminal and deploy the smart contract to the local node.

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

3. **Launch the Frontend:**
   Back in the initial terminal, start the React development server.

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

### Usage

1. **Connect MetaMask:**
   Ensure you have MetaMask installed and connected to the local Hardhat network. Use the private key from the first account provided by the Hardhat node.

2. **Interact with the ATM:**
   - **Deposit ETH:** Input the desired amount and click "Deposit".
   - **Withdraw ETH:** Input the desired amount and click "Withdraw".
   - **Check Balance:** View your current balance.
   - **View Transaction:** Enter a transaction ID to see details (receipt).

## Authors
Marc Joshua Ramos

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
