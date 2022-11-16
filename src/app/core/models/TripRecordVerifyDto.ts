export class TripRecordVerifyDto {
    trIds: string;
    trVId: any;
    securityCode: string;
    remark: string;

    constructor() {
        this.trIds = '';
        this.trVId = null;
        this.securityCode = '';
        this.remark = '';
    }
}