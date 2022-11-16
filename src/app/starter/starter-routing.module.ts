import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter.component';
import { DriverComponent } from './master/driver/driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GooglemapComponent } from './map-popup/map-popup.component';
import { TemplateInputComponent } from './core/template-input/template-input.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'admin',
    component: StarterComponent,
    children: [
      {
        path: 'fl',
        loadChildren: 'app/starter/fleet-rental/fleet-rental.module#FleetRentalModule'
      },
      {
        path:'master',
        loadChildren:'app/starter/master/master.module#MasterModule'
      },
      {
        path:'accounting',
        loadChildren:'app/starter/accounting/billing/billing.module#BillingModule'
      },
     
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'input', component: TemplateInputComponent },
      { path: 'userprofile', component: UserprofileComponent },
      {
        path:'support',
        loadChildren:'app/starter/support/support.module#SupportModule'
      },
      {
        path:'maintenance',
        loadChildren:'app/starter/maintenance/maintenance.module#MaintenanceModule'
      },
      {
        path: 'webportal',
        loadChildren: 'app/starter/web-portal/web-portal.module#WebPortalModule'
      },
      {
        path: 'reports',
        loadChildren: 'app/starter/reports/reports.module#ReportsModule'
      },
      {
        path: 'administrator',
        loadChildren: 'app/starter/administrator/administrator.module#AdministratorModule'
      },
      {
        path:'maintenance/standardcode',
        loadChildren:'app/starter/administrator/administrator.module#AdministratorModule'
      }
      
    ],

  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarterRoutingModule { }
