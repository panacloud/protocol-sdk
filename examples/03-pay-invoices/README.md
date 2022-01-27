# Create API DAO with Panacloud Protocol SDK

Initial example on how to create API DAO using Panacloud Protocol SDK

## Installation

Install the package:

```shell
npm install @panacloud/protocol-sdk
```

## Getting Started

### 1. Set up the SDK using `Ethers`

To use SDK is using `Ethers` `v5`, create an instance of the `EthersAdapter`.
```JS
import { EthersAdapter, PanacloudSDK } from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';

const ethAdapter = new EthersAdapter({
    ethers,
    signer
});

const panacloudSDK = await PanacloudSDK.create({ethAdapter});
console.log("PanaFactory Contract Address",panacloudSDK.getPanaFactoryAddress());
```

### 2. Create API DAO using `Ethers`

```JS
const apiTokenConfig = {
    apiTokenName: "Demo API v1",
    apiTokenSymbol: "DEMO",
    maxApiTokenSupply: BigNumber.from("1000000"), // 1 million
    initialApiTokenSupply: BigNumber.from("100000"), // 100k
    developerSharePercentage: BigNumber.from("80"),
    apiInvestorSharePercentage: BigNumber.from("10"),
    thresholdForSubscriberMinting: BigNumber.from("10")
}

const apiDAOConfig = {
    apiProposalId: "NAN",
    apiId: "demo-api",
    daoName: "Demo DAO",
    votingSupportPercentage: BigNumber.from(50),
    votingMinimumApprovalPercentage: BigNumber.from(20),
    voteDuration: BigNumber.from(24).mul(60).mul(60)
    };


const transactionResult = await panacloudSDK.createAPIDao(apiTokenConfig,apiDAOConfig);
console.log("Transaction hash: ",transactionResult.hash);
const transactionReceipt = await transactionResult.transactionResponse.wait();
console.log("Transaction completed: ",transactionReceipt);
```
