import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxNumberBoxModule, DxButtonModule, DxDateBoxModule, DxSelectBoxModule, DxDropDownBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../core/directives/directives/directives.module';
import { TooltipModule } from 'ngx-bootstrap';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { StandardCodeComponent } from './standard-code/standard-code.component';
import { AdministratorService } from '../../core/services/administrator.service';

@NgModule({
  imports: [
    CommonModule,
    AdministratorRoutingModule,
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
  declarations: [StandardCodeComponent],
  providers: [
    AdministratorService
  ]
})
export class AdministratorModule { }
