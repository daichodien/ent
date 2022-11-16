import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { CustomerService } from '../../../core/services/master/customer.service';
import { CommonService } from '../../../core/services/common.service';
import { confirm } from 'devextreme/ui/dialog';
import { CustomerDeleteModel, CustomerModel, CustomerDto } from '../../../core/models/master/Customer';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';
declare var AdminLTE: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  
  dataSource: any = [];
  customer :CustomerDto = new CustomerDto();
  customerModel =  new CustomerModel();
  customerDeleteModel = new CustomerDeleteModel(); 
  listCustomerType: any = [];
  countries: any = [];
  modelDelete = new CustomerDeleteModel();
  fileName:string;
  pageIndex:number;
  focusIndex:number;
  pageSize:number = 10;
  titleHeader: string = '';

  constructor(public router: Router,
    private _customerService: CustomerService,
    private toastr: ToastrService,
    private _commonService : CommonService,
    private routeat : ActivatedRoute,
    private cacheService: CacheService,
    private appService: TitleHeaderPageService) 
  {
    super(router);
    this.fileName = this._commonService.getFileName('Customer');
  }

  loadInit() {
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Customer");
    this.getStdCodesCache();
    this._commonService.getCountries().subscribe(data => this.countries = data["payload"]);
  }

  getCustomers() {
    this._customerService.getCustomers(this.customerModel).subscribe(data => {
      if (data["success"] == true) {
        this.dataSource = data["payload"]
      }
    });
  }

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();
    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.customerModel = Object.assign(this.customerModel, params);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
        this.pageSize =  Number(params.pageSize);
      })
    }
    

    this.getCustomers();
  }

  onSubmit(form: NgForm) {
    this.getCustomers();
  }

  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.customerDeleteModel.userId = this.currentuser.employeeId;
        this.customerDeleteModel.custId = id;
        this._customerService.deleteCustomer(this.customerDeleteModel).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Customer') : this.toastr.error('Delete failed!', 'Customer')
              this.getCustomers();
            }
            else {
              this.toastr.error('Delete failed!', 'Customer')
            }
          },
          error => {
            this.toastr.error(error, 'Customer')
          }
        )
      }
    })
  }
  next(id: string) {
    // console.log(this.dataGrid);
    // this.dataGrid.instance.columnOption("srSubject", "sortOrder", 'desc');
    let querypara: any = this.customerModel;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    querypara.focusIndex = id;
    this.router.navigate(['admin/master/customer/' + id], { queryParams: querypara })
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listCustomerType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMCUSTTYPE';
          });
        }
    });
  }
  
}
