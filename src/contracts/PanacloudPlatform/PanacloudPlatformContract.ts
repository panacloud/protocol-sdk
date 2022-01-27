import { BigNumber } from '@ethersproject/bignumber';
import { APIDAOConfig, APITokenConfig, BaseTransactionResult, TransactionOptions, Invoice } from '../../utils/types';


interface PanacloudPlatformContract {
  getAddress(): string;
  payInvoice(apiDev:string, apiDao:string, invoice:Invoice): Promise<BaseTransactionResult>;
  //getDevEarnings(): string;
  //getAPIInvoices(): string;
}

export default PanacloudPlatformContract
