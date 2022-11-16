export class InvoiceSearchDto {
    bookNo: string;
    invNo: string;
    invDateF: any;
    invDateT: any;
    custId: any;
    fiDocNo: string;
    paidOnly: boolean;
    employeeName:string;
    constructor() {
        this.bookNo = '';
        this.invNo = '';
        this.custId = '';
        this.paidOnly = false;
        this.invDateF = new Date();
        this.invDateT = new Date();
    }
}