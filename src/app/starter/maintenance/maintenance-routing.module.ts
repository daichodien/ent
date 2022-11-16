import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxAndInsuranceComponent } from './tax-and-insurance/tax-and-insurance.component';
import { TaxAndInsuranceDetailComponent } from './tax-and-insurance-detail/tax-and-insurance-detail.component';
import { FleetMaintenanceComponent } from './fleet-maintenance/fleet-maintenance.component';
import { FleetMaintenanceDetailComponent } from './fleet-maintenance/fleet-maintenance-detail/fleet-maintenance-detail.component';
import { FleetIncidentComponent } from './fleet-incident/fleet-incident.component';
import { FleetIncidentDetailComponent } from './fleet-incident/fleet-incident-detail/fleet-incident-detail.component';
import { FleetComponent } from './fleet/fleet.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: TaxAndInsuranceComponent
  // },
  {
    path: 'taxandinsurance',
    component: TaxAndInsuranceComponent
  },
  {
    path: 'taxandinsurance/:id',
    component: TaxAndInsuranceDetailComponent
  },
  {
    path: 'fleetmaintenance',
    component: FleetMaintenanceComponent
  },
  {
    path: 'fleetmaintenance/:id',
    component: FleetMaintenanceDetailComponent
  },
  {
    path: 'fleetincident',
    component: FleetIncidentComponent
  },
  {
    path: 'fleetincident/:id',
    component: FleetIncidentDetailComponent
  },
  {
    path: 'fleet',
    component: FleetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
