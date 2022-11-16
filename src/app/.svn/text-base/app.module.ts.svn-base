import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService, AlertService, UserService, FileService } from './core/services';
import { HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationHttpClient } from './core/services/_base/http-client';
import { WindowRef, Globalconst, GroupByPipe, FilterPipe, SanitizeHtmlPipe } from './core/helpers';
import { CommonService } from './core/services/common.service';
import { ToastNoAnimationModule, ToastrModule, ToastNoAnimation } from 'ngx-toastr';
import { StarterModule } from './starter/starter.module';
import { NumberOnlyDirective } from './core/directives/number.only.directive';
import { MyCurrencyPipe } from './core/directives/myCurrencyPipe.directive';
import { AlertComponent } from './core/directives/alert/alert.component';
import { EqualValidator } from './core/directives/equalvalidator.directive';
import { FleetService } from './core/services/master/fleet.service';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DriverService } from './core/services/master/driver.service';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BookingService } from './core/services/booking.service';
import { DashboardService } from './core/services/dashboard/darhboard.service';
import { DateFormatPipe } from './core/helpers/dateFomatPipe';
import { AuthInterceptor } from './core/services/_base/auth-interceptor';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { InspectionlistComponent } from './inspectionlist/inspectionlist.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CurrencyPipe } from '@angular/common';
import { MaintenanceModule } from './starter/maintenance/maintenance.module';
import { AccountingService } from './core/services/accounting.service';
import { SupportService } from './core/services/support.service'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {WebcamModule} from 'ngx-webcam';
import { PreviewImageComponent } from './inspectionlist/preview-image/preview-image.component';
import { DxSelectBoxModule } from 'devextreme-angular';
import { ServicePackageService } from './core/services/master/servicepackage.service';
import { SupplierService } from './core/services/supplier.service';
import { RequestInterceptor } from './core/services/_base/request-interceptor';
import { AuthService } from './core/services/_base/auth-service';
import { ClientService } from './core/services/client.service';
import { CacheService } from './core/services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    GroupByPipe,
    FilterPipe,
    MyCurrencyPipe,
    NumberOnlyDirective,
    AlertComponent,
    EqualValidator,
    SanitizeHtmlPipe,
    DateFormatPipe,
    InspectionlistComponent,
    PrivacyPolicyComponent,
    PreviewImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
      closeButton: true
    }),
    SlimLoadingBarModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATn6vlbVbT3M19fYi-UhXshg1ZLXUM6Uk'
    }),
    ButtonsModule.forRoot(),
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    MaintenanceModule,
    WebcamModule,
    DxSelectBoxModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    CookieService,
    AuthenticationService,
    AlertService,
    UserService,
    FileService,
    HttpClient,
    ApplicationHttpClient,
    WindowRef,
    Globalconst,
    CommonService,
    FleetService,
    DriverService,
    MyCurrencyPipe,
    BookingService,
    DashboardService,
    SlimLoadingBarService,
    CurrencyPipe,
    AccountingService,
    SupportService,
    ServicePackageService,
    AuthService,
    ClientService,
    CacheService,
     // Provide the Authentication interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    AuthGuardService,
    SupplierService
  ],
  entryComponents: [
    PreviewImageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
