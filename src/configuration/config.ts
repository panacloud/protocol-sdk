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
        panaFactoryAddress:"0x8D29bE29923b68abfDD21e541b9374737B49cdAD" 
    }
}