import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingReportComponent } from './booking-report/booking-report.component';

const routes: Routes = [
  {
    path: 'bookingreport',
    component: BookingReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
