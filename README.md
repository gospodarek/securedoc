# PROJECT Secure Doc
A simple DApp allowing a user to store image hashes and account addresses on the Ethereum blockchain. IPFS has been integrated with to store the actual image.

## User Stories
This project is based on the "Proof of Existence dApp". It allows a user to store image hashes to the blockchain and then query the blockchain for the image and ownership information.

1. Upload an image.
2. On submit:
    a. Image is formatted properly to be uploaded to IPFS. An image hash is returned to the UI and the image is displayed.
    b. The smart contract stores the IPFS hash along with the owner address on the Ethereum blockchain.
3. Paste image hash into verification field.
4. On retrieve:
    a. IPFS is queried for the image and displayed if found.
    b. The smart contract is queried for owner address and image hash match. A value of true or false is returned and displayed in the UI.
5. Please refresh the page if you change accounts. This will redeploy the app and update the state with the current account.

## Requirements
[node v8.11.3/npm 5.6.0]

## Getting started
1. git clone https://github.com/gospodarek/securedoc.git
1. Install metamask and serve on port: 8545
1. ```npm install -g truffle```
1. ```npm install -g ganache-cli```
1. ```ganache-cli```
1. In terminal:
1. ```cd securedoc```
1. ```npm install```
1. ```truffle compile```
1. ```truffle migrate```
1. ```npm run start```
// Serves the front-end on http://localhost:3000

## Running unit tests
  1. Run `truffle test` to execute the unit tests

## Troubleshooting
  1. Run `truffle migrate --rest` to reset the app

## ToDo
1. Create user/login functionality
2. Use Oracle library for querying IPFS for image data.
3. Create admin user for enhanced functiality - circuit breaker, mortal.
4. Accept payments for the image storage service.
