import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglemapComponent } from '../../../../map-popup/map-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { SaveBookInvoice, SaveBookInvoiceItem } from '../../../../../core/models/booking/saveBookInvoice';
import { BookingService } from '../../../../../core/services/booking.service';
import { AccountingService } from '../../../../../core/services/accounting.service';
import { BookSvcChargeDto } from '../../../../../core/models/booking/bookSvcChargeDto';
import { ToastrService } from 'ngx-toastr';
import { InvoiceSearchDto } from '../../../../../core/models/accounting/InvoiceSearchDto';
import { GetBookInvoiceModel } from '../../../../../core/models/accounting/GetBookInvoiceModel';
import { CommonService } from '../../../../../core/services/common.service';
import * as moment from 'moment';
import { FileService } from '../../../../../core/services/file.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ServiceItem } from '../../../../../core/helpers/globalvariable';
import { SendMailPaymentPopupComponent } from '../send-mail/send-mail-payment-popup.component';
import { GiftVoucherService } from '../../../../../core/services/master/giftvoucher.service';
import { TitleHeaderPageService } from '../../../../../core/services/title-header-page.service';
import { CacheService } from '../../../../../core/services/cache.service';
declare var AdminLTE:any

@Component({
  selector: 'app-invoice-and-payment-detail',
  templateUrl: './invoice-and-payment-detail.component.html',
  styleUrls: ['./invoice-and-payment-detail.component.css']
})
export class InvoiceAndPaymentDetailComponent extends BaseComponent {
  @ViewChild("gridContainer") dataGrid: DxDataGridComponent;

  bookSvcChargeDto: BookSvcChargeDto = new BookSvcChargeDto();
  bsModalRef: BsModalRef;
  model:SaveBookInvoice = new SaveBookInvoice();
  bookSvcChargeDataSource: BookSvcChargeDto[];
  billto:string;
  dataSource:any = [];
  itemNo:number  = 1;
  listServiceItems:any = [];
  invNo:string;
  getInvoiceModel: InvoiceSearchDto = new InvoiceSearchDto();
  data: GetBookInvoiceModel = new GetBookInvoiceModel();
  isCheckPayment:boolean = false;
  paidDate:string;
  paidRefNo:string;
  clickAt:string;
  listDiscountCode: any;
  total:number;
  taxamount:number;
  totalAmountAfterTax:number;
  titleHeader: string = '';
  isFirstLoad: boolean = true;
  listAVT: any = [];
  constructor(
    private atroute: ActivatedRoute,
    public router: Router,
    public modalService: BsModalService,
    public bookingService: BookingService,
    public accountingService: AccountingService,
    private _bookingService: BookingService,
    public toastr: ToastrService,
    public commonSvc: CommonService,
    public fileService:FileService,
    private appService: TitleHeaderPageService,
    public commomService: CommonService,
    private _giftVoucherService: GiftVoucherService,
    private cacheService: CacheService
  ) {
    super(router);
    this.invNo =  this.atroute.params["_value"].id;
   }

