import { assert } from 'chai';

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai').use(require('chai-as-promised')).should();

function tokens(num) {
  return web3.utils.toWei(num, 'ether');
}

let token;
let ethSwap;

beforeEach(async () => {
  token = await Token.new();
  ethSwap = await EthSwap.new(token.address);
});

contract('EthSwap', ([deployer, investor]) => {
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

  describe('Truffle Tokens exchanges', async () => {
    it('should have tokens in it after the transfer', async () => {
      await token.transfer(ethSwap.address, tokens('1000000'));
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokens('1000000'));
    });

    it('should allow user to purchase Truffle Tokens from EthSwap for a fixed price', async () => {
      await ethSwap.buyTokens({ from: investor, value: tokens('1') });
    });
  });
});
