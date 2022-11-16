import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Globalconst } from '../../../../core/helpers';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../core/directives/base.component';
import { SaveGiftVoucherTypeModel } from '../../../../core/models/gift-voucher-type-model';
import { GiftVoucherService } from '../../../../core/services/master/giftvoucher.service';

@Component({
  selector: 'app-gift-voucher-detail',
  templateUrl: './gift-voucher-detail.component.html',
  styleUrls: ['./gift-voucher-detail.component.css']
})
export class GiftVoucherDetailComponent extends BaseComponent {
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()
  giftVoucherModel:SaveGiftVoucherTypeModel = new SaveGiftVoucherTypeModel();
  listVoucherType:any= [];
  serialNo1:string = null;
  serialNo2:string =  null;
  serialNo3:string =  null;
  constructor(public router:Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    private _giftVoucherService:GiftVoucherService,
    ) {
    super(router);
  }
  model:any={};
  ngOnInit() {
    this.model = this.modalService.config["initialState"];
    this.listVoucherType = this.model.listVoucherType;
    if (this.model.editMode == true) {
      this.giftVoucherModel = this.model.giftVoucherModel;
    }
    // this.reloadGrid.emit('ok'); this.reloadGrid.emit('ok');
  }
  Save()
  {
    debugger
    this.giftVoucherModel.user = this.currentuser.employeeId;
    if (this.model.editMode == true) {
      this._giftVoucherService.updateGiftVoucher(this.giftVoucherModel).subscribe(data => {
        if (data["success"]== true && data["payload"]>0) {
            this.toastr.success("Update sucessfull", "Gift Voucher");
            this.reloadGrid.emit('ok');
            this.bsModalRef.hide();
        }
        else
        {
            this.toastr.error("Update failed", "Gift Voucher");
        }
      });
    }
    else{
      this.giftVoucherModel.serialNo = this.serialNo1 +'-'+ this.serialNo2 + '-' + this.serialNo3;
      this._giftVoucherService.saveGiftVoucher(this.giftVoucherModel).subscribe(data => {
        if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success("Insert sucessfull", "Gift Voucher");
            this.reloadGrid.emit('ok');
            this.bsModalRef.hide();
        }
        else
        {
          this.toastr.error("Insert failed", "Gift Voucher");
        }
      });
    }
  }

}
