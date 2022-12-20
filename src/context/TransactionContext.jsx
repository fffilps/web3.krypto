import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );


  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const getAllTransactions = async () => {
    try {
      if(!ethereum) return alert("Please install metamask")
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString,
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))

      console.log(structuredTransactions)
      setTransactions(structuredTransactions)

    } catch (error) {
      console.log(error)
    }
  }
  
  //checks if wallet is available.
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      //checks if there is a metamask connected at all
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No Accounts Found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount()

      window.localStorage.setItem("transactionCount", transactionCount)
    } catch (error) {
      throw new Error("No ethereum object.");
    }
  }

  //function to connect wallet when requested
  const connectWallet = async () => {
    try {
      //checks if there is a metamask installed.
      if (!ethereum) return alert("Please install metamask");

      //gets all of the accounts on metamask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      //sets the first metamask account it finds
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
        if (!ethereum) return alert("Please install metamask");

        //get the data from the form
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = getEthereumContract();
        //changes the amount to an hexadecimal
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //21 gwei
                value: parsedAmount._hex,
            }]
        });

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
        setIsLoading(true);
        console.log(`Loading - ${transaction.hash}`)
        await transactionHash.wait()
        setIsLoading(false);
        console.log(`Success - ${transaction.hash}`)

        const transactionCount = await transactionContract.getTransactionCount()

        setTransactionCount(transactionCount.toNumber());

    } catch (error) {
        console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  useEffect(() => {
    //checks for metamask installation at the beginning of the page loading.
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    //passes the wallet to the entire app through the context right here.
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
};
