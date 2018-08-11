var ImageStorage = artifacts.require("./ImageStorage.sol");

contract('ImageStorage', function(accounts) {

  // Testing the saveImageHash function
  it("...should store a hash.", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.saveImageHash("abcdefgh", {from: accounts[0]});
    }).then(function(result) {
      assert.equal(result, 89, "The value 89 was not stored.");
    })
  });

});

// test init values

// test that get image back

// test that returns true or false - 2 tests?
