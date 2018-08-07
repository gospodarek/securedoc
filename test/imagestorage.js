var ImageStorage = artifacts.require("./ImageStorage.sol");

contract('ImageStorage', function(accounts) {

  it("...should store the value 89.", function() {
    return ImageStorage.deployed().then(function(instance) {
      imageStorageInstance = instance;

      return imageStorageInstance.set(89, {from: accounts[0]});
    }).then(function() {
      return imageStorageInstance.get.call();
    }).then(function(storedData) {
      assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });

});
