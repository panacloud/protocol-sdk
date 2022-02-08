import { BigNumber } from '@ethersproject/bignumber';

import { PanacloudPlatform  } from '../../../typechain/src/ethers-v5/PanacloudPlatform';
import { APIDAOConfig, APIDevDetails, APITokenConfig, BaseTransactionResult, EthersTransactionResult, Invoice, TransactionOptions, Claim } from '../../utils/types';
import { ContractTransaction } from '@ethersproject/contracts';
import PanacloudPlatformContract from './PanacloudPlatformContract';

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

class PanacloudPlatformEthersV5Contract implements PanacloudPlatformContract {

    constructor(public contract:PanacloudPlatform) {

    }

    getAddress(): string {
      return this.contract.address;
    }

    async payInvoice(apiDev: string, apiDao: string, invoice: Invoice, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.payInvoice(apiDev, apiDao,invoice);
      return toTxResult(txtResponse, options);
    }

    async getDevEarnings(apiDevAddress: string): Promise<APIDevDetails> {
      const devResponseObj = await this.contract.getDevEarnings(apiDevAddress);
      const apiDevDetails:APIDevDetails = {
        apiDev: apiDevAddress,
        totalEarned: devResponseObj[0],
        totalClaimable: devResponseObj[1],
        totalClaimed: devResponseObj[2],
        userDAODetails: devResponseObj[3]
      }
      return apiDevDetails;
    }

    async getAPIInvoices(apiDevAddress: string, apiTokenAddress: string): Promise<Invoice[]> {
      return this.contract.getAPIInvoices(apiDevAddress,apiTokenAddress);
    }

    async claimEarnings(claimAmount: BigNumber, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.claimEarnings(claimAmount);
      return toTxResult(txtResponse, options);
    }

    async getClaimHistory(): Promise<Claim[]> {
      return this.contract.getClaimHistory();
    }
}
export default PanacloudPlatformEthersV5Contract;