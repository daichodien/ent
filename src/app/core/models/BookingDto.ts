import { CommonService } from "../services/common.service";

export class Booking {
    endUserName:  string;
    bookDate:  any;
    pickUpPlace?:  number;
    returnPlace?:  number;
    pickupTime:  any;
    returnTime:  any;
    createUser:  number;
    bookType:  string;
    ownerId:  number;
    branchCode:  string;
    bookStatus:  string;
    endUserId:  number;
    personalTitle:  string;
    custId:  number;
    fleetModelId:  number;
    isRepeatedDaily:  any;
    isRequiredAirportPickUp:  any;
    flightNo:  string;
    isRequiredDriver:  any;
    requiredForignLanguage:  string;
    isRequiredWIFI:  any;
    insuranceType:  string;
    overtimeSurcharge:  number;
    overKMSurcharge:  number;
    arrivalTime:  any;
    lodgingAddress:  string;
    routeMemo:  string;
    isRequestForRedInv:  any;
    paymentMethod:  string;
    svcPkgDtlId:  number;
    bookNo:  string;
    userId:  number;
    updateUser:  string;
    createName:  string;
    upDateName:  string;
    createDate:  any;
    updateDate:  any;
    endUserMobile: string;
    endUserEmail: string;
    pickUpPlaceDetail: string;
    returnPlaceDetail: string;
    bookSource: string;
    voucherSerialNo: string;
    contractFrom: any;
    contractTo: any;
    workingDay: string;
    serviceTime: string;
    contractMemo: string;
    totalMileageMonth: number;
    //Vendor
    vendorId: any;
    extDriverName: string;
    vendorRefNo: string;
    extFleetNo: string;
    extMobileNo: string;
    memo: string; 

    constructor(
    ) {
        this.endUserName = '';
        this.bookDate = new Date();
        this.returnPlace = null;
        this.paymentMethod = '';
        this.flightNo = '';
        this.isRequiredDriver = false;
        this.isRequiredAirportPickUp = false;
        this.isRepeatedDaily = false;
        this.isRequestForRedInv = false;
        this.isRequiredWIFI  = false;
        this.pickupTime = null;
        this.returnTime = null;
        this.arrivalTime = null;
        this.bookStatus = '';
        this.pickUpPlaceDetail = '';
        this.returnPlaceDetail = '';
        this.bookSource = '';
        this.voucherSerialNo = '';

        //vendor
    }
    public convert() {
        this.pickupTime = CommonService.convertDateTimeForModel(this.pickupTime);
        this.returnTime = CommonService.convertDateTimeForModel(this.returnTime);
        this.arrivalTime = CommonService.convertDateTimeForModel(this.arrivalTime);
        this.isRequiredWIFI = this.isRequiredWIFI === '0' ? false :  true;
        this.isRepeatedDaily = this.isRepeatedDaily === '0' ? false :  true;
        this.isRequestForRedInv = this.isRequestForRedInv === '0' ? false :  true;
        this.isRequiredAirportPickUp = this.isRequiredAirportPickUp  === '0' ? false :  true;
        this.isRequiredDriver = this.isRequiredDriver  === '0' ? false :  true;
        return this;
    }
}
export class BookFleets {
    bookNo:  string;
    brId:  number;
    createDate:  any;
    createUser:  number;
    fleetId:  number;
    fleetModelId:  number;
    fleet_Desc:  string;
    isDedicated:  string;
    mobileNo:  string;
    pickUpPlace:  number;
    pickUpTime:  any;
    returnPlace:  number;
    returnTime:  any;
    routeMemo:  string;
    staffId:  number;
    staffName:  string;
    updateDate:  any;
    updateUser:  string;
    createName:  string;
    vendorId : any;
    extDriverName: string;
    vendorRefNo: string;
    extFleetNo: string;
    extMobileNo: string;
    memo: string; 
    public convert(data:  BookFleets):  BookFleets {
        data.pickUpTime =  new Date(data.pickUpTime);
        data.returnTime = new Date(data.returnTime);
        data.updateDate = new Date(data.updateDate);
        return data;
    }
}

export class SaveBookFleetForAssign {
    pickUpPlace?: number;
    pickUpTime?: any;
    returnPlace?: number;
    returnTime?: any;
    fleetId?: number;
    fleetDesc: any;
    staffId?: number;
    createUser: string;
    fleetModelId?: any;
    bookNo: string;
    staffName?: string;
    brId: string;
    updateUser: any;
    vendorId : number;
    extDriverName: string;
    vendorRefNo: string;
    extFleetNo: string;
    extMobileNo: string;
    Memo: string; 
}

export class SaveBookTripRecord {
    startMile:  number;
    startTime?:  any;
    endMile:  number;
    endTime?:  any;
    createUser:  number;
    routeMemo?:  any;
    tripMemo?:  any;
    tollFee:  number;
    parkingFee:  number;
    staffId:  number;
    bRId:  number;
}





