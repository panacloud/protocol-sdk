import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react";
import { injectedConnector } from "../utils/connectors";
import { connectWallet } from "../utils/connectWallet";



export const useEagerConnect = (setErrorMessageFun)=>{
    const {activate} = useWeb3React();
    
    useEffect(()=>{
        (async ()=>{
            const isAuthorized = await injectedConnector.isAuthorized();
            console.log("isAuthorized= ",isAuthorized);
            if(isAuthorized) {
                connectWallet(activate,setErrorMessageFun);
            }
        })();
    },[activate,setErrorMessageFun])
}

export const useInactiveListener = (suppress = false) =>{
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = (chainId) => {
                console.log('chainChanged', chainId);
                activate(injectedConnector);
            };

            const handleAccountsChanged = (accounts) => {
                console.log('accountsChanged', accounts);
                if (accounts.length > 0) {
                    activate(injectedConnector);
                }
            };

            const handleNetworkChanged = (networkId) => {
                console.log('networkChanged', networkId);
                activate(injectedConnector);
            };

            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);
            ethereum.on('networkChanged', handleNetworkChanged);

            return () => {
                if (ethereum.removeListener) {
                ethereum.removeListener('chainChanged', handleChainChanged);
                ethereum.removeListener('accountsChanged', handleAccountsChanged);
                ethereum.removeListener('networkChanged', handleNetworkChanged);
                }
            };
        }
        return () => {};
    }, [active, error, suppress, activate]);
}