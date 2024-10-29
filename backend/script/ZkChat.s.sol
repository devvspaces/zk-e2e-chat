// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ZkChat} from "../src/ZkChat.sol";

contract MyScript is Script {

    function setUp() public {}
  
    function run() external {
        vm.startBroadcast();
        ZkChat zkChat = new ZkChat(address(this));
        vm.stopBroadcast();
    }
}