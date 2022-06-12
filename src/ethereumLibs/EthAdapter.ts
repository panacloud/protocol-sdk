import { BigNumber } from '@ethersproject/bignumber';
import InvestmentPoolsContract from '../contracts/InvestmentPools/InvestmentPoolsContract';
import InvestmentPoolsManagerContract from '../contracts/InvestmentPoolsManager/InvestmentPoolsManagerContract';
import PanacloudPlatformContract from '../contracts/PanacloudPlatform/PanacloudPlatformContract';
import PanaFactoryContract from '../contracts/PanaFactory/PanaFactoryContract';
import { AbiItem } from '../types';

export interface EthAdapterTransaction {
    to: string
    from: string
    data: string
    value?: string
    gasPrice?: number
    gasLimit?: number
}

interface EthAdapter {
    isAddress(address: string): boolean
    getBalance(address: string): Promise<BigNumber>
    getChainId(): Promise<number>
    getContract(address: string, abi: AbiItem[]): any
    getPanaFactoryContract(panaFactoryAddress: string): Promise<PanaFactoryContract>
    getPanacloudPlatformContract(panacloudPlatformAddress: string): Promise<PanacloudPlatformContract>
    getContractCode(address: string): Promise<string>
    getTransaction(transactionHash: string): Promise<any>
    getSignerAddress(): Promise<string>
    signMessage(message: string, signerAddress: string): Promise<string>
    estimateGas(transaction: EthAdapterTransaction, options?: string): Promise<number>
    call(transaction: EthAdapterTransaction): Promise<string>
    getInvestmentPoolsContract(investmentPoolsAddress: string): Promise<InvestmentPoolsContract>
    getInvestmentPoolsManagerContract(investmentPoolsManagerContract: string): Promise<InvestmentPoolsManagerContract>
  }
  
  export default EthAdapter