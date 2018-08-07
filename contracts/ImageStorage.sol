pragma solidity ^0.4.24;

/// @title Image Storage
/// @author Marsha Gospodarek

contract ImageStorage {
    address public owner;

    struct ImageStore {
        address imageOwner;
        string ipfsInstanceHash;
    }

    mapping(string => ImageStore) imageStorage;

    constructor() public {
        owner = msg.sender;
    }

    function saveImageHash(string imageHash) public returns (string) {
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
    }

    function verifyImageOwner(string imageHash) public view returns (bool) {
        if (imageStorage[imageHash].imageOwner==owner) {
            return true;
        } else {
            return false;
        }
        // return (imageStorage[imageHash].imageOwner, imageStorage[imageHash].ipfsInstanceHash, imageStorage[imageHash].imageOwner==owner);
    }
}
