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
      isOwner: false
    }
    this.captureImage = this.captureImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyImage = this.verifyImage.bind(this);
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
      imageStorage.deployed().then((instance) => {
        this.imageStorageInstance = instance
         // the account connected to blockchain
        this.setState({ account: accounts[0] })
      })
    })
  }

  captureImage(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      //Buffer allows us to create a stream of binary data to post image to ipfs
      this.setState({ buffer: Buffer.from(reader.result) })
    }
  }

  onSubmit(event) {
    event.preventDefault()
    // uploading image to ipfs
    ipfsInstance.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error("error", error)
        return
      }
      this.imageStorageInstance.saveImageHash(result[0].hash, { from: this.state.account }).then((r) => {
        console.log("result hash", result[0].hash)
        return this.setState({ ipfsInstanceHash: result[0].hash })
      })
    })
  }

  handleChange(event) {
    this.setState({ input: event.target.value })
  }

  verifyImage(event) {
    event.preventDefault()
    this.imageStorageInstance.verifyImageOwner(this.state.input).then((r) => {
      this.setState({ isOwner: r.toString() })
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
                  <h2>1. Upload Your Image</h2>
                  <form onSubmit={this.onSubmit} >
                    <input type='file' onChange={this.captureImage} />
                    <input type='submit' />
                  </form>
                  <h3>Your Image</h3>
                  <p>This image is stored on The Ethereum Blockchain!</p>
                  <p>Image Hash: {this.state.ipfsInstanceHash}</p>
                  <img src={`https://ipfs.io/ipfs/${this.state.ipfsInstanceHash}`} alt=""/>
                </div>

                <div className="right">
                  <h2>2. Retrieve and Confirm an Image</h2>
                  <p>An image will appear if an image match is found in IPFS.</p>
                  <form >
                    <input type="text" onChange={ this.handleChange } size="50" placeholder="Image Hash..."/>
                    <input type='submit' onClick={this.verifyImage} value="Retrieve" />
                  </form>
                  <p>Are you the owner of this image? {this.state.isOwner}</p>
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
