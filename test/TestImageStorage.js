var ImageStorage = artifacts.require("./ImageStorage.sol");

contract('ImageStorage', function(accounts) {
  var accountAddress = accounts[0];
  var stopped;

  // Testing that the saveImageHash function returns the image hash in its results that will be displayed in the UI
  it("...should return a hash string", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.saveImageHash("QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF", {from: accountAddress});
    }).then(function(result) {
      console.log("result logs",result["logs"][0]["args"].hash)

      assert.equal(result["logs"][0]["args"].hash, "QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF");
    })
  });

  // Testing that the saveImageHash function throws an error if the image hash is not 46 characters long (IPFS length)
  it("should throw an error if image hash is not valid length", async() => {
    const instance = await ImageStorage.deployed()

    let err = null
    try {
        await instance.saveImageHash({from: accountAddress, value: "not46characters"})
    } catch (error) {
      err = error
    }
    assert.ok(err instanceof Error)
  })

  // Testing that initial values are set accordingly
  it("should test intial stopped value", async() => {
    const instance = await ImageStorage.deployed()

    //get and test init stopped value
    const initStopped = await instance.stopped.call()
    assert.equal(initStopped, false, "Stopped should be false on init")
  })

  // Testing that the verifyImageOwner function returns false if no image hash belonging to current account address or any address is found on the blockchain
  it("...should return false value if no matching hash", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.verifyImageOwner("QmP8lwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF");
    }).then(function(result) {
      assert.equal(result[1], false);
    })
  });

  // Testing that the verifyImageOwner function returns false for the current account address even though the image hash was found
  it("...should return false value if hash doesn't match current account", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      imageStorageInstance.saveImageHash("QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF", {from: accounts[1]});
      return imageStorageInstance.verifyImageOwner("QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF");
    }).then(function(result) {
      assert.equal(result[1], false);
    })
  });

  // Testing that the verifyImageOwner function returns true if an image, current account address hash match is found on the blockchain
  it("...should return true value", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      imageStorageInstance.saveImageHash("QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF", {from: accountAddress});
      return imageStorageInstance.verifyImageOwner("QmP8KwvBKDDd1gX3MuGjoXaaf7BG9LhBFk5pPCxtkULerF");
    }).then(function(result) {
      assert.equal(result[1], true);
    })
  });

});
