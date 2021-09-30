const { assert } = require('chai');

/* eslint-disable no-undef */
const Color = artifacts.require('../contracts/Color.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Color', (accounts) => {
  before(async () => {
    // before hook running before each test
    contract = await Color.deployed();
  });

  describe('deployment', async () => {
    // container for following tests
    it('deployed successfully', async () => {
      const address = contract.address;
      console.log('address is:', address);
      assert.notEqual(address, '');
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await contract.name();
      assert.equal(name, 'Color');
    });

    it('has the right symbol', async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, 'CLR');
    });
  });

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('#dc143c');
      const totalSupply = await contract.totalSupply();

      // SUCCESS
      const event = result.logs[0].args;
      assert.equal(totalSupply, 1, 'supply is OK');
      assert.equal(event.tokenId.toNumber(), totalSupply - 1, 'token id is OK');
      assert.equal(
        event.from,
        '0x0000000000000000000000000000000000000000',
        'from address is OK'
      );
      assert.equal(event.to, accounts[0], 'to address is OK');

      // FAILURE : cannot mint same color twice
      await contract.mint('#dc143c').should.be.rejected;
    });
  });

  describe('indexing', async () => {
    it('lists colors', async () => {
      // Mint a few more colors
      await contract.mint('#6495ed');
      await contract.mint('#000000');
      await contract.mint('#8fbc8f');
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 4, 'total supply is ok');

      let result = [];
      const expected = ['#dc143c', '#6495ed', '#000000', '#8fbc8f'];

      for (let i = 1; i <= totalSupply; i++) {
        let color = await contract.colors(i - 1);
        result.push(color);
      }

      assert.equal(
        result.join(','),
        expected.join(','),
        'listing colors is ok'
      );
    });
  });
});
