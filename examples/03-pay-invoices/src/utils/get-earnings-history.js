import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
const DaiABI = require("../abi/DAIToken.json").abi;

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
// NOTE: Also Claim Earning should be called after pay-invoice so we have payment to be received
export const getEarningHistory = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
    const claimList = await panacloudPlatformContract.getClaimHistory();

    console.log("ClaimList = ", claimList);
    /*
    // Type of Claim object
    interface Claim {
        apiDev: string
        claimedAmount: BigNumber
        timestamp: BigNumber
    }*/


    for(let i=0;i<claimList.length;i++) {
        console.log("Claim Amount = ", ethers.utils.formatEther(claimList[i].claimedAmount.toString()));
        console.log("Claimed Time = ", new Date(claimList[i].timestamp.toNumber()));
    }
    
    
}