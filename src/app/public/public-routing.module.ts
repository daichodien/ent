import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripRecordVerifyComponent } from './trip-record-verify/trip-record-verify.component';
import { CheckListComponent } from './customer/checklist/check-list.component';
import { TripRecordComponent } from './customer/trip-record/trip-record.component';

const routes: Routes = [
  {
    path: 'triprecordverify',
    component: TripRecordVerifyComponent
  },
  {
    path: 'checklist',
    component: CheckListComponent
  },
  {
    path: 'triprecord',
    component: TripRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
