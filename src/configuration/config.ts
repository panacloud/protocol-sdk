export interface ContractNetworkConfig {
    
    /** panaFactoryAddress - Address of the PanaFactory contract deployed on a specific network */
    panaFactoryAddress: string
}

export interface ContractNetworksConfig {
    /** id - Network id */
    [id: string]: ContractNetworkConfig
}

export const defaultContractNetworks : ContractNetworksConfig = {
    // mainnet
    /*
    1: {
        panaFactoryAddress:"" 
    },*/
    // rinkeby
    4: {
        panaFactoryAddress:"0xC58B924Feb50C42f4F6226D50c3f53f11ACbD536" 
    }
}