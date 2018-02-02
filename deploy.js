const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// Initial message sent to contract
const INTIAL_MSG = "Hi There!";
// Take in seed argument
let seed = process.argv[2];

const deployToRinkeby = async () => {
    const {interface,bytecode} = require('./compile');
    const provider = new HDWalletProvider(
        seed,
        'https://rinkeby.infura.io/U9B2FNPYF6rBeWqCTMEZ'
    );
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log('..Attempting to deploy from account', accounts[0]);
    const res = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INTIAL_MSG]})
        .send({from: accounts[0], gas:'1000000'});
    console.log('Contract deployed to:', res.options.address);
};
if(seed){
    console.log("> Deploying with seed: [ ", seed, " ]...");
    deployToRinkeby();
} else {
    console.log("> No seed provided.  Please enter a seed phrase as your first argument.");    
}