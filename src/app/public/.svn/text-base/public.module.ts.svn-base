import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PublicComponent } from './public.component';
import { FormsModule } from '@angular/forms';
import { TripRecordVerifyComponent } from './trip-record-verify/trip-record-verify.component';
import { PublicRoutingModule } from './public-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { CheckListComponent } from './customer/checklist/check-list.component';
import { TripRecordComponent } from './customer/trip-record/trip-record.component';
import { HttpModule } from '@angular/http';
import { DxDataGridModule, DxNumberBoxModule, DxDateBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { PublicService } from '../core/services/public.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    ModalModule.forRoot(),
    PublicRoutingModule,
    CarouselModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule
  ],
  declarations: [
    PublicComponent,
    TripRecordVerifyComponent,
    CheckListComponent,
    TripRecordComponent
  ],
  providers: [
    PublicService
  ]
})
export class PublicModule { }
