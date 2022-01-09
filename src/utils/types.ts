import { ContractTransaction } from '@ethersproject/contracts'

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
