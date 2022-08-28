import { BigNumber } from '@ethersproject/bignumber';
import { BaseTransactionResult, PoolInfo, PoolInvestmentDetails } from '../../utils/types';

interface InvestmentPoolsContract {
  getAddress(): string;
  createInvestmentPool(apiDev:string, apiToken:string,  startDate:BigNumber, duration:BigNumber, 
                        tokenPrice:BigNumber, tokensToBeIssued:BigNumber, 
                        minimumInvestmentRequired:BigNumber, tokenPerInvestor:BigNumber,
                        whitelistingStartDate:BigNumber, whitelistingEndDate:BigNumber, ): 
                        Promise<BaseTransactionResult>;
  createPaymentMilestoneClaim(apiToken:string, amountToBeReleased:BigNumber):Promise<BaseTransactionResult>;
  applyForInvestmentPool(apiToken:string): Promise<BaseTransactionResult>;
  investInPool(apiToken:string, investmentAmount:BigNumber): Promise<BaseTransactionResult>;

  getInvestmentPool(apiToken:string):Promise<PoolInfo>;
  getPoolInvestmentDetails(apiToken:string):Promise<PoolInvestmentDetails>;
  getPoolInfoList(): Promise<PoolInfo[]>;

  claimFunds(apiToken:string): Promise<BaseTransactionResult>;

  // Only Owner called functions, will be removed in future
  updatetPoolFundingStatus(apiToken:string, poolFundingStatus:BigNumber): Promise<BaseTransactionResult>;
  togglePoolActiveStatus(apiToken:string): Promise<BaseTransactionResult>;


}

export default InvestmentPoolsContract
