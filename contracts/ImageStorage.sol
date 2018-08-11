pragma solidity ^0.4.24;

/// @title Image Storage
/// @author Marsha Gospodarek

contract ImageStorage {
    address public owner;
    bool public stopped;

    struct ImageStore {
        string ipfsInstanceHash;
        address imageOwner;
    }

    mapping(string => ImageStore) imageStorage;

    constructor() public {
        owner = msg.sender;
        stopped = false;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    /// @notice Store image hash on blockchain
    /// @dev Receive image hash from FE, create imageStore struct
    function saveImageHash(string imageHash) external restricted() returns (string) {
        require(bytes(imageHash).length > 0, "Image hash is not long enough.");// throw exception if input is not valid
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
    }

    /// @notice Verify image hash belongs to account owner
    /// @dev Receive image hash from FE
    /// @return boolean indicating whether mapping with image hash and owner address was found
    function verifyImageOwner(string imageHash) external view restricted() returns (bool) {
        require(bytes(imageHash).length > 0, "Image hash is not long enough."); // throw exception if input is not valid
        if (imageStorage[imageHash].imageOwner==owner) {
            return true;
        } else {
            return false;
        }
        // return (imageStorage[imageHash].imageOwner, imageStorage[imageHash].ipfsInstanceHash, imageStorage[imageHash].imageOwner==owner);
    }

    function circuitBreaker(bool _stopped) external restricted() {
        stopped = _stopped;
    }
}
