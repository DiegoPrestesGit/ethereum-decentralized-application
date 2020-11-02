const { assert } = require('chai')

const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(value) {
  return web3.utils.toWei(value, 'ether')
}

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap

  before(async() => {
    token = await Token.new()
    ethSwap = await EthSwap.new(token.address)
    
    await token.transfer(ethSwap.address, tokens('1000000'))
  })

  describe('Token deployment', async() => {
    it('Token has a name', async() => {
      const name = await token.name()

      assert.equal(name, 'CornerCurrency')
    })
  })

  describe('EthSwap deployment', async() => {
    it('EthSwap has a name', async() => {
      const name = await ethSwap.name()

      assert.equal(name, 'EthSwap Instant Exchange')
    })

    it('contract has tokens', async() => {
      const balance = await token.balanceOf(ethSwap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Token transactions', async() => {
    let result

    before(async() => {
      result = await ethSwap.buyTokens({from: investor, value: tokens('1')})
    })

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async() => {
      const investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      const ethSwapBalance = await token.balanceOf(ethSwap.address)

      assert.equal(ethSwapBalance.toString(), tokens('999900'))

      const newEthSwapBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(newEthSwapBalance.toString(), tokens('1'))
    })
  })
})
