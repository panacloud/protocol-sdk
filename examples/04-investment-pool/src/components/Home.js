import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { applyForInvestmentPool } from "../utils/apply-for-investment-pool";
import { createInvestmentPool } from "../utils/create-investment-pool";
import { setupSDK } from "../utils/sdk-utils";

function Home() {

  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();
  const [balance, setBalance] = useState();
  

  console.log("signer = ",library?library.getSigner(0):"NA");
  useEffect(()=>{
    (async ()=>{
      if(library && account){
        
        try {
          const _balance = await library.getBalance(account);
          setBalance(ethers.utils.formatEther(_balance));
        }
        catch(error){
          console.log("Error ",error.message);
          setBalance("0");
        }
        return () => {
          setBalance(undefined);
        };
      }
    })();
  }, [library, account, chainId]);

  useEffect(()=>{
    (async()=>{
      console.log("start to setup sdk ");
      if(library && account){
        console.log("sdk - inside if");
        try {
          setupSDK(library.getSigner(0));
        }
        catch(error) {
          console.log("Error in SDK setup = ",error);
        }
      }
    })();
  },[library, account, chainId]);


  const investmentPoolCreation = async ()=>{
    await createInvestmentPool(library.getSigner(0));
  }

  const investmentApply = async ()=>{
    await applyForInvestmentPool(library.getSigner(0));
  }

  return (
    <div>
      <div>Hello Web3 World</div><br/>
      <div>Chain Id: {chainId}</div><br/>
      <div>Account: {account}</div><br/>
      <div>Balance: {balance}</div><br/>

      <div>
        <button onClick={()=>{
            investmentPoolCreation();
          }}> 
          01 Create Investment Pool (only Owner of Contract can call this action)
        </button>
      </div><br/>

      <div>
        <button onClick={()=>{
            investmentApply();
          }}> 
          02 Apply for investment pool (only Owner of Contract can call this action)
        </button>
      </div><br/>
    </div>
    
  );
}

export default Home;
