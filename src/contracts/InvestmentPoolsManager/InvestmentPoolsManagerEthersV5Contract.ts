import { BigNumber } from '@ethersproject/bignumber';

import { ContractTransaction } from '@ethersproject/contracts';
import { InvestmentPoolsManager } from '../../../typechain/src/ethers-v5';
import { EthersTransactionResult, TransactionOptions } from '../../utils/types';
import InvestmentPoolsManagerContract from './InvestmentPoolsManagerContract';

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

class InvestmentPoolsManagerEthersV5Contract implements InvestmentPoolsManagerContract {

    constructor(public contract:InvestmentPoolsManager) {

    }

    getAddress(): string {
      return this.contract.address;
    }

    async applyForInvestmentPool(apiToken:string, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.applyForInvestmentPool(apiToken);
      return toTxResult(txtResponse, options);
    }
    async investInPool(apiToken:string, investmentAmount:BigNumber, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.investInPool(apiToken,investmentAmount);
      return toTxResult(txtResponse, options);
    }
}
export default InvestmentPoolsManagerEthersV5Contract;