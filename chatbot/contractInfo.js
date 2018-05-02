

var contractTXID = '0x7048f278db6f09b0b3f109eeef248bb482df0f19';

var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_participant",
				"type": "address"
			},
			{
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "setPrivileges",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "chatMsg",
				"type": "bytes32"
			}
		],
		"name": "postMessage",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "readMassegesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getParticipants",
		"outputs": [
			{
				"name": "_addresses",
				"type": "address[]"
			},
			{
				"name": "_roles",
				"type": "uint8[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "readMasseges",
		"outputs": [
			{
				"name": "_ids",
				"type": "uint256[]"
			},
			{
				"name": "_timestamps",
				"type": "uint256[]"
			},
			{
				"name": "_senders",
				"type": "address[]"
			},
			{
				"name": "_messages",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRole",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
