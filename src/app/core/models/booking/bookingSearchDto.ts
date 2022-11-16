import * as moment from 'moment';
import { NumberSymbol } from '@angular/common';

export class BookingSearchDto {
    BookNo: string;
    private BookDateF: string;
    private BookDateT: string;
    CustId: string;
    FleetType: string;
    BookStatus: string;
    FleetModel: string;
    BranchCode: string;
    UserId: string;
    DateF: any;
    DateT: any;
    getByBookDate: any;
    fleetDesc: any;
    bookType: any;
    driverId: any;
    fleetUseType: string;
    cusType: string;
    staffId: string;
    VendorId: any;
    dateType : string;

    constructor() {
        this.DateF = new Date();
        this.DateT = new Date();
        this.BranchCode = '';
        this.UserId = '1';
        this.BookNo = '';
        this.CustId = '';
        this.FleetType = '';
        this.BookStatus = '';
        this.FleetModel = '';
        this.getByBookDate = 1;
        this.fleetDesc = '';
        this.bookType = '';
        this.driverId = '';
        this.fleetUseType = '';
        this.cusType = '';
        this.staffId = '';
        this.VendorId ='';
        this.dateType = '';
    }
     Convert() {
        this.DateF == null ? this.BookDateF = null : this.BookDateF = moment(this.DateF).format('YYYYMMDD');
        this.DateT == null ? this.BookDateT = null : this.BookDateT = moment(this.DateT).format('YYYYMMDD');
        this.CustId = this.CustId == null ? '' : this.CustId;
        this.driverId = this.driverId == null ? '' : this.driverId;
        this.FleetModel = this.FleetModel == null ? '' : this.FleetModel;
        this.fleetUseType = this.fleetUseType == null ? '' : this.fleetUseType;
        this.staffId = this.staffId == null ? '' : this.staffId;
        this.VendorId = this.VendorId == null ? '': this. VendorId;
        this.BookNo = this.BookNo == null ? '' : this.BookNo;
        this.dateType = this.dateType == null ? '' : this.dateType;
    }
}

export class DeleteBooking {
    BookNo: string;
    UserId: number;
}
