import { BigNumber } from '@ethersproject/bignumber';

interface PanaFactoryContract {
  getAddress(): string
  generateData(_name:string, _age:BigNumber );
  getName(): Promise<string>;
  getAge(): Promise<BigNumber>;
}

export default PanaFactoryContract
