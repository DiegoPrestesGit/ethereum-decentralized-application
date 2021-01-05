# Ethereum Decentralized Application

## Install

* Run ``yarn global add truffle`` or ``npm install --g truffle`` to install the blockchain framework that will run the blockchain;
* Install [ganache from truffle suite](https://www.trufflesuite.com/ganache) to run a local blockchain with mocked currency
* Install [metamask](https://metamask.io/) to turn the chrome into a blockchain browser;
* You need to run Ganache to work with the migrations, he runs our local mocked blockchain

## Useful commands for the commandline

* ``truffle migrate``: executes the migrations
* ``truffle migrate --reset``: blockchain is imutable, so, it always needs to be reseted
* ``truffle console``: opens the truffle console to access data inside the blocks and smart contracts
