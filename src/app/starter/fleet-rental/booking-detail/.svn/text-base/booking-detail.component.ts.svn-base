import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { Booking, BookFleets } from '../../../core/models/BookingDto';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TripRecordDetailComponent } from '../trip-record-detail/trip-record-detail.component';
import { TripStatusViewerComponent } from '../trip-status-viewer/trip-status-viewer.component';
import { CommonService } from '../../../core/services/common.service';
import { FleetService } from '../../../core/services/master/fleet.service';
import { CustomerService } from '../../../core/services/master/customer.service';
import { CustomerModel } from '../../../core/models/master/Customer';
import { PickupPlaceService } from '../../../core/services/master/pickup-place.service';
import { SearchPickupPlaceModel } from '../../../core/models/master/PickupPlace';
import { BookingService } from '../../../core/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { BookingDriverInfoComponent } from '../booking-driver-info/booking-driver-info.component';
import { FileuploadComponent } from '../../../core/directives';
import { Globalconst, REFDOCTYPE } from '../../../core/helpers/globalvariable';
import { ServiceChargesAddComponent } from './service-charges-add/service-charges-add.component';
import { BookSvcChargeDto, DeleteBookSvcCharge } from '../../../core/models/booking/bookSvcChargeDto';
import { confirm } from 'devextreme/ui/dialog';
import { AssignFleetComponent } from './assign-fleet/assign-fleet.component';
import { BookAcceptRequestDto } from '../../../core/models/booking/bookAcceptRequestDto';
import { DxDateBoxComponent } from 'devextreme-angular';
import { ServicePackageService } from '../../../core/services/master/servicepackage.service';
import { map } from 'rxjs/operators';
import { SupplierService } from '../../../core/services/supplier.service';
import { CacheService } from '../../../core/services/cache.service';


