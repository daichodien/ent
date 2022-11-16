import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveTripRecordComponent } from './approve-trip-record/approve-trip-record.component';
import { SupportRoutingModule } from './support-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DxDataGridModule, DxNumberBoxModule, DxDateBoxModule, DxSelectBoxModule, DxValidatorModule, DxButtonModule } from 'devextreme-angular';
import { ApprovalFeeComponent } from './approve-fee/approval-fee.component';
import { CheckInspectionComponent } from './check-inspection/check-inspection.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { VerifyTripRecordComponent } from './verify-trip-record/verify-trip-record.component';
import { CustomerTicketComponent } from './customer-ticket/customer-ticket.component';
import { CustomerTicketDetailComponent } from './customer-ticket/customer-ticket-detail/customer-ticket-detail.component';
import { FileuploadModule } from '../../core/directives/fileupload/fileupload.module';
import { DirectivesModule } from '../../core/directives/directives/directives.module';
import { CustomerTicketLogsComponent } from './customer-ticket/customer-ticket-logs/customer-ticket-logs.component';
import { DateTimeFormatDirective } from '../../core/directives/date-time-format.directive';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule,
    FormsModule,
    HttpModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    NgxGalleryModule,
    DxValidatorModule,
    DxButtonModule,
    FileuploadModule,
    DirectivesModule,
    
  ],
  declarations: [
    ApproveTripRecordComponent,
    ApprovalFeeComponent,
    CheckInspectionComponent,
    VerifyTripRecordComponent,
    CustomerTicketComponent ,
    CustomerTicketDetailComponent,
  ],
  entryComponents:[
    
  ],
  exports:[
    ApprovalFeeComponent,
    CustomerTicketComponent
  ]
 

})
export class SupportModule { }
