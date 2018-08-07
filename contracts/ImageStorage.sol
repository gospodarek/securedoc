pragma solidity ^0.4.24;

contract ImageStorage {
    string ipfsInstanceHash;

    function saveImage(string imageHash) public {
        ipfsInstanceHash = imageHash;
    }

    function verifyImage() public view returns (string) {
        return ipfsInstanceHash;
    }
}
