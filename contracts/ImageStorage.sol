pragma solidity ^0.4.24;

/// @title Image Storage
/// @author Marsha Gospodarek

contract ImageStorage {
    address public owner;

    struct ImageStore {
        string ipfsInstanceHash;
        address imageOwner;
    }

    mapping(string => ImageStore) imageStorage;

    constructor() public {
        owner = msg.sender;
    }

    /// @notice Store image hash on blockchain
    /// @dev Receive image hash from FE, create imageStore struct
    function saveImageHash(string imageHash) public returns (string) {
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
    }

    /// @notice Verify image hash belongs to account owner
    /// @dev Receive image hash from FE
    /// @return boolean indicating whether mapping with image hash and owner address was found
    function verifyImageOwner(string imageHash) public view returns (bool) {
        if (imageStorage[imageHash].imageOwner==owner) {
            return true;
        } else {
            return false;
        }
        // return (imageStorage[imageHash].imageOwner, imageStorage[imageHash].ipfsInstanceHash, imageStorage[imageHash].imageOwner==owner);
    }
}
