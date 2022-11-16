import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TinyEditorComponent, FileuploadComponent } from '../../../../../core/directives';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementDto } from '../../../../../core/models/AnnouncementDto';
import { CommonService } from '../../../../../core/services/common.service';
import { AnnouncementService } from '../../../../../core/services/master/announcement.service';
import { Constants, Helpers } from '../../../../../core/helpers/index';
import { REFDOCTYPE } from '../../../../../core/helpers';
import { CacheService } from '../../../../../core/services/cache.service';

declare var AdminLTE: any;
const PAYLOAD = Constants.PAYLOAD.toLowerCase();

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})

export class AnnouncementDetailComponent extends BaseComponent {

  @ViewChild('uploadfile') public fileUpload: FileuploadComponent;
  @ViewChild(TinyEditorComponent)
  private myEditor: TinyEditorComponent;

  annId: number = 0;
  announceDetail = new AnnouncementDto();
  listAnnounceType: any = [];
  listSubsidiary: any = [];
  titleForm: string = 'Add Announcement';
  textSubmit: string;

  constructor(
    public router: Router
    , public route: ActivatedRoute
    , private announceSvc: AnnouncementService
    , private commomSvc: CommonService
    , public toastr: ToastrService
    , private cacheService: CacheService
  ) { 
    super(router);
  }

  ngOnInit() {
    this.fileUpload.refNoType = REFDOCTYPE.Announcement;
    this.fileUpload._userId = this.currentuser.employeeId;
    this.annId = this.route.params[Constants.CONFIGS.VALUE].id;
    AdminLTE.init();

    // Get list Announce Type
    this.getStdCodesCache();

    // Get data Subsidiaries
    this.getDataSubsidiaries();

    // Get value query string announcement
    this.getValueQueryString();
  }

  keyupHandlerFunction(event) {
    this.announceDetail.contents = event;
  }

  back() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate([Constants.ETP_URLS.ANNOUNCE], { queryParams: params })
      params = [];
    });
  }

  /**
   * Insert || Update data Announcement
   */
  saveAnnouncement() {
    this.announceDetail.requestforDriverAgreement = !this.announceDetail.requestforDriverAgreement ? 0 : 1;

    if (this.announceDetail.annId) {
      this.announceDetail.updateUser = this.currentuser.employeeId;
      this.updateData(this.announceDetail);
    }else {
      this.announceDetail.createUser = this.currentuser.employeeId;
      this.insertNewData(this.announceDetail);
    }
  }

  /**
   * Insert new data Announcement
   * @param objData New data Announcement
   */
  private insertNewData(objData: any) {
    const actionType = Constants.ACTIONS.INSERT;
    try {
      this.announceSvc.insertAnnouncement(objData).subscribe(
        data => {
          if (Helpers.checkDataAPIsResult(data))
            Helpers.showMessage(this.toastr, data[PAYLOAD], actionType);
          else
            this.toastr.error(Constants.NOTIFICATIONS.SAVE_FAIL, actionType);
        }
      )
    }catch(ex) {
      this.toastr.error(Constants.NOTIFICATIONS.SAVE_FAIL, actionType);
    }
  }

  /**
   * Update data Announcement
   * @param objData Data update Announcement
   */
  private updateData(objData: any) {
    const actionType = Constants.ACTIONS.UPDATE;
    try {
      this.announceSvc.updateAnnounceById(objData).subscribe(
        data => {
          if (Helpers.checkDataAPIsResult(data))
            Helpers.showMessage(this.toastr, data[PAYLOAD], actionType);
          else
            this.toastr.error(Constants.NOTIFICATIONS.UPDATE_FAIL, actionType);
        }
      )
    }catch(ex) {
      this.toastr.error(Constants.NOTIFICATIONS.UPDATE_FAIL, actionType);
    }
  }

  /**
   * Get detail announcement by id
   * @param annId Id announcement
   */
  private getDetailById(annId: number) {
    try {
      this.announceSvc.getDetailAnnounceById(annId).subscribe(
        data => {
          // console.log('===> ', data[PAYLOAD])
          if (Helpers.checkDataAPIsResult(data) && data[PAYLOAD].announInfo) {
            this.announceDetail = data[PAYLOAD].announInfo;
            this.announceDetail.requestforDriverAgreement = Helpers.convertStringToBool(this.announceDetail.requestforDriverAgreement, '1');
            this.myEditor.editor.setContent(this.announceDetail.contents);
          }
        }
      )
    }catch(ex) {
      this.toastr.error(Constants.NOTIFICATIONS.GET_DETAIL_ERROR);
    }
  }

  /**
   * Get list Announce Type
   * @param annType 
   */
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          if (Helpers.checkDataAPIsResult(data)) {
            this.listAnnounceType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'ANNTYPE';
            });
          }
          
        }
    });
  }

  /**
   * Function get value id announcement query string
   */
  private getValueQueryString() {
    this.route.params.subscribe(async params => {
      try {
        this.annId = params['id'];

        if (this.annId != 0) {
          this.fileUpload.autoSave = true;
          this.titleForm = 'Announcement Detail';
          this.textSubmit = 'Update';

          // Get detail by announce id
          this.getDetailById(this.annId);

          // Get file
          this.fileUpload.refNoValue = this.annId.toString();
          this.fileUpload.loadFiles();
        }else {
          this.textSubmit = 'Save';
          this.fileUpload.autoSave = false;
          this.announceDetail.expireDate = new Date();
        }
      }catch(ex) {
        this.toastr.error(Constants.NOTIFICATIONS.GET_PARAMS_ERROR);
      }
    });
  }

  /**
   * Get data subsidiary
   */
  private getDataSubsidiaries() {
    this.commomSvc.getSubsidiaries().subscribe(
      data => {
        if (Helpers.checkDataAPIsResult(data))
          this.listSubsidiary = data[PAYLOAD];
      })
  }
}
