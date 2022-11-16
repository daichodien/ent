import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../../core/directives/base.component';
import { AccountingService } from '../../../../../core/services/accounting.service';


@Component({
  selector: 'app-send-mail-payment-popup',
  templateUrl: './send-mail-payment-popup.component.html',
  styleUrls: ['./send-mail-payment-popup.component.css']
})
export class SendMailPaymentPopupComponent extends BaseComponent {

  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()

  model: any = {};
  saveModel: any = {};

  constructor(public router: Router,
    public modalService: BsModalService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    public accountingSvc: AccountingService) {
    super(router);
  }

  ngOnInit() {
    this.model = this.modalService.config["initialState"];
    this.saveModel.invNo = this.model.invNo;
    this.saveModel.updateUser = this.currentuser.employeeId;
    this.saveModel.sendRemark = '';
    this.saveModel.sendDate = new Date();
  }

  Save() {
    this.accountingSvc.sendInvoice(this.saveModel).subscribe(
      data => {
        if (data["payload"] > 0) {
          this.toastr.success("Update sucessfull", "Payment");
          this.reloadGrid.emit('ok');
          this.bsModalRef.hide();
        }
        else {
          this.toastr.error("Update failed", "Payment");
        }
      },
      error => {
        this.toastr.error(error.error, "Payment");
      });
  }

}
