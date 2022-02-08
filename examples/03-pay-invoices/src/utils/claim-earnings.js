import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
const DaiABI = require("../abi/DAIToken.json").abi;

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
// NOTE: Also Claim Earning should be called after pay-invoice so we have payment to be received
export const claimEarnings = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    // DAI Token address on Rinkeby
    const daiToken = new ethers.Contract("0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",DaiABI,signer);
    console.log("dai token = ",daiToken);
                                                        //Address of User
    const daiBalance = await daiToken.balanceOf("0xb11846818eda46eca2e0481a4a4afebb4cac18d5")
    console.log("DAI Balance for signer Before = ", ethers.utils.formatEther(daiBalance.toString()));

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());

    const panacloudPlatformContract = panacloudSDK.getPanacloudPlatform();
    const transactionResult = await panacloudPlatformContract.claimEarnings(ethers.utils.parseEther("0.95"));
    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);

    const daiBalanceAfter = await daiToken.balanceOf("0xb11846818eda46eca2e0481a4a4afebb4cac18d5")
    console.log("DAI Balance for signer After = ", ethers.utils.formatEther(daiBalanceAfter.toString()));
    
}