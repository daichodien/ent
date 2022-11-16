import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';
import { StarterNavbarComponent } from './starter-navbar/starter-navbar.component';
import { StarterMainSidebarComponent } from './starter-main-sidebar/starter-main-sidebar.component';
import { StarterContentComponent } from './starter-content/starter-content.component';
import { StarterControlSidebarComponent } from './starter-control-sidebar/starter-control-sidebar.component';
import { StarterFooterComponent } from './starter-footer/starter-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FleetRentalModule } from './fleet-rental/fleet-rental.module';
import { DxDataGridModule,DxBulletModule, DxNumberBoxModule, DxSchedulerModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextAreaModule, DxTextBoxModule, DxTemplateModule, DxValidatorModule, DxButtonModule, DxPieChartModule,DxAutocompleteModule } from 'devextreme-angular';
import { AgmCoreModule } from '@agm/core/core.module';
import { GooglemapComponent } from './map-popup/map-popup.component';
import { TemplateInputComponent } from './core/template-input/template-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FileuploadModule } from '../core/directives/fileupload/fileupload.module';
import { CheckInspectionDetailComponent } from './support/check-inspection/check-inspection-detail/check-inspection-detail.component';
import { CheckListInspectionImagesComponent } from './support/check-inspection/check-list-inspection-images/check-list-inspection-images.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { CustomerTicketLogsComponent } from './support/customer-ticket/customer-ticket-logs/customer-ticket-logs.component';

@NgModule({
  imports: [
    CommonModule,
    StarterRoutingModule,
    FleetRentalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEVB05okc0tAl3Ye2rRti4_vpga9zLSt0',
      libraries: ['places']
    }),
    DxPieChartModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    FormsModule,
    ReactiveFormsModule,
    DxAutocompleteModule,
    DxSelectBoxModule,
    // NgxSpinnerModule,
    TooltipModule.forRoot(),
    FileuploadModule,
    ModalModule.forRoot(),
    NgxGalleryModule,
    DxDateBoxModule
  ],
  declarations: [
    StarterComponent,
    StarterNavbarComponent,
    StarterMainSidebarComponent,
    StarterContentComponent,
    StarterControlSidebarComponent,
    StarterFooterComponent,
    DashboardComponent,
    GooglemapComponent,
    TemplateInputComponent,
    UserprofileComponent,
    CheckInspectionDetailComponent,
    CheckListInspectionImagesComponent,
    CustomerTicketLogsComponent
  ],
  entryComponents: [GooglemapComponent,TemplateInputComponent, CheckInspectionDetailComponent, CheckListInspectionImagesComponent,CustomerTicketLogsComponent],
  providers:[
    BsModalService,
    BsModalRef,
  ],
  exports:[StarterComponent]
})
export class StarterModule { }
