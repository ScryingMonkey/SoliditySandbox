const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

const INITIAL_MSG = "Hi There.";

let accounts;
let inbox;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MSG] })
        .send({ from: accounts[0], gas: '1000000' });
    inbox.setProvider(provider);
});

describe('Testing [Inbox.sol] contract:', () => {
    it('it compiles', () => {
        assert.ok(interface);
    });
    it('it deploys', () => {
        assert.ok(inbox);
        // console.log("..Generated " +accounts.length+ " accounts.")
        // console.log("..Account[0]: " +accounts[0]);
    });
    it('it has an address', () => {
        assert.ok(inbox.options.address);
        // console.log("..Inbox contract deployed to address: " +inbox.options.address);
    });
    it('it has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MSG);
    });
    it('it accepts new messages', async () => {
        const TEST_MSG = "Test Message.";
        await inbox.methods.setMessage(TEST_MSG)
            .send({ from: accounts[0], gas: '1000000' });
        const message = await inbox.methods.message().call();
        assert.equal(message, TEST_MSG);
    })
});