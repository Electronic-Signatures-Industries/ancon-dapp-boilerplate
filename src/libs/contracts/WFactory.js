module.exports = {
  VERSION: '1.0.0',
  WFactory: {
    raw: {
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
          signature: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'wf',
              type: 'address',
            },
          ],
          name: 'LogWorkflowCreated',
          type: 'event',
          signature:
            '0x8e15a704cc33132df0d780a92c333c9dcbb61fe3ffe2a398d47a39958ef60ede',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'wf',
              type: 'address',
            },
          ],
          name: 'LogWorkflowRemoved',
          type: 'event',
          signature:
            '0x5fbb0b05b41f9ee35c32690c0d09c43ae067fe0442f96957d34748ab661b2cc3',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'next',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'actorId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'documentId',
              type: 'uint256',
            },
          ],
          name: 'LogWorkflowStepCompleted',
          type: 'event',
          signature:
            '0xdf549a4efbe29e86cdb2cda1adac7e7b787c5e57cda0917ca6ba7134ac3d2829',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'current',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'actorId',
              type: 'uint256',
            },
          ],
          name: 'LogWorkflowStepStart',
          type: 'event',
          signature:
            '0x3c53e20059c8daa512f9d5e52ffc55e286a99e8aeb70371872191d2da39cac96',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'payee',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'weiAmount',
              type: 'uint256',
            },
          ],
          name: 'Withdrawn',
          type: 'event',
          signature:
            '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x8da5cb5b',
        },
        {
          inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
          name: 'setFee',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x69fe0e2d',
        },
        {
          inputs: [],
          name: 'getFee',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xced72f87',
        },
        {
          inputs: [
            { internalType: 'address payable', name: 'payee', type: 'address' },
          ],
          name: 'withdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x51cff8d9',
        },
        {
          inputs: [
            { internalType: 'address', name: 'modelAddress', type: 'address' },
          ],
          name: 'payWorkflowTemplate',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'payable',
          type: 'function',
          payable: true,
          signature: '0x6816aa38',
        },
        {
          inputs: [{ internalType: 'address', name: 'wf', type: 'address' }],
          name: 'removeWorkflowTemplate',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xb31f6004',
        },
        {
          inputs: [],
          name: 'count',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x06661abd',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
          name: 'get',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x9507d39a',
        },
      ],
    },
    address: {
      development: '0x0e78D5eB8972174F3f2de646B1D284C47e5a4c98',
      test: '0x71396711Dd7d40229F92631565AaD64AfCd29063',
      'ropsten-fork': '0x04d7BAEBc5932D2dc0e50FA18B62d2162616C848',
      ropsten: '0x04d7BAEBc5932D2dc0e50FA18B62d2162616C848',
    },
  },
};
