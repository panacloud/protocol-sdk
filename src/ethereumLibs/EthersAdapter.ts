import { Signer } from "@ethersproject/abstract-signer";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { Provider, TransactionResponse } from "@ethersproject/providers";
import PanaFactoryEthersV5Contract from "../contracts/PanaFactory/PanaFactoryEthersV5Contract";
import { AbiItem } from "../types";
import EthAdapter, { EthAdapterTransaction } from "./EthAdapter";
import { PanaFactory__factory } from '../../typechain/factories/PanaFactory__factory';


export interface EthersAdapterConfig {
    /** ethers - Ethers v5 library */
    ethers: any
    /** signer - Ethers signer */
    signer: Signer
}

class EthersAdapter implements EthAdapter {
    #ethers: any
    #signer: Signer
    #provider: Provider
  
    constructor({ ethers, signer }: EthersAdapterConfig) {
      if (!ethers) {
        throw new Error('ethers property missing from options')
      }
      if (!signer.provider) {
        throw new Error('Signer must be connected to a provider')
      }
      this.#signer = signer
      this.#provider = signer.provider
      this.#ethers = ethers
    }

    getProvider(): Provider {
        return this.#provider
    }
    
    getSigner(): Signer {
        return this.#signer
    }

    isAddress(address: string): boolean {
        return this.#ethers.utils.isAddress(address)
    }
    
    async getBalance(address: string): Promise<BigNumber> {
        return BigNumber.from(await this.#provider.getBalance(address))
    }
    
    async getChainId(): Promise<number> {
        return (await this.#provider.getNetwork()).chainId
    }

    getContract(address: string, abi: AbiItem[]): Contract {
        return new this.#ethers.Contract(address, abi, this.#signer)
    }

    async getPanaFactoryContract(panaFactoryAddress: string): Promise<PanaFactoryEthersV5Contract> {
        const panaFactoryContractCode = await this.getContractCode(panaFactoryAddress)
        if (panaFactoryContractCode === '0x') {
            throw new Error('PanaFactory contract is not deployed in the current network')
        }
        const panaFactoryContract = PanaFactory__factory.connect(panaFactoryAddress, this.#signer)
        const wrapperPanaFactoryContract = new PanaFactoryEthersV5Contract(panaFactoryContract)
        return wrapperPanaFactoryContract
    }

    async getContractCode(address: string): Promise<string> {
        return this.#provider.getCode(address)
    }

    async getTransaction(transactionHash: string): Promise<TransactionResponse> {
        return this.#provider.getTransaction(transactionHash)
      }
    
    async getSignerAddress(): Promise<string> {
        return this.#signer.getAddress()
    }

    signMessage(message: string): Promise<string> {
        const messageArray = this.#ethers.utils.arrayify(message)
        return this.#signer.signMessage(messageArray)
    }

    async estimateGas(transaction: EthAdapterTransaction): Promise<number> {
        return (await this.#provider.estimateGas(transaction)).toNumber()
    }

    call(transaction: EthAdapterTransaction): Promise<string> {
        return this.#provider.call(transaction)
    }
}