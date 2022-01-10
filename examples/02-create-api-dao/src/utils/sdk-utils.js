import { EthersAdapter, PanacloudSDK, APITokenConfig, APIDAOConfig} from "@panacloud/protocol-sdk";
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

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

    const apiTokenConfig = {
        apiTokenName: "Demo API v1",
        apiTokenSymbol: "DEMO",
        maxApiTokenSupply: BigNumber.from("1000000"), // 1 million // API Token itself will apply 18 decmial places
        initialApiTokenSupply: BigNumber.from("100000"), // 100k
        developerSharePercentage: BigNumber.from("80"),
        apiInvestorSharePercentage: BigNumber.from("10"),
        thresholdForSubscriberMinting: BigNumber.from("10")
    }

    const apiDAOConfig = {
        apiProposalId: "NAN",
        apiId: "demo-api",
        daoName: "Demo DAO",
        proposalThresholdPercent: BigNumber.from(10000),
        quorumVotesPercent: BigNumber.from(40000),
        votingPeriod: BigNumber.from(24).mul(60).mul(60).div(15)
      };
    

    const transactionResult = await panacloudSDK.createAPIDao(apiTokenConfig,apiDAOConfig);
    console.log("Transaction hash: ",transactionResult.hash);
    const transactionReceipt = await transactionResult.transactionResponse.wait();
    console.log("Transaction completed: ",transactionReceipt);
    
}