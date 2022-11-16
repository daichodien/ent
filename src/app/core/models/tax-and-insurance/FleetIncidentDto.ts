
import * as moment from 'moment';

export class FleetIncidentDto {
    endUserName: string;
    dateF: any;
    dateT: any;
    fleetId: string;
    equipmentCode:number;
    fleetModelId: string;
    fleetType: string;
    incidentType: string;
    refNo: string;
    tiId: any;
    tDate: any;
    relatedCustomer: string;
    remark: string;
    amount: any;
    readMiles: any;
    userId: any;
    updateDate: any;
    updateUser: string;
    createDate: any;
    createUser: string;
    upDateName: string;
    createName: string;
    relatedStaffInfo: string;
    status:string;
    assignTo:number;
    relatedCusId:number;
    details:string;
    resolutionMemo:string;
    resolvedDate:Date;
    type:string;
    employeeName:string;
    avartarThumbnail:string;
    relatedParty:string;
    incidentSource: string;
    constructor() {
        this.dateF = '';
        this.dateT = '';
        this.fleetId = '';
        this.equipmentCode = null;
        this.fleetModelId = '';
        this.fleetType = '';
        this.incidentType = 'ACCIDENT';
        this.refNo = '';
        //this.tiId = 0;
        this.tDate = null;
        //this.amount = 0;
        this.remark = '';
        //this.readMiles = 0;
        this.relatedCustomer = '';
        this.amount = 0;
        this.relatedStaffInfo = '';
        this.status = '';
        this.assignTo = null;
        this.relatedCusId = null;
        this.details = '';
        this.resolutionMemo = '';
        this.resolvedDate = null;
        this.type = '';
        this.relatedParty  = '';
        this.incidentSource = '';
    }

    convert() {
        this.dateF !== '' ? this.dateF = moment(this.dateF).format('MM/DD/YYYY') : null;
        this.dateT !== '' ? this.dateT = moment(this.dateT).format('MM/DD/YYYY') : null;
    }
}