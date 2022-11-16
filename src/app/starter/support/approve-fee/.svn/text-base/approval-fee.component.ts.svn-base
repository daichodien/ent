import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { DxDataGridComponent } from 'devextreme-angular';
import * as moment from 'moment';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CustomerService } from '../../../core/services/master/customer.service';
import { CustomerModel } from '../../../core/models/master/Customer';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from '../../../core/services/support.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-approval-fee',
  templateUrl: './approval-fee.component.html',
  styleUrls: ['./approval-fee.component.css']
})
export class ApprovalFeeComponent extends BaseComponent {
  @Input() customerIdRequest?: string;
  approveTripRecordModel: any = [];
  dataSource: any;
  searchModel: any = {};
  listFleets: any = [];
  customers: any = [];
  titleHeader: string = '';

  constructor(public router: Router
    , public _supportService: SupportService
    , private _fleetService: FleetService
    , public toastr: ToastrService
    , private appService: TitleHeaderPageService
    , private _customerService: CustomerService) {
    super(router)

    this.searchModel.dateFrom = moment(new Date()).subtract(14, 'days');
    this.searchModel.dateTo = moment(new Date());
    this.searchModel.bookingNo = '';
    this.searchModel.customerNo = '';
    this.searchModel.fleetDesc = '';
    this.searchModel.approvalStatus = "1";
    this.searchModel.isUserVerify = "";
  }

  ngOnInit() {
    AdminLTE.init();
    this.getApproveTripRecords();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Trip Record Approved Fee");
    let customerModel = new CustomerModel();
    let model = {
      "fleetDesc": "",
      "maker": "",
      "fleetType": "",
      "brand": "",
      "fleetModel": ""
    }

    this._fleetService.getFleets(model).subscribe(data => this.listFleets = data["payload"]);
    this._customerService.getCustomers(customerModel).subscribe(data => {
      if (data["success"] == true) {
        this.customers = data["payload"]
      }
    });
  }

  getApproveTripRecords() {
    // Check customerID support for page Customer Details
    if(this.customerIdRequest) {
      this.searchModel.customerNo = this.customerIdRequest;
    }

    this.searchModel.dateFrom = moment(this.searchModel.dateFrom).format('MM/DD/YYYY');
    this.searchModel.dateTo = moment(this.searchModel.dateTo).format('MM/DD/YYYY');

    if (this.searchModel.customerNo == null) {
      this.searchModel.customerNo = '';
    }

    if (this.searchModel.fleetDesc == null) {
      this.searchModel.fleetDesc = '';
    }

    this._supportService.getTripRecordAprrovedFees(this.searchModel).subscribe(
      data => {
        data['payload'].forEach(function (e) { e.remark = '' });
        this.dataSource = data['payload'];
      }
    )
  }

  onSubmit() {
    this.getApproveTripRecords();
  }

  editorPreparing(e) {
    if (e.parentType === 'dataRow' && (e.dataField === 'remark' || e.dataField === 'endMile' || e.dataField === 'tollFee' || e.dataField === 'parkingFee')) {
      e.editorOptions.readOnly = false;
      e.editorType = 'dxCheckBox';
    } else if (e.editorName !== 'dxCheckBox') {
      e.editorOptions.disabled = true;
    }
  }

  updateAprrovedTripRecordFee(e) {
    let model: any;

    model = Object.assign({}, e.oldData, e.newData);
    model.CreatedUser = this.currentuser.employeeId;

    this._supportService.updateApproveTripRecordFee(model).subscribe(
      data => {
        if (data['success'] = true) {
          this.toastr.success("Save Approval Trip Record Fee Sucessfull", "Approval Trip Record Fee");
          this.getApproveTripRecords();
        } else this.toastr.error("Save Approval Trip Record Fee Failed", "Save Approval Trip Record Fee")
      },
      error => {
        this.toastr.error(error.message, "Save Approval Trip Record Fee")
      }
    );
  }

  viewDetailBooking(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }

}
