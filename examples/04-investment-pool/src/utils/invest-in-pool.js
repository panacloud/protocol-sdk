import { EthersAdapter, PanacloudSDK, Invoice} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
const PanaCoin = require("../abi/PanaCoin.json").abi;

// NOTE: This example assume that you have run the example 2 '02-create-api-dao' and you have addresses of APIToken and APIDAO
export const investInPool = async (signer)=>{
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    });

    const panacloudSDK = await PanacloudSDK.create({ethAdapter});
    console.log("PanacloudPlatform Address",panacloudSDK.getPanacloudPlatform().getAddress());
    
    const investmentPoolsContract = panacloudSDK.getInvestmentPools();

    // Panacoin Token address on Rinkeby
    const panacoindToken = new ethers.Contract("0xbC810553892c750a7518438970216FC836294B91",PanaCoin,signer);
    console.log("panacoind token = ",panacoindToken);
                                                        //Address of User
    const ownerPanaCoinBalance = await panacoindToken.balanceOf("0xb11846818eda46eca2e0481a4a4afebb4cac18d5")
    console.log("Panacloud Balance for signer = ", ethers.utils.formatEther(ownerPanaCoinBalance.toString()));

    const txt1 = await panacoindToken.approve(investmentPoolsContract.getAddress(), ethers.utils.parseEther("10"));
    const receipt = txt1.wait();
    console.log("Approval done");

    const transactionResult = await investmentPoolsContract.investInPool("0xBc9656979A2486D3fBEB0D2D240cb9032456e245",ethers.utils.parseEther("10"));

    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);

}