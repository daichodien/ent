import { Component, ViewChild } from '@angular/core';
import { DriverDto } from '../../../../core/models/driverDto';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../core/services/common.service';
import { DriverService } from '../../../../core/services/master/driver.service';
import { FileuploadComponent } from '../../../../core/directives';
import { REFDOCTYPE, Globalconst } from '../../../../core/helpers';
import { StdCodeDTO } from '../../../../core/models/common/stdcodeDTO';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Documentinfo } from '../../../../core/models/userprofile/documentinfo';
import { environment } from '../../../../../environments/environment';
import { BookingService } from '../../../../core/services/booking.service';
import { TitleHeaderPageService } from '../../../../core/services/title-header-page.service';
import { CacheService } from '../../../../core/services/cache.service';

declare var AdminLTE: any;
@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent extends BaseComponent {
  @ViewChild('uploadfile') public fileUpload: FileuploadComponent;
  @ViewChild('uploadAvatar') public fileAvatar: FileuploadComponent;

  @ViewChild('staticModal') public modalAvatar: ModalDirective;

  public _urlImage = environment.UrlWebsite;


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    private _commonService: CommonService,
    private _driverService: DriverService,
    public globals: Globalconst,
    public _bookingService: BookingService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService,

  ) {
    super(router)
  }
  staffId: any = 0;
  listLicenseClass: StdCodeDTO[];
  listStaffRoles: any = [];
  listStaffStatus: any = [];
  listEnglishLevel: any = [];
  listForeignLanguage:any = [];
  driver = new DriverDto();
  dataSource: any = {};
  titleHeader: string = '';
  todate = new Date();
  documentInfoModel: Documentinfo = new Documentinfo();
  ngOnInit() {
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Driver Detail");
    this.fileUpload.refNoType = REFDOCTYPE.Driver;
    this.fileUpload._userId = this.currentuser.employeeId;
    this.staffId = this.route.params["_value"].id; 
    if (Number.parseInt(this.staffId) != 0) {
      this.getbooking();
    }
    AdminLTE.init();
    this.getCommontData();
    this.route.params.subscribe(async params => {
      try {
        this.staffId = params['id'];
        if (this.staffId != 0) {
          this.fileUpload.autoSave = true;
          this.loadData(this.staffId);
          this.fileUpload.refNoValue = this.staffId;
          this.fileUpload.loadFiles();
        }
        else {
          this.driver.svcPkgDtlId = 1;
          this.fileUpload.autoSave = false;
        }
      } catch (e) {
      }
    });
  }
  loadData(id: number) {
    this._driverService.getById(id).subscribe(
      data => {
        this.driver = data['payload'];
      }
    );
  }
  formatDate(data) {
    return this._commonService.convertMilisecondToUTCDateTime(data);
  }
  Save() {
    if (this.staffId != 0)
      this.update();
    else
      this.insert();
  }
  insert() {
    this.driver.createUser = this.currentuser.employeeId;
    this.driver.userId = this.currentuser.employeeId;

    if (this.driver.staffStatus == "WORK") {
      this.driver.resignDate = null;
    }

    this._driverService.insert(this.driver).subscribe(
      data => {
        this.toastr.success("Insert Driver sucessfull", "Insert")
        this.router.navigate(['admin/master/driver/' + data["payload"]]);
      }
    );
  }
  update() {
    this.driver.userId = this.currentuser.employeeId;
    this._driverService.update(this.driver).subscribe(
      data => {
        this.toastr.success("Update Driver sucessfull", "Update")
      }
    );
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listLicenseClass = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMLICCLASS';
          });
          this.listStaffRoles = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMSTAFFROLE';
          });
          this.listStaffStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMSTAFFSTATUS';
          });
          this.listEnglishLevel = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMENGLEVEL';
          });
          this.listForeignLanguage = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FOREIGNLANGUAGE';
          });
        }
    });
  }
  
  getCommontData() {
    this.getStdCodesCache();
  }
  getbooking(){
    //format day
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    function formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('') 
      );
    }
    var toDate = formatDate(this.todate)

    let modelOption = {
      BookDateF: "20001014",
      BookDateT: toDate,
      BookNo: "",
      BookStatus: "",
      BranchCode: "",
      CustId: "",
      DateF: "2000-10-13T17:00:00.000Z",
      DateT: "2022-10-14T03:11:51.231Z" ,
      FleetModel: "",
      FleetType: "",
      UserId: "1",
      bookType: "",
      cusType: "",
      driverId: "",
      fleetDesc: "",
      fleetUseType: "",
      getByBookDate: 1,
      staffId: this.route.params["_value"].id,
      dateType: "BOOKDATE",
      
    }
    this._bookingService.search(modelOption).map(response => {
      let lastest = [];
       lastest = response['payload'];
       return lastest.splice(lastest.length-11,lastest.length-1);
      }).subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

  viewDetail(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }

  back() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['admin/master/driver'], { queryParams: params })
      params = [];
    });
  }
  updateAvatar() {
    if (this.fileAvatar.files.length > 0) {
      if (!this.fileAvatar.isValidFiles()) {
        this.toastr.error(this.fileAvatar.errors[0]);
        return;
      }
      this.fileAvatar._userId = this.currentuser.employeeId;
      this.fileAvatar.refNoValue = this.currentuser.employeeId;
      this.fileAvatar.refNoType = "PAT";

      this.fileAvatar.SaveAvatarForStaff(this.staffId).subscribe(
        data => {
          this.toastr.success("Update Success");
          this.loadData(this.staffId);
          this.modalAvatar.hide();
          this.documentInfoModel.docNo = this.currentuser.employeeId
          // this.fileSvc.getAvatar(this.documentInfoModel).subscribe(
          //   data=>{
          //     localStorage.setItem('imgAvatar', 'data:' + data["payload"].imageType + ';base64,' + data["payload"].filestream);
          //     this.globals._avatar = localStorage.getItem('imgAvatar');
          //   }
          // );
        },
        error => {
          this.toastr.error(error.message);
        }
      );
    }
  }
  removeAvatar() {
    this.driver.avatarThumbnail = "";
    this.update() ;
  }



}
