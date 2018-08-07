# PROJECT Secure Doc
A simple DApp allowing a user to store image hashes and account addresses on the Ethereum blockchain. IPFS is used to store the actual image.

1. Upload an image.
2. Image is then formatted properly to be uploaded to IPFS. An image hash is returned to the UI.
3. The smart contract then stores the IPFS hash along with the owner address on the Ethereum blockchain.
4. With the image hash a user can query IPFS for the actual image and verify on the blockchain that they are the owner of the image.

## Requirements
[node v8.11.3/npm 5.6.0]

## Getting started
1. git clone https://github.com/gospodarek/securedoc.git
1. Install metamask and serve on port: 8545
1. ```npm install -g truffle```
1. ```npm install -g ganache-cli```
1. ```ganache-cli```
1. Open new tab in terminal then:
1. ```cd securedoc```
1. ```npm install```
1. ```truffle compile```
1. ```truffle migrate```
1. ```npm run start```
// Serves the front-end on http://localhost:3000

## Running unit tests
  1. Run `truffle test` to execute the unit tests

## User stories


## ToDo

