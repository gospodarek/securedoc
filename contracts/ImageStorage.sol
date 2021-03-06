pragma solidity ^0.4.24;
import "./oraclize/usingOraclize.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// @title Image Storage
/// @author Marsha Gospodarek
/// @dev Future intention to implement Oraclize for interacting with IPFS

contract ImageStorage is usingOraclize, Ownable  {
    address public contractOwner;
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
        contractOwner = msg.sender;
        stopped = false;
    }

    /// @dev Receive image hash from FE, create imageStore struct and store on blockchain
    function saveImageHash(string imageHash) external returns (address) {
        // throw exception if input is not valid
        require(bytes(imageHash).length == 46, "Image hash is not long enough.");
        imageStorage[imageHash] = ImageStore({ipfsInstanceHash: imageHash, imageOwner: msg.sender});
        emit LogReturnValue(imageStorage[imageHash].ipfsInstanceHash);
        emit LogSender(msg.sender);
        return msg.sender;
    }

    /// @notice Verify image hash belongs to account address
    /// @dev Receive image hash from FE
    /// @return address, boolean indicating whether mapping with image hash and address was located
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

    /// @dev Pause contract functionality, retricted to contract owner
    function circuitBreaker(bool _stopped) external onlyOwner() {
        stopped = _stopped;
    }

    /// @dev Self Destruct Contract, retricted to contract owner
    function kill() public onlyOwner() {
        selfdestruct(contractOwner);
    }
}

