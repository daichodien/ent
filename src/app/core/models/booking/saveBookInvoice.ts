export class SaveBookInvoice {
    invDate?:any;
    remark:string;
    periodF:any;
    periodT:any;
    amtPayable:number;
    fiDocNumber:string;
    bookNo:string;
    invoiceNo:string;
    netAmount:number;
    invItems:SaveBookInvoiceItem[];
    user:number;
    taxAmount:number;
    discountCode:string;
    sendDate: any;
    sendRemark: any;
    createDate: any;
    createUser: any;
    updateDate: any;
    updateUser: any;
    voucherSerialNo:string;
    constructor()
    {
        this.invDate = null;
        this.remark = "";
        this.periodF = "";
        this.periodT = "";
        this.amtPayable =null;
        this.fiDocNumber = "";
        this.bookNo = "";
        this.invoiceNo = "";
        this.invDate =  new Date();
        this.invItems = [];
        this.discountCode = "";
    }
}

export class SaveBookInvoiceItem
{
    invNo:string;
    itemNo:number;
    billQty:number;
    unitPrice:string;
    billUnit:string;
    itemAmount:number;
    remark:string;
    serviceItemDesc:string;
    currency:string;
}
