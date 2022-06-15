import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
export const getPoolInfoList = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const investmentPoolsContract = panacloudSDK.getInvestmentPools();
    const poolInfoList = await investmentPoolsContract.getPoolInfoList();
    
    console.log("poolInfoList = ",poolInfoList);
    
}