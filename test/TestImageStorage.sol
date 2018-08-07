pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ImageStorage.sol";

contract TestImageStorage {

  function testItStoresAValue() public {
    ImageStorage imageStorage = ImageStorage(DeployedAddresses.ImageStorage());

    imageStorage.set(89);

    uint expected = 89;

    Assert.equal(imageStorage.get(), expected, "It should store the value 89.");
  }

}
