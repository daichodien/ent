import { StarterRoutingModule } from "../../../starter/starter-routing.module";
import * as moment from 'moment';

export class FleetModel {
    fleetDesc: string;
    fleetType: string;
    fleetModel: string;
    maker: string;
    brand: string;
    branch: string;
    dateF: any;
    dateT: any;
    fleetStatus: string;

    convert() {
        this.dateF !== '' ? this.dateF = moment(this.dateF).format('MM/DD/YYYY') : null;
        this.dateT !== '' ? this.dateT = moment(this.dateT).format('MM/DD/YYYY') : null;
    }
}

export class FleetDeleteModel {
    fltId: number;
    userId: string;
}

export class FleetSaveModel {
    fltId:number
    fleetModelId: number;
    fleet_Desc: string;
    engineNumber: string;
    vSNNumber: string;
    ownerShip: string;
    lastestMile: number;
    lastRead?: any;
    purchasePrice: number;
    purchaseType: string;
    purchaseDate?: any;
    manufacturedYear: any;
    createUser: string;
    features: string;
    accessaries: string;
    generalDescription: string;
    dedicatedDriverId: number;
    fleetColor: string;
    fleetStatus: string;
    liquidatedDate: any;
    liquidatedMemo: string;
}

export class FleetsDTO {
    fltId: number;
    fleet_Desc: string;
    fleetModelId: number;
    fleetModelDesc: string;
    maker: string;
    brand: string;
    fleetType: string;
    transmissionType: string;
    fuelType: string;
    engineNumber: string;
    vsnNumber: string;
    lastestMile?: any;
    lastRead: number;
    fleetColor: string;
    purchasePrice?: any;
    purchaseType: string;
    purchaseDate: number;
    manufacturedYear: string;
    createDate: number;
    createUser: string;
    updateDate?: any;
    updateUser?: any;
    dedicatedDriverId: number;
    dedicatedDriverName: string;
    fleetStatus: string;
    liquidatedDate: any;
    liquidatedMemo: string;
}


export class FleetDetailDTO {
    fltId: number;
    fleet_Desc: string;
    fleetModelId: any;
    engineNumber: string;
    vsnNumber: string;
    ownerShip: string;
    lastestMile?: any;
    lastRead: any;
    purchasePrice?: any;
    purchaseType: string;
    purchaseDate: any;
    manufacturedYear: any;
    createDate: any;
    createUser: string;
    updateDate?: any;
    updateUser?: any;
    features: string;
    accessaries: string;
    generalDescription: string;
    dedicatedDriverId: any;
    fleetColor: string;
    createName:string;
    upDateName:string;
    registrationDate:any;
    registrationExpDate:any;
    fleetUseType:string
    fleetStatus: string;
    liquidatedDate: any;
    liquidatedMemo: string;
    constructor()
    {
        this.fleet_Desc= ""
        this.fleetModelId= ""
        this.engineNumber= ""
        this.vsnNumber= ""
        this.ownerShip= ""
        this.lastestMile = null
        this.lastRead= null
        this.purchasePrice= null
        this.purchaseType = ""
        this.purchaseDate = null
        this.manufacturedYear= ""
        this.createUser= ""
        this.features= ""
        this.accessaries= ""
        this.generalDescription= ""
        this.dedicatedDriverId= ""
        this.fleetColor= ""
        this.registrationDate = null
        this.registrationExpDate = null
        this.fleetUseType = ""
        this.fleetStatus = "NORMAL";
        this.liquidatedDate = null;
        this.liquidatedMemo = "";
    }

}

export class FleetModelForBooking {
    pickUpTime: any;
    returnTime: any;
    fleetModelId: number;
    noBooking: number;

    convert() {
        this.pickUpTime !== '' ? this.pickUpTime = moment(this.pickUpTime).format('YYYY-MM-DD HH:mm') : null;
        this.returnTime !== '' ? this.returnTime = moment(this.returnTime).format('YYYY-MM-DD HH:mm') : null;
    }
}




