var ImageStorage = artifacts.require("./ImageStorage.sol");

contract('ImageStorage', function(accounts) {
  var owner = accounts[0];
  var stopped;

  // Testing the saveImageHash function - need to explain more!
  it("...should return a hash string", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.saveImageHash("testing", {from: owner});
    }).then(function(result) {
      console.log("result logs",result["logs"][0]["args"].hash)

      assert.equal(result["logs"][0]["args"].hash, "testing");
    })
  });

  // Throws error if hash is null
  // it("...should throw an error if image hash is null.", function() {
  //   return ImageStorage.deployed().then(function(instance) {
  //     imageStorageInstance = instance;

  //     return imageStorageInstance.saveImageHash("", {from: owner});
  //   }).then(function(result) {
  //     console.log(result)
  //     assert.equal(result[0], "", "The value 89 was not stored.");
  //   })
  // });

  // test init values
  // it("...should set initial variables", function() {
  //   return ImageStorage.deployed().then(function(instance) {
  //     imageStorageInstance = instance;

  //     assert.equal(stopped, false)
  //   })
  // });

  // test that returns false if no image hash for the current account owner is found on the blockchain
  it("...should return false value", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.verifyImageOwner("invalidhash");
    }).then(function(result) {
      assert.equal(result, false);
    })
  });

  // test that returns false if an image hash is found but not for the current account address
  it("...should return false value", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      imageStorageInstance.saveImageHash("abcdefgh", {from: accounts[1]});
      return imageStorageInstance.verifyImageOwner("abcdefgh");
    }).then(function(result) {
      assert.equal(result, false);
    })
  });

  // test that returns true if an image, address hash match is found on the blockchain
  it("...should return true value", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      imageStorageInstance.saveImageHash("abcdefgh", {from: owner});
      return imageStorageInstance.verifyImageOwner("abcdefgh");
    }).then(function(result) {
      assert.equal(result, true);
    })
  });

  // test that restricted, don't pass in owner

});
