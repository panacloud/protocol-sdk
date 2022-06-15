import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';


// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
// NOTE: Second assumption, this example should be run with diffrent address than '02-create-api-dao' so that we can
//       simulate subscriber and api owner as two different entity
export const setupSDK = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });
    /*
    const provider = ethers.getDefaultProvider({
        name: "rinkeby",
        chainId:4
    }, {
        infura: "1cf782bca6704181bd8f4ebcbfd1d286",
    })
    */

    
    const bal = await ethAdapter.getBalance(signer.getAddress());
    console.log("ETH Balance using sdk = ", ethers.utils.formatEther(bal));
    console.log("ChainID using sdk = ",await ethAdapter.getChainId());

    

}