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
import { SupportService } from '../../../../core/services/support.service';
import { CustomerService } from '../../../../core/services/master/customer.service';
import { CustomerModel } from '../../../../core/models/master/Customer';
import { CacheService } from '../../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-customer-ticket-detail',
  templateUrl: './customer-ticket-detail.component.html',
  styleUrls: ['./customer-ticket-detail.component.css']
})
export class CustomerTicketDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  dataSource: any = [];
  fleetIncidentDto: FleetIncidentDto = new FleetIncidentDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  incidentTypes: any = [];
  customerTicket: string = "0";
  listCustomerType: any = [];
  serviceItems: any = [];
  serviceItemTypes: any = [];
  nextSvcDateMin: any;
  listIncidentStatus:any= [];
  listCustomer: any = [];
  listEmployee:any = [];
  listTicketType:any = [];
  customerModel = new CustomerModel();
  listIncidentSources: any = [];
  customerIDRequest: string;

  constructor(public router: Router,
    private _fleetService: FleetService,
    private _commonService: CommonService,
    private _supportService: SupportService,
    public toastr: ToastrService,
    private routeact: ActivatedRoute,
    private cacheService: CacheService,
    private _customerService:CustomerService) {
    super(router);
    this.customerTicket = this.routeact.params["_value"].id;

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
        this.customerTicket = params['id'];
        this.customerIDRequest = params['customer'];

        // Check support for page Customer Details
        if(this.customerTicket === '0' && this.customerIDRequest) {
          this.fileUpload.autoSave = false;

          this.fleetIncidentDto.relatedCusId = Number.parseInt(this.customerIDRequest);
          return;
        }


        if (this.customerTicket != "0") {
          this.getCustomerTicketById(this.customerTicket);
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.customerTicket;
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
          this.listIncidentStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'INCIDENTSTATUS';
          });
          this.listTicketType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'TICKETTYPE';
          });
          this.listIncidentSources = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'BOOKSOURCE';
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
    this.getCustomers();
    this.getEmployees();

  }

  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data["success"] == true) {
        this.listCustomer = data["payload"]
      }
    });
  }
  getEmployees()
  {
    this._supportService.getEmployeeForIncident().subscribe(
      data=>{
        this.listEmployee = data["payload"];
      }
    )

    
  }


  save() {
    this.fleetIncidentDto.userId = this.currentuser.employeeId;
    this.fleetIncidentDto.tDate == null ? moment(this.fleetIncidentDto.tDate).format('MM/DD/YYYY') : '';

    if (this.customerTicket == "0") {
      this._supportService.saveCustomerTicket(this.fleetIncidentDto).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Insert Fleet Incident successfully!', 'Fleet Incident');

            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }
            
            this.customerTicket = data["payload"];
            this.router.navigate(['admin/support/customerticket/' + data["payload"]]);
          } else {
            this.toastr.error('Insert Fleet Incident failed!', 'Fleet Incident')
          }
        },
        error => {
          this.toastr.error(error, 'Fleet Incident')
        })
    } else {
      this._supportService.updateCustomerTicket(this.fleetIncidentDto).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success('Update Fleet Incident successfully!', 'Fleet Incident');
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

  getCustomerTicketById(id) {
    if (this.customerTicket != "0") {
      this._supportService.getCustomerTicket(id).subscribe(
        data => {
          this.fleetIncidentDto = data['payload'];
          this.equipmentGroups
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
      this.router.navigate(['admin/support/customerticket'])
      params = [];
    });
  }

}
