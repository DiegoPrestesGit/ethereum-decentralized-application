import { assert } from 'chai';

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai').use(require('chai-as-promised')).should();

let token;
let ethSwap;

beforeEach(async () => {
  token = await Token.new();
  ethSwap = await EthSwap.new();
})

contract('EthSwap', (accounts) => {
  describe('Token deploy', async () => {
    it('should have the right name', async () => {
      const tokenName = await token.name();
      assert(tokenName, 'Truffle Token');
    })
  })

  describe('EthSwap deploy', async () => {
    it('should have the right name', async () => {
      const ethSwapName = await ethSwap.name();
      assert(ethSwapName, 'EthSwap Instant Exchange');
    })

    it('should have tokens in it', async () => {
      await token.transfer(ethSwap.address, '1000000000000000000000000');
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), '1000000000000000000000000');
    })
  })
})
