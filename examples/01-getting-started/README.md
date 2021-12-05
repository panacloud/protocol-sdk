# Getting Started with Panacloud Protocol SDK

Basic example on how to use Panacloud Protocol SDK with React on Client side

#### Install Panacloud Protocol SDK
```shell
npm install @panacloud/protocol-sdk
```

#### Create and Access Panacloud SDK instance
```JS
const ethAdapter = new EthersAdapter({
    ethers,
    signer
});

const panacloudSDK = await PanacloudSDK.create({ethAdapter});
console.log("PanaFactory Contract Address",panacloudSDK.getPanaFactoryAddress());
```
