import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import { FileuploadComponent } from '../../../core/directives';
import { REFDOCTYPE } from '../../../core/helpers';
import { TaxAndInsuranceDto } from '../../../core/models/tax-and-insurance/TaxAndInsuranceDto';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CommonService } from '../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { SupplierService } from '../../../core/services/supplier.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-tax-and-insurance-detail',
  templateUrl: './tax-and-insurance-detail.component.html',
  styleUrls: ['./tax-and-insurance-detail.component.css']
})
export class TaxAndInsuranceDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  dataSource: any = [];
  taxAndInsuranceDto: TaxAndInsuranceDto = new TaxAndInsuranceDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  docTypes: any = [];
  taxNInsuranceId: string = "0";
  expireDateMin: any;
  listCustomerType: any =[];
  listSupplier: any =[];

  constructor(public router: Router,
              private _fleetService: FleetService,
              private _commonService: CommonService,
              private _taxAndInsuranceSvr: TaxAndInsuranceService, 
              public toastr: ToastrService,
              private routeact: ActivatedRoute,
              public supplierService:SupplierService,) {
    super(router);
    this.taxNInsuranceId = this.routeact.params["_value"].id;
    this.taxAndInsuranceDto.docType = 'INSURANCE'
   }

   async ngOnInit()  {
    AdminLTE.init();
    this.fileUpload.refNoType = REFDOCTYPE.TaxAndInsurance;
    this.fileUpload._userId = this.currentuser.employeeId;
    await this.loadInit();

    this.routeact.params.subscribe(async params => {
      try {
            this.taxNInsuranceId = params['id'];  
            if (this.taxNInsuranceId != "0") {
              this.getTaxAndInsuranceById(this.taxNInsuranceId);
              this.fileUpload.autoSave = true;
              this.fileUpload.refNoValue = this.taxNInsuranceId;
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

  async loadInit()  {
   
        await this._commonService.getStdcodesByCode("FWDOCTYPE").subscribe(data => this.docTypes = data["payload"]);

          let model = {
            "FleetDesc": "",
            "Maker": "",
            "FleetType": "",
            "Brand": "",
            "FleetModel": "",
          }
          
          await this._fleetService.getFleets(model).subscribe(data => this.equipmentGroups = data["payload"])

          let supplierSearch:any = {
            "supplierName":"",
            "country":"",
            "supplierType":"",
            "mobileNo":"",
          };
          await this.supplierService.getsuppliers(supplierSearch).subscribe(data => {
          this.listSupplier = data["payload"];
        });

    
        
    
  }

  save() {
    this.taxAndInsuranceDto.userId = this.currentuser.employeeId;
    this.taxAndInsuranceDto.tDate = moment(this.taxAndInsuranceDto.tDate).format('MM/DD/YYYY');
    
    this.taxAndInsuranceDto.expireDate != null ? this.taxAndInsuranceDto.expireDate = moment(this.taxAndInsuranceDto.expireDate).format('MM/DD/YYYY') : this.taxAndInsuranceDto.expireDate = null;
    
    if (this.taxNInsuranceId == "0") {
      this._taxAndInsuranceSvr.saveTaxAndInsurance(this.taxAndInsuranceDto).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Insert Tax & Insurance successfully!', 'Tax & Insurance');

            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }

            this.taxNInsuranceId = data["payload"];
            this.router.navigate(['admin/maintenance/taxandinsurance/' + data["payload"]]);
          } else {
            this.toastr.error('Insert Tax & Insurance failed!', 'Tax & Insurance')
          }
        },
        error => {
          this.toastr.error(error, 'Tax & Insurance')
        })
    } else {
      this._taxAndInsuranceSvr.updateTaxAndInsurance(this.taxAndInsuranceDto).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success('Update Tax & Insurance successfully!', 'Tax & Insurance');
            this.router.navigate(['admin/maintenance/taxandinsurance/' + this.taxNInsuranceId]);
          } else {
            this.toastr.error('Update Tax & Insurance failed!', 'Tax & Insurance')
          }
        },
        error => {
          this.toastr.error(error, 'Tax & Insurance')
        }
      )
    }
  }

  getTaxAndInsuranceById(id) {
    if (this.taxNInsuranceId != "0") {
      this._taxAndInsuranceSvr.getTaxAndInsurance(id).subscribe(data => {
        Object.assign(this.taxAndInsuranceDto, data['payload']);
        this.taxAndInsuranceDto.relatedParty =  Number(this.taxAndInsuranceDto.relatedParty);
      })
    }
  }

  expireDateMinChanged() {
    this.expireDateMin = moment(this.taxAndInsuranceDto.tDate).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0);
    this.expireDateMin = new Date(this.expireDateMin);
  }

  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/maintenance/taxandinsurance'], { queryParams: params })
      params = [];
    });
  }

 
}
