pragma solidity ^0.4.11;
pragma experimental ABIEncoderV2;

contract ChatBot {


    struct Message {
        string msg;
        bytes32 msgBytes;
        address sender;
        uint256 timestamp;
    }

    enum ROLES {NOTAUTHORIZED, OBSERVER, MEMBER, ADMIN}

    mapping (address => ROLES) private participants;
    Message[] private messages;

    constructor() public {
        participants[msg.sender] = ROLES.ADMIN;
        messages.push(Message("Init Chat","Init Chat", msg.sender, block.timestamp));
    }

    function postMessage(string chatMsg) public returns (bool success)
    {
        require(participants[msg.sender] == ROLES.MEMBER ||
            participants[msg.sender] == ROLES.ADMIN);

        messages.push(Message(chatMsg, "chatMsg" , msg.sender, block.timestamp));
        return true;
    }

    function readMasseges() public returns (uint[] _ids, uint256[] _timestamps, address[] _senders, bytes32[] _messages){
        require(participants[msg.sender] != ROLES.NOTAUTHORIZED);

        _ids = new uint[](messages.length);
        _timestamps = new uint[](messages.length);
        _senders = new address[](messages.length);
        _messages = new bytes32[](messages.length);

        for(uint i = 0; i<messages.length; i++)
        {
            _ids[i] = (i);
            _timestamps[i] = messages[i].timestamp;
            _senders[i] = messages[i].sender;
            _messages[i] = messages[i].msgBytes;
        }


        return;
    }

    function readMassegesCount() public returns (uint _count)  {
        ROLES role = participants[msg.sender];
        require(role != ROLES.NOTAUTHORIZED);

        return messages.length;
    }

    function getRole() public returns (ROLES role)  {
        return participants[msg.sender];
    }


    function setPrivileges(address _participant, ROLES _role)  public returns (bool success){
        require(participants[msg.sender] == ROLES.ADMIN);

        participants[_participant] = _role;
        return true;
    }



}
