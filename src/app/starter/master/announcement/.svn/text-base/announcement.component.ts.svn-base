import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { DxDataGridComponent } from 'devextreme-angular';
import * as moment from 'moment';
import { AnnouncementService } from '../../../core/services/master/announcement.service';
import { Constants, Helpers } from '../../../core/helpers/index';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

const PAYLOAD = Constants.PAYLOAD.toLowerCase();
declare var AdminLTE: any;
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent extends BaseComponent {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  adminLte: JQuery;
  bsModalRef: BsModalRef;
  bsRangeValue: any = [];
  searchModel: any = {};
  dataSource: any = [];
  listAnnounceType: any = [];
  titleHeader: string = '';

  constructor(
    public router: Router
    , private commomSvc: CommonService
    , private announceSvc: AnnouncementService
    , private appService: TitleHeaderPageService
    , private cacheService: CacheService
    , private routeat :  ActivatedRoute) {

    super(router);
    this.bsRangeValue = [moment().subtract(10, 'days')["_d"], new Date()];
   }

  ngOnInit() {
    $('body').data('lte.layout');//.fixLayoutHeight();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Announcement");
    // Get list Announce Type
    // this.getListAnnounceType(Constants.ANN_TYPE);
    this.getStdCodesCache();
    // Get list Announcement
    this.searchAnnouncements();
    AdminLTE.init();
  }

  /**
   * Get list Announcement by param serach model
   */
  searchAnnouncements() {
    this.dataSource = [];
    // Set value search
    this.getValueSearch();

    this.announceSvc.searchListAnnounceByParams(this.searchModel).subscribe(
      data => {
        // console.log('===> ', data[PAYLOAD])
        if (Helpers.checkDataAPIsResult(data))
          this.dataSource = data[PAYLOAD];

        if (this.dataGrid.instance)
          this.dataGrid.instance.refresh();
      }
    )
  }

  /**
   * Get detail announcement by id
   * @param annId Id announcement
   */
  getDetailById(annId: number) {
    // console.log('===> ', annId);

    const querypara: any = this.searchModel;
    this.router.navigate([`${Constants.ETP_URLS.ANNOUNCE}${annId}`], { queryParams: querypara });
  }
  
  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          if (Helpers.checkDataAPIsResult(data)) {
            this.listAnnounceType = data["payload"].filter(function (x) {
              return x.codeGroup.replace(/\s/g, "") == Constants.ANN_TYPE;
            });
          }
        }
    });
  }

  /**
   * Set value search model
   */
  private getValueSearch() {
    if (this.bsRangeValue != null && this.bsRangeValue.length == 2) {
      this.searchModel.DateFrom = moment(this.bsRangeValue[0]).format(Constants.DATE_FORMAT.YYYYMMDD);
      this.searchModel.DateTo = moment(this.bsRangeValue[1]).format(Constants.DATE_FORMAT.YYYYMMDD);
    }

    this.searchModel.AnnType = this.searchModel.AnnType || '';
    this.searchModel.Subject = this.searchModel.Subject || '';
  }
}