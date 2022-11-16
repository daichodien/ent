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
import { FleetModel } from '../../../core/models/master/Fleet';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-verify-trip-record',
  templateUrl: './verify-trip-record.component.html',
  styleUrls: ['./verify-trip-record.component.css']
})

export class VerifyTripRecordComponent extends BaseComponent {
  verifyTripRecordModel: any = [];
  dataSource: any;
  searchModel: any = {};
  deleteModel: any = {};
  modelSearch = new FleetModel();
  titleHeader: string = '';

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  constructor(public router: Router
    , public _supportService: SupportService
    , public toastr: ToastrService
    , private appService: TitleHeaderPageService
    ) {
    super(router)

    this.searchModel.createDateFrom = moment(new Date()).subtract(3, 'days');
    this.searchModel.createDateTo = moment(new Date()).add(3, 'days');
    this.searchModel.endUserName = ''; 
  }

  ngOnInit() {
    AdminLTE.init();
    this.getVerifiedTripRecords();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Verify Trip Record");
  }

  getVerifiedTripRecords() {    
    if (this.searchModel.createDateFrom != undefined && this.searchModel.createDateFrom != null && this.searchModel.createDateFrom != ''){
      this.searchModel.createDateFrom = moment(this.searchModel.createDateFrom).format('YYYY-MM-DD');
    }

    if (this.searchModel.createDateTo != undefined && this.searchModel.createDateTo != null && this.searchModel.createDateTo != ''){
      this.searchModel.createDateTo = moment(this.searchModel.createDateTo).format('YYYY-MM-DD');
    }

    if (this.searchModel.endUserName == undefined || this.searchModel.endUserName == null) {
      this.searchModel.endUserName = '';
    }    

    this._supportService.getVerifiedTripRecords(this.searchModel).subscribe(
      data => {        
        this.dataSource = data['payload'];
      }
    )
  }

  deleteVerifiedTripRecord(event) {    
    this.deleteModel.TRVId = event.data.trvId;
    this._supportService.deleteVerifiedTripRecord(this.deleteModel).subscribe(
      data => {
        if (data["success"] == true) {
          data["payload"] > 0 ? this.toastr.success('Delete Successfully !', 'Verified Trip Record') : this.toastr.error('Delete failed !', 'Verified Trip Record Model')
          this.getVerifiedTripRecords();
        }
        else {
          this.toastr.error('Delete failed !', 'Verified Trip Record Model')
        }
      },
      error => {
        console.log(error);
        this.toastr.error(error.message, 'Verified Trip Record Model')
      }
    )
  }

  onSubmit() {
    this.getVerifiedTripRecords();
  }

  editorPreparing(e) {
    if (e.parentType === 'dataRow' && (e.dataField === 'endMile' || e.dataField === 'tollFee' || e.dataField === 'parkingFee')) {
      e.editorOptions.readOnly = false;
      e.editorType = 'dxCheckBox';
    } else if (e.editorName !== 'dxCheckBox') {
     e.editorOptions.disabled = true;
    }
  }

  viewDetailBooking(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }

  viewDetailStaffName(id: string) {
    this.router.navigate(['admin/master/driver/' + id]);
  }

  viewDetailFleetModelDesc(id: string) {
    let querypara: any = this.modelSearch;
    this.modelSearch.fleetDesc = "";
    this.modelSearch.maker = "";
    this.modelSearch.fleetType = "";
    this.modelSearch.brand = "";
    this.modelSearch.fleetModel = "";
    this.modelSearch.fleetStatus= "NORMAL";

    querypara.pageIndex = 0;
    querypara.pageSize = 10;
    querypara.focusIndex = id;
    this.router.navigate(['admin/master/fleet/' + id], { queryParams: querypara })
  }
}

