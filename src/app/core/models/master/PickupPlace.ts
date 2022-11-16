export class PickupPlaceModel {
    puId:number;   
    userId:number;              
    pickUpPlace:string;          
    address:string;              
    building:string;             
    createDate:string;           
    createUser:string;           
    updateDate:string;           
    updateUser:string;
    createName:String;
    upDateName:string;       
    isOfficialPickUpPlace:string;
    lat:string;                  
    lon:string;                  
    areaCode:string;             
    areaDesc:string;     
    svcPkgDtlId:number;
    isOfficialReturnPlace:string;
    
    constructor() {
        this.pickUpPlace = "";
        this.areaCode = "";
        this.building = "";
        this.lat = "";
        this.lon = "";
        this.areaCode = "";
        this.isOfficialPickUpPlace = "false";
        this.isOfficialReturnPlace = "false";
    }
}

export class SearchPickupPlaceModel {
    PickUpPlace:string;
    AreaCode:string;

    constructor() {
        this.PickUpPlace = "";
        this.AreaCode = "";
    }
}