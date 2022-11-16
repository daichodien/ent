import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { FleetRentalRoutingModule } from './fleet-rental-routing.module';
import { DxDataGridModule, DxNumberBoxModule,DxDraggableModule,DxScrollViewModule, DxSchedulerModule, 
  DxDateBoxModule, DxButtonModule, DxSwitchModule, DxPopupModule, DxTreeListModule,
   DxSelectBoxModule, DxCheckBoxModule, DxRadioGroupComponent, DxRadioGroupModule, DxDropDownBoxModule,
    DxValidatorModule, DxValidationSummaryModule ,DxTextBoxModule} from 'devextreme-angular';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { FileuploadModule } from '../../core/directives/fileupload/fileupload.module';
import { TripRecordDetailComponent } from './trip-record-detail/trip-record-detail.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../core/services/modal.service';
import { TripStatusViewerComponent } from './trip-status-viewer/trip-status-viewer.component';
import { BookingDriverInfoComponent } from './booking-driver-info/booking-driver-info.component';
import { DailyBookingComponent } from './daily-booking/daily-booking.component';
import { DateTimeFormatDirective } from '../../core/directives/date-time-format.directive';
import { DirectivesModule } from '../../core/directives/directives/directives.module';
import { ServiceChargesAddComponent } from './booking-detail/service-charges-add/service-charges-add.component';
import { AssignFleetComponent } from './booking-detail/assign-fleet/assign-fleet.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FleetRentalRoutingModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxSchedulerModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    FileuploadModule,
    FormsModule,
    DirectivesModule,
    DxDropDownBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    TooltipModule.forRoot(),
    DxDraggableModule,
    DxScrollViewModule
    
  ],
  declarations: [
    BookingComponent,
    BookingDetailComponent,
    TripRecordDetailComponent,
    TripStatusViewerComponent,
    BookingDriverInfoComponent,
    DailyBookingComponent,
    ServiceChargesAddComponent,
    AssignFleetComponent
    
  ],
  providers: [
    ModalService
  ],
  entryComponents: [
    TripRecordDetailComponent,
    TripStatusViewerComponent,
    BookingDriverInfoComponent,
    ServiceChargesAddComponent,
    AssignFleetComponent
  ],
  exports: [
    BookingComponent
  ]
})
export class FleetRentalModule { }
