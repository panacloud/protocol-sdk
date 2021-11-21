import { BigNumber } from '@ethersproject/bignumber';
import PanaFactoryContract from "./PanaFactoryContract";
import { PanaFactory, PanaFactoryInterface } from '../../../typechain/PanaFactory';



class PanaFactoryEthersV5Contract implements PanaFactoryContract {

    constructor(public contract:PanaFactory) {

    }

    getAddress(): string {
        return this.contract.address;
    }

    generateData(_name:string, _age:BigNumber ) {
        this.contract.generateData(_name, _age);
    }
    
    getName():Promise<string> {
        return this.contract.getName();
    }
    
    getAge():Promise<BigNumber> {
        return this.contract.getAge();
    }
}
export default PanaFactoryEthersV5Contract;