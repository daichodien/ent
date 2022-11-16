export class SuppliersModel {
    suppId: number ;
    supplierName: string ;
    firstName: string ;
    lastName: string ;
    cTitle: string ;
    mobileNo: string ;
    address1: string ;
    address2: string ;
    address3: string ;
    emailAddress: string ;
    supplierType: string ;
    user: string ;
    remark: string ;
    countryId: string ;
    taxRegNumber: string ;
    constructor(){
        this.supplierName= "" ;
        this.firstName= "" ;
        this.lastName= "" ;
        this.cTitle= "" ;
        this.mobileNo= "" ;
        this.address1= "" ;
        this.address2= "" ;
        this.address3= "" ;
        this.emailAddress= "" ;
        this.supplierType= "" ;
        this.user= "" ;
        this.remark= "" ;
        this.countryId= "" ;
        this.taxRegNumber= "" ;
    }
}