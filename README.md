# PROJECT Secure Doc
A simple DApp allowing a user to store image hashes and account addresses on the Ethereum blockchain. Integration with IPFS to store the actual image.

## User Stories
This project is based on the "Proof of Existence dApp". It allows a user to store image hashes to the blockchain and then query the blockchain for the image hash and ownership information.

1. Upload an image.
2. On submit:
    a. Image is formatted properly to be uploaded to IPFS. An image hash is returned to the UI and the image is displayed.
    b. The smart contract stores the IPFS hash along with the owner address on the Ethereum blockchain.
3. Paste image hash into verification field. IPFS is queried for the image and displayed if found.
4. On retrieve:
    a. The smart contract is queried for owner address and image hash match. A value of true or false is returned and displayed in the UI.
5. Please refresh the page if you change accounts. This will redeploy the app and update the state with the current account.

** If you upload an image in one account and then verify that image hash, the image should display and the value of 'Are you the owner of this image?' should be true. Now switch accounts and verify the image. While the image will still be located, the value of 'Are you the owner of this image?' should be false.

## Requirements
[node v8.11.3/npm 5.6.0]

## Getting started
1. git clone https://github.com/gospodarek/securedoc.git
2. Install metamask
3. ```npm install -g truffle```
4. ```npm install -g ganache-cli```
5. ```ganache-cli```
6. Make sure metamask is connected to port 8545
7. In terminal:
8. ```cd securedoc```
9. ```npm install```
10. ```truffle compile```
11. ```truffle migrate```
12. ```npm run start```
// Serves the front-end on http://localhost:3000

## Running unit tests
  1. Run `truffle test` to execute the unit tests

## Troubleshooting
  1. Run `truffle migrate --reset` to reset the app

## ToDo
1. Create user/login functionality
2. Use Oracle library for querying IPFS for image data.
3. Create admin user for enhanced functiality - circuit breaker, mortal.
4. Accept payments for the image storage service.
5. Limit upload capabilities to images only.
