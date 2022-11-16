import { Component, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CustomerService } from '../../../core/services/master/customer.service';
import { CustomerModel } from '../../../core/models/master/Customer';
import { BookingSearchDto, DeleteBooking } from '../../../core/models/booking/bookingSearchDto';
import { BookingService } from '../../../core/services/booking.service';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { StdCodeDTO } from '../../../core/models/common/stdcodeDTO';
import { SupplierService } from '../../../core/services/supplier.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';
declare var AdminLTE: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent extends BaseComponent {

  modelSearch:any = {
    "supplierName":"",
    "country":"",
    "supplierType":"VENDOR",
    "mobileNo":"",
  };
  @Input() customerIdRequest?: string;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  adminLte: JQuery;
  listFleetModel: any = [];
  listFLType: any = [];
  listBoookStatus: any = [];
  listCustomer: any = [];
  modelDelete: DeleteBooking = new DeleteBooking();
  focusIndex  = -1;
  pageIndex: number;
  pageSize = 20;
  bookStatusUpdate  = 'CANCEL';
  listFleetUseType: StdCodeDTO[];
  listCustomerType = [];
  listDriver: any;
  listSupplierType : any = [];
  titleHeader: string = '';
  dateType = "BOOKDATE"
  
  constructor(
    public router: Router,
    public commomService: CommonService,
    public _fleetService: FleetService,
    public _customerService: CustomerService,
    public  _bookingService: BookingService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService,
    public commonService: CommonService,
    public supplierService:SupplierService,
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
    this.searhModel.fleetUseType = '';
    // Set default for type booking
    this.searhModel.dateType = "BOOKDATE";

    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Booking");
    this.searhModel.dateType = "BOOKDATE";

    if(this.customerIdRequest) {
      return this.Search(this.customerIdRequest);
    }

    if (Object.keys(this.actRoute.snapshot['queryParams']).length > 0) {
      this.actRoute.queryParams.subscribe(params => {

        Object.assign(this.searhModel, params);

        this.searhModel.getByBookDate = +this.searhModel.getByBookDate;
        // this.dateOption = this.searhModel.getByBookDate;
        

        this._bookingService.search(this.searhModel).subscribe(
          data => {
            this.dataSource = data['payload'];
            this.focusIndex = this.dataSource.findIndex(m => m.bookNo === params.focusIndex);
            this.pageIndex = Number(params.pageIndex);
            this.pageSize = Number(params.pageSize);
          }
        );


        this.searhModel.DateF = new Date(this.searhModel.DateF);
        this.searhModel.DateT = new Date(this.searhModel.DateT);
      })
    } else {
      this.Search();
    }

  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listFLType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLTYPE";
          });
          this.listBoookStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FMBOOKSTATUS";
          });
          this.listFleetUseType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLEETUSETYPE";
          });
          this.listCustomerType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FMCUSTTYPE";
          });
        }
    });
  }

  getCommentData() {
    this.getStdCodesCache();

    const model = {
      'FleetType': '',
      'FleetModelDesc': '',
      'TransmissionType': '',
      'FuelType': '',
      'Maker': '',
      'Brand': ''
    };
    this._fleetService.getFleetModels(model).subscribe(data => this.listFleetModel = data['payload'])
    this._fleetService.getStaffWithRole("DRV").subscribe(data => {
      this.listDriver = data["payload"];
      this.listDriver.unshift({ staffID: "", staffName: "",})
    });
    this.getCustomers();

    //get data for Vendor
    this.supplierService.getsuppliers(this.modelSearch).subscribe(data => {
        this.listSupplierType = data["payload"];
        this.listSupplierType.unshift({ suppId: "", supplierName: "",})
    });
  }
  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data['success'] === true) {
        this.listCustomer = data['payload'];

      }
    });
  }
  Search(customerIdRequest? : string) {
    // Check customer Id and assign if have value
    customerIdRequest ? this.searhModel.CustId = customerIdRequest : null;

    this.searhModel.Convert();
    // this.searhModel.getByBookDate = +this.dateOption;

    this._bookingService.search(this.searhModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    );
  }
  delete(id: string) {

    const result = confirm('Are you sure delete this row?', 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.modelDelete.BookNo = id;
        this.modelDelete.UserId = this.currentuser.employeeId;

        this._bookingService.delete(this.modelDelete).subscribe(
          data => {
            if (data['success'] === true) {
              data['payload'] > 0 ? this.toastr.success('Delete Successfully !', 'Booking') : this.toastr.error('Delete failed !', 'Booking');
              this.Search();
            } else {
              this.toastr.error('Delete failed !', 'Booking');
            }
          },
          error => {
            this.toastr.error(error, 'Booking');
          }
        );
      }
    });
  }

  cancelBooking(id: string) {
    const modelUpdate: any = {};
    const result = confirm('Are you sure cancel this booking?', 'Confirm Cancel');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        modelUpdate.BookNo = id;
        modelUpdate.UpdateUser = this.currentuser.employeeId;
        modelUpdate.BookStatus = this.bookStatusUpdate;

        this._bookingService.updateBookStatus(modelUpdate).subscribe(
          data => {
            if (data['success'] === true) {
              data['payload'] > 0 ? this.toastr.success('Cancel Successfully!', 'Booking') : this.toastr.error('Cancel Failed!', 'Booking')
              this.Search();
            } else {
              this.toastr.error('Cancel failed!', 'Booking')
            }1
          },
          error => {
            this.toastr.error(error, 'Booking');
          }
        );
      }
    });
  }

  viewDetail(id: string) {
    const querypara: any = this.searhModel;
    querypara.pageIndex = this.dataGrid.instance['_options'].paging.pageIndex === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance['_options'].paging.pageSize === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageSize;
    querypara.focusIndex = id;
    this.router.navigate(['admin/fl/booking/' + id], { queryParams: querypara });
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
