import React, { Component } from 'react'
import ImageStorageContract from '../build/contracts/ImageStorage.json'
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
      input: '',
      isOwner: ''
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
    const imageStorage = contract(ImageStorageContract)
    imageStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log("getting account")
      imageStorage.deployed().then((instance) => {
        console.log("deployed")
        this.imageStorageInstance = instance
        this.setState({ account: accounts[0] }) // the account connected to blockchain
        console.log("Just set state account")
        // Read the value from the contract to prove it worked.
        // return this.imageStorageInstance.verifyImage.call(accounts[0])
      // }).then((ipfsInstanceHash) => {
      //   console.log("then", ipfsInstanceHash)
      //   // Update state with value that was set to blockchain
      //   return this.setState({ ipfsInstanceHash })
      })
    })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) })
      console.log("captured image")
    }
  }

  onSubmit(event) {
    event.preventDefault()
    ipfsInstance.files.add(this.state.buffer, (error, result) => { // submitting file to ipfs
      console.log("IPFS hash: ", result[0].hash )
      if(error) {
        console.error("error", error)
        return
      }
      this.imageStorageInstance.saveImage(result[0].hash, { from: this.state.account }).then((r) => {
        console.log("got result", result[0].hash)
        return this.setState({ ipfsInstanceHash: result[0].hash }) // retrieve ipfs value that was set to blockchain
      })
    })
  }

  handleChange(event) {
    console.log("handling", event.target.value)
    this.setState({ input: event.target.value })
    console.log('input', this.state.input)
  }

  findDoc(event) {
    console.log("finding image")
    event.preventDefault()
    this.imageStorageInstance.verifyImage(this.state.ipfsInstanceHash).then((r) => {
      console.log("maybe verified?", r[2])
      return this.setState({ isOwner: r[2] })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Secure Image</a>Store your image with IPFS
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">

              <div className="row">
                <div className="left">
                  <h2>Upload Your Image...</h2>
                  <form onSubmit={this.onSubmit} >
                    <input type='file' onChange={this.captureFile} />
                    <input type='submit' />
                  </form>
                  <h3>Your Image</h3>
                  <p>This image is stored on The Ethereum Blockchain!</p>
                  <p>Hash: {this.state.ipfsInstanceHash}</p>
                  <img src={`https://ipfs.io/ipfs/${this.state.ipfsInstanceHash}`} alt=""/>
                </div>

                <div className="right">
                  <h2>Retrieve and Confirm an Image...</h2>
                  <p>An image will appear if an image match is found in IPFS.</p>
                  <form >
                    <input type="text" onChange={ this.handleChange } size="50" placeholder="Image hash..."/>
                    <input type='submit' onClick={this.findDoc} />
                  </form>
                  <p>Is Owner: {this.state.isOwner}</p>
                  <img src={`https://ipfs.io/ipfs/${this.state.input}`} alt=""/>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }
}


export default App
