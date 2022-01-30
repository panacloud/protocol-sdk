import { BigNumber } from '@ethersproject/bignumber';
import { APIDAOConfig, APITokenConfig, BaseTransactionResult, TransactionOptions, Invoice, APIDevDetails } from '../../utils/types';


interface PanacloudPlatformContract {
  getAddress(): string;
  payInvoice(apiDev:string, apiDao:string, invoice:Invoice): Promise<BaseTransactionResult>;
  getDevEarnings(apiDevAddress: string): Promise<APIDevDetails>;
  getAPIInvoices(apiDevAddress: string, apiTokenAddress: string): Promise<Invoice[]>;
}

export default PanacloudPlatformContract
