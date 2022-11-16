import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { CommonService } from '../../../../core/services/common.service';
import { ServicePackageService } from '../../../../core/services/master/servicepackage.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePackageDetailModel, ServicePackageDetailDeleteModel, ServicePackageDetailSearch, ServicePackageModel } from '../../../../core/models/master/servicepackagemodel';
import { FleetService } from '../../../../core/services/master/fleet.service';
import { CacheService } from '../../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-package-service-detail',
  templateUrl: './package-service-detail.component.html',
  styleUrls: ['./package-service-detail.component.css']
})


export class PackageServiceDetailComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  modelSearch: any = {};
  dataSource: ServicePackageDetailModel;
  id: any;
  //searchSerPkgModel: ServicePackageSearch = new ServicePackageSearch();
  servicePackageDetailModelDeleteModel:ServicePackageDetailDeleteModel = new ServicePackageDetailDeleteModel();
  listCurrency: any = [];  
  listFleetModel: any = []; 
  // listBrandCode: any = [];  
  serPkg: ServicePackageModel = new ServicePackageModel();
  fileName:string; 

  constructor(
    public route: Router,
    public _commonService: CommonService,
    public _fleetService: FleetService,
    private _serpkgService: ServicePackageService,
    private _toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private cacheService: CacheService,

  ) {
    super(route);

    this.fileName = this._commonService.getFileName('servicepackage_model');
    if (Object.keys(this.actRoute.snapshot["queryParams"]).length > 0) {
      this.actRoute.queryParams.subscribe(params =>{
        
      })
    }
  } 

  ngOnInit() {
    AdminLTE.init();
    this.id = this.actRoute.params["_value"].id;
    

    if (!this.id){
      this.actRoute.params.subscribe(async params => {
        try {
            this.id = params.id; 
        }
        catch (e) {
        }
  
      });
    }

    this.loadInit();
    this.getServicePackageDetailList();    
  }
  

  loadInit() 
  {    
    let model = {
      "FleetType": "",
      "FleetModelDesc": "",
      "TransmissionType": "",
      "FuelType": "",
      "Maker": "",
      "Brand": ""
    }
    this._fleetService.getFleetModels(model).subscribe(data => this.listFleetModel = data["payload"]);
     this.getStdCodesCache();

    //  this._serpkgService.getAllBranchCodes().subscribe(data => this.listBrandCode = data["payload"]);    
  
     this._serpkgService.getServicePackageByID(this.id).subscribe(data => this.serPkg = data["payload"]); 
    
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listCurrency = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'CURRENCY';
          });
        }
    });
  }

  onEditorPreparing(e) {
    if(e.row.rowType == "data" && e.parentType === "dataRow") {  
      if(!e.row.isEditing && e.dataField === "fleetModelId") {
        e.editorOptions.disabled = true;
      }
      if (e.dataField === "isMandatoryDriver"){
        if (e.value == '0') {
          e.editorOptions.value = false;
          e.row.data.isMandatoryDriver = false;
        }
        else if (e.value == '1') {
          e.editorOptions.value = true;
          e.row.data.isMandatoryDriver = true;
        }
      }
      if (e.dataType == 'number') {
        e.editorOptions.format = '#,##0.00';        
      }        
    }
  }

  savePackageDetail(event) {

    if (event.data){
      event.data.svcPkgId = this.id;
      event.data.isMandatoryDriver = event.data.isMandatoryDriver ? '1' : '0';
      this._serpkgService.saveServicePackageDetail(event.data).subscribe(
        data => {
          if (data["success"]== true ) {
            this._toastr.success("Insert Service Package Sucessfull", "Service Package Detail");         
            this.getServicePackageDetailList();
          }
          else {
            this._toastr.success("Insert A Service Package Fail", "Service Package Detail");
          }
        });;
    }
    
  }

  updatePackageDetail(event) { 

    if (event.newData){

      var modelSerPkgDetail = new ServicePackageDetailModel();

      modelSerPkgDetail.svcPkgDtlId = event.oldData.svcPkgDtlId;
      modelSerPkgDetail.itemNo = (event.newData.itemNo != undefined ? event.newData.itemNo : event.oldData.itemNo);
      modelSerPkgDetail.fleetModelId = (event.newData.fleetModelId != undefined ? event.newData.fleetModelId : event.oldData.fleetModelId);
      modelSerPkgDetail.unitPrice = (event.newData.unitPrice != undefined ? event.newData.unitPrice : event.oldData.unitPrice);
      modelSerPkgDetail.distanceLimit = (event.newData.distanceLimit != undefined ? event.newData.distanceLimit : event.oldData.distanceLimit);
      modelSerPkgDetail.overNightPerNight = (event.newData.overNightPerNight != undefined ? event.newData.overNightPerNight : event.oldData.overNightPerNight);
      modelSerPkgDetail.areaCode = (event.newData.areaCode != undefined ? event.newData.areaCode : event.oldData.areaCode);
      modelSerPkgDetail.timeLimit = (event.newData.timeLimit != undefined ? event.newData.timeLimit : event.oldData.timeLimit);
      modelSerPkgDetail.overTimeSurcharge = (event.newData.overTimeSurcharge != undefined ? event.newData.overTimeSurcharge : event.oldData.overTimeSurcharge);
      modelSerPkgDetail.overKMSurcharge = (event.newData.overKMSurcharge != undefined ? event.newData.overKMSurcharge : event.oldData.overKMSurcharge);  

      modelSerPkgDetail.sundaySurcharge = (event.newData.sundaySurcharge != undefined ? event.newData.sundaySurcharge : event.oldData.sundaySurcharge);
      modelSerPkgDetail.saturdaySurcharge = (event.newData.saturdaySurcharge != undefined ? event.newData.saturdaySurcharge : event.oldData.saturdaySurcharge);
      modelSerPkgDetail.holidaySurcharge = (event.newData.holidaySurcharge != undefined ? event.newData.holidaySurcharge : event.oldData.holidaySurcharge);
      modelSerPkgDetail.driverRate = (event.newData.driverRate != undefined ? event.newData.driverRate : event.oldData.driverRate);
      modelSerPkgDetail.wifiRate = (event.newData.wifiRate != undefined ? event.newData.wifiRate : event.oldData.wifiRate);
      modelSerPkgDetail.isMandatoryDriver = (event.newData.isMandatoryDriver != undefined ? event.newData.isMandatoryDriver : event.oldData.isMandatoryDriver);
      modelSerPkgDetail.currencyCode = (event.newData.currencyCode != undefined ? event.newData.currencyCode : event.oldData.currencyCode);

      modelSerPkgDetail.isMandatoryDriver = modelSerPkgDetail.isMandatoryDriver ? '1' : '0';
     
      this._serpkgService.updateServicePackageDetail(modelSerPkgDetail).subscribe(
        data => {
          if (data["success"]== true ) {
            this._toastr.success("Update Service Package Sucessfull", "Service Package Detail");         
            this.getServicePackageDetailList();
          }
          else {
            this._toastr.success("Update Service Package Fail", "Service Package Detail");
          }
        });
    }    
  }

  getServicePackageDetailList() {
    var modelSerPkgDetail = new ServicePackageDetailSearch();
    modelSerPkgDetail.svcPkgId = this.id;
    this._serpkgService.getServicePackageDetailList(modelSerPkgDetail).subscribe(data => {
      this.dataSource = data["payload"] || [];
      AdminLTE.init();
    })
  }

  

  deletePackageDetail(event) {
    //var result = confirm("Are you sure delete this row?", 'Confirm delete');
    //result.done((dialogResult: any) => {
      //if (dialogResult) {
        this.servicePackageDetailModelDeleteModel.userId = this.currentuser.employeeId;
        this.servicePackageDetailModelDeleteModel.svcPkgDtlId = event.data.svcPkgDtlId;
        this._serpkgService.deleteServicePackageDetail(this.servicePackageDetailModelDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this._toastr.success('Delete Successfully !', 'Service Package Detail Model') : this._toastr.error('Delete failed !', 'Service Package Detail Model')
              this.getServicePackageDetailList();
            }
            else {
              this._toastr.error('Delete failed !', 'Service Package Detail Model')
            }
          },
          error => {
            console.log(error);
            this._toastr.error(error.message, 'Service Package Detail Model')
          }
        )
     // }
    //})
  }


  back() {
    this.router.navigate(['admin/master/servicepackage'], { queryParams: this.actRoute.queryParams['_value'] })
  }  
}
