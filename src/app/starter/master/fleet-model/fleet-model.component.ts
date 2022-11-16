import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { CommonService } from '../../../core/services/common.service';
import { FleetModelModel, FleetModelDTO, FleetModelDeleteModel } from '../../../core/models/master/fleetmodel';
import { FleetService } from '../../../core/services/master/fleet.service';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

@Component({
  selector: 'app-fleet-model',
  templateUrl: './fleet-model.component.html',
  styleUrls: ['./fleet-model.component.css']
})
export class FleetModelComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  modelSearch: any = {};
  dataSource: FleetModelDTO;
  searchFleetModel: FleetModelModel = new FleetModelModel();
  fleetModelDeleteModel:FleetModelDeleteModel = new FleetModelDeleteModel();
  listTransmissionType: any;
  listFleetType: any;
  listFuelType: any;
  listBrand: any;
  listMaker: any;
  fileName:string;
  titleHeader: string = '';
  
  constructor(
    route: Router,
    public _commonService: CommonService,
    private _fleetService: FleetService,
    private _toastr: ToastrService,
    private routeat: ActivatedRoute,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(route);
    this.searchFleetModel.brand = ""
    this.searchFleetModel.fleetModelDesc = ""
    this.searchFleetModel.fleetType = ""
    this.searchFleetModel.fuelType = ""
    this.searchFleetModel.maker = ""
    this.searchFleetModel.transmissionType = ""
    this.fileName = this._commonService.getFileName('fleet_model');
    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params =>{
        this.searchFleetModel.brand = params['brand'];
        this.searchFleetModel.fleetModelDesc = params['fleetModelDesc'];
        this.searchFleetModel.fleetType = params['fleetType'];
        this.searchFleetModel.fuelType = params['fuelType'];
        this.searchFleetModel.maker = params['maker'];
        this.searchFleetModel.transmissionType = params['transmissionType'];
        this.searchFleetModel.showWebPortal = params['showWebPortal'];
      })
    }
  }

  ngOnInit() {
    this.loadInit();
    this.getFleetModels();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Fleet model");
  }
  loadInit() {
    this.getStdCodesCache();
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listTransmissionType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTRANTYPE';
          });
          this.listMaker = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLMAKER';
          });
          this.listFleetType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTYPE';
          });
          this.listFuelType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLFUELTYPE';
          });
          this.listBrand = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLBRAND';
          });
        }
    });
  }

  getFleetModels() {
    this._fleetService.getFleetModels(this.searchFleetModel).subscribe(data => {
      this.dataSource = data["payload"] || [];
    })
  }

  onSubmit() {
    this.getFleetModels();
  }
  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.fleetModelDeleteModel.userId = this.currentuser.employeeName;
        this.fleetModelDeleteModel.fleetModelId = id;
        this._fleetService.deleteFleetModel(this.fleetModelDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this._toastr.success('Delete Successfully !', 'Fleet Model') : this._toastr.error('Delete failed !', 'Fleet Model')
              this.getFleetModels();
            }
            else {
              this._toastr.error('Delete failed !', 'Fleet Model')
            }
          },
          error => {
            console.log(error);
            this._toastr.error(error.message, 'Fleet Model')
          }
        )
      }
    })
  }
  back(id: string) {
    // console.log(this.dataGrid);
    // this.dataGrid.instance.columnOption("srSubject", "sortOrder", 'desc');
    let querypara: any = this.searchFleetModel;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    this.router.navigate(['admin/master/fleetmodel/' + id], { queryParams: querypara })
  }
}
