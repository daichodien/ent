import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { GiftVoucherDetailComponent } from './gift-voucher-detail/gift-voucher-detail.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { GiftVoucherService } from '../../../core/services/master/giftvoucher.service';
import { CommonService } from '../../../core/services/common.service';
import { SaveGiftVoucherTypeModel } from '../../../core/models/gift-voucher-type-model';
import { ToastrService } from 'ngx-toastr';
import { confirm } from 'devextreme/ui/dialog';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

@Component({
  selector: 'app-gift-voucher',
  templateUrl: './gift-voucher.component.html',
  styleUrls: ['./gift-voucher.component.css']
})
export class GiftVoucherComponent extends BaseComponent {
  searchModel:any = {};
  bsModalRef: BsModalRef;
  dataSource:any = [];
  fileName:string;
  listVoucherType:any;
  titleHeader: string = '';
  constructor(
    route: Router,
    private modalService: BsModalService,
    private giftVoucherService:GiftVoucherService,
    private _commonService: CommonService,
    private toastr: ToastrService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) { 
    super(route);
    this.fileName = this._commonService.getFileName('Customer');
  }

  ngOnInit() {
    this.GetGiftVouchers();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Gift Voucher");
    this.getStdCodesCache();
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listVoucherType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'VOUCHERTYPE';
          });
        }
    });
  }

  GetGiftVouchers()
  {
     this.giftVoucherService.getGiftVouchers(this.searchModel).subscribe(data=>{
       if (data["success"] == true) {
        this.dataSource = data["payload"];
       }
     });
  }

  OpenModal() {
    const initialState = {
      listVoucherType:this.listVoucherType,
      editMode: false
    };
    this.bsModalRef = this.modalService.show(GiftVoucherDetailComponent, Object.assign({}, { initialState, ignoreBackdropClick: true,  class: "modal-lg" }));

    this.bsModalRef.content.reloadGrid.subscribe(data=>{
      this.GetGiftVouchers();
    });
    
  }
  viewdetail(data)
  {
    
    let model = new SaveGiftVoucherTypeModel();
    model.expiredDate = data.expDate;
    model.issueDate = data.issueDate;
    model.releaseTo = data.releaseTo;
    model.remark = data.remark;
    model.serialNo = data.serialNo;
    model.voucherType = data.voucherType;
    model.gvId = data.gvId;
    const initialState = {
      listVoucherType:this.listVoucherType,
      editMode: true,
      giftVoucherModel:model,
    };
    this.bsModalRef = this.modalService.show(GiftVoucherDetailComponent, Object.assign({}, { initialState, ignoreBackdropClick: true,  class: "modal-lg" }));

    this.bsModalRef.content.reloadGrid.subscribe(data=>{
      this.GetGiftVouchers();
    });
  }
  delete(gvId)
  {
    
    let model = new SaveGiftVoucherTypeModel();
    model.gvId = gvId;
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.giftVoucherService.deleteGiftVoucher(model).subscribe(
          data=>
          {
            if (data["success"] == true) {
              this.toastr.success("Delete sucessfull", "Gift Voucher");
              this.GetGiftVouchers();
            }
          },
          error=>{
            this.toastr.error(error.error, "Gift Voucher");
          });
      }
    });
  }

}
