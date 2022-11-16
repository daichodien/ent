import { Component, ViewChild } from '@angular/core';
import { FleetModel, FleetDeleteModel, FleetsDTO } from '../../../core/models/master/Fleet';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from '../../../core/services/master/fleet.service';
import { ToastrService } from 'ngx-toastr';
import { confirm } from 'devextreme/ui/dialog';
import { CommonService } from '../../../core/services/common.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { StdCodeDTO } from '../../../core/models/common/stdcodeDTO';
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
  modelDelete = new FleetDeleteModel();
  listFleetType: any = [];
  listFleetModel: any = [];
  listMaker: StdCodeDTO[];
  listBrand: StdCodeDTO[];
  listStdCode: StdCodeDTO[];
  listFleetStatus: StdCodeDTO[];
  fileName: string;
  pageSize:number =  10;
  pageIndex:number;
  focusIndex: number;
  titleHeader: string = '';
  constructor(
    public router: Router,
    private _fleetService: FleetService,
    public toastr: ToastrService,
    public _commonService: CommonService,
    private routeat: ActivatedRoute,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(router);
    this.modelSearch.fleetDesc = "";
    this.modelSearch.maker = "";
    this.modelSearch.fleetType = "";
    this.modelSearch.brand = "";
    this.modelSearch.fleetModel = "";
    this.modelSearch.fleetStatus= "NORMAL";
    this.fileName = this._commonService.getFileName('Fleet');
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
    AdminLTE.init()
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Fleet");
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
    this.modelSearch.fleetModel  = this.modelSearch.fleetModel == null ? "": this.modelSearch.fleetModel
    this._fleetService.getFleets(this.modelSearch).subscribe(data => {
      if (data["success"] == true) {
        this.dataSource = data["payload"]
      }
    });
  }
  onSubmit(form: NgForm) {
    this.getFleets();
  }
  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.modelDelete.userId = "Tuyen"
        this.modelDelete.fltId = id;
        this._fleetService.deleteFleets(this.modelDelete).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete Successfully !', 'Fleet') : this.toastr.error('Delete failed !', 'Fleet')
              this.getFleets();
            }
            else {
              this.toastr.error('Delete failed !', 'Fleet')
            }
          },
          error => {
            this.toastr.error(error, 'Fleet')
          }
        )
      }
    })
  }
  back(id: string) {
    let querypara: any = this.modelSearch;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    querypara.focusIndex = id;
    this.router.navigate(['admin/master/fleet/' + id], { queryParams: querypara })
  }

  // Caching API
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
          this.listFleetStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLEETSTATUS';
          });
        }
    });
  }

}