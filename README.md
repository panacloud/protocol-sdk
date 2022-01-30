# Panacloud Protocol SDK


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

### 3. Pay Invoices `Ethers`

```JS
                                    // DAI Token address on Rinkeby
const daiToken = new ethers.Contract("0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",DaiABI,signer);
console.log("dai token = ",daiToken);
                                                //Address of User
const addr1DaiBalance = await daiToken.balanceOf("0xb11846818eda46eca2e0481a4a4afebb4cac18d5")
console.log("DAI Balance for signer = ", ethers.utils.formatEther(addr1DaiBalance.toString()));

const txt1 = await daiToken.approve(panacloudSDK.getPanacloudPlatform().getAddress(), ethers.utils.parseEther("1"));
const receipt = txt1.wait();
console.log("Approval done");

const invoice = {
    apiToken:"0x6c6719e351210d651187b9ccb2f4b6e0dc06a7f1",  // API Token Address
    invoiceNumber: 1,
    dueDate: Date.now(),
    invoiceMonth:1,
    totalAmount: ethers.utils.parseEther("1"),
    invoicePayee: signer.getAddress()
}
const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
const transactionResult = await panacloudPlatformContract.payInvoice(
                                    "0xb11846818eda46eca2e0481a4a4afebb4cac18d5", // User who created API DAO
                                    "0xc6d9af3635b0e8c0f10a264e7fdcc10e2b91890a", // DAO Address
                                    invoice);
console.log("Transaction hash: ",transactionResult.hash);
const transactionReceipt = await transactionResult.transactionResponse.wait();
console.log("Transaction completed: ",transactionReceipt);
```

### 4. Get API Developers Earning Details `Ethers`

```JS
const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
const apiDetails = await panacloudPlatformContract.getDevEarnings(await signer.getAddress());
console.log("API Details = ", apiDetails);
console.log("API Details.apiDev = ", apiDetails.apiDev);
console.log("API Details.totalClaimable = ", ethers.utils.formatEther(apiDetails.totalClaimable));
console.log("API Details.totalClaimed = ", ethers.utils.formatEther(apiDetails.totalClaimed));
console.log("API Details.totalEarned = ", ethers.utils.formatEther(apiDetails.totalEarned));
console.log("API Details.userDAODetails array = ", apiDetails.userDAODetails);
```

### 5. Get Invoice List of API `Ethers`

```JS
const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
const invoiceList = await panacloudPlatformContract.getAPIInvoices(await signer.getAddress(), "0x6c6719e351210d651187b9ccb2f4b6e0dc06a7f1");
console.log("InvoiceList = ", invoiceList);
console.log("InvoiceList[0] = ", invoiceList[0]);
console.log("InvoiceList[0].apiToken = ", invoiceList[0].apiToken);
console.log("InvoiceList[0].dueDate = ", new Date(invoiceList[0].dueDate.toNumber()));
console.log("InvoiceList[0].invoiceMonth = ", invoiceList[0].invoiceMonth.toString());
console.log("InvoiceList[0].invoiceNumber = ", invoiceList[0].invoiceNumber.toString());
console.log("InvoiceList[0].invoicePayee = ", invoiceList[0].invoicePayee);
console.log("InvoiceList[0].totalAmount = ", invoiceList[0].totalAmount.toString());
```