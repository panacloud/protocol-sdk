import { BigNumber } from '@ethersproject/bignumber';
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
    
  }
  
  export default EthAdapter