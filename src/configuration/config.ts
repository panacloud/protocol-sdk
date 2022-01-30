export interface ContractNetworkConfig {
    
    /** panaFactoryAddress - Address of the PanaFactory contract deployed on a specific network */
    panaFactoryAddress: string,
    panacloudPlatform: string
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
        panaFactoryAddress:"0x9f64e17F5B95fD415cFB6CE60AA7651b3adFEd3d",
        panacloudPlatform:"0xcDB8942c029E850da5CD4802bf5fC71395C46085"
    }
}