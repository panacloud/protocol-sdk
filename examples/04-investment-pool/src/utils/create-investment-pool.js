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
    /*
    let whitelistingStartDate = new Date("8/20/2022");
    let whitelistingEndDate = new Date("9/10/2022");
    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const transactionResult = await investmentPoolsContract.createInvestmentPool(
        "0xb11846818eda46eca2e0481a4a4afebb4cac18d5","0x703A5f09EccBC1E02E0B1FA739A7E5A5e698340C",
        BigNumber.from((new Date()).getTime()),BigNumber.from(30).mul(24).mul(60).mul(60),BigNumber.from(100),
        10000,BigNumber.from(7000), BigNumber.from(100),
        BigNumber.from(whitelistingStartDate.getTime()), BigNumber.from(whitelistingEndDate.getTime()));
    */
    let whitelistingStartDate = new Date("1/19/1970");
    let whitelistingEndDate = new Date("2/15/1970");
    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const transactionResult = await investmentPoolsContract.createInvestmentPool(
            //"0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5","0xa1182eBDc63a68a5355235132aF9AD7555C39c03",
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


    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);
    
}