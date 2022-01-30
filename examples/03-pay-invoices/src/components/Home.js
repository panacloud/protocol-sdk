import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getDevEarningDetails } from "../utils/dev-earnings";
import { getInvoices } from "../utils/get-invoices";
import { invoicePayment } from "../utils/pay-invoice";
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

  const getDevEarnings = async ()=>{
    await getDevEarningDetails(library.getSigner(0));
  }

  const getInvoiceList = async ()=>{
    await getInvoices(library.getSigner(0));
  }

  const payinvoice = async ()=>{
    await invoicePayment(library.getSigner(0));
  }

  return (
    <div>
      <div>Hello Web3 World</div><br/>
      <div>Chain Id: {chainId}</div><br/>
      <div>Account: {account}</div><br/>
      <div>Balance: {balance}</div><br/>

      <div><button onClick={()=>{
        payinvoice();
      }}> 01 Pay Invoice</button></div><br/>


      <div><button onClick={()=>{
        getDevEarnings();
      }}> 02 Get Dev Earning Details</button></div><br/>

      <div><button onClick={()=>{
        getInvoiceList();
      }}> 03 Get Invoice List</button></div><br/>
    </div>
  );
}

export default Home;
