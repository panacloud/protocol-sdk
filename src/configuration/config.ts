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
        panaFactoryAddress:"0x8C252d76FAE65509E388f88c72DB489F02c41094",
        panacloudPlatform:"0xa8234cCcec0AeD396C5aD9721c5d2dB5c8E035e8",
        investmentPools:"0xa8234cCcec0AeD396C5aD9721c5d2dB5c8E035e8",
        investmentPoolsManager:"0xa8234cCcec0AeD396C5aD9721c5d2dB5c8E035e8"
    }
}