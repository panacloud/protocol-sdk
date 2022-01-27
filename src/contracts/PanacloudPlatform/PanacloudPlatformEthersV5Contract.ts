import { BigNumber } from '@ethersproject/bignumber';

import { PanacloudPlatform  } from '../../../typechain/src/ethers-v5/PanacloudPlatform';
import { APIDAOConfig, APITokenConfig, BaseTransactionResult, EthersTransactionResult, Invoice, TransactionOptions } from '../../utils/types';
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
}
export default PanacloudPlatformEthersV5Contract;