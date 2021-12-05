import { EthersAdapter, PanacloudSDK } from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';

export const setupSDK = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const bal = await ethAdapter.getBalance(signer.getAddress());
    console.log("Balance using sdk = ",bal);
    console.log("ChainID using sdk = ",await ethAdapter.getChainId());

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("Contract Address",panacloudSDK.getPanaFactoryAddress());
}