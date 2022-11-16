import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetComponent } from './fleet/fleet.component';
import { DriverComponent } from './driver/driver.component';
import { FleetDetailComponent } from './fleet/fleet-detail/fleet-detail.component';
import { DriverDetailComponent } from './driver/driver-detail/driver-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { FleetModelComponent } from './fleet-model/fleet-model.component';
import { FleetModelDetailComponent } from './fleet-model/fleet-model-detail/fleet-model-detail.component';
import { PickupPlaceComponent } from './pickup-place/pickup-place.component';
import { PickupPlaceDetailComponent } from './pickup-place/pickup-place-detail/pickup-place-detail.component';
import { PackageServiceComponent } from './package-service/package-service.component';
import { PackageServiceDetailComponent } from './package-service/package-service-detail/package-service-detail.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { GiftVoucherComponent } from './gift-voucher/gift-voucher.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail/announcement-detail.component';
//import { PickupPlaceDetailComponent } from './pickup-place/pickup-place-detail/pickup-place-detail.component';

const routes: Routes = [
  {
    path: 'fleet'
    , component: FleetComponent
  }
  ,{
    path: 'fleet/:id'
    , component: FleetDetailComponent
  }
  ,{
    path: 'fleetmodel'
    , component: FleetModelComponent
  }
  ,{
    path: 'fleetmodel/:id'
    , component: FleetModelDetailComponent
  }
  ,{
    path: 'driver'
    , component: DriverComponent
  }
  ,{
    path: 'driver/:id'
    , component: DriverDetailComponent
  }
  ,{
    path: 'customer'
    , component: CustomerComponent
  }
  ,{
    path: 'customer/:id'
    , component: CustomerDetailComponent
  }
  ,{
    path: 'pickupplace'
    , component: PickupPlaceComponent
  }
  ,{
    path: 'pickupplace/:id'
    , component: PickupPlaceDetailComponent
  }
  ,{ 
    path: 'servicepackage'
    , component: PackageServiceComponent
  }
  ,{ 
    path: 'servicepackage/:id'
    , component: PackageServiceDetailComponent
  }
  ,{ 
    path: 'supplier'
    , component: SupplierComponent
  }
  ,{ 
    path: 'supplier/:id'
    , component: SupplierDetailComponent
  }
  ,{
    path: 'giftvoucher'
    , component: GiftVoucherComponent
  },
  {
    path: 'announce'
    , component: AnnouncementComponent
  },
  {
    path: 'announce/:id'
    , component: AnnouncementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
