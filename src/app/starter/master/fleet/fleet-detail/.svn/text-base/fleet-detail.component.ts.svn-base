import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../../core/services/common.service';
import { FleetService } from '../../../../core/services/master/fleet.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetDetailDTO, FleetSaveModel } from '../../../../core/models/master/Fleet';
import { StdCodeDTO } from '../../../../core/models/common/stdcodeDTO';
import { BaseComponent } from '../../../../core/directives/base.component';
import { FileuploadComponent } from '../../../../core/directives';
import { REFDOCTYPE } from '../../../../core/helpers';
import { BookingService } from '../../../../core/services/booking.service';
import { CacheService } from '../../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-fleet-detail',
  templateUrl: './fleet-detail.component.html',
  styleUrls: ['./fleet-detail.component.css']
})
export class FleetDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;
  id: any
  modelSearch: any = {};
  selectedColor = 'red';
  listStdCode: StdCodeDTO[];
  listFleetType: StdCodeDTO[];
  listMaker: StdCodeDTO[];
  listBrand: StdCodeDTO[];
  listFleetModel: any = [];
  listPurchaseType: StdCodeDTO[];
  listOwnerShip: StdCodeDTO[];
  listFleetUseType: StdCodeDTO[];
  listDedicatedDriver: any = [];
  listFleetStatus: StdCodeDTO[];
  isRequiredLiquid: boolean = false;
  dataSource: any = {};
  fleetModel: FleetDetailDTO = new FleetDetailDTO();
  fleetSaveModel: FleetSaveModel = new FleetSaveModel();
  nameBrand: String;
  nameMaker: String;
  data: any = {};
  todate = new Date();
  idFleetTop10: number = 0;


  constructor(
    public _commonService: CommonService,
    private _fleetService: FleetService,
    public toastr: ToastrService,
    private routeatd: ActivatedRoute,
    public router: Router,
    public _bookingService: BookingService,
    private cacheService: CacheService,
  ) {
    super(router);
    this.routeatd.params.subscribe(
      param => {
        this.id = param.id

      }
    )
    this.fleetModel.fleetColor = "";
  }
  listColor: any;
  modelFeetsModel = {
    "FleetType": "",
    "FleetModelDesc": "",
    "TransmissionType": "",
    "FuelType": "",
    "Maker": "",
    "Brand": ""
  }

  async ngOnInit() {
    this.fileUpload.refNoType = REFDOCTYPE.Fleet;
    this.fileUpload._userId = this.currentuser.employeeId;
    
    await this.loadInit();
    this.routeatd.params.subscribe(async params => {
      try {
        this.id = params.id
        if (this.id != "new") {
          await this.getFleet();
          await this.getbooking();
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.id;
          this.fileUpload.loadFiles();
        }
        else {
          //add default value for add new 
          this.fileUpload.autoSave = false;
        }
      } catch (e) {
      }
    });
    AdminLTE.init()
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listMaker = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLMAKER';
          });
          this.listBrand = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLBRAND';
          });
          this.listPurchaseType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLPURCHTYPE';
          });
          this.listOwnerShip = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLOWNERSHIP';
          });
          this.listFleetUseType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLEETUSETYPE';
          });
          this.listFleetStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLEETSTATUS';
          });
        }
    });
  }
  async loadInit() {
    this.listColor = this._fleetService.getColor();
    this.getStdCodesCache();
    await this._fleetService.getFleetModels(this.modelFeetsModel).toPromise().then(data => this.listFleetModel = data["payload"]);
    this._fleetService.getStaffWithRole("DRV").subscribe(
      data => {
      this.listDedicatedDriver = data["payload"];
      this.listDedicatedDriver.unshift({ staffID: "", staffName: "",})
    })
  }
  async getFleet() {
    if (this.id != "new") {
      await this._fleetService.getFleet(this.id).toPromise().then(
        data => {
          this.idFleetTop10 = data["payload"]["vsnNumber"]  | 0;
          data["success"] == true ? this.fleetModel = data["payload"] : this.toastr.error("Error:", 'Fleet');
          this.fleetModel.lastRead = this.fleetModel.lastRead != null ? new Date(this.fleetModel.lastRead) : null;
          this.fleetModel.purchaseDate = this.fleetModel.purchaseDate != null ? new Date(this.fleetModel.purchaseDate) : null;
          this.fleetModel.registrationDate = this.fleetModel.registrationDate != null ? new Date(this.fleetModel.registrationDate) : null;
          this.fleetModel.registrationExpDate = this.fleetModel.registrationExpDate != null ? new Date(this.fleetModel.registrationExpDate) : null;
          this.fleetModel.fleetColor = this.fleetModel.fleetColor == null ? "" : this.fleetModel.fleetColor;
          this.findBrandAndMaker();
        },
        error => this.toastr.error(error.message, 'Fleet')
      );
    }

  }

  getbooking(){
    //format day
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    function formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('') 
      );
    }
    var toDate = formatDate(this.todate)

    let modelOption = {
      BookDateF: "20001014",
      BookDateT: toDate,
      BookNo: "",
      BookStatus: "",
      BranchCode: "",
      CustId: "",
      DateF: "2000-10-13T17:00:00.000Z",
      DateT: "2022-10-14T03:11:51.231Z" ,
      FleetModel: "",
      FleetType: "",
      UserId: "1",
      bookType: "",
      cusType: "",
      driverId: "",
      fleetDesc: "",
      fleetUseType: "",
      getByBookDate: 1,
      staffId: "",
      dateType: "BOOKDATE",
      fleetId :this.id,
      
    }
    this._bookingService.search(modelOption).map(response => {
      let lastest = [];
       lastest = response['payload'];
       return lastest.splice(lastest.length-11,lastest.length-1);
      }).subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

  viewDetail(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }

  findBrandAndMaker() {
    let model = this.listFleetModel.find((m) => m.fleetModelId == this.fleetModel.fleetModelId);
    if (model) {
      this.nameBrand = model.brandName || '';
      this.nameMaker = model.makerName || ''
    }
  }
  purchasePrice(_value) {
    this.fleetModel.purchasePrice = _value;
  }

  onChange(value) {
    this.selectedColor = value;
  }
  save() {
    this.IsSubmit = true;
    let model: any = this.fleetModel;
    // model.manufacturedYear = this.fleetModel.manufacturedYear != undefined ? (new Date(this.fleetModel.manufacturedYear)).getFullYear().toString() : "";

    if (this.id == "new") {
      model.createUser = this.currentuser.employeeId;
      model.fleet_Desc = model.vsnNumber;
      model.purchasePrice = parseFloat(this.fleetModel.purchasePrice)
      this._fleetService.saveFleet(model).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Save Successfully !', 'Fleet')
            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }
            this.IsSubmit = false
            this.router.navigate(['admin/master/fleet/' + data["payload"]]);
          }
          else {
            this.toastr.error('Save failed !', 'Fleet')
          }
        },
        error => {
          this.IsSubmit = false
          this.toastr.error(error, 'Fleet')
        })
    }
    else {
      model.fltId = this.id;
      model.fleet_Desc = model.vsnNumber;
      model.UserId = this.currentuser.employeeId;
      this._fleetService.updateFleet(model).subscribe(
        data => {
          this.IsSubmit = false
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Update Successfully !', 'Fleet')

          }
          else {
            this.toastr.error('Update failed !', 'Fleet')
          }
        },
        error => {
          this.IsSubmit = false
          this.toastr.error(error.message, 'Fleet')
        })
    }
  }
  onValueChanged(e) {
    let model = this.listFleetModel.find((m) => m.fleetModelId == e);
    if (model) {
      this.nameBrand = model.brandName || '';
      this.nameMaker = model.makerName || ''
    }
    if (this.id == "new") {
      this.fleetModel.fleet_Desc = this.listFleetModel.find(m => m.fleetModelId == e).fleetModelDesc;
    }
  }

  formatDate(data) {
    return this._commonService.convertMilisecondToUTCDateTime(data);
  }

  log(item: any) {
    console.log(item);
    return "aa"
  }
  urlback(url: string) {
    this.routeatd.queryParams.subscribe(params => {
      this.router.navigate([url], { queryParams: params })
      params = [];
    });
  }

  onFleetStatusChanged(e){
    if (e.value &&  e.value == 'LIQUIDATED'){
      this.isRequiredLiquid = true;
    }
    else{
      this.isRequiredLiquid = false;
    }
  } 

}
