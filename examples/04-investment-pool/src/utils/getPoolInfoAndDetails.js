import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// Also you have already called create-investment-pool in this same example to create pool
export const getPoolInfoAndDetails = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const poolInfo = await investmentPoolsContract.getInvestmentPool("0xBc9656979A2486D3fBEB0D2D240cb9032456e245");
    console.log("Pool info string = ",poolInfo.toString());
    console.log("Pool info = ",poolInfo);

    const poolInfoDetails = await investmentPoolsContract.getPoolInvestmentDetails("0xBc9656979A2486D3fBEB0D2D240cb9032456e245");
    console.log("Pool info Details string = ",poolInfoDetails.toString());
    console.log("Pool info Details = ",poolInfoDetails);
    
}