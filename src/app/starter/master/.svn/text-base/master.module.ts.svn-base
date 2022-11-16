import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { DxDataGridModule, DxNumberBoxModule, DxSchedulerModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextAreaModule, DxTextBoxModule, DxTemplateModule, DxValidatorModule, DxButtonModule } from 'devextreme-angular';
import { DriverComponent } from './driver/driver.component';
import { DriverDetailComponent } from './driver/driver-detail/driver-detail.component';
import { FileuploadModule } from '../../core/directives/fileupload/fileupload.module';
import { FleetDetailComponent } from './fleet/fleet-detail/fleet-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { FleetModelComponent } from './fleet-model/fleet-model.component';
import { FleetModelDetailComponent } from './fleet-model/fleet-model-detail/fleet-model-detail.component';
import { PickupPlaceComponent } from './pickup-place/pickup-place.component';
import { PickupPlaceDetailComponent } from './pickup-place/pickup-place-detail/pickup-place-detail.component';
import { DirectivesModule } from '../../core/directives/directives/directives.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PackageServiceComponent } from './package-service/package-service.component';
import { PackageServiceDetailComponent } from './package-service/package-service-detail/package-service-detail.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { GiftVoucherComponent } from './gift-voucher/gift-voucher.component';
import { GiftVoucherDetailComponent } from './gift-voucher/gift-voucher-detail/gift-voucher-detail.component';
import { GiftVoucherService } from '../../core/services/master/giftvoucher.service';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail/announcement-detail.component';
import { TinyEditorModule } from '../../core/directives/tiny-editor/tiny-editor.module';
import { DriverFleetComponent } from './driver/driver-fleet/driver-fleet.component';
import { FleetRentalModule } from '../fleet-rental/fleet-rental.module';
import { SupportModule } from '../support/support.module';
import { BillingModule } from '../accounting/billing/billing.module';
@NgModule({
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
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
    TinyEditorModule,
    // Support for page Customer detail
    FleetRentalModule,
    SupportModule,
    BillingModule
 ],
  declarations: [
    FleetComponent,
    FleetDetailComponent,
    DriverComponent,
    DriverDetailComponent,
    CustomerComponent,
    CustomerDetailComponent,
    FleetModelComponent,
    FleetModelDetailComponent,
    PickupPlaceComponent,
    PickupPlaceDetailComponent,
    PackageServiceComponent,
    PackageServiceDetailComponent,
    SupplierComponent,
    SupplierDetailComponent,
    GiftVoucherComponent,
    GiftVoucherDetailComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    DriverFleetComponent
  ],
  providers: [
    SupplierService,
    GiftVoucherService
  ],
  entryComponents: [
    GiftVoucherDetailComponent,
    DriverFleetComponent
  ]
})
export class MasterModule { }
