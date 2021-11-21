import { ContractNetworksConfig, defaultContractNetworks } from "../configuration/config";
import PanaFactoryContract from "../contracts/PanaFactory/PanaFactoryContract";
import EthAdapter from "../ethereumLibs/EthAdapter";

class ContractManager {
    #contractNetworks!: ContractNetworksConfig
    #panaFactroyContract!: PanaFactoryContract

    static async create(ethAdapter: EthAdapter, panaFactoryAddress:string,
                        contractNetworks?: ContractNetworksConfig): Promise<ContractManager>{
        
        const contractManager = new ContractManager();
        await contractManager.init(ethAdapter, panaFactoryAddress, contractNetworks);
        return contractManager;
    }

    async init(ethAdapter: EthAdapter, panaFactoryAddress:string,
                contractNetworks?: ContractNetworksConfig): Promise<void> {
        const chainId = await ethAdapter.getChainId();
        const contractNetworksConfig = {...defaultContractNetworks, ...contractNetworks};
        const contracts = contractNetworksConfig[chainId];
        if(!contracts){
            throw new Error("Pana Contracts not found in the current network");
        }
        this.#contractNetworks = contractNetworksConfig;
        this.#panaFactroyContract = await ethAdapter.getPanaFactoryContract(panaFactoryAddress)
    }

    get contractNetworks(): ContractNetworksConfig {
        return this.#contractNetworks;
    }

    get panaFactoryContract(): PanaFactoryContract {
        return this.#panaFactroyContract;
    }
}

export default ContractManager