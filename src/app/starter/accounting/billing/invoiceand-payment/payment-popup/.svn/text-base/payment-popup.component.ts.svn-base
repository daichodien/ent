import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../../core/directives/base.component';
import { AccountingService } from '../../../../../core/services/accounting.service';


@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css']
})
export class PaymentPopupComponent extends BaseComponent {

  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()

  
  constructor(public router:Router,
    public modalService: BsModalService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public accountingsv : AccountingService,
    ) {
    super(router);
  }
  model:any={};
  saveModel:any = {};
  ngOnInit() {
    this.model = this.modalService.config["initialState"];
    this.saveModel.invNo = this.model.invNo;
    this.saveModel.updateUser = this.currentuser.employeeId;
    this.saveModel.paidRefNo = '';
    this.saveModel.paidDate =  new Date();
  }

  save()
  {
    
    this.accountingsv.payInvoice(this.saveModel).subscribe(
      data => {
          if (data["payload"] > 0) {
            this.toastr.success("Payment sucessfull", "Payment");
            this.reloadGrid.emit('ok');
            this.bsModalRef.hide();
          }
          else
          {
            this.toastr.error("Payment failed", "Payment");
          }
      },
      error=>{
        this.toastr.error(error.error, "Payment");
      });
  }

  
}
