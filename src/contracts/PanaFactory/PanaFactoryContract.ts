import { BigNumber } from '@ethersproject/bignumber';

interface PanaFactoryContract {
  generateData(_name:string, _age:BigNumber );
  getName(): Promise<string>;
  getAge(): Promise<BigNumber>;
}

export default PanaFactoryContract
