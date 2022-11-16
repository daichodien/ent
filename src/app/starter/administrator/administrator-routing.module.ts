import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandardCodeComponent } from './standard-code/standard-code.component';

const routes: Routes = [
  {
    path: 'standardcode',
    component: StandardCodeComponent
  },
  {
    path: 'item',
    component: StandardCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
