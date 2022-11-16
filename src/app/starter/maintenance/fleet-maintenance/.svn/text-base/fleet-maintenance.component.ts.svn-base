import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CommonService } from '../../../core/services/common.service';
import * as moment from 'moment';
import { TaxAndInsuranceDto } from '../../../core/models/tax-and-insurance/TaxAndInsuranceDto';
import { confirm } from 'devextreme/ui/dialog';
import { SupplierService } from '../../../core/services/supplier.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-fleet-maintenance',
  templateUrl: './fleet-maintenance.component.html',
  styleUrls: ['./fleet-maintenance.component.css']
})
export class FleetMaintenanceComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: any = [];
  searchModel: any = {};
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  fleetMaintenanceDeleteModel: any = {};
  serviceTypes: any = [];
  listSupplier: any = [];
  fleetNumbers: any = [];
  pageSize = 10;
  pageIndex: number;
  focusIndex: number;
  fileName= 'FleetMaintenance.xls';
  titleHeader: string = '';
  constructor(private _taxAndInsuranceSvr: TaxAndInsuranceService,
    public router: Router,
    private toastr: ToastrService,
    private _fleetService: FleetService,
    private _commonService: CommonService,
    private routeact: ActivatedRoute,
    private cacheService: CacheService,
    private appService: TitleHeaderPageService,
    public supplierService: SupplierService) {
    super(router);
    this.searchModel.dateF = new Date();
    this.searchModel.dateT = moment(this.searchModel.dateF).add(1, 'months');
    this.searchModel.dateType = 'CREATEDATE';
    if (Object.keys(this.routeact.snapshot["queryParams"]).length > 0) {
      this.routeact.queryParams.subscribe(params => {
        this.searchModel = Object.assign(this.searchModel, params);
        this.pageSize = Number(params.pageSize);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
        this.searchModel.fleetId = +this.searchModel.fleetId;
      });
    }
  }

  ngOnInit() {
    AdminLTE.init();
    //this.searchModel.relatedParty = '';
    this.loadInit();
    //this.searchModel.dateT = new Date();
    //this.searchModel.dateF = moment(this.searchModel.dateT).subtract(1, 'weeks');
    this.searchFleetMaintenances();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Fleet Maintenance");

  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.serviceTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWSVCTYPE';
          });
        }
    });
  }

  loadInit() {
    this.getStdCodesCache();
    let model = {
      "brand": "",
      "fleetModelDesc": "",
      "fleetType": "",
      "fuelType": "",
      "maker": "",
      "transmissionType": "",
    }

    this._fleetService.getFleetModels(model).subscribe(data => this.equipmentGroups = data["payload"])

    let modelGetFleet = {
      "FleetDesc": "",
      "Maker": "",
      "FleetType": "",
      "Brand": "",
      "FleetModel": "",
    }
    this._fleetService.getFleets(modelGetFleet).subscribe(data => this.fleetNumbers = data["payload"]);

    let supplierSearch: any = {
      "supplierName": "",
      "country": "",
      "supplierType": "",
      "mobileNo": "",
    };
    this.supplierService.getsuppliers(supplierSearch).subscribe(data => {
      this.listSupplier = data["payload"];
    });

  }

  searchFleetMaintenances() {
    this.searchModel.dateF = moment(this.searchModel.dateF).format('MM/DD/YYYY');
    this.searchModel.dateT = moment(this.searchModel.dateT).format('MM/DD/YYYY');
    this._taxAndInsuranceSvr.searchFleetMaintenances(this.searchModel).subscribe(
      data => {
        if (data['success'] === true) {
          this.dataSource = data['payload'];
        }
      }
    );
  }

  delete(id: number) {
    const result = confirm('Are you sure delete this row?', 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.fleetMaintenanceDeleteModel.userId = this.currentuser.employeeId;
        this.fleetMaintenanceDeleteModel.MTId = id;
        this._taxAndInsuranceSvr.deleteFleetMaintenance(this.fleetMaintenanceDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Fleet Maintenance') : this.toastr.error('Delete failed!', 'Fleet Maintenance')
              this.searchFleetMaintenances();
            }
            else {
              this.toastr.error('Delete failed!', 'Fleet Maintenance')
            }
          },
          error => {
            this.toastr.error(error, 'Fleet Maintenance')
          }
        )
      }
    })
  }

  goDetail(id: string) {
    let querypara: any = this.searchModel;

    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    querypara.focusIndex = id;

    this.router.navigate(['admin/maintenance/fleetmaintenance/' + id], { queryParams: querypara })
  }

}
