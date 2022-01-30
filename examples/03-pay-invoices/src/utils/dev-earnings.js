import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
export const getDevEarningDetails = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());
    
    const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
    const apiDetails = await panacloudPlatformContract.getDevEarnings(await signer.getAddress());
    console.log("API Details = ", apiDetails);
    console.log("API Details.apiDev = ", apiDetails.apiDev);
    console.log("API Details.totalClaimable = ", ethers.utils.formatEther(apiDetails.totalClaimable));
    console.log("API Details.totalClaimed = ", ethers.utils.formatEther(apiDetails.totalClaimed));
    console.log("API Details.totalEarned = ", ethers.utils.formatEther(apiDetails.totalEarned));
    console.log("API Details.userDAODetails array = ", apiDetails.userDAODetails);
    
}