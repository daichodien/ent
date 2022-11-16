import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AuthGuard } from './core/guards/auth.guard';
import { InspectionlistComponent } from './inspectionlist/inspectionlist.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  { 
    path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' 
  },
  { 
  path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  {
    path: 'inspection',
    component: InspectionlistComponent
  },
  {
    path: 'privacypolicy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'admin',
    loadChildren: 'app/starter/starter.module#StarterModule',
    canLoad: [AuthGuardService],
    canActivate: [AuthGuard]
  },
  {
    path: 'public',
    loadChildren: 'app/public/public.module#PublicModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }

