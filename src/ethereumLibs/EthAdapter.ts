import { BigNumber } from '@ethersproject/bignumber';
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
    getPanaFactoryContract(safeAddress: string): Promise<PanaFactoryContract>
    getContractCode(address: string): Promise<string>
    getTransaction(transactionHash: string): Promise<any>
    getSignerAddress(): Promise<string>
    signMessage(message: string, signerAddress: string): Promise<string>
    estimateGas(transaction: EthAdapterTransaction, options?: string): Promise<number>
    call(transaction: EthAdapterTransaction): Promise<string>
  }
  
  export default EthAdapter