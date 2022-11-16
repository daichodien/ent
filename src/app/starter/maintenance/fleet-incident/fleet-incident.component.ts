import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CommonService } from '../../../core/services/common.service';
import * as moment from 'moment';
import { confirm } from 'devextreme/ui/dialog';
import { FleetIncidentDto } from '../../../core/models/tax-and-insurance/FleetIncidentDto';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-fleet-incident',
  templateUrl: './fleet-incident.component.html',
  styleUrls: ['./fleet-incident.component.css']
})
export class FleetIncidentComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: any = [];
  searchModel: FleetIncidentDto = new FleetIncidentDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  fleetIncidentDeleteModel: any = {};
  incidentTypes: any[] = [];
  pageSize: number = 10;
  pageIndex: number;
  focusIndex: number;
  fleetNumbers: any = [];
  fileName: any = 'FleetIncident.xls';
  titleHeader: string = '';
  constructor(private _maintenanceSvr: TaxAndInsuranceService,
    public router: Router,
    private toastr: ToastrService,
    private routeat: ActivatedRoute,
    private cacheService: CacheService,
    private _fleetService: FleetService,
    private appService: TitleHeaderPageService,
    private _commonService: CommonService) {
    super(router);

    // Set default dateT and dateF value
    // dateT is current date
    this.searchModel.dateT = new Date();

    // dateF is a week ago from dateT
    this.searchModel.dateF = moment(this.searchModel.dateT).subtract(1, 'weeks');

    if (Object.keys(this.routeat.snapshot['queryParams']).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.searchModel = Object.assign(this.searchModel, params);
        this.pageSize = Number(params.pageSize);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
      })
    }
  }

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();

    // Set default dateT and dateF value
    // dateT is current date
    // this.searchModel.dateT = new Date();

    // dateF is a week ago from dateT
    // this.searchModel.dateF = moment(this.searchModel.dateT).subtract(1, 'weeks');

    this.searchFleetIncidents();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Fleet Incident");
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.incidentTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWINCIDENTTYPE';
          });
          this.incidentTypes.push({code: '', codeDesc: 'All'});
        }
    });
  }

  loadInit() {
    this.getStdCodesCache();

    // Model for get all Fleet Models
    const model = {
      "brand": "",
      "fleetModelDesc": "",
      "fleetType": "",
      "fuelType": "",
      "maker": "",
      "transmissionType": "",
    };

    // Load fleet models
    this._fleetService.getFleetModels(model).subscribe(data => this.equipmentGroups = data['payload']);

    let modelGetFleet = {
      "FleetDesc": "",
      "Maker": "",
      "FleetType": "",
      "Brand": "",
      "FleetModel": "",
    };
    this._fleetService.getFleets(modelGetFleet).subscribe(data => this.fleetNumbers = data['payload']);

  }

  searchFleetIncidents() {
    this.searchModel.convert();
    this._maintenanceSvr.searchFleetIncidents(this.searchModel).subscribe(
      data => {
        if (data['success'] == true) this.dataSource = data['payload'];
      }
    )
  }

  // Delete Fleet Incident
  delete(id: number) {
    const result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.fleetIncidentDeleteModel.userId = this.currentuser.employeeId;
        this.fleetIncidentDeleteModel.AFId = id;

        this._maintenanceSvr.deleteFleetIncident(this.fleetIncidentDeleteModel).subscribe(
          data => {
            if (data["success"] === true) {
              data['payload'] > 0 ? this.toastr.success('Delete successfully!', 'Fleet Incident') : this.toastr.error('Delete failed!', 'Fleet Incident')
              this.searchFleetIncidents();
            }
            else {
              this.toastr.error('Delete failed!', 'Fleet Incident')
            }
          },
          error => {
            this.toastr.error(error, 'Fleet Incident')
          }
        )
      }
    })
  }

  // Go to detail page
  goDetail(id: string) {
    let querypara: any = this.searchModel;
    
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    querypara.focusIndex = id;

    this.router.navigate(['admin/maintenance/fleetincident/' + id], { queryParams: querypara })
  }

}
