import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import { isThisSecond } from 'date-fns';
import { TaxAndInsuranceDto } from '../../../core/models/tax-and-insurance/TaxAndInsuranceDto';
import { confirm } from 'devextreme/ui/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../core/services/common.service';
import { FleetService } from '../../../core/services/master/fleet.service';
import * as moment from 'moment';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-tax-and-insurance',
  templateUrl: './tax-and-insurance.component.html',
  styleUrls: ['./tax-and-insurance.component.css']
})
export class TaxAndInsuranceComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: any = [];
  searchModel: TaxAndInsuranceDto = new TaxAndInsuranceDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  taxNInsuranceDeleteModel: any = {};
  docTypes: any = [];
  pageSize: number = 10;
  pageIndex: number;
  focusIndex: number;
  titleHeader: string = '';

  constructor(private _taxAndInsuranceSvr: TaxAndInsuranceService,
    public router: Router,
    private toastr: ToastrService,
    private _fleetService: FleetService,
    private _commonService: CommonService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService,
    private routeact: ActivatedRoute) {
    super(router);
    this.searchModel.dateF = new Date();
    this.searchModel.dateT = moment(this.searchModel.dateF).add(1, 'months');

    if (Object.keys(this.routeact.snapshot["queryParams"]).length > 0) {
      this.routeact.queryParams.subscribe(params => {
        this.searchModel = Object.assign(this.searchModel, params);
        this.pageSize = Number(params.pageSize);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
      });
    }

  }

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();
    this.searchTaxAndInsurances();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Tax & Insurance");
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.docTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWDOCTYPE';
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
  }

  searchTaxAndInsurances() {
    this.searchModel.convert();

    this._taxAndInsuranceSvr.searchTaxAndInsurances(this.searchModel).subscribe(
      data => {
        if (data['success'] == true) this.dataSource = data['payload'];
      }
    )
  }

  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.taxNInsuranceDeleteModel.userId = this.currentuser.employeeId;
        this.taxNInsuranceDeleteModel.TIId = id;
        this._taxAndInsuranceSvr.deleteTaxAndInsurance(this.taxNInsuranceDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Tax And Insurance') : this.toastr.error('Delete failed!', 'Tax And Insurance')
              this.searchTaxAndInsurances();
            }
            else {
              this.toastr.error('Delete failed!', 'Tax And Insurance')
            }
          },
          error => {
            this.toastr.error(error, 'Tax And Insurance')
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

    this.router.navigate(['admin/maintenance/taxandinsurance/' + id], { queryParams: querypara });
  }

}
