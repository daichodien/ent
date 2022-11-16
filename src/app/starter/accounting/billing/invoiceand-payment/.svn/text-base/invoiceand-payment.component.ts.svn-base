import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountingService } from '../../../../core/services/accounting.service';
import * as moment from 'moment';
import { InvoiceSearchDto } from '../../../../core/models/accounting/InvoiceSearchDto';
import { CustomerService } from '../../../../core/services/master/customer.service';
import { CustomerModel } from '../../../../core/models/master/Customer';
import { async } from '@angular/core/testing';
import { TitleHeaderPageService } from '../../../../core/services/title-header-page.service';
declare var AdminLTE: any
@Component({
  selector: 'app-invoiceand-payment',
  templateUrl: './invoiceand-payment.component.html',
  styleUrls: ['./invoiceand-payment.component.css']
})
export class InvoiceandPaymentComponent extends BaseComponent {
  @Input() customerIdRequest?: string;
  searchModel: InvoiceSearchDto = new InvoiceSearchDto();
  dataSource: any = [];
  listCustomer: any = [];
  titleHeader: string = '';
  constructor(
    public router: Router,
    public invoiceSvc: AccountingService,
    public _customerService: CustomerService, private route: ActivatedRoute , private appService: TitleHeaderPageService
  ) {
    super(router);
  }

   async ngOnInit() {
    if(this.customerIdRequest) {
      this.searchModel.custId = Number.parseInt(this.customerIdRequest);
      this.searchModel.bookNo = '';
      this.searchModel.invNo = '';

      this.search();
      AdminLTE.init();
      return ;
    }

    this.getCustomers();
    if (Object.keys(this.route.snapshot["queryParams"]).length > 0) {
      this.searchModel.custId = Number.parseInt(this.route.snapshot.queryParams["custId"])||'';
      this.searchModel.bookNo = this.route.snapshot.queryParams["bookNo"] || '';
      this.searchModel.invNo = this.route.snapshot.queryParams["invNo"]||'';
      this.searchModel.invDateF = moment(this.route.snapshot.queryParams["invDateF"], "YYYYMMDD");
      this.searchModel.invDateT = moment(this.route.snapshot.queryParams["invDateT"], "YYYYMMDD");

      if(this.route.snapshot.queryParams["paidOnly"]=='true')
      {
        this.searchModel.paidOnly = true;
      }
      else
      {
        this.searchModel.paidOnly = false;
      }
    }
    else
    {
      this.searchModel.custId = '';
      this.searchModel.bookNo = '';
      this.searchModel.invNo = '';
    }
    this.search();
    AdminLTE.init();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Billing");
  }

  search() {
    this.searchModel.invDateF = moment(this.searchModel.invDateF).format("YYYYMMDD");
    this.searchModel.invDateT = moment(this.searchModel.invDateT).format("YYYYMMDD");
    this.invoiceSvc.searchBookInvoices(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    );
  }

   async getCustomers() 
  {
    let customerModel: any = new CustomerModel();
    let data = await this._customerService.getCustomers(customerModel).toPromise();
    this.listCustomer = data["payload"]
  }

  goDetail(invNo) {
    this.router.navigate(['admin/accounting/billing/' + invNo], { queryParams: Object.assign(this.searchModel, { clickat: 'billing' }) });
  }
  viewDetail(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }
}
