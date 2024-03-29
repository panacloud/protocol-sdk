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

Invoice Data Type
```JS
export interface Invoice {
  apiToken: string; // API Token Address
  invoiceNumber: BigNumber;
  dueDate: BigNumber;
  invoiceMonth: BigNumber; // From 1 to 12
  totalAmount: BigNumber;
  invoicePayee: string; // API Subscriber Address
}
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
UserDAODetails and APIDevDetails Data Type
```JS
export interface UserDAODetails {
  apiDao: string;
  apiToken: string;
}

export interface APIDevDetails {
  apiDev: string;
  totalEarned: BigNumber
  totalClaimable: BigNumber
  totalClaimed: BigNumber
  userDAODetails: UserDAODetails[]
}
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

### 6. Calim Earning by API Developer `Ethers`

```JS
const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
// Called for claimEarnings must be API developer and must have records in our contract
const transactionResult = await panacloudPlatformContract.claimEarnings(ethers.utils.parseEther("0.95"));
console.log("Transaction hash: ",transactionResult.hash);
const transactionReceipt = await transactionResult.transactionResponse.wait();
console.log("Transaction completed: ",transactionReceipt);
```

### 7. Get Earning History `Ethers`

```JS
//getClaimHistory will return claim history of function caller
const claimList = await panacloudPlatformContract.getClaimHistory();
console.log("ClaimList = ", claimList);
for(let i=0;i<claimList.length;i++) {
    console.log("Claim Amount = ", ethers.utils.formatEther(claimList[i].claimedAmount.toString()));
    console.log("Claimed Time = ", new Date(claimList[i].timestamp.toNumber()));
}
```
Claim Data Type
```JS
export interface Claim {
    apiDev: string
    claimedAmount: BigNumber
    timestamp: BigNumber
}
```

### 8. Create Investment Pools (Only Admin or Manager can call this function) `Ethers`

```JS
let whitelistingStartDate = new Date("1/19/1970");
let whitelistingEndDate = new Date("2/15/1970");
const investmentPoolsContract = panacloudSDK.getInvestmentPools();
const transactionResult = await investmentPoolsContract.createInvestmentPool(
            "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5",       // API developer address
            "0xBc9656979A2486D3fBEB0D2D240cb9032456e245",       // API Token Address
            BigNumber.from((new Date()).getTime()),             // Pool Start Date and time
            BigNumber.from(30).mul(24).mul(60).mul(60),         // Pool Duration
            ethers.utils.parseEther("1"),                       // Per API token price in terms of PanaCoin 
            10000,                                              // Tokens to be issued
            ethers.utils.parseEther("10"),                      // Minimum investment required in terms of PanaCon e.g if token price is 50 so 10 tokens * 50 = 500 so 500 panacoin minimum investment
            BigNumber.from(100),                                // Number of Tokens single investor can buy 
            BigNumber.from(whitelistingStartDate.getTime()),    // Whitelisting start date
            BigNumber.from(whitelistingEndDate.getTime()));     // Whitelisting end date
            // Note: pool duration should be long enough so cover whitelisting start and end date
```
Pool Info and Pool Investment Details Data Type
```JS
export interface PoolInfo {
  poolIndex:BigNumber
        
  startDate:BigNumber
  duration:BigNumber
  tokenPrice:BigNumber
  tokensToBeIssued:BigNumber
  minimumInvestmentRequired:BigNumber
  tokenPerInvestor:BigNumber
        
  apiToken:string
  apiDev:string
  poolFundingStatus:BigNumber // 1=In Progress, 2=Successfull, 3=Failed 
  poolActive:boolean

  totalFundApproved:BigNumber
  fundsAvailableFromClaim:BigNumber
  fundsClaimed:BigNumber
}
export interface PoolInvestmentDetails {
  poolIndex:BigNumber
  apiToken: string
  whitelistingStartDate:BigNumber
  whitelistingEndDate:BigNumber

  fundCollected: BigNumber
  tokenIssued: BigNumber
  fundingFailed: boolean;
}
```

### 9. Apply for Investment `Ethers`

```JS
const investmentPoolsManagerContract = panacloudSDK.getInvestmentPoolsManager();
const transactionResult = await investmentPoolsManagerContract.applyForInvestmentPool("0xa1182eBDc63a68a5355235132aF9AD7555C39c03");

console.log("Transaction hash: ",transactionResult.hash);
const transactionReceipt = await transactionResult.transactionResponse.wait();
console.log("Transaction completed: ",transactionReceipt);
```

### 10. Get Pool Info List `Ethers`

```JS
const investmentPoolsContract = panacloudSDK.getInvestmentPools();
const poolInfoList = await investmentPoolsContract.getPoolInfoList();

console.log("poolInfoList = ",poolInfoList);
```

### 11. Get Specific Pool Info and Details  `Ethers`

```JS
const investmentPoolsContract = panacloudSDK.getInvestmentPools();
const poolInfo = await investmentPoolsContract.getInvestmentPool("0xBc9656979A2486D3fBEB0D2D240cb9032456e245");
const poolInfoDetails = await investmentPoolsContract.getPoolInvestmentDetails("0xBc9656979A2486D3fBEB0D2D240cb9032456e245");

console.log("Pool info = ",poolInfo);
console.log("Pool info Details = ",poolInfoDetails);
```

### 12. Invest In Pool `Ethers`

```JS
const investmentPoolsContract = panacloudSDK.getInvestmentPools();

// Panacoin Token address on Rinkeby
const panacoindToken = new ethers.Contract("0xbC810553892c750a7518438970216FC836294B91",PanaCoin,signer);
console.log("panacoind token = ",panacoindToken);
                                                    //Address of User
const ownerPanaCoinBalance = await panacoindToken.balanceOf("<Investor Wallet Address>")
console.log("Panacloud Balance for investor = ", ethers.utils.formatEther(ownerPanaCoinBalance.toString()));

const txt1 = await panacoindToken.approve(investmentPoolsContract.getAddress(), ethers.utils.parseEther("10"));
const receipt = txt1.wait();
console.log("Approval done");

const transactionResult = await investmentPoolsContract.investInPool("0xBc9656979A2486D3fBEB0D2D240cb9032456e245",ethers.utils.parseEther("10"));

console.log("Transaction hash: ",transactionResult.hash);
const transactionReceipt = await transactionResult.transactionResponse.wait();
console.log("Transaction completed: ",transactionReceipt);
```
