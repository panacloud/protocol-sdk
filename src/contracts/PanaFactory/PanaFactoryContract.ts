import { BigNumber } from '@ethersproject/bignumber';
import { BaseTransactionResult, TransactionOptions } from '../../utils/types';

interface PanaFactoryContract {
  getAddress(): string
  generateData(_name:string, _age:BigNumber, options?:TransactionOptions ): Promise<BaseTransactionResult>;
  getName(): Promise<string>;
  getAge(): Promise<BigNumber>;
}

export default PanaFactoryContract
