pragma solidity ^0.4.24;
import "./oraclize/usingOraclize.sol";

/// @title Image Storage
/// @author Marsha Gospodarek
/// @dev Future intention to implement Oraclize for interacting with IPFS

contract ImageStorage is usingOraclize  {
    address public owner;
    bool public stopped;
    bool public ownsimage;

    event LogReturnValue(string hash);
    event LogSender(address sender);

    struct ImageStore {
        string ipfsInstanceHash;
        address imageOwner;
    }

    mapping(string => ImageStore) imageStorage;

    constructor() public {
        stopped = false;
    }

    /// @notice Store image hash on blockchain
    /// @dev Receive image hash from FE, create imageStore struct
    function saveImageHash(string imageHash) external returns (address) {
        // throw exception if input is not valid
        require(bytes(imageHash).length > 0, "Image hash is not long enough.");
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
        emit LogReturnValue(imageStorage[imageHash].ipfsInstanceHash);
        emit LogSender(msg.sender);
        return msg.sender;
    }

    /// @notice Verify image hash belongs to account owner
    /// @dev Receive image hash from FE
    /// @return boolean indicating whether mapping with image hash and owner address was found
    function verifyImageOwner(string imageHash) external view returns (address, bool) {
        // throw exception if input is not valid
        require(bytes(imageHash).length > 0, "Image hash is not long enough.");
        emit LogSender(msg.sender);

        if (imageStorage[imageHash].imageOwner==msg.sender) {
            ownsimage = true;
        } else {
            ownsimage = false;
        }
        return(msg.sender, ownsimage);
    }

    /// @dev Pause contract functionality
    function circuitBreaker(bool _stopped) external {
        stopped = _stopped;
    }

    /// @dev Self Destruct Contract
    function kill() public  {
        // selfdestruct(owner);
    }
}

