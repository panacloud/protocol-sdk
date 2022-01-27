import { EthersAdapter, PanacloudSDK, APITokenConfig, APIDAOConfig, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
export const setupSDK = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const bal = await ethAdapter.getBalance(signer.getAddress());
    console.log("Balance using sdk = ",bal);
    console.log("ChainID using sdk = ",await ethAdapter.getChainId());

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const invoice = {
        apiToken:"0x7a2a0e9755b1b15ef48777e3d5061f6a5ad51d50",
        invoiceNumber: 1,
        dueDate: Date.now(),
        invoiceMonth:1,
        totalAmount: 2,
        invoicePayee
    }
    const transactionResult = await panacloudSDK.payInvoice(
                                        "0xb11846818eda46eca2e0481a4a4afebb4cac18d5",
                                        "0x61d3ab80af8e349e79780ade8e522b2b5fc7768a",
                                        invoice);
    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);
}