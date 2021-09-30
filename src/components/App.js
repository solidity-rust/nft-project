import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import Color from '../abis/Color.json';

const App = () => {
  const [account, setAccount] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [contract, setContract] = useState();

  const web3 = new Web3(Web3.givenProvider);

  const loadBlockchainData = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Color.networks[networkId];
    if (networkData) {
      return networkData;
    } else {
      window.alert('Smart Contract is not deployed on the network.');
    }
  };

  /* (async () => {
    await loadBlockchainData();
  })();
  */

  useEffect(() => {
    const networkData = loadBlockchainData();
    const abi = Color.abi;
    const address = networkData.address;
    const colorContract = new web3.eth.Contract(abi, address);
    if (!contract) {
      setContract(colorContract);
    } else {
      console.log(contract);
    }
    // const totalSupply = await contract.methods.totalSupply().call();
    // setTotalSupply(totalSupply);
  }, [contract]);

  return (
    <>
      <div id='nft_front'>
        <nav>
          <span>NFT Colors</span>
          <span>{account ? account : 'Please login to MetaMask'}</span>
        </nav>
        <main>#{totalSupply || '0'} colors minted</main>
        <footer>@footer</footer>
      </div>
    </>
  );
};

export default App;

// global = globalThis
