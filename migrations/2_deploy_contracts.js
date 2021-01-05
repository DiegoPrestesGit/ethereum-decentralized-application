/* eslint-disable no-undef */
const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = function(deployer) {
  deployer.deploy(Token);
  const token = await Token.deployed();

  deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  await token.trasfer(ethSwap.address, '1000000000000000000000000');
};
