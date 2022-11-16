import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { DailyBookingComponent } from './daily-booking/daily-booking.component';

const routes: Routes = [
  { path: 'booking', component: BookingComponent, pathMatch: 'full' },
  { path: 'booking/:id', component: BookingDetailComponent },
  { path: 'booking/:id/:customer', component: BookingDetailComponent },
  { path: '', redirectTo: 'booking' ,pathMatch:'full'},
  { path: 'dailybooking', component: DailyBookingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRentalRoutingModule { }
