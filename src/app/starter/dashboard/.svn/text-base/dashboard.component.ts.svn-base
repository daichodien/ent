import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/directives/base.component';
import { Router } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard/darhboard.service';
import { SupportService } from '../../core/services/support.service';
import { CommonService } from '../../core/services/common.service';
import { TitleHeaderPageService } from '../../core/services/title-header-page.service';
declare var AdminLTE: any;
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {
    dataSource: any = [];
    collapsed = false;
    valuechange = 0;
    isCollapsed = false;
    contentReady = (e) => {
        if (!this.collapsed) {
            this.collapsed = true;
            e.component.expandRow(['EnviroCare']);
        }
    }
    customizeTooltip = (pointsInfo) => {
        return { text: parseInt(pointsInfo.originalValue) + "%" };
    }
    todayUserCar:any = {};
    tomorowUseCar: any = {};
    drFullfillment: any = {};
    pendingBookingNowAssignsDataSource: any = [];
    pendingPayments: any = [];
    incidentFleet: any = [];
    expireTaxInsurance: any = [];
    maintenanceRequireds: any = [];
    fleetAnalysusOneFleetTypes: any;
    fleetAnalysusTwooHowOlds: any;
    fleetBrandAnalysusTwoos: any;
    titleHeader: string = '';
    constructor(
        public router: Router, public service: DashboardService, public supportsv: SupportService, public commonSvc: CommonService,private appService: TitleHeaderPageService,) {
        super(router);
        this.dataSource = service.getDataSource();
    }

    ngOnInit() {
        this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
        this.appService.updateApprovalMessage("DashBoard");
    //    this.commonSvc.getStdcodesByCode('SETTING').subscribe(
    //        data =>{

    //        }
    //    );
       this.getToday();
    }
    getToday() {
        this.supportsv.getToday().subscribe(
            data => {
                if (data['success'] === true) {
                    const dataToday = data['payload'];
                    this.todayUserCar = dataToday.todayUseCar;
                    this.tomorowUseCar = dataToday.tomorowUseCar;
                    this.drFullfillment = dataToday.drFullfillment;
                    this.pendingBookingNowAssignsDataSource = dataToday.pendingBookingNowAssigns;
                    this.pendingPayments = dataToday.pendingPayments;
                    this.fleetAnalysusOneFleetTypes = dataToday.fleetAnalysusOneFleetTypes;
                    this.fleetAnalysusTwooHowOlds = dataToday.fleetAnalysusTwooHowOlds;
                    this.fleetBrandAnalysusTwoos = dataToday.fleetBrandAnalysusTwoos;
                    this.incidentFleet = dataToday.getIncidentFleets;
                    this.expireTaxInsurance = dataToday.getTaxInsuranceExpiredDate;
                    this.maintenanceRequireds = dataToday.getMaintenanceRequireds;
                    // console.log('todayUserCar', this.todayUserCar);
                }
            });
    }


    customizeLabel(arg) {
        return arg.valueText + '(' + arg.percentText + ')';
    }

    viewDetail(id: string) {
        this.router.navigate(['admin/fl/booking/' + id], { queryParams: {isBackable : false} });
    }
}
