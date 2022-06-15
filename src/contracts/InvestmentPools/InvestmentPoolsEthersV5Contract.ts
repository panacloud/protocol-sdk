import { BigNumber } from '@ethersproject/bignumber';

import { ContractTransaction } from '@ethersproject/contracts';
import { InvestmentPools } from '../../../typechain/src/ethers-v5';
import { EthersTransactionResult, PoolInfo, TransactionOptions } from '../../utils/types';
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
        tokenPerInvestor:BigNumber, options?:TransactionOptions):  Promise<EthersTransactionResult> {

        const txtResponse = await this.contract.createInvestmentPool(apiDev, apiToken, startDate, duration, 
                            tokenPrice, tokensToBeIssued, minimumInvestmentRequired, tokenPerInvestor);
        return toTxResult(txtResponse, options);
    }

    async createPaymentMilestoneClaim(apiToken:string, amountToBeReleased:BigNumber, options?:TransactionOptions):Promise<EthersTransactionResult> {
        const txtResponse = await this.contract.createPaymentMilestoneClaim(apiToken,amountToBeReleased);
        return toTxResult(txtResponse, options);
    }

    async getInvestmentPool(apiToken:string):Promise<PoolInfo> {
        return this.contract.getInvestmentPool(apiToken);
    }

    async getPoolInfoList(): Promise<PoolInfo[]> {
        return this.contract.getPoolInfoList();
    }

}
export default InvestmentPoolsEthersV5Contract;