import { Component, ViewChild } from '@angular/core';
import { FleetModel, FleetDeleteModel, FleetsDTO } from '../../../core/models/master/Fleet';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from '../../../core/services/master/fleet.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../core/services/common.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { StdCodeDTO } from '../../../core/models/common/stdcodeDTO';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import * as moment from 'moment';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';
declare var AdminLTE: any;
@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: FleetsDTO;
  modelSearch = new FleetModel();
  listFleetType: any = [];
  listFleetModel: any = [];
  listMaker: StdCodeDTO[];
  listBrand: StdCodeDTO[];
  listStdCode: StdCodeDTO[];
  fileName: string;
  pageSize: number = 10;
  pageIndex: number;
  focusIndex: number;
  titleHeader: string = '';

  constructor(
    public router: Router,
    private _fleetService: FleetService,
    public toastr: ToastrService,
    public _commonService: CommonService,
    private routeat: ActivatedRoute,
    private _fleetMaintenanceSvr: TaxAndInsuranceService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService,
  ) {
    super(router);
    this.modelSearch.fleetDesc = "";
    this.modelSearch.maker = "";
    this.modelSearch.fleetType = "";
    this.modelSearch.brand = "";
    this.modelSearch.fleetModel = "";
    this.modelSearch.branch = "";
    this.fileName = this._commonService.getFileName('Fleets Maintenance');

    this.modelSearch.dateT = new Date();
    this.modelSearch.dateF = moment(this.modelSearch.dateT).subtract(1, 'months');

    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.modelSearch = Object.assign(this.modelSearch, params);
        this.pageSize = Number(params.pageSize);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
      })
    }
  }

  ngOnInit() {
    this.loadInit()
    this.getFleets();
    AdminLTE.init();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Fleet");
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listFleetType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTYPE';
          });
          this.listMaker = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLMAKER';
          });
          this.listBrand = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLBRAND';
          });
        }
    });
  }

  loadInit() {
    this.getStdCodesCache();

    let model = {
      "FleetType": "",
      "FleetModelDesc": "",
      "TransmissionType": "",
      "FuelType": "",
      "Maker": "",
      "Brand": ""
    }

    this._fleetService.getFleetModels(model).subscribe(data => this.listFleetModel = data["payload"])
  }

  getFleets() {
    this.modelSearch.convert();

    this.modelSearch.fleetModel = this.modelSearch.fleetModel == null ? "" : this.modelSearch.fleetModel;

    this._fleetMaintenanceSvr.getFleetsMaintenance(this.modelSearch).subscribe(data => {
      if (data["success"] == true) {
        this.dataSource = data["payload"]
      }
    });
  }

  onSubmit(form: NgForm) {
    this.getFleets();
  }

}
