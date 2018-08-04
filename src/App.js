import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfsInstance from './ipfs'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsInstanceHash: '',
      web3: null,
      buffer: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts.s
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance
        console.log("account: ", accounts[0])
        this.setState({ account: accounts[0] }) // the account connected to blockchain
        // Read the value from the contract to prove it worked.
        return this.simpleStorageInstance.get.call(accounts[0])
      }).then((ipfsInstanceHash) => {
        // Update state with value that was set to blockchain
        return this.setState({ ipfsInstanceHash })
      })
    })
  }

  captureFile(event) {
    // need to format file here
    console.log("capturing file")
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) })
    }
  }

  onSubmit(event) {
    event.preventDefault()
    ipfsInstance.files.add(this.state.buffer, (error, result) => { // submitting file to ipfs
      console.log("added to ipfs")
      if(error) {
        console.error("error", error)
        return
      }
      console.log("result[0]",result[0]) // maybe set result[0].hash to
      this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        console.log("got result")
        return this.setState({ ipfsHash: result[0].hash }) // retrive ipfs value that was set to blockchain
        console.log('ifpsInstanceHash', this.state.ifpsInstanceHash)
      })
    })
  }


  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Secure Doc</a>Store your docs between the planets
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Welcome!</h1>
              <h2>Upload Your Doc...</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>

              <h1>Your Doc</h1>
              <p>This document is stored on The Ethereum Blockchain!</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsInstanceHash}`} alt=""/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
