import { BigNumber } from "@ethersproject/bignumber";
import { ContractNetworksConfig } from ".";
import PanaFactoryContract from "./contracts/PanaFactory/PanaFactoryContract";
import EthAdapter from "./ethereumLibs/EthAdapter";
import ContractManager from "./managers/contractManager";

export interface PanacloudSDKConfig {
    ethAdapter: EthAdapter
    contractNetworks?: ContractNetworksConfig
}

class PanacloudSDK {
    #ethAdapter!: EthAdapter
    #contractManager!: ContractManager // Not in use at this moment, still unclear about its use in our case
    #contractNetworks!: ContractNetworksConfig
    #panaFactroyContract!: PanaFactoryContract

    static async create({ethAdapter, contractNetworks}: PanacloudSDKConfig): Promise<PanacloudSDK> {
        const panacloudSdk = new PanacloudSDK();
        await panacloudSdk.init({ethAdapter, contractNetworks});
        return panacloudSdk;
    } 

    private async init({ ethAdapter, contractNetworks }: PanacloudSDKConfig): Promise<void> {
        this.#ethAdapter = ethAdapter;
        this.#contractNetworks = contractNetworks;
        const chainId = await this.#ethAdapter.getChainId();
        const contractNetworksConfig = this.#contractNetworks[chainId];
        if(!contractNetworksConfig) {
            throw new Error('Panacloud contracts not found in the current network')
        }
        this.#panaFactroyContract = await ethAdapter.getPanaFactoryContract(contractNetworksConfig.panaFactoryAddress);
    }

    getPanaFactoryAddress(): string {
        return this.#panaFactroyContract.getAddress();
    }

    getEthAdapter(): EthAdapter {
        return this.#ethAdapter;
    }
}

export default PanacloudSDK;