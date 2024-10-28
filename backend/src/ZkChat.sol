// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "dependencies/@openzeppelin-contracts-5.1.0/access/Ownable.sol";

contract ZkChat is Ownable {
    constructor(address owner) Ownable(owner) {}

    // Define events
    event MessageSent(address indexed sender, address indexed receiver, string message);

    using EnumerableSet for EnumerableSet.AddressSet;

    // Structs
    struct User {
        string username;
        string bio;
        bool isPublic;
    }

    struct Message {
        address sender;
        address receiver;
        string message;
    }

    // State variables
    mapping (address => User) private users;
    mapping (address => EnumerableSet.AddressSet) private contacts;
    mapping (string => Message[]) private messages;

    function getPublicUsers() public view returns (User[] memory) {
        User[] memory publicUsers = new User[](users.length());
        for (uint i = 0; i < users.length(); i++) {
            address userAddress = users.at(i);
            User memory user = users[userAddress];
            if (user.isPublic) {
                publicUsers[i] = user;
            }
        }
        return publicUsers;
    }

    function updateUser(string memory username, string memory bio, bool isPublic) public {
        User storage user = users[msg.sender];
        user.username = username;
        user.bio = bio;
        user.isPublic = isPublic;
    }


}
