import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { CommonService } from '../../../core/services/common.service';
import { ServicePackageDTO, ServicePackageDeleteModel, ServicePackageSearch, ServicePackageSaveModel, ServicePackageUpdateModel } from '../../../core/models/master/servicepackagemodel';
import { ServicePackageService } from '../../../core/services/master/servicepackage.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent} from 'devextreme-angular';
import { CustomerService } from '../../../core/services/master/customer.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-package-service',
  templateUrl: './package-service.component.html',
  styleUrls: ['./package-service.component.css']
})

export class PackageServiceComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  modelSearch: any = {};
  dataSource: ServicePackageDTO;
  searchSerPkgModel: ServicePackageSearch = new ServicePackageSearch();
  servicePackageModelDeleteModel:ServicePackageDeleteModel = new ServicePackageDeleteModel();
  listBookType: any = [];  
  //listFleetType: any = [];  
  listBrandCode: any = [];  
  fileName:string;
  listFleetModel: any = [];
  events: Array<string> = [];
  titleHeader: string = '';
  constructor(
    route: Router,
    public _commonService: CommonService,
    private _serpkgService: ServicePackageService,
    private _toastr: ToastrService,
    private routeat: ActivatedRoute,
    private _customerService: CustomerService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(route);
    this.searchSerPkgModel.bookType = ""
    this.searchSerPkgModel.branchCode = ""
    this.searchSerPkgModel.fleetModelId = 0

    this.fileName = this._commonService.getFileName('servicepackage_model');
    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params =>{
        this.searchSerPkgModel.bookType = params['bookType'];
        this.searchSerPkgModel.branchCode = params['branchCode'];
        this.searchSerPkgModel.fleetModelId = params['fleetModelId'];
      })
    }
  }  

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();
    this.getServicePackageModelList();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Service Package");
  }
  loadInit() {
    this.getStdCodesCache();
    this._serpkgService.getAllBranchCodes().subscribe(data => this.listBrandCode = data["payload"]);   
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listBookType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMBKTYPE';
          });
        }
    });
  }

  savePackage(event) {
    var modelSerPkg = new ServicePackageSaveModel ();
    modelSerPkg.bookType = event.data.bookType;
    modelSerPkg.branchCode = event.data.branchCode;
    modelSerPkg.ownerId = event.data.ownerId;
    modelSerPkg.packageDesc = event.data.packageDesc;
    modelSerPkg.packageMemo = event.data.packageMemo;
    //modelSerPkg.userClass = event.data.userClass;
    modelSerPkg.userID = this.currentuser.employeeId;
    modelSerPkg.validFrom = event.data.validFrom;
    modelSerPkg.validTo = event.data.validTo;

    this._serpkgService.saveServicePackage(modelSerPkg).subscribe(
      data => {
        if (data["success"]== true ) {
          this._toastr.success("Insert Service Package Sucessfull", "Service Package");         
          this.getServicePackageModelList();
        }
        else {
          this._toastr.success("Insert A Service Package Fail", "Service Package");
        }
      });;
  }

  updatePackage(event) {
    if (event.newData){
      var modelSerPkg = new ServicePackageUpdateModel();
      modelSerPkg.svcPkgId = event.oldData.svcPkgId;
      modelSerPkg.bookType = (event.newData.bookType != undefined ? event.newData.bookType : event.oldData.bookType);
      modelSerPkg.branchCode = (event.newData.branchCode != undefined ? event.newData.branchCode : event.oldData.branchCode);
      modelSerPkg.ownerId = (event.newData.ownerId != undefined ? event.newData.ownerId : event.oldData.ownerId);
      modelSerPkg.packageDesc = (event.newData.packageDesc != undefined ? event.newData.packageDesc : event.oldData.packageDesc);
      modelSerPkg.packageMemo = (event.newData.packageMemo != undefined ? event.newData.packageMemo : event.oldData.packageMemo);
      //modelSerPkg.userClass = (event.newData.userClass != undefined ? event.newData.userClass : event.oldData.userClass);
      modelSerPkg.userID = this.currentuser.employeeId;
      modelSerPkg.validFrom = (event.newData.validFrom != undefined ? event.newData.validFrom : event.oldData.validFrom);
      modelSerPkg.validTo = (event.newData.validTo != undefined ? event.newData.validTo : event.oldData.validTo);
      this._serpkgService.updateServicePackage(modelSerPkg).subscribe(
        data => {
          if (data["success"]== true ) {
            this._toastr.success("Update Service Package Sucessfull", "Service Package");         
            this.getServicePackageModelList();
          }
          else {
            this._toastr.success("Update Service Package Fail", "Service Package");
          }
        });;
    }    
  }

  getServicePackageModelList() {
    if (this.searchSerPkgModel != undefined && this.searchSerPkgModel != null)
    {
      if (this.searchSerPkgModel.bookType == undefined || this.searchSerPkgModel.bookType == null) this.searchSerPkgModel.bookType = '';
      if (this.searchSerPkgModel.branchCode == undefined || this.searchSerPkgModel.branchCode == null) this.searchSerPkgModel.branchCode = '';
      if (this.searchSerPkgModel.fleetModelId == undefined || this.searchSerPkgModel.fleetModelId == null || this.searchSerPkgModel.fleetModelId == '') this.searchSerPkgModel.fleetModelId = 0;
    }
    this._serpkgService.getServicePackageList(this.searchSerPkgModel).subscribe(data => {
      this.dataSource = data["payload"] || [];
      AdminLTE.init();
    })
  }
  onSubmit() {
    this.getServicePackageModelList();
  }

  deletePackage(event) {
    //var result = confirm("Are you sure delete this row?", 'Confirm delete');
    //result.done((dialogResult: any) => {
      //if (dialogResult) {
        this.servicePackageModelDeleteModel.userId = this.currentuser.employeeId;
        this.servicePackageModelDeleteModel.svcPkgId = event.data.svcPkgId;
        this._serpkgService.deleteServicePackage(this.servicePackageModelDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this._toastr.success('Delete Successfully !', 'ServicePackage Model') : this._toastr.error('Delete failed !', 'ServicePackage Model')
              this.getServicePackageModelList();
            }
            else {
              this._toastr.error('Delete failed !', 'ServicePackage Model')
            }
          },
          error => {
            console.log(error);
            this._toastr.error(error.message, 'ServicePackage Model')
          }
        )
     // }
    //})
  }
  back(id: string) {
    // console.log(this.dataGrid);
    // this.dataGrid.instance.columnOption("srSubject", "sortOrder", 'desc');
    let querypara: any = this.searchSerPkgModel;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    this.router.navigate(['admin/master/servicepackage/' + id], { queryParams: querypara })
  }

  validateValidFromDate(e) {
    return e.data.validFrom <= e.data.validTo;
  }

  // validateValidToDate(e) {
  //   return e.data.validTo >= e.data.validFrom;
  // }

  onEditorPreparing(e) {
    if(e.row.rowType == "data" && e.parentType === "dataRow") {       
      if (e.dataType == 'date') {
        e.editorOptions.displayFormat = 'dd/MM/yyyy';        
      }        
    }
  }

}