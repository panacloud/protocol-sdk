import { ContractTransaction } from '@ethersproject/contracts'
import { BigNumber } from 'ethers';

export interface TransactionOptions {
  from?: string
  gas?: number | string
  gasLimit?: number | string
  safeTxGas?: number | string
  gasPrice?: number | string
}

export interface BaseTransactionResult {
  hash: string
}

export interface EthersTransactionResult extends BaseTransactionResult {
  transactionResponse: ContractTransaction
  options?: TransactionOptions
}

export interface TransactionResult extends BaseTransactionResult {
  //promiEvent?: PromiEvent<TransactionReceipt>
  transactionResponse?: ContractTransaction
  options?: TransactionOptions
}

export interface APIDAOConfig {
  apiProposalId:string;
  apiId:string;
  daoName:string;
  proposalThresholdPercent: number;
  quorumVotesPercent: number;
  votingPeriod: number;
}

export interface APITokenConfig {
  apiTokenName: string;
  apiTokenSymbol: string;
  maxApiTokenSupply: number;
  initialApiTokenSupply: number;
  developerSharePercentage: number;
  apiInvestorSharePercentage: number;
  thresholdForSubscriberMinting: number;
}

export interface Invoice {
  apiToken: string; // API Token Address
  invoiceNumber: BigNumber;
  dueDate: BigNumber;
  invoiceMonth: BigNumber; // From 1 to 12
  totalAmount: BigNumber;
  invoicePayee: string; // API Subscriber Address
}

export interface UserDAODetails {
  apiDao: string;
  apiToken: string;
}

export interface APIDevDetails {
  apiDev: string;
  totalEarned: BigNumber
  totalClaimable: BigNumber
  totalClaimed: BigNumber
  userDAODetails: UserDAODetails[]
}

export interface Claim {
  apiDev: string
  claimedAmount: BigNumber
  timestamp: BigNumber
}

export interface PoolInfo {
  poolIndex:BigNumber
        
  startDate:BigNumber
  duration:BigNumber
  tokenPrice:BigNumber
  tokensToBeIssued:BigNumber
  minimumInvestmentRequired:BigNumber
  tokenPerInvestor:BigNumber
        
  apiToken:string
  apiDev:string
  poolFundingStatus:BigNumber // 1=In Progress, 2=Successfull, 3=Failed 
  poolActive:boolean

  totalFundApproved:BigNumber
  fundsAvailableFromClaim:BigNumber
  fundsClaimed:BigNumber
}

export interface PoolInvestmentDetails {
  poolIndex:BigNumber
  apiToken: string
  whitelistingStartDate:BigNumber
  whitelistingEndDate:BigNumber

  fundCollected: BigNumber
  tokenIssued: BigNumber
  fundingFailed: boolean;

}

export interface InvestorDetails {
  investor: string
  apiToken: string
  investedAmount: BigNumber
  claimableToken: BigNumber
  claimedBlockNumber: BigNumber // This will works in case of both failure and success
  
  //In case of failure
  amountClaimed: BigNumber

  //In case of success
  tokensClaimed: BigNumber
}
