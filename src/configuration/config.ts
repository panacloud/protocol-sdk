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
        panaFactoryAddress:"0xd2b18870440EB6ca0EdB95A1dc589Be3754cd793",
        panacloudPlatform:"0xc3Cf63E29907E0C8D79B0FF42c402fA17ffF12CB",
        investmentPools:"0x01183Cd242F0Ea65Fe6024c5801C6c43133eEfF0",
        investmentPoolsManager:"0xCD7F39E2e076Da03a30E5491ebFffA2aa2b73655"
    }
}