import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
const DaiABI = require("../abi/DAIToken.json").abi;

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
export const invoicePayment = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());
    
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
    
}