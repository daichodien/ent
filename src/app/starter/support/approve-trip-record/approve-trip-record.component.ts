import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-approve-trip-record',
  templateUrl: './approve-trip-record.component.html',
  styleUrls: ['./approve-trip-record.component.css']
})
export class ApproveTripRecordComponent extends BaseComponent {
  approveTripRecordModel: any = [];
  dataSource: any;
  searchModel: any = {};
  listFleets: any = [];
  customers: any = [];
  selectedRows: any = [];
  focusIndex: number;
  titleHeader: string = '';


  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

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
    this.searchModel.approvalStatus = "0";
    this.searchModel.isUserVerify="";
  }

  ngOnInit() {
    AdminLTE.init();
    this.getApproveTripRecords();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Approval Trip Record");
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
    this.searchModel.dateFrom = moment(this.searchModel.dateFrom).format('MM/DD/YYYY');
    this.searchModel.dateTo = moment(this.searchModel.dateTo).format('MM/DD/YYYY');

    if (this.searchModel.customerNo == null) {
      this.searchModel.customerNo = '';
    }

    if (this.searchModel.fleetDesc == null) {
      this.searchModel.fleetDesc = '';
    }

    this._supportService.getAprroveTripRecords(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    )
  }

  onSubmit() {
    this.selectedRows = [];
    this.getApproveTripRecords();
  }

  editorPreparing(e) {
    if (e.parentType === 'dataRow' && (e.dataField === 'endMile' || e.dataField === 'tollFee' || e.dataField === 'parkingFee')) {
      e.editorOptions.readOnly = false;
      e.editorType = 'dxCheckBox';
    } else if (e.editorName !== 'dxCheckBox') {
     e.editorOptions.disabled = true;
    }
  }

  updateAprrovedTripRecord(e) {
    let model: any;

    model = Object.assign({}, e.oldData, e.newData);
    model.UpdateUser = this.currentuser.employeeId;

    this._supportService.updateApproveTripRecord(model).subscribe(
      data => {
        if (data['success'] = true) {
          this.toastr.success("Update Approval Trip Record Sucessfull", "Approval Trip Record");
          this.getApproveTripRecords();
        } else this.toastr.error("Update Approval Trip Record Failed", "Update Approval Trip Record")
      },
      error => {
        this.toastr.error(error.message, "Update Approval Trip Record")
      }
    );

  }

  async saveApproveTripRecords() {
    let saveApproveModel: any = {};
    saveApproveModel.TRId = '';
    saveApproveModel.AprrovalUserId = '';
    let trIdArr: string = '';
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    await this.dataGrid.instance.getSelectedRowsData().then((rowData) => {
      for (var i = 0; i < rowData.length; i++) {
        if (rowData[i].approved !== 'Approved') {
          trIdArr += ',' + rowData[i].trId;
        }
      }
    });
    
    if (trIdArr !== '') {
      saveApproveModel.TRId = trIdArr;
      saveApproveModel.AprrovalUserId = currentUser.employeeId;

      this.saveApproveTripRecord(saveApproveModel);
    }

  }

  saveApproveTripRecord(approvalModel: any) {
    this._supportService.saveApproveTripRecords(approvalModel).subscribe(
      data => {
        if (data['success'] = true) {
          this.getApproveTripRecords();
          this.toastr.success("Update Approval Trip Record Sucessfull", "Approval Trip Record");
        } else this.toastr.error("Update Approval Trip Record Failed", "Update Approval Trip Record")
      },
      error => {
        this.toastr.error(error.message, "Update Approval Trip Record")
      }
    );
  }

  viewDetail(id: string) {
    const querypara: any = this.searchModel;
    querypara.pageIndex = this.dataGrid.instance['_options'].paging.pageIndex === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance['_options'].paging.pageSize === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageSize;
    querypara.focusIndex = id;
    this.router.navigate(['admin/fl/booking/' + id], { queryParams: querypara });
  }
  viewCustomerDetail(id: string) {
    this.router.navigate(['admin/master/customer/' + id]);
  }

}
