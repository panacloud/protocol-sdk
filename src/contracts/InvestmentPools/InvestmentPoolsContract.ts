import { BigNumber } from '@ethersproject/bignumber';
import { BaseTransactionResult, InvestorDetails, PoolInfo, PoolInvestmentDetails } from '../../utils/types';

interface InvestmentPoolsContract {
  getAddress(): string;
  createInvestmentPool(apiDev:string, apiToken:string,  startDate:BigNumber, endDate:BigNumber, 
                        tokenPrice:BigNumber, tokensToBeIssued:BigNumber, 
                        minimumInvestmentRequired:BigNumber, tokenPerInvestor:BigNumber,
                        whitelistingStartDate:BigNumber, whitelistingEndDate:BigNumber, ): 
                        Promise<BaseTransactionResult>;
  
  // Only Owner or Manager can call this function, will be removed in future
  createPaymentMilestoneClaim(apiToken:string, amountToBeReleased:BigNumber):Promise<BaseTransactionResult>;
  claimMilestonePayment(apiToken:string):Promise<BaseTransactionResult>; //--
  applyForInvestmentPool(apiToken:string): Promise<BaseTransactionResult>;
  investInPool(apiToken:string, investmentAmount:BigNumber): Promise<BaseTransactionResult>;

  getInvestmentPool(apiToken:string):Promise<PoolInfo>;
  getPoolInvestmentDetails(apiToken:string):Promise<PoolInvestmentDetails>;
  getPoolInfoList(): Promise<PoolInfo[]>;

  // Only Owner or Manager can call this function, will be removed in future
  updatetPoolFundingStatus(apiToken:string, poolFundingStatus:BigNumber): Promise<BaseTransactionResult>;
  
  getPoolFundingStatus(apiToken:string):Promise<BigNumber>; // --

  // Only Owner or Manager can call this function, will be removed in future
  togglePoolActiveStatus(apiToken:string): Promise<BaseTransactionResult>;

  getPoolActiveStatus(apiToken:string):Promise<Boolean>; // --

  claimFunds(apiToken:string): Promise<BaseTransactionResult>;

  getInvestorDetailForAPIToken(apiToken:string, investor: string):Promise<InvestorDetails>;
  getInvestorPoolList(investor:string):Promise<PoolInfo[]>;

  claimYourAPIToken(apiToken:string): Promise<BaseTransactionResult>; //-
}

export default InvestmentPoolsContract
