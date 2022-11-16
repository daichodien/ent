import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FileuploadComponent } from '../../../../core/directives';
import { BaseComponent } from '../../../../core/directives/base.component';
import { FleetService } from '../../../../core/services/master/fleet.service';
import { TaxAndInsuranceService } from '../../../../core/services/tax-and-insurance.service';
import { CommonService } from '../../../../core/services/common.service';
import { REFDOCTYPE } from '../../../../core/helpers';
import { FleetIncidentDto } from '../../../../core/models/tax-and-insurance/FleetIncidentDto';
import { CacheService } from '../../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-fleet-incident-detail',
  templateUrl: './fleet-incident-detail.component.html',
  styleUrls: ['./fleet-incident-detail.component.css']
})
export class FleetIncidentDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  dataSource: any = [];
  fleetIncidentDto: FleetIncidentDto = new FleetIncidentDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  incidentTypes: any = [];
  fleetIncidentId: string = "0";
  listCustomerType: any = [];
  serviceItems: any = [];
  serviceItemTypes: any = [];
  nextSvcDateMin: any;

  constructor(public router: Router,
    private _fleetService: FleetService,
    private _commonService: CommonService,
    private _fleetIncidentSvc: TaxAndInsuranceService,
    public toastr: ToastrService,
    private cacheService: CacheService,
    private routeact: ActivatedRoute) {
    super(router);
    this.fleetIncidentId = this.routeact.params["_value"].id;

    this.fleetIncidentDto.tDate = new Date();
    this.nextSvcDateMinChanged();

  }

  ngOnInit() {
    AdminLTE.init();
    this.fileUpload.refNoType = REFDOCTYPE.FleetIncident;
    this.fileUpload._userId = this.currentuser.employeeId;
    this.loadInit();

    this.routeact.params.subscribe(async params => {
      try {
        this.fleetIncidentId = params['id'];
        if (this.fleetIncidentId != "0") {
          this.getFleetIncidentById(this.fleetIncidentId);
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.fleetIncidentId;
          this.fileUpload.loadFiles();
        }
        else {
          //add default value for add new 
          this.fileUpload.autoSave = false;
        }
      } catch (e) {
      }
    });
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.incidentTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWINCIDENTTYPE';
          });
          this.serviceItemTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'RSSVCTYPEITEM';
          });
        }
    });
  }

  async loadInit() {
    this.getStdCodesCache();

    let model = {
      "FleetDesc": "",
      "Maker": "",
      "FleetType": "",
      "Brand": "",
      "FleetModel": "",
    }

    await this._fleetService.getFleets(model).subscribe(data => this.equipmentGroups = data["payload"])
  }

  save() {
    this.fleetIncidentDto.userId = this.currentuser.employeeId;
    this.fleetIncidentDto.tDate == null ? moment(this.fleetIncidentDto.tDate).format('MM/DD/YYYY') : '';

    if (this.fleetIncidentId == "0") {
      this._fleetIncidentSvc.saveFleetIncident(this.fleetIncidentDto).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Insert Fleet Incident successfully!', 'Fleet Incident');

            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }
            
            this.fleetIncidentId = data["payload"];
            this.router.navigate(['admin/maintenance/fleetincident/' + data["payload"]]);
          } else {
            this.toastr.error('Insert Fleet Incident failed!', 'Fleet Incident')
          }
        },
        error => {
          this.toastr.error(error, 'Fleet Incident')
        })
    } else {
      this._fleetIncidentSvc.updateFleetIncident(this.fleetIncidentDto).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success('Update Fleet Incident successfully!', 'Fleet Incident');
            this.router.navigate(['admin/maintenance/fleetincident/' + this.fleetIncidentId]);
          } else {
            this.toastr.error('Update Fleet Incident failed!', 'Fleet Incident')
          }
        },
        error => {
          this.toastr.error(error, 'Fleet Incident')
        }
      )
    }
  }

  getFleetIncidentById(id) {
    if (this.fleetIncidentId != "0") {
      this._fleetIncidentSvc.getFleetIncident(id).subscribe(
        data => {
          this.fleetIncidentDto = data['payload'];
        })
    }
  }

  nextSvcDateMinChanged() {
    this.nextSvcDateMin = moment(this.fleetIncidentDto.tDate).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0);
    this.nextSvcDateMin = new Date(this.nextSvcDateMin);
  }

  calculateAmount() {
    let totalAmount: any = 0;
    if (this.serviceItems.length > 0) {
      totalAmount = this.serviceItems.map(item => item.amount).reduce((prev, next) => prev + next);
    }

    return totalAmount;
  }

  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/maintenance/fleetincident'], { queryParams: params })
      params = [];
    });
  }

}
