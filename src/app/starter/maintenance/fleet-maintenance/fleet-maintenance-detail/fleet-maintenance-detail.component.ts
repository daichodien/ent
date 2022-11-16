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
import { TaxAndInsuranceDto } from '../../../../core/models/tax-and-insurance/TaxAndInsuranceDto';
import { SupplierService } from '../../../../core/services/supplier.service';
import { CacheService } from '../../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-fleet-maintenance-detail',
  templateUrl: './fleet-maintenance-detail.component.html',
  styleUrls: ['./fleet-maintenance-detail.component.css']
})
export class FleetMaintenanceDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  dataSource: any = [];
  fleetMaintenanceDto: TaxAndInsuranceDto = new TaxAndInsuranceDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  serviceTypes: any = [];
  fleetMaintenanceId = '0';
  listCustomerType: any = [];
  serviceItems: any = [];
  serviceItemTypes: any = [];
  serviceLevels: any = [];
  nextSvcDateMin: any;
  listSupplier:any = [];
  total:number;
  taxamount:number;
  totalAmountAfterTax:number;
  constructor(public router: Router,
    private _fleetService: FleetService,
    private _commonService: CommonService,
    private _fleetMaintenanceSvr: TaxAndInsuranceService,
    public toastr: ToastrService,
    private routeact: ActivatedRoute,
    private cacheService: CacheService,
    public supplierService: SupplierService) {
    super(router);
    this.fleetMaintenanceId = this.routeact.params['_value'].id;

    this.fleetMaintenanceDto.tDate = new Date();
    // this.nextSvcDateMinChanged();
    this.fleetMaintenanceDto.svcType = 'MAINTENANCE';

  }

   async ngOnInit() {
    AdminLTE.init();
    this.fileUpload.refNoType = REFDOCTYPE.FleetMaintenance;
    this.fileUpload._userId = this.currentuser.employeeId;
    this.loadInit();

    this.routeact.params.subscribe(async params => {
      try {
        this.fleetMaintenanceId = params['id'];
        if (this.fleetMaintenanceId != '0') {
          this.getFleetMaintenanceById(this.fleetMaintenanceId);
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.fleetMaintenanceId;
          this.fileUpload.loadFiles();
        } else {
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
          this.serviceTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWSVCTYPE';
          });
          this.serviceItemTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'RSSVCTYPEITEM';
          });
          this.serviceLevels = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'SERVICELEVEL';
          });
        }
    });
  }

  async loadInit() {
    this.getStdCodesCache();
    const model = {
      'FleetDesc': '',
      'Maker': '',
      'FleetType': '',
      'Brand': '',
      'FleetModel': '',
    };

    await this._fleetService.getFleets(model).subscribe(data => this.equipmentGroups = data['payload']);
    const supplierSearch = {
      'supplierName': '',
      'country': '',
      'supplierType': '',
      'mobileNo': '',
    };
    await this.supplierService.getsuppliers(supplierSearch).subscribe(data => {
    this.listSupplier = data['payload'];
  });
  }

  onInitNewRow(e) {
    e.data.qty = 1;
    e.data.unitPrice = 0;
  }

  onRowChanging(e, type) {
    e.data.amount = e.data.qty * e.data.unitPrice;
    if (type === 'insert') {
      e.data.mtId = this.serviceItems.length + 1;
      this.totalAmountAfterTax =   this.total  +  this.taxamount ;
    }

    if (type === 'update') {
      e.component.refresh(true);
    }

    this.calculateAmount();
  }

  onEditorPreparing(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'amount') {
      e.editorOptions.disabled = true;
    }
  }

  save() {
    this.fleetMaintenanceDto.userId = this.currentuser.employeeId;
    this.fleetMaintenanceDto.tDate == null ? moment(this.fleetMaintenanceDto.tDate).format('MM/DD/YYYY') : '';
    this.fleetMaintenanceDto.nextSvcDate == null ? moment(this.fleetMaintenanceDto.nextSvcDate).format('MM/DD/YYYY') : '';
    this.fleetMaintenanceDto.svcItems = this.serviceItems;
    if (this.fleetMaintenanceDto.amount === '0' || this.fleetMaintenanceDto.amount === null) {
      this.fleetMaintenanceDto.amount = this.calculateAmount();
    }
    if (this.fleetMaintenanceId === '0') {
      this._fleetMaintenanceSvr.saveFleetMaintenance(this.fleetMaintenanceDto).subscribe(
        data => {
          if (data['success'] === true && data['payload'] > 0) {
            this.toastr.success('Insert Fleet Maintenance successfully!', 'Fleet Maintenance');

            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }

            this.fleetMaintenanceId = data['payload'];
            this.router.navigate(['admin/maintenance/fleetmaintenance/' + data['payload']]);
          } else {
            this.toastr.error('Insert Fleet Maintenance failed!', 'Fleet Maintenance');
          }
        },
        error => {
          this.toastr.error(error, 'Fleet Maintenance');
        })
    } else {
      this._fleetMaintenanceSvr.updateFleetMaintenance(this.fleetMaintenanceDto).subscribe(
        data => {
          if (data['success'] === true) {
            this.toastr.success('Update Fleet Maintenance successfully!', 'Fleet Maintenance');
            this.router.navigate(['admin/maintenance/fleetmaintenance/' + this.fleetMaintenanceId]);
          } else {
            this.toastr.error('Update Fleet Maintenance failed!', 'Fleet Maintenance');
          }
        },
        error => {
          this.toastr.error(error, 'Fleet Maintenance');
        }
      )
    }
  }

  getFleetMaintenanceById(id) {
    let result: any;
    if (this.fleetMaintenanceId !== '0') {
      this._fleetMaintenanceSvr.getFleetMaintenance(id).subscribe(
        data => {
          result = data['payload'];
          this.serviceItems = result.svcItem;
          this.fleetMaintenanceDto = result.fleetMaintenance;
          this.fleetMaintenanceDto.relatedParty =  Number(this.fleetMaintenanceDto.relatedParty);
          this.calculateAmount();
        });
    }
  }

  calculateAmount() {
    if (this.serviceItems.length > 0) {
      this.total = this.serviceItems.map(item => item.amount).reduce((prev, next) => prev + next);
    }
    this.taxamount = this.total * 10 / 100 ;
    this.totalAmountAfterTax =   this.total  +  this.taxamount ;
    return this.totalAmountAfterTax;
  }
  onRowDelete(e)
  {
    this.calculateAmount();
  }
  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/maintenance/fleetmaintenance'], { queryParams: params });
      params = [];
    });
  }
}
