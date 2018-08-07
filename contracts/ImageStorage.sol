pragma solidity ^0.4.24;

/// @title Store image hashes and addresses
/// @author Marsha Gospodarek

contract ImageStorage {
    address public owner;

    mapping(string => ImageStore) imageStorage;

    struct ImageStore {
        address imageOwner;
        string ipfsInstanceHash;
    }

    constructor() {
        owner = msg.sender;
    }

    function saveImage(string imageHash) public returns (string) {
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
    }

    function verifyImage(string imageHash) public view returns (address, string, bool) {
        return (imageStorage[imageHash].imageOwner, imageStorage[imageHash].ipfsInstanceHash, imageStorage[imageHash].imageOwner==owner);
    }
}
