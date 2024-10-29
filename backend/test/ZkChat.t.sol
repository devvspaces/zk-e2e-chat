// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {ZkChat} from "../src/ZkChat.sol";

contract ZkChatTest is Test {
    ZkChat public zkChat;

    function setUp() public {
        zkChat = new ZkChat(address(this));
    }

    function test_updateUser() public {
        zkChat.updateUser("alice", "bio", true);
        ZkChat.User memory user = zkChat.getUser();
        assertEq(user.username, "alice");
    }

    function test_getPublicUsers() public {
        zkChat.updateUser("alice", "bio", true);
        ZkChat.User[] memory publicUsers = zkChat.getPublicUsers();
        assertEq(publicUsers.length, 1);
    }

    function test_sendMessage() public {
        vm.prank(address(0));
        zkChat.updateUser("bob", "bio", true);
        zkChat.updateUser("alice", "bio", true);

        zkChat.sendMessage(address(0), "hello");
        ZkChat.Message memory message = zkChat.getMessages(address(0))[0];
        assertEq(message.sender, address(this));
    }
}
