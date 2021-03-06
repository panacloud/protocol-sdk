import { BigNumber } from '@ethersproject/bignumber';
import PanaFactoryContract from "./PanaFactoryContract";
import { PanaFactory, PanaFactoryInterface } from '../../../typechain/src/ethers-v5/PanaFactory';
import { APIDAOConfig, APITokenConfig, EthersTransactionResult, TransactionOptions } from '../../utils/types';
import { ContractTransaction } from '@ethersproject/contracts';

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

class PanaFactoryEthersV5Contract implements PanaFactoryContract {

    constructor(public contract:PanaFactory) {

    }

    getAddress(): string {
        return this.contract.address;
    }

    async createAPIDao(apiTokenConfig:APITokenConfig , apiDAOConfig:APIDAOConfig, options?:TransactionOptions): Promise<EthersTransactionResult> {
      const txtResponse = await this.contract.createAPIDao(apiTokenConfig,apiDAOConfig);
      return toTxResult(txtResponse,options);
    }
    /*
    async generateData(_name:string, _age:BigNumber, options?:TransactionOptions): Promise<EthersTransactionResult> {
        const txResponse = await this.contract.generateData(_name, _age,options);
        return toTxResult(txResponse,options);
    }
    
    getName():Promise<string> {
        return this.contract.getName();
    }
    
    getAge():Promise<BigNumber> {
        return this.contract.getAge();
    }*/
}
export default PanaFactoryEthersV5Contract;