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
      account: null,
      input: ''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findDoc = this.findDoc.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.

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

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts
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
      console.log("ipfs hash:",result[0].hash) // maybe set result[0].hash to
      this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        console.log("got result", result[0])
        return this.setState({ ipfsInstanceHash: result[0].hash }) // retrieve ipfs value that was set to blockchain
        console.log('ifpsInstanceHash', this.state.ifpsInstanceHash)
      })
    })
  }

  handleChange(event) {
    console.log("handling", event.target.value)
    this.setState({ input: event.target.value })
    console.log('input', this.state.input)
  }

  findDoc(event) {
    console.log("finding doc")
    event.preventDefault()
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
              <h2>Retrieve and Confirm Your Doc...</h2>
              <form >
                <input type="text" onChange={ this.handleChange } />
                <input type='button' onClick={this.findDoc} />
              </form>
              <h1>We Found Your Doc</h1>
              <img src={`https://ipfs.io/ipfs/${this.state.input}`} alt=""/>
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
