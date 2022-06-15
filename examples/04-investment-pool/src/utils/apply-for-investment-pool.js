import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
export const applyForInvestmentPool = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const poolInfo = await investmentPoolsContract.getInvestmentPool("0xa1182eBDc63a68a5355235132aF9AD7555C39c03");
    console.log("Pool info = ",poolInfo);
    
    const investmentPoolsManagerContract = panacloudSDK.getInvestmentPoolsManager();
    const transactionResult = await investmentPoolsManagerContract.applyForInvestmentPool("0xa1182eBDc63a68a5355235132aF9AD7555C39c03");

    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);
    
}