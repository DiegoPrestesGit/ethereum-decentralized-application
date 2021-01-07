import { assert } from 'chai';

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai').use(require('chai-as-promised')).should();

function tokens(num) {
  return web3.utils.toWei(num, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
  let token;
  let ethSwap;
  let result;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokens('1000000'));
  });

  describe('Deploys', async () => {
    it('Truffle Token should have the right name', async () => {
      const tokenName = await token.name();
      assert(tokenName, 'Truffle Token');
    });

    it('EthSwap should have the right name', async () => {
      const ethSwapName = await ethSwap.name();
      assert(ethSwapName, 'EthSwap Instant Exchange');
    });
  });

  describe('Truffle Buy Tokens', async () => {
    it('should have tokens in it after the transfer', async () => {
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokens('1000000'));
    });

    it('should allow user to purchase Truffle Tokens from EthSwap for a fixed price', async () => {
      result = await ethSwap.buyTokens({ from: investor, value: tokens('1') });
      const investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'));

      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('999900'));

      const ethSwapNewBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapNewBalance.toString(), tokens('1'));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens('100').toString());
      assert.equal(event.rate.toString(), '100');
    });
  });

  describe('Truffle Sell Tokens', async () => {
    before(async () => {
      await token.approve(ethSwap.address, tokens('100'), {from: investor});
      result = await ethSwap.sellTokens(tokens('100'), {from: investor});
    });

    it('should allow user to sell Truffle Tokens from EthSwap for a fixed price', async () => {
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens('0'));

      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('1000000'));

      const ethSwapNewBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapNewBalance.toString(), tokens('0'));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens('100').toString());
      assert.equal(event.rate.toString(), '100');
    });
  });
});
