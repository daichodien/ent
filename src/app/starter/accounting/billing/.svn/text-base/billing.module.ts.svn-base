import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DxDataGridModule, DxNumberBoxModule, DxSchedulerModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule, DxCheckBoxModule, DxTextBoxModule, DxTemplateModule, DxButtonModule, DxValidatorModule } from 'devextreme-angular';
import { FileuploadModule } from '../../../core/directives/fileupload/fileupload.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DirectivesModule } from '../../../core/directives/directives/directives.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InvoiceandPaymentComponent } from './invoiceand-payment/invoiceand-payment.component';
import { InvoiceAndPaymentDetailComponent } from './invoiceand-payment/invoice-and-payment-detail/invoice-and-payment-detail.component';
import { PaymentPopupComponent } from './invoiceand-payment/payment-popup/payment-popup.component';
import { SendMailPaymentPopupComponent } from './invoiceand-payment/send-mail/send-mail-payment-popup.component';
import { GiftVoucherService } from '../../../core/services/master/giftvoucher.service';

@NgModule({
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    HttpModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxSchedulerModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxTemplateModule,
    FileuploadModule,
    TooltipModule.forRoot(),
    DxValidatorModule,
    DxButtonModule, 
    DirectivesModule,
    ModalModule.forRoot(),
    
  ],
  declarations: [
    InvoiceandPaymentComponent,
    InvoiceAndPaymentDetailComponent,
    PaymentPopupComponent,
    SendMailPaymentPopupComponent
  ],
  entryComponents:[
    PaymentPopupComponent,
    SendMailPaymentPopupComponent

  ],
  providers:[
    GiftVoucherService
  ],
  exports: [
    InvoiceandPaymentComponent
  ]
})
export class BillingModule { }