@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent extends BaseComponent  {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  modelSearch:any = {
    "supplierName":"",
    "country":"",
    "supplierType":"VENDOR",
    "mobileNo":"",
  };
  @ViewChild(DxDateBoxComponent) date: DxDateBoxComponent;
  listBoookStatus: any;
  listFLType: any;
  listCustomer: any;
  listFleetModel: any;
  listBoookType: any;
  listPaymentMethodList: any;
  listPickupPlace: any;
  listForeignLanguage: any;
  listMobileInternet: any;
  listInsurance: any;
  listDriver: any;
  bookSvcChargeDataSource: BookSvcChargeDto[];
  deleteBookSvcChargeModel: DeleteBookSvcCharge = new DeleteBookSvcCharge();
  bookAcceptRequest: BookAcceptRequestDto = new BookAcceptRequestDto();
  bookClose: any = {};
  // checkboxchangVendor: boolean = false;
  // flag: boolean = false;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public modalService: BsModalService,
    public commomService: CommonService,
    public _fleetService: FleetService,
    public _customerService: CustomerService,
    public _pickupPlaceService: PickupPlaceService,
    public _bookingService: BookingService,
    public toastr: ToastrService,
    private _serpkgService: ServicePackageService,
    public globals: Globalconst,
    private actRoute: ActivatedRoute,
    public supplierService:SupplierService,
    private changeDetector: ChangeDetectorRef,
    private cacheService: CacheService
  ) {
    super(router);

    this.route.queryParamMap.subscribe(queryParams => {
      this.isBackable = queryParams.get('isBackable');
    });
  }
  customerModel = new CustomerModel();

  bookNo = '0';
  bsModalRef: BsModalRef;
  bsModalRefServiceCharge: BsModalRef;
  adminLte: JQuery;
  // searhModel: any = {};
  searhModel : Booking = new Booking();
  dataSource: any = {};
  model: any = {};
  dataSourceFleetTracking: any = [];
  book: Booking = new Booking();
  bookFleets: BookFleets = new BookFleets();
  tripRecords: any = [];
  servicePackages: any = [];
  IsCheckIncludeDriver = true;
  IsAirportPickUp = true;
  isRequiredWIFI = false;
  listInvoice: any = [];
  listBookSource: any = [];
  listLicenseClass: any = [];
  isBackable: any;
  customerID: string;
  listSupplierType : any = [];
  ngOnInit() {
    this.fileUpload.refNoType = REFDOCTYPE.Booking;
    this.fileUpload._userId = this.globals._userinfo && this.globals._userinfo.employeeId ? this.globals._userinfo.employeeId : null;
    this.getCommentData();
    this.route.params['_value']['id'].indexOf('?') == -1 ? this.bookNo = this.route.params['_value'].id: this.bookNo = this.route.params['_value']['id'].split("?")[0];
    
    this.customerID = this.route.params['_value'].customer;
    this.getbooking();
    this.book.pickupTime = new Date();

    // Check support for page Customer Details
    if(this.bookNo === '0' && this.customerID) {
      this.book.svcPkgDtlId = 1;
      this.fileUpload.autoSave = false;

      this.book.custId = Number.parseInt(this.customerID);
      return;
    }

    if (this.bookNo !== '0') {
      this.getByBookNo(this.bookNo);
      this.getServiceChargeByBookNo(this.bookNo);
      this.fileUpload.autoSave = true;
      this.fileUpload.refNoValue = this.bookNo;
      this.fileUpload.loadFiles();
    } else {
      this.book.svcPkgDtlId = 1;
      this.fileUpload.autoSave = false;
    }

  }
  getbooking(){
    let modelOption = {
      BookDateF: "20001014",
      BookDateT: "20221014",
      BookNo: "",
      BookStatus: "",
      BranchCode: "",
      CustId: "",
      DateF: "2000-10-13T17:00:00.000Z",
      DateT: "2022-10-14T03:11:51.231Z" ,
      FleetModel: "",
      FleetType: "",
      UserId: "1",
      bookType: "",
      cusType: "",
      driverId: "",
      fleetDesc: "",
      fleetUseType: "",
      getByBookDate: 1,
      staffId: ""
    }  
    this._bookingService.search(modelOption).map(response => {
      let lastest = [];
      lastest = response['payload'];
      return lastest.splice(lastest.length-11,lastest.length-1);
     }).subscribe(
     data => {
       this.dataSource = data;
       
     }
   );
  }

  ViewTripRecordPopup() {
    const initialState = {
      logs: this.model.listLog,
      editMode: true
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(TripRecordDetailComponent, Object.assign({}, { initialState, ignoreBackdropClick: true, bookFleets: this.bookFleets, class: 'modal-lg' }));

    this.bsModalRef.content.reloadGrid.subscribe(this.search.bind(this));
  }
  ShowAssignFleetPopup() {
    const initialState = {
      pickupdate: this.book.pickupTime,
      returndate: this.book.returnTime,
      listFleetModel: this.listFleetModel,
      listDriver: this.listDriver,
      pickUpPlace: this.book.pickUpPlace,
      returnPlace: this.book.returnPlace,
      bookNo: this.bookNo,
      fleetModel: this.book.fleetModelId,
      editMode: true,
      brId: this.bookFleets.brId,
      fleet_Desc: this.bookFleets.fleet_Desc,
      staffName: this.bookFleets.staffName,
      fltId: this.bookFleets.fleetId,
      staffId: this.bookFleets.staffId,
      isRequiredDriver: this.book.isRequiredDriver
    };

    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(AssignFleetComponent, Object.assign({}, { initialState, ignoreBackdropClick: true, class: 'modal-lg' }));
    this.bsModalRef.content.reloadGrid.subscribe(data => {
      this.getByBookNo(this.bookNo);
    });
  }

  ViewStatusHistory() {
    let paiData: any = {
      paidDate: null, updateUser: null
    };
    if (this.listInvoice.length > 0) {
      paiData = this.listInvoice.map((item) => {
        return {
          paidDate: item.paidDate, updateUser: item.updateUser
        };
      }).reduce(function (a, b) { return a.paidDate > b.paidDate ? a : b; });
    }


    const initialState = {
      logs: this.model.listLog,
      editMode: true,
      bookNo: this.bookNo,
      createUser: this.book.createUser,
      updateUser: this.book.updateUser,
      createName: this.book.createName,
      upDateName: this.book.upDateName,
      createDate: this.book.createDate,
      updateDate: this.book.updateDate,
      assignDate: this.bookFleets.createDate,
      assignUser: this.bookFleets.createName,
      acceptRequestDate: this.bookAcceptRequest.createDate,
      acceptRequestName: this.bookAcceptRequest.createName,
      closeDate: this.bookClose == null ? null : this.bookClose.closeDate,
      closeName: this.bookClose == null ? null : this.bookClose.closeName,
      closeMemo: this.bookClose == null ? null : this.bookClose.closeMemo,
      paidDate: paiData.paidDate,
      paidUser: paiData.updateUser,
    };
    this.bsModalRef = this.modalService.show(TripStatusViewerComponent, Object.assign({}, { initialState, ignoreBackdropClick: true, }));
    this.bsModalRef.content.reloadGrid.subscribe(this.search.bind(this));
  }
  search() {
    this.getByBookNo(this.bookNo);
  }

  //checkbox vendor
  // checkboxVendor(event) {
  //   console.log("event", event);
  // }

  // onVendorValueChanged(event) {
  //   event.value ? this.checkboxchangVendor = true : this.checkboxchangVendor = false;
 
  // }
  // ngAfterViewInit() {
  //   // this.checkboxchangVendor = this.flag;
  // }

  // ngAfterContentChecked(): void {
  //   this.changeDetector.detectChanges();
  // } 

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {

          this.listFLType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTYPE';
          });
          this.listBoookStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMBOOKSTATUS';
          });
          this.listBoookType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMBKTYPE';
          });
          this.listPaymentMethodList = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMPAYMENTMETHOD';
          });
          this.listForeignLanguage = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FORIGNLANGUAGE';
          });
          this.listMobileInternet = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'MOBILEINT';
          });
          this.listInsurance = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'INSURANCE';
          });
          this.listBookSource = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'BOOKSOURCE';
          });
          this.listLicenseClass = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMLICCLASS';
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
    this.getCustomers();
    this.getPickupPlace();
    this._fleetService.getStaffWithRole('DRV').subscribe(data => this.listDriver = data['payload'])

    const searchSerPkgModel = {
      'bookType': '',
      'branchCode': '',
      'fleetModelId': ''
    };
    this._serpkgService.getServicePackageList(searchSerPkgModel).subscribe(data => {
      this.servicePackages = data['payload'] || [];
    });
    // Get data vendor
    this.supplierService.getsuppliers(this.modelSearch).subscribe(data => {
      if (data && data["payload"] && data["payload"].length > 0 ) {
        this.listSupplierType = data["payload"];
        this.listSupplierType.unshift({ suppId: null, supplierName: "",})

      }
      
      });

  }
  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data['success'] === true) {
        this.listCustomer = data['payload'];
      }
    });
  }
  getPickupPlace() {
    this._pickupPlaceService.getPickupPlaces(new SearchPickupPlaceModel()).subscribe(data => {
      if (data['success'] === true) {
        this.listPickupPlace = data['payload'];
      }
    });
  }
  getByBookNo(bookNo: any) {
    this._bookingService.getById(bookNo).subscribe(
      data => {
        if (data['success'] === true) {
          Object.assign(this.book, data['payload'].bookDetail);
          Object.assign(this.bookFleets, data['payload'].bookFleets);
          Object.assign(this.bookAcceptRequest, data['payload'].acceptRequest);
          Object.assign(this.listInvoice, data['payload'].invoices);
          this.tripRecords = data['payload'].tripRecords;
          this.bookClose = data['payload'].bookClose;
          this.bookFleets.convert(this.bookFleets);
          this.book.convert();
          this.isRequiredWIFI = this.book.isRequiredWIFI === '1' ? true : false;
          if (this.bookFleets != null) {
            if (this.bookFleets.brId != null) {
              this.getfleettracking();
            }
          }
        }
      }
    );
  }

  onValueVendorChanged(event) {
    if (!event["value"]) {
      this.book.extDriverName = this.book.vendorRefNo = this.book.extFleetNo = this.book.extMobileNo = this.book.memo = "";

    }
  }

  Save() {
    // Handle value vendor
    if (this.book.vendorId == null) {
      delete this.book.extDriverName;
      delete this.book.vendorRefNo;
      delete this.book.extFleetNo;
      delete this.book.extMobileNo;
      delete this.book.memo;
    }

    this.book.isRequiredWIFI = this.isRequiredWIFI === true ? '1' : '0';
    this.book.isRequestForRedInv = this.book.isRequestForRedInv === true ? '1' : '0';
    this.book.isRepeatedDaily = this.book.isRepeatedDaily === true ? '1' : '0';
    this.book.isRequiredAirportPickUp = this.book.isRequiredAirportPickUp === true ? '1' : '0';
    this.book.isRequiredDriver = this.book.isRequiredDriver === true ? '1' : '0';

    if (this.bookNo !== '0') { //edit
      this.book.bookNo = this.bookNo;
      this.book.userId = this.globals._userinfo.employeeId;
      this._bookingService.update(this.book).subscribe(
        data => {
          this.toastr.success('Updated booking sucessfull', 'Update')
        }
      );
    } else { //new
      this.book.svcPkgDtlId = 1;
      this.book.bookStatus = 'BOOK';
      this.book.pickupTime = CommonService.convertDateTimeForModel(this.book.pickupTime);
      this.book.createUser = this.globals._userinfo.employeeId;
      this._bookingService.save(this.book).subscribe( 
        data => {
          if (data['success'] === true) {
            this.toastr.success('Insert booking sucessfull', 'Insert')
            if (this.fileUpload.files.length > 0) {
              this.fileUpload.refNoValue = data['payload'];
              this.fileUpload.SaveFile();
            }
            this.bookNo = data['payload'];
            this.router.navigate(['admin/fl/booking/' + data['payload']]);
            this.getByBookNo(this.bookNo);
          } else {
            this.toastr.error('Insert booking failed', 'Insert');
          }
        },
        error => {
          this.toastr.error(error.message, 'Insert');
        }

      );
    }

    if(this.book.vendorId !== null){
      
    }

  }
  formatTaxCode(taxCode: string) {
    return parseInt(taxCode["value"].substring(3));
  }

  ShowDriverInfo() {
    const initialState = {
      logs: this.model.listLog,
      editMode: true,
      listLicenseClass: this.listLicenseClass
    };
    this.bsModalRef = this.modalService.show(BookingDriverInfoComponent, Object.assign({}, { initialState, ignoreBackdropClick: true }));
  }

  onValueIncludedriver(e) {
    this.IsCheckIncludeDriver = !e.value
  }

  onValueAirportPickUp(e) {
    this.IsAirportPickUp = !e.value;
  }

  urlback() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['admin/fl/booking'], { queryParams: params })
      params = [];
    });
  }
  SaveServiceChargePopup(data: any) {
    const initialState = {
      logs: this.model.listLog,
      editMode: true,
      bookNo: this.bookNo,
      data: data,
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRefServiceCharge = this.modalService.show(ServiceChargesAddComponent, Object.assign({}, { initialState, ignoreBackdropClick: true }));
    this.bsModalRefServiceCharge.content.reloadGrid.subscribe(() => {
      this.getServiceChargeByBookNo(this.bookNo);
    });
  }
  getServiceChargeByBookNo(id: string) {
    this._bookingService.getBookSvcCharges(id).subscribe(
      data => {
        this.bookSvcChargeDataSource = data['payload'];
      });
  }
  deleteServicecharges(id: number) {
    const result = confirm('Are you sure delete this row?', 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.deleteBookSvcChargeModel.bSCId = id;
        this.deleteBookSvcChargeModel.userId = this.globals._userinfo.employeeId;
        this.deleteBookSvcChargeModel.bookNo = this.bookNo;
        this._bookingService.deleteBookSvcCharge(this.deleteBookSvcChargeModel).subscribe(
          data => {
            if (data['payload'] > 0) {
              this.toastr.success('Delete Service Charges sucessfull', 'Service Charges');
              this.getServiceChargeByBookNo(this.bookNo);
            } else {
              this.toastr.error('Delete Service Charges failed', 'Service Charges');
            }
          }, error => {
            this.toastr.error(error.message, 'Service Charges');
          });
      }
    });
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
  convertCurrency(_value) {
    this.book.overtimeSurcharge = _value;
  }
  addNewPayment() {
    const customername = this.listCustomer.find(m => m.custId === this.book.custId).customerName;
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['admin/accounting/billing/0'], { queryParams: { bookno: this.bookNo, customer: customername, voucher: this.book.voucherSerialNo, clickat: 'booking' } });
  }

  copyInfoCustomer(e) {
    if (this.bookNo === '0') {
      const infoCustomer = this.listCustomer.find(c => c.custId === e.value);
      this.book.endUserName = infoCustomer.customerName;
      this.book.endUserMobile = infoCustomer.mobileNo;
      this.book.endUserEmail = infoCustomer.emailAddress;
    }
  }

  goPaymentDetail(invNo) {
    this.router.navigate(['admin/accounting/billing/' + invNo], { queryParams: { clickat: 'booking' } })
  }
  // viewDetail(id: string) {
   
  //   this.router.navigate(['admin/fl/booking/' + id]);
  // }
  getfleettracking() {
    const model: any = {
      bRId: this.bookFleets.brId
    };
    this._bookingService.getfleettracking(model).subscribe(
      data => {
        this.dataSourceFleetTracking = data['payload'];
      }
    );
  }
  onOpened() {
    if (this.book.pickupTime == null) {
      this.book.pickupTime = new Date().setHours(12, 0);
    }
  }

}
