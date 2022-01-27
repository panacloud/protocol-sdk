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
        panaFactoryAddress:"0x0a1Afa8f281373F9c10AFe83D2521602653ebB41",
        panacloudPlatform:"0x8e89b71f5910988E4b71AF57186a5FCDD5810496"
    }
}