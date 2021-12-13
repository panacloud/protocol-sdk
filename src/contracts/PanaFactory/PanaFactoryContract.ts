import { BigNumber } from '@ethersproject/bignumber';
import { APIDAOConfig, APITokenConfig, BaseTransactionResult, TransactionOptions } from '../../utils/types';


interface PanaFactoryContract {
  getAddress(): string;
  createAPIDao(apiTokenConfig:APITokenConfig, apiDAOConfig:APIDAOConfig): Promise<BaseTransactionResult>;
  //generateData(_name:string, _age:BigNumber, options?:TransactionOptions ): Promise<BaseTransactionResult>;
  //getName(): Promise<string>;
  //getAge(): Promise<BigNumber>;
}

export default PanaFactoryContract
