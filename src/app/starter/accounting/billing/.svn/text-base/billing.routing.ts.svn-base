import { Routes, RouterModule } from '@angular/router';
import { InvoiceandPaymentComponent } from './invoiceand-payment/invoiceand-payment.component';
import { NgModule } from '@angular/core';
import { InvoiceAndPaymentDetailComponent } from './invoiceand-payment/invoice-and-payment-detail/invoice-and-payment-detail.component';

const routes: Routes = [
  { 
    path: 'billing',
    component: InvoiceandPaymentComponent
  },
  { 
    path: 'billing/:id',
    component: InvoiceAndPaymentDetailComponent
  },
  { 
    path: 'billing/:id/:customer',
    component: InvoiceAndPaymentDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BillingRoutingModule { }

