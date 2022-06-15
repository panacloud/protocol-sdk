import { BigNumber } from '@ethersproject/bignumber';
import { BaseTransactionResult, PoolInfo } from '../../utils/types';

interface InvestmentPoolsContract {
  getAddress(): string;
  createInvestmentPool(apiDev:string, apiToken:string,  startDate:BigNumber, duration:BigNumber, 
                        tokenPrice:BigNumber, tokensToBeIssued:BigNumber, 
                        minimumInvestmentRequired:BigNumber, tokenPerInvestor:BigNumber): 
                        Promise<BaseTransactionResult>;
  createPaymentMilestoneClaim(apiToken:string, amountToBeReleased:BigNumber):Promise<BaseTransactionResult>;
  getInvestmentPool(apiToken:string):Promise<PoolInfo>;
  getPoolInfoList(): Promise<PoolInfo[]>;
}

export default InvestmentPoolsContract
