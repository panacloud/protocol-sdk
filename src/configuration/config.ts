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
        panaFactoryAddress:"0x96c71eB7834240cc2fce351D89e9a00620FF69De",
        panacloudPlatform:"0xc677cF8F2462C19c26079ed72589fa31915078ac",
        investmentPools:"0x3B9bbe88cF8951b40bE8f2A1Bdc008F26021fC0d",
        investmentPoolsManager:"0xCD7F39E2e076Da03a30E5491ebFffA2aa2b73655"
    }
}