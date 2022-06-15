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
        panaFactoryAddress:"0x6837cBd683233bD1d838480A366A2a84DDB3B617",
        panacloudPlatform:"0x1d8199F217EB923280E7Ed45304bD5028B5678E7",
        investmentPools:"0xa5aE646cc992b90D835e8F0b892fFf1834Aaa3d1",
        investmentPoolsManager:"0x16F4E3D86a5DDFEdC6064f2aC7e733F848cbEE14"
    }
}