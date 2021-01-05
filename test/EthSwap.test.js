const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai').use(require('chai-as-promised')).should();

contract('EthSwap', (accounts) => {
  describe('EthSwap deploy', async () => {
    it('should have the right name', async () => {
      const ethSwap = await EthSwap.new();
      const ethSwapName = await ethSwap.name();
      assert(ethSwapName, 'EthSwap Instant Exchange');
    })
  })

  describe('EthSwap deploy', async () => {
    it('should have the right name', async () => {
      const ethSwap = await EthSwap.new();
      const ethSwapName = await ethSwap.name();
      assert(ethSwapName, 'EthSwap Instant Exchange');
    })
  })
})
