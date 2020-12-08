const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'REDACTED',
  'https://rinkeby.infura.io/v3/8348a19036ab4f04bfa243899fd2de6a'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  
  console.log('Attempting to deploy ', accounts[0]);
  
  const res = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to ', res.options.address);
}
deploy();