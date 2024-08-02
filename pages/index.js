import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transaction, setTransaction] = useState(null);
  const [txId, setTxId] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    try {
      if (atm && account) {
        console.log("Fetching balance for account:", account);
        const balance = await atm.getBalance(account);
        console.log("Balance fetched:", balance.toString());
        setBalance(balance.toNumber());
      } else {
        console.error("ATM contract or account is not set");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const deposit = async () => {
    try {
      if (atm) {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const withdraw = async () => {
    try {
      if (atm) {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const getTransaction = async () => {
    try {
      if (atm && txId >= 0) {
        const tx = await atm.getTransaction(txId);
        console.log("Transaction details:", tx);
        setTransaction(tx);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  const formatTransaction = () => {
    if (transaction) {
      const { account, amount, txType, timestamp } = transaction;
      const formattedAmount = ethers.utils.formatEther(amount.toString());
      const formattedDate = new Date(timestamp * 1000).toLocaleString();
      let message = '';

      if (txType === "Deposit") {
        message = `The sender ${account} deposits ${formattedAmount} ETH.`;
      } else if (txType === "Withdraw") {
        message = `The sender ${account} withdraws ${formattedAmount} ETH.`;
      }

      return (
        <div>
          <p>Transaction ID: {txId}</p>
          <p>{message}</p>
          <p>Timestamp: {formattedDate}</p>
        </div>
      );
    }

    return <p>No transaction details available.</p>;
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <div>
          <h2>Transaction Receipt</h2>
          <input
            type="number"
            value={txId}
            onChange={(e) => setTxId(parseInt(e.target.value))}
            placeholder="Enter transaction ID"
          />
          <button onClick={getTransaction}>Get Transaction</button>
          {formatTransaction()}
        </div>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}
