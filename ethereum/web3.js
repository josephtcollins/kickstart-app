import Web3 from 'web3';

// this will throw an error if user doesn't have metamask
// const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  // we're in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we're on the server or the user is not running metmask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/8348a19036ab4f04bfa243899fd2de6a'
  );
  web3 = new Web3(provider);
}

export default web3;