
import * as moment from 'moment';

export class TaxAndInsuranceDto {
    endUserName: string;
    dateF: any;
    dateT: any;
    fleetId: any;
    fleetModelId: string;
    fleetType: string;
    docType: string;
    refNo: string;
    tiId: any;
    tDate: any;
    relatedParty: any;
    remark: string;
    amount: any;
    expireDate: any;
    readMiles: any;
    userId: any;
    updateDate: any;
    updateUser: string;
    createDate: any;
    createUser: string;
    upDateName: string;
    createName: string;
    svcType: string;
    nextSvcDate: any;
    nextSvcMiles: any;
    discount: any;
    status: any;
    serviceLevel: any;
    svcItems: FW_SvcItem_Result[];
    constructor() {
        this.dateF = '';
        this.dateT = '';
        this.fleetId = '';
        this.fleetModelId = '';
        this.fleetType = '';
        this.docType = '';
        this.refNo = '';
        this.tDate = null;
        this.remark = '';
        this.expireDate = null;
        this.relatedParty = '';
        this.svcType = '';
        this.nextSvcDate = null;
        this.svcItems = [];
        this.amount = 0;
        this.discount = 0;
        this.serviceLevel = '';
        this.status = 'PLAN';
    }
    convert() {
        if (!this.fleetId)
            this.fleetId = '';
        this.dateF !== '' ? this.dateF = moment(this.dateF).format('MM/DD/YYYY') : null;
        this.dateT !== '' ? this.dateT = moment(this.dateT).format('MM/DD/YYYY') : null;
    }
}

export class FW_SvcItem_Result
{
    mTId: any;
    itemNo: any;
    maintenanceCode: string;
    qty: any;
    unitPrice: any;
    amount: any;
    remark: string;
}