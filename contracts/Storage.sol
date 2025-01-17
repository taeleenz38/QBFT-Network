// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    uint public data;

    function set(uint _data) external {
        data = _data;
    }
}
