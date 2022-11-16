import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../core/services/common.service';
import { SupplierService } from '../../../../core/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { SuppliersModel } from '../../../../core/models/supplier/SupplierModel';
import { FileuploadComponent } from '../../../../core/directives';
import { REFDOCTYPE } from '../../../../core/helpers';
import { CacheService } from '../../../../core/services/cache.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;
  
  titles: any = ["Mr", "Ms", "Mrs"];
  supplierModel:SuppliersModel= new SuppliersModel();
  suppId:number;
  countries:any = [];
  listSupplierType:any = [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; 
  constructor(
    public router: Router,
    public _commonService: CommonService,
    public _supplierService : SupplierService,
    public routeact: ActivatedRoute,
    public toastr: ToastrService,
    private cacheService: CacheService,
  ) {
    super(router);
    this.suppId = this.routeact.params["_value"].id;
   }

  ngOnInit() {
    this.fileUpload.refNoType = REFDOCTYPE.Supplier;
    this.fileUpload._userId = this.currentuser.employeeId;

    AdminLTE.init();
    this.loadInit();

  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listSupplierType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'SUPPLIERTYPE';
          });
        }
    });
  }

  loadInit()
  {
    this.getStdCodesCache();
    this._commonService.getCountries().subscribe(data => this.countries = data["payload"]);
    if ( this.suppId > 0) {
      this.fileUpload.autoSave = true;
      this.fileUpload.refNoValue = this.suppId.toString();
      this.fileUpload.loadFiles();
      this.getDetail(this.suppId)
    }
    else{
      this.fileUpload.autoSave = false;
    }
    
  }
  getDetail(suppId:number)
  {
    this._supplierService.getsupplier(suppId).subscribe(
      data=>{
        this.supplierModel = data["payload"];
      }
    )
  }
  save()
  {
    this.supplierModel.user = this.currentuser.employeeId;
    if(this.suppId > 0)
    {
      this._supplierService.updatesuppliers(this.supplierModel).subscribe(
        data=>{
          if (data["payload"] > 0) {
            this.toastr.success('Update Supplier successfully!', 'Supplier');
          }
        },
        error=>{
          this.toastr.error('Update Supplier failed!', 'Supplier');
        }

      )
    }
    else{
     
      this._supplierService.savesuppliers(this.supplierModel).subscribe(
        data=>{
          if (data["payload"] > 0) {
            this.toastr.success('Insert Supplier successfully!', 'Supplier');
            this.router.navigate(['admin/master/supplier/' + data["payload"]]);
          }
        },
        error=>{
          this.toastr.error('Insert Supplier failed!', 'Supplier');
        }
      )
    }
   
  }
  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/master/supplier'], { queryParams: params })
      params = [];
    });
  }

}
