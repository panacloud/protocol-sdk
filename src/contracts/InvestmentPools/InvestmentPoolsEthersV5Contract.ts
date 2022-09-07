import { BigNumber } from '@ethersproject/bignumber';

import { ContractTransaction } from '@ethersproject/contracts';
import { InvestmentPools } from '../../../typechain/src/ethers-v5';
import { EthersTransactionResult, InvestorDetails, PoolInfo, PoolInvestmentDetails, TransactionOptions } from '../../utils/types';
import InvestmentPoolsContract from './InvestmentPoolsContract';

function toTxResult(
    transactionResponse: ContractTransaction,
    options?: TransactionOptions
  ): EthersTransactionResult {
    return {
      hash: transactionResponse.hash,
      options,
      transactionResponse
    }
  }

class InvestmentPoolsEthersV5Contract implements InvestmentPoolsContract {

    constructor(public contract:InvestmentPools) {
    }

    getAddress(): string {
      return this.contract.address;
    }

    async createInvestmentPool(apiDev:string, apiToken:string,  startDate:BigNumber, duration:BigNumber, 
        tokenPrice:BigNumber, tokensToBeIssued:BigNumber, minimumInvestmentRequired:BigNumber, 
        tokenPerInvestor:BigNumber, whitelistingStartDate:BigNumber, whitelistingEndDate:BigNumber, options?:TransactionOptions):  Promise<EthersTransactionResult> {

        const txtResponse = await this.contract.createInvestmentPool(apiDev, apiToken, startDate, duration, 
                            tokenPrice, tokensToBeIssued, minimumInvestmentRequired, tokenPerInvestor, whitelistingStartDate, whitelistingEndDate);
        return toTxResult(txtResponse, options);
    }

    async createPaymentMilestoneClaim(apiToken:string, amountToBeReleased:BigNumber, options?:TransactionOptions):Promise<EthersTransactionResult> {
        const txtResponse = await this.contract.createPaymentMilestoneClaim(apiToken,amountToBeReleased);
        return toTxResult(txtResponse, options);
    }

    async applyForInvestmentPool(apiToken:string, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.applyForInvestmentPool(apiToken);
      return toTxResult(txtResponse, options);

    }
    async investInPool(apiToken:string, investmentAmount:BigNumber, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.investInPool(apiToken,investmentAmount);
      return toTxResult(txtResponse, options);
    }

    async getInvestmentPool(apiToken:string):Promise<PoolInfo> {
        return this.contract.getInvestmentPool(apiToken);
    }

    async getPoolInvestmentDetails(apiToken:string):Promise<PoolInvestmentDetails> {
      return this.contract.getPoolInvestmentDetails(apiToken);
    }

    async getPoolInfoList(): Promise<PoolInfo[]> {
        return this.contract.getPoolInfoList();
    }

    async claimFunds(apiToken:string, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.claimFunds(apiToken);
      return toTxResult(txtResponse, options);
    }

    async getInvestorDetailForAPIToken(apiToken:string, investor: string): Promise<InvestorDetails> {
      return this.contract.getInvestorDetailForAPIToken(apiToken, investor);
    }

    async getInvestorPoolList(investor:string): Promise<PoolInfo[]> {
      return this.contract.getInvestorPoolList(investor);
    }

    
    // Only Owner called functions, will be removed in future
    async updatetPoolFundingStatus(apiToken:string, poolFundingStatus:BigNumber, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.updatetPoolFundingStatus(apiToken, poolFundingStatus);
      return toTxResult(txtResponse, options);
    }
    async togglePoolActiveStatus(apiToken:string, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.togglePoolActiveStatus(apiToken);
      return toTxResult(txtResponse, options);
    }
}
export default InvestmentPoolsEthersV5Contract;