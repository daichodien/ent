import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveTripRecordComponent } from './approve-trip-record/approve-trip-record.component';
import { ApprovalFeeComponent } from './approve-fee/approval-fee.component';
import { CheckInspectionComponent } from './check-inspection/check-inspection.component';
import { VerifyTripRecordComponent } from './verify-trip-record/verify-trip-record.component';
import { CustomerTicketComponent } from './customer-ticket/customer-ticket.component';
import { CustomerTicketDetailComponent } from './customer-ticket/customer-ticket-detail/customer-ticket-detail.component';

const routes: Routes = [
  {
    path: 'triprecordapproval',
    component: ApproveTripRecordComponent,
  },
  {
    path: 'triprecordapprovedfee',
    component: ApprovalFeeComponent,
  },
  {
    path: 'checklistinspection',
    component: CheckInspectionComponent,
  }
  ,
  {
    path: 'triprecordverify',
    component: VerifyTripRecordComponent,
  }
  ,
  {
    path: 'customerticket',
    component: CustomerTicketComponent,
  }
  ,
  {
    path: 'customerticket/:id',
    component: CustomerTicketDetailComponent
  }
  ,
  {
    path: 'customerticket/:id/:customer',
    component: CustomerTicketDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
