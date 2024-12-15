// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17 ;

contract chai {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Memo[] memos;
    address payable  owner;
    // address payable public owner;

    constructor() {
        owner = payable(msg.sender);// Set your Metamask address as owner during deployment
    }

    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos ;
    }

    // // Function to receive Ether and immediately forward it to the owner
    // receive() external payable {
    //     forwardFunds();
    // }

    // function forwardFunds() internal {
    //     require(address(this).balance > 0, "No funds to forward");
    //     owner.transfer(address(this).balance); // Transfer all Ether to your Metamask address
    // }
}

