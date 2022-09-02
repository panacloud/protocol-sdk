import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
export const createInvestmentPool = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());
    
    let whitelistingStartDate = new Date("8/20/2022");
    let whitelistingEndDate = new Date("9/10/2022");
    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const transactionResult = await investmentPoolsContract.createInvestmentPool(
        "0xb11846818eda46eca2e0481a4a4afebb4cac18d5","0xa1182eBDc63a68a5355235132aF9AD7555C39c03",
        BigNumber.from((new Date()).getTime()),BigNumber.from(30).mul(24).mul(60).mul(60),BigNumber.from(100),
        10000,BigNumber.from(7000), BigNumber.from(100),
        BigNumber.from(whitelistingStartDate.getTime()), BigNumber.from(whitelistingEndDate.getTime()));

    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);
    
}