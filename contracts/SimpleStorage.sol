pragma solidity 0.4.24;

contract SimpleStorage {
    string ipfsInstanceHash;
    // array tags;

    function set(string x) public {
        ipfsInstanceHash = x;
    }

    function get() public view returns (string) {
        return ipfsInstanceHash;
    }
}
