import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { SupplierService } from '../../../core/services/supplier.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { CommonService } from '../../../core/services/common.service';
import { confirm } from 'devextreme/ui/dialog';
import { SuppliersModel } from '../../../core/models/supplier/SupplierModel';
import { ToastrService } from 'ngx-toastr';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  modelSearch:any = {
    "supplierName":"",
    "country":"",
    "supplierType":"",
    "mobileNo":"",
  };
  dataSource: any = [];
  pageIndex:number;
  focusIndex:number;
  fileName:string;
  pageSize:number = 10;
  countries:any = [];
  listSupplierType:any = [];
  titleHeader: string = '';

  constructor(
    public router: Router,
    public supplierService:SupplierService,
    public commonService: CommonService,
    public routeat: ActivatedRoute,
    public toastr: ToastrService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(router);
   }

  ngOnInit() {
    AdminLTE.init();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Supplier");
    this.getStdCodesCache();
    this.commonService.getCountries().subscribe(data => this.countries = data["payload"]);
    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.modelSearch = Object.assign(this.modelSearch, params);
        this.pageIndex = Number(params.pageIndex);
        this.focusIndex = Number(params.focusIndex);
        this.pageSize =  Number(params.pageSize);
        this.search();
      })
    }

   

  }
  search()
  {
    this.supplierService.getsuppliers(this.modelSearch).subscribe(data => {
      this.dataSource = data["payload"];
    });
    
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listSupplierType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'SUPPLIERTYPE';
          });
        }
    });
  }

  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        let model = new SuppliersModel();
        model.suppId = id;
        this.supplierService.deletesuppliers(model).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Supplier') : this.toastr.error('Delete failed!', 'Supplier')
              this.search();
            }
            else {
              this.toastr.error('Delete failed!', 'Supplier')
            }
          },
          error => {
            this.toastr.error(error, 'Supplier')
          }
        )
      }
    })
  }
  next(id: string) {
    let querypara: any = this.modelSearch;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    querypara.focusIndex = id;
    this.router.navigate(['admin/master/supplier/' + id], { queryParams: querypara })
  }
}
