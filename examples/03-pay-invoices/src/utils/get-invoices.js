import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
export const getInvoices = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());
    
    const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
    const invoiceList = await panacloudPlatformContract.getAPIInvoices(await signer.getAddress(), "0x8d98fbcdac3d9320d27222b0894fac21c798f179");
    console.log("InvoiceList = ", invoiceList);
    console.log("InvoiceList[0] = ", invoiceList[0]);
    console.log("InvoiceList[0].apiToken = ", invoiceList[0].apiToken);
    console.log("InvoiceList[0].dueDate = ", new Date(invoiceList[0].dueDate.toNumber()));
    console.log("InvoiceList[0].invoiceMonth = ", invoiceList[0].invoiceMonth.toString());
    console.log("InvoiceList[0].invoiceNumber = ", invoiceList[0].invoiceNumber.toString());
    console.log("InvoiceList[0].invoicePayee = ", invoiceList[0].invoicePayee);
    console.log("InvoiceList[0].totalAmount = ", invoiceList[0].totalAmount.toString());
    
}