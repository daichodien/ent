import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { TaxAndInsuranceService } from '../../../core/services/tax-and-insurance.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CommonService } from '../../../core/services/common.service';
import * as moment from 'moment';
import { confirm } from 'devextreme/ui/dialog';
import { FleetIncidentDto } from '../../../core/models/tax-and-insurance/FleetIncidentDto';
import { SupportService } from '../../../core/services/support.service';
import { CustomerTicketLogsComponent } from './customer-ticket-logs/customer-ticket-logs.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, forkJoin } from 'rxjs';
import { CustomerService } from '../../../core/services/master/customer.service';
import { CustomerModel } from '../../../core/models/master/Customer';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-customer-ticket',
  templateUrl: './customer-ticket.component.html',
  styleUrls: ['./customer-ticket.component.css']
})
export class CustomerTicketComponent extends BaseComponent {
  @Input() customerIdRequest?: string;
  dataSource: any = [];
  searchModel: FleetIncidentDto = new FleetIncidentDto();
  equipmentGroups: any = []; // fleetTypes
  equipmentTypes: any = []; // fleetModelIds
  fleetIncidentDeleteModel: any = {};
  incidentTypes: any = [];
  bsModalRef: BsModalRef;
  fleetIncidentDto: FleetIncidentDto = new FleetIncidentDto();
  listTicketType:any = [];
  listCustomer: any = [];
  customerModel = new CustomerModel();
  titleHeader: string = '';
  constructor(private _supportService: SupportService,
              public router: Router,
              private toastr: ToastrService,
              private _fleetService: FleetService,
              private _commonService: CommonService,
              private modalService: BsModalService,
              private _customerService:CustomerService,
              private appService: TitleHeaderPageService,
              private cacheService: CacheService
             ) {
    super(router);
    this.searchModel.dateF = new Date();
    this.searchModel.dateT = moment(this.searchModel.dateF).add(1, 'months');
  }

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Customer Ticket");
    this.searchModel.dateT = new Date();

    this.searchModel.dateF = moment(this.searchModel.dateT).subtract(1, 'weeks');
    
    this.searchCustomerTickets();
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.incidentTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWINCIDENTTYPE';
          });    
          this.listTicketType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'TICKETTYPE';
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
    this.getCustomers();
  }
  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data["success"] == true) {
        this.listCustomer = data["payload"]
      }
    });
  }


  searchCustomerTickets() {
    if(this.customerIdRequest) {
      this.searchModel.relatedCusId = Number.parseInt(this.customerIdRequest);
    }
    
    this.searchModel.convert();
    this._supportService.searchCustomerTickets(this.searchModel).subscribe(
      data => {
        if (data['success'] == true) this.dataSource = data['payload'];
      }
    )
  }

  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.fleetIncidentDeleteModel.userId = this.currentuser.employeeId;
        this.fleetIncidentDeleteModel.AFId = id;

        this._supportService.deleteCustomerTicket(this.fleetIncidentDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Fleet Incident') : this.toastr.error('Delete failed!', 'Fleet Incident')
              this.searchCustomerTickets();
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
    this.router.navigate(['admin/support/customerticket/' + id])
  }

  public setClassBookStatus(value) {
    let rs: string;
    switch (value) {
      case 'To do':
        rs = 'badge-warning';
        break;
      case 'Done':
        rs = 'badge-primary';
        break;
      case 'Inprogess':
        rs = 'badge-secondary';
        break;
     
    }
    return rs;
  }

  ViewDetail(id) {

    this.getDetail(id).subscribe(
      data => {
        const initialState:any = {
           model: data[0]['payload'],
           logs: data[1]['payload']
        };
        this.bsModalRef = this.modalService.show(CustomerTicketLogsComponent, Object.assign({}, { class: 'modal-xl', initialState, ignoreBackdropClick: true }));
        this.bsModalRef.content.reloadGrid.subscribe(data=>   this.searchCustomerTickets());
      })
    }
    getDetail(id)
    {
      let IncidentDto = this._supportService.getCustomerTicket(id);
      let logs = this._supportService.getIncidentLogsById(id,'COMMENT');
      return forkJoin([IncidentDto,logs]);
    }
}
