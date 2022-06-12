import { BigNumber } from '@ethersproject/bignumber';
import { BaseTransactionResult, PoolInfo } from '../../utils/types';

interface InvestmentPoolsManagerContract {
  getAddress(): string;
  applyForInvestmentPool(apiToken:string): Promise<BaseTransactionResult>;
  investInPool(apiToken:string, investmentAmount:BigNumber): Promise<BaseTransactionResult>;
}

export default InvestmentPoolsManagerContract
