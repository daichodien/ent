import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { DeleteBooking, BookingSearchDto } from '../../../core/models/booking/bookingSearchDto';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CustomerService } from '../../../core/services/master/customer.service';
import { BookingService } from '../../../core/services/booking.service';
import { CustomerModel } from '../../../core/models/master/Customer';
import { ReportService } from '../../../core/services/report.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.css']
})
export class BookingReportComponent extends BaseComponent {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  adminLte: JQuery;
  listFleetModel: any = [];
  listBookType: any = [];
  listCustomer: any = [];
  modelDelete: DeleteBooking = new DeleteBooking();
  focusIndex: number = -1;
  pageIndex: number;
  pageSize: number = 20;
  bookStatusUpdate: string = 'CANCEL';
  dateOption: number = 1;
  listDriver: any;
  isSearchByDate: any = false;
  titleHeader: string = '';

  constructor(
    public router: Router,
    public commomService: CommonService,
    public _fleetService: FleetService,
    public _customerService: CustomerService,
    public _bookingService: BookingService,
    public _reportService: ReportService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(router);
  }
    searhModel: BookingSearchDto = new BookingSearchDto();
    languages: any = {};
    dataSource: any = [];
    listusers: any = [];

    customerModel = new CustomerModel();

  ngOnInit() {
    AdminLTE.init();
    this.getCommentData();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Booking Report");
    //this.search();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listBookType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMBKTYPE';
          });
        }
    });
  }

  getCommentData() {
    this.getStdCodesCache();

    let model = {
      "FleetType": "",
      "FleetModelDesc": "",
      "TransmissionType": "",
      "FuelType": "",
      "Maker": "",
      "Brand": ""
    }

    this._fleetService.getFleetModels(model).subscribe(data => this.listFleetModel = data["payload"]);
    this._fleetService.getStaffWithRole("DRV").subscribe(data => this.listDriver = data["payload"]);
    this.getCustomers();

  }

  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data["success"] == true) {
        this.listCustomer = data["payload"]

      }
    });
  }

  search() {
    if (!this.isSearchByDate) {
      this.searhModel.DateF = null;
      this.searhModel.DateT = null;
    }

    this.searhModel.Convert();
    this.searhModel.getByBookDate = +this.dateOption;

    this._reportService.getBookingsReport(this.searhModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    );
  }

  searchByDateChanged() {
    if (this.isSearchByDate) {
      this.searhModel.DateF = new Date();
      this.searhModel.DateT = new Date();
      this.searhModel.Convert();
    }
  }

  public setClassBookStatus(value) {
    let rs: string;
    switch (value) {
      case 'Booked':
        rs = 'badge-warning';
        break;
      case 'Assigned':
        rs = 'badge-primary';
        break;
      case 'Accepted':
        rs = 'badge-secondary';
        break;
      case 'Closed':
        rs = 'badge-dark';
        break;
      case 'Cancelled':
        rs = 'badge-danger';
        break;
    }
    return rs;
  }

}
