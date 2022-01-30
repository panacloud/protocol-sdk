import { BigNumber } from "@ethersproject/bignumber";
import { ContractNetworksConfig } from ".";
import { defaultContractNetworks } from "./configuration/config";
import PanacloudPlatformContract from "./contracts/PanacloudPlatform/PanacloudPlatformContract";
import PanaFactoryContract from "./contracts/PanaFactory/PanaFactoryContract";
import EthAdapter from "./ethereumLibs/EthAdapter";
import ContractManager from "./managers/contractManager";
import { TransactionResult, APITokenConfig , APIDAOConfig, Invoice} from "./utils/types";

export interface PanacloudSDKConfig {
    ethAdapter: EthAdapter
    contractNetworks?: ContractNetworksConfig
}

class PanacloudSDK {
    #ethAdapter!: EthAdapter
    #contractManager!: ContractManager // Not in use at this moment, still unclear about its use in our case
    #contractNetworks!: ContractNetworksConfig
    #panaFactroyContract!: PanaFactoryContract
    #panacloudPlatformContract!: PanacloudPlatformContract

    static async create({ethAdapter, contractNetworks}: PanacloudSDKConfig): Promise<PanacloudSDK> {
        const panacloudSdk = new PanacloudSDK();
        await panacloudSdk.init({ethAdapter, contractNetworks});
        return panacloudSdk;
    } 

    private async init({ ethAdapter, contractNetworks }: PanacloudSDKConfig): Promise<void> {
        this.#ethAdapter = ethAdapter;
        this.#contractNetworks = { ...defaultContractNetworks, ...contractNetworks };
        const chainId = await this.#ethAdapter.getChainId();
        const contractNetworksConfig = this.#contractNetworks[chainId];
        if(!contractNetworksConfig) {
            throw new Error('Panacloud contracts not found in the current network')
        }
        this.#panaFactroyContract = await ethAdapter.getPanaFactoryContract(contractNetworksConfig.panaFactoryAddress);
        this.#panacloudPlatformContract = await ethAdapter.getPanacloudPlatformContract(contractNetworksConfig.panacloudPlatform);
    }

    getPanaFactoryAddress(): string {
        return this.#panaFactroyContract.getAddress();
    }

    getPanaFactory(): PanaFactoryContract {
        return this.#panaFactroyContract;
    }

    getPanacloudPlatform(): PanacloudPlatformContract {
        return this.#panacloudPlatformContract;
    }

    createAPIDao(apiTokenConfig:APITokenConfig, apiDAOConfig: APIDAOConfig):  Promise<TransactionResult> {
        return this.#panaFactroyContract.createAPIDao(apiTokenConfig, apiDAOConfig);
    }

    /*
    payInvoice(apiDev: string, apiDao: string, invoice: Invoice): Promise<TransactionResult> {
        this.#panacloudPlatformContract.
        return this.#panacloudPlatformContract.payInvoice(apiDev,apiDao,invoice);
    }*/

    getEthAdapter(): EthAdapter {
        return this.#ethAdapter;
    }
}

export default PanacloudSDK;