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
        panaFactoryAddress:"0x0642AD0de25E8e357adbf74cff17710DC22100Cf",
        panacloudPlatform:"0xf8dA27A80eb5313732A6A0523B39B58565350155",
        investmentPools:"0x767504c9D913Bc1Eb24fDAf8021e346E3160603f",
        investmentPoolsManager:"0xCD7F39E2e076Da03a30E5491ebFffA2aa2b73655"
    }
}