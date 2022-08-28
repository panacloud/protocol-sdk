export interface ContractNetworkConfig {
    
    /** panaFactoryAddress - Address of the PanaFactory contract deployed on a specific network */
    panaFactoryAddress: string,
    panacloudPlatform: string,
    investmentPools: string,
    investmentPoolsManager: string   
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
        panaFactoryAddress:"0x8aD97bC24eAAf59Db2930835252959bb1b932e95",
        panacloudPlatform:"0x75F94f1c60a2fBdD8AEF8F62B14267db2D541229",
        investmentPools:"0xFCd122B2881424ef6bB187359B4c4ABDb81E7599",
        investmentPoolsManager:"0xCD7F39E2e076Da03a30E5491ebFffA2aa2b73655"
    }
}