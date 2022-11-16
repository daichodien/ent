import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { DxDataGridModule, DxNumberBoxModule, DxButtonModule, DxDateBoxModule, DxSelectBoxModule, DxDropDownBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../core/directives/directives/directives.module';
import { TooltipModule } from 'ngx-bootstrap';
import { ReportService } from '../../core/services/report.service';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    FormsModule,
    DirectivesModule,
    DxDropDownBoxModule,
    DxButtonModule,
    DxValidatorModule,
    TooltipModule.forRoot(),
  ],
  declarations: [BookingReportComponent],
  providers: [
    ReportService
  ]
})
export class ReportsModule { }