  ngOnInit() {
    AdminLTE.init();
    this.atroute.queryParams.subscribe(
      params =>{
        this.model.bookNo = params.bookno;
        this.billto =  params.customer;
        this.clickAt = params.clickat;
        this.model.voucherSerialNo = params.voucher;
        this.getListVoucherBySerialNo();
        if (this.invNo != '0') {
          this.loadDataById();
        }
        else
        {
          this.getServiceChargeByBookNo(this.model.bookNo);
          this.getPeriodForPayment();
        }
      });
    this.bookingService.getServiceItems().subscribe(data=>this.listServiceItems = data["payload"])
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Invoice And Payment");
    this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listAVT = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'TAXCODE';
          });
        }
    });
  }
  

  // Handle event change mount price
  onValueVATChanged(event) {
    if(!this.isFirstLoad) {
      if (event.value ) {
        
        let tax = parseFloat(this.bookSvcChargeDto.TaxCode.substring(3,this.bookSvcChargeDto.TaxCode.length));
        this.bookSvcChargeDto.TaxAmount = (Number(tax) / 100) * this.bookSvcChargeDto.unitPrice;
      }
    }
    this.isFirstLoad = false;
  }

  onValueUnitPriceChanged(event) {
    if(!this.isFirstLoad) {
      if (event && event["event"] && typeof Number(event["event"]["key"] == "number" ) ) {
        
        let tax = parseFloat(this.bookSvcChargeDto.TaxCode.substring(3,this.bookSvcChargeDto.TaxCode.length));
        
        const result = (Number(tax) / 100) * Number(event["component"]["_formattedValue"].split(',').join(''));
        this.bookSvcChargeDto.TaxAmount = result;
      }
    }
    this.isFirstLoad = false;
  }
   // End Handle event change mount price

  getServiceChargeByBookNo(id: string) {
    this._bookingService.getBookSvcCharges(id).subscribe(
      data => {
        for (let index = 0; index < data["payload"].length; index++) {
          const element = data["payload"][index];
          let itemModel :any = {}
          itemModel.billQty = 1;
          itemModel.billUnit = "";
          itemModel.invNo = "";
          itemModel.itemAmount = element.unitPrice * 1;
          itemModel.remark = element.itemDescription;
          itemModel.itemNo = this.itemNo;
          itemModel.svcItemId = element.serviceItem;
          itemModel.unitPrice = element.unitPrice;
          itemModel.afterDiscount = itemModel.itemAmount
          itemModel.taxAmount = element.taxAmount;
          itemModel.taxCode = element.taxCode;
          this.dataSource.push(itemModel);
          this.itemNo ++ ;
        }
        this.calculateAmount();
      });
  }

  ShowPopupPayment() {
    const initialState = {
      invNo:this.data.bookInvoice.invNo
    };
    this.bsModalRef = this.modalService.show(PaymentPopupComponent, Object.assign({}, { initialState,class: 'modal-md', ignoreBackdropClick: true }));
    this.bsModalRef.content.reloadGrid.subscribe(data => {
      if (data=="ok") {
        this.isCheckPayment = false;
        this.loadDataById();
      }
    });

  }

  ShowPopupSendMailPayment() {
    const initialState = {
      invNo: this.data.bookInvoice.invNo
    };

    this.bsModalRef = this.modalService.show(SendMailPaymentPopupComponent, Object.assign({}, { initialState, class: 'modal-md', ignoreBackdropClick: true }));
    this.bsModalRef.content.reloadGrid.subscribe(data => {
      if (data=="ok") {
        this.loadDataById();
      }
    });
  }

  save()
  {
    var isValidation = this.isCheckValidation();
    if (isValidation == true) {
       return;
    }
    
    this.model.invItems =  this.dataSource;
    this.model.user = this.currentuser.employeeId
    this.model.periodF = moment(this.model.periodF).format("YYYYMMDD");
    this.model.periodT = moment(this.model.periodT).format("YYYYMMDD");
    // this.model.netAmount = this.dataSource.map(item => item.itemAmount).reduce((prev, next) => prev + next); // sum
    if (this.invNo == '0') {
      this.accountingService.saveBookInvoice(this.model).subscribe(
        data => {
          if (data["success"]== true ) {
            this.toastr.success("Insert Payment sucessfull", "Payment");
            this.router.navigate(['admin/accounting/billing/' + data["payload"]]);
            this.invNo = data["payload"];
            this.loadDataById();
          }
        });
    }
    else
    {
      this.model.invoiceNo = this.invNo
      this.accountingService.updateBookInvoice(this.model).subscribe(
        data => {
          if (data["success"]== true ) {
            this.toastr.success("Update Payment sucessfull", "Payment");
          }
        });
    }
   
  }

  getPeriodForPayment()
  {
    
    this.accountingService.getPeriodForPayment(this.model.bookNo).subscribe(
      data=>{
        if (data["success"]== true) {
          this.model.periodF = data["payload"].periodF;
          this.model.periodT = data["payload"].periodT;
        }
        
      }
    )
  }
  
  isCheckValidation()
  {
    var isCheck : boolean = false;
    if (this.model.invDate == null || 
        this.model.periodF == '' || 
        this.model.periodF == null || 
        this.model.periodT == ''|| 
        this.model.periodT == null  || 
        this.model.amtPayable == null) {
        isCheck = true
    }
    if (this.model.periodF > this.model.periodT) {
      isCheck = true
    }

    return isCheck
    
  }

  onEditorPreparing(e) {

    if (e.parentType === "dataRow" && e.dataField === "itemNo") {
        e.editorOptions.disabled = true;
    }
    if (e.parentType === "dataRow" && e.dataField === "itemAmount") {
      e.editorOptions.disabled = true;
    }
    if (e.parentType === "dataRow" && e.dataField === "discount") {
      e.editorOptions.disabled = true;
    }
    if (e.parentType === "dataRow" && e.dataField === "afterDiscount") {
      e.editorOptions.disabled = true;
    }

  }
  back()
  {
    if (this.invNo != '0' && this.clickAt === undefined) {
      this.router.navigate(['admin/accounting/billing']);
    }
    else if(this.invNo != '0' && this.clickAt == 'billing'){
      this.router.navigate(['admin/accounting/billing'], { queryParams: this.atroute.snapshot["queryParams"]});
    }
    else{
      window.history.back();
    }
  }
  loadDataById()
  {
    this.getInvoiceModel.invNo =  this.invNo;
    this.getInvoiceModel.invDateT =  null;
    this.getInvoiceModel.invDateF =  null;
    this.accountingService.getBookInvoice(this.getInvoiceModel).subscribe(
      data => {
         this.data = data["payload"];
         this.model.bookNo = this.data.bookInvoice.bookNo;
         this.billto = this.data.bookInvoice.customerName;
         this.model.amtPayable =  this.data.bookInvoice.amtPayable;
         this.model.remark =  this.data.bookInvoice.remark;
         this.model.fiDocNumber = this.data.bookInvoice.fiDocNumber;
         this.model.invDate =  new Date(this.data.bookInvoice.invDate);
         this.model.periodF =  new Date(this.data.bookInvoice.periodF);
         this.model.periodT =  new Date(this.data.bookInvoice.periodT);
         this.model.taxAmount = this.data.bookInvoice.taxAmount;
         this.model.discountCode = this.data.bookInvoice.discountCode;
         this.model.sendDate = this.data.bookInvoice.sendDate;
         this.model.sendRemark = this.data.bookInvoice.sendRemark;
         this.model.createDate = this.data.bookInvoice.createDate;
         this.model.createUser = this.data.bookInvoice.createUser;
         this.model.updateDate = this.data.bookInvoice.updateDate;
         this.model.updateUser = this.data.bookInvoice.updateUser;
         this.model.voucherSerialNo = this.data.bookInvoice.voucherSerialNo;
         this.dataSource = this.data.invItem;
         this.isCheckPayment = this.data.bookInvoice.isPaid == null ? false :  true;
         this.paidDate = this.commonSvc.convertDate(this.data.bookInvoice.paidDate);
         this.paidRefNo = this.data.bookInvoice.paidRefNo;
        //  console.log(this.data.invItem);
         this.getListVoucherBySerialNo();
         this.calculateAmount();
      });
  }
  initNewRow(e) {
    e.data.billQty = 1;
    e.data.itemNo = this.dataSource.length + 1
  }

  formatTaxCode(taxCode: string) {
    if (taxCode["value"]) {
      return parseInt(taxCode["value"].substring(3));
    }
    return "";
  }

  formatVatByCode(vat: string) {
    return Number.parseInt(vat.substring(3,vat.length)) ;
  }

  prepareInsertRow(e) {
    console.log(e);
  }

  logEvent(e,type)
  {
    debugger;
    e.data.itemAmount =  e.data.unitPrice *  e.data.billQty;
    e.data.afterDiscount = e.data.itemAmount;
    if ( e.data.svcItemId == ServiceItem.CARRENTALDAILY || e.data.svcItemId == ServiceItem.CARRENTALMONTHLY || e.data.svcItemId == ServiceItem.CARRENTALINTERNAL
      ) {

      // e.data.discount = e.data.itemAmount * Number(this.model.discountCode)  / 100;
      // e.data.afterDiscount = e.data.itemAmount - e.data.discount;

      // Tax amount.....
      e.data.taxAmount = e.data.unitPrice * (this.formatVatByCode(e.data.taxCode) / 100);
      // e.data.afterDiscount = e.data.unitPrice + e.data.taxAmount;
      e.data.afterDiscount = (e.data.unitPrice + e.data.taxAmount) * e.data.billQty;
    }
    if (type == 'update') {
      // Tax amount.....
      e.data.afterDiscount = (e.data.unitPrice + e.data.taxAmount) * e.data.billQty;
      e.component.refresh(true);
      e.data.taxAmount ;
    }
    this.calculateAmount();
  }
  deleteService(e)
  {
    this.calculateAmount();
  }
  
  PrintPayment()
  {
    this.getInvoiceModel.employeeName=this.currentuser.employeeName;
    this.accountingService.printInvoice(this.getInvoiceModel).subscribe(
      data => {
        this.toastr.clear();
        this.fileService.downloadExcel(data['payload'], 'Inv' + moment().format("YYYYMMDDHHmmss") + '.pdf');
      }
    )
  }
  changeDiscount()
  {
    debugger
    var index = this.dataSource.findIndex(m=>m.svcItemId == ServiceItem.CARRENTALDAILY || m.svcItemId== ServiceItem.CARRENTALINTERNAL || m.svcItemId == ServiceItem.CARRENTALMONTHLY);
    this.dataSource[index].discount = this.dataSource[index].itemAmount * Number(this.model.discountCode)  / 100;
    this.dataSource[index].afterDiscount = this.dataSource[index].itemAmount - this.dataSource[index].discount;
    this.dataGrid.instance.refresh();
    this.calculateAmount();
  }

  calculateAmount()
  {
    if (this.dataSource.length > 0) {
      this.total = this.dataSource.map(item => item.afterDiscount).reduce((prev, next) => prev + next); // sum
      // this.taxamount = this.total * 10 / 100 ;
      this.taxamount = this.dataSource.map(item => item.taxAmount).reduce((prev, next) => prev + next);

      this.totalAmountAfterTax =   this.total  +  this.taxamount ;
    }
    
  }

  getListVoucherBySerialNo()
  {
    if ( this.model.voucherSerialNo!=null && this.model.voucherSerialNo.length  >= 8) {
      this._giftVoucherService.getListVoucherBySerialNo(this.model.voucherSerialNo).subscribe(
        data=>{
        this.listDiscountCode = data["payload"];
        })
    }
   
  }

  handleLinkBookNo(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }
  
  
}
