# Getting Started with Panacloud Protocol SDK

Basic example on how to use Panacloud Protocol SDK with React on Client side

## Installation

Install the package:

```shell
npm install @panacloud/protocol-sdk
```

## Getting Started

### 1. Set up the SDK using `Ethers`

To use SDK is using `Ethers` `v5`, create an instance of the `EthersAdapter`.
```JS
const ethAdapter = new EthersAdapter({
    ethers,
    signer
});

const panacloudSDK = await PanacloudSDK.create({ethAdapter});
console.log("PanaFactory Contract Address",panacloudSDK.getPanaFactoryAddress());
```
