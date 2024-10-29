// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "dependencies/@openzeppelin-contracts-5.1.0/access/Ownable.sol";
import {console} from "forge-std/Test.sol";

contract ZkChat is Ownable {
    constructor(address owner) Ownable(owner) {}

    // Define events
    event MessageSent(address indexed sender, address indexed receiver, string message);

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
    mapping (address => uint256) private addressToId;
    mapping (uint256 => User) private users;
    uint256 private userCount;
    mapping (uint256 => Message) private messages;
    uint256 private messageCount;
    mapping (address => mapping(address => uint256[])) private userMessages;

    function getPublicUsers() public view returns (User[] memory) {
        User[] memory publicUsers = new User[](userCount);
        uint256 publicUserCount = 0;
        for (uint i = 0; i < userCount; i++) {
            if (users[i].isPublic) {
                publicUsers[publicUserCount] = users[i];
                publicUserCount++;
            }
        }
        return publicUsers;
    }

    function updateUser(string memory username, string memory bio, bool isPublic) public {
        User storage user = users[addressToId[msg.sender]];
        user.username = username;
        user.bio = bio;
        user.isPublic = isPublic;
        userCount++;
    }

    function getUser() public view returns (User memory) {
        return users[addressToId[msg.sender]];
    }

    function sendMessage(address receiver, string memory message) public {
        Message memory newMessage = Message(msg.sender, receiver, message);
        messages[messageCount] = newMessage;
        userMessages[msg.sender][receiver].push(messageCount);
        userMessages[receiver][msg.sender].push(messageCount);
        messageCount++;
        emit MessageSent(msg.sender, receiver, message);
    }

    function getMessages(address userAddress) public view returns (Message[] memory) {
        uint256[] memory userMessageIds = userMessages[msg.sender][userAddress];
        Message[] memory userMessagesDetails = new Message[](userMessageIds.length);
        for (uint i = 0; i < userMessageIds.length; i++) {
            userMessagesDetails[i] = messages[userMessageIds[i]];
        }
        return userMessagesDetails;
    }
}
