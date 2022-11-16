import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { } from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthenticationService, AlertService, UserService, FileService } from '../core/services';
import { Globalconst, WindowRef, _const } from '../core/helpers';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../core/services/common.service';
import { Observable, race } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Documentinfo } from '../core/models/userprofile/documentinfo';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../core/services/admin-contants/global-constants';
import { ClientService } from '../core/services/client.service';
import { CacheService } from '../core/services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  icheck: JQuery;
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  model: any = {};
  resetModel: any = {};
  modalRef: BsModalRef;
  loading = false;
  returnUrl: string;
  documentInfoModel: Documentinfo = new Documentinfo();
  urlFileServer = environment.urlFileServer;
  fieldTextType: boolean;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private clientService : ClientService
    , private authenticationService: AuthenticationService
    , private alertService: AlertService
    , private userService: UserService
    , private fileSvc: FileService
    , private globals: Globalconst
    , private window: WindowRef
    , private cookieService: CookieService
    , private commonSvc: CommonService
    , private toastr: ToastrService
    , private cacheService: CacheService
    , @Inject(DOCUMENT) private document2: Document) { }

  ngOnInit() {
    // Clear All localStorage
    localStorage.clear();
    // add the the body classes
    this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');
    this.initPage();
    this.raceMultipleServer().subscribe((res: any) => {
      const ipAddressCurrentUser = this.mappingIpAddressMultiServer(res);
      localStorage.setItem(_const.LOCAL_STORAGE.ipAdressUser, ipAddressCurrentUser);
    });
    // this.raceMultipleServer();
  }
  raceMultipleServer() {
    let server_1 = this.clientService.getClientIPAddress();
    let server_2 = this.clientService.getClientIPAddressServerBackup();
    let server_3 = this.clientService.getClientIPAddressServerBackup2();
    let server_4 = this.clientService.getClientIPAddressServerBackup3();

    // server_1.subscribe(res => console.log(`server 1: ${res}`));
    // server_2.subscribe(res => console.log(`server 2: ${res}`));
    // server_3.subscribe(res => console.log(`server 3: ${res}`));
    // server_4.subscribe(res => console.log(`server 4: ${res}`));
    return race(server_1, server_2, server_3, server_4);
  }
  mappingIpAddressMultiServer(res: any) {
    if (res && res.hasOwnProperty('ip')) {
        return res['ip'];
    } else if(res && res.hasOwnProperty('ipAddress')) {
        return res['ipAddress'];
    }
  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('hold-transition');
    this.body.classList.remove('login-page');
  }

  sigIn() {
    this.router.navigate(['/starter']);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {
    this.resetModel.loginName = '';
    this.resetModel.mobile = '';
    this.resetModel.ext = '';
    this.loading = true;

    //current pass
    const password = this.model.password
    let passta = password;

    if (this.model.Remember) {
      var ciphertext = CryptoJS.AES.encrypt(this.model.password, '#base64Key#');
      this.cookieService.set('ent_pwd', ciphertext.toString(), moment().add(30, 'days').toDate());
      this.cookieService.set('ent_userid', this.model.username, moment().add(30, 'days').toDate());
    } else {
      this.cookieService.delete('ent_pwd');
      this.cookieService.delete('ent_userid');
    }

    // var iplocal = ((document.getElementById('iplocal') as HTMLInputElement).value);
    try {
      let ip = "";
      localStorage.getItem(_const.LOCAL_STORAGE.ipAdressUser) ? ip = localStorage.getItem(_const.LOCAL_STORAGE.ipAdressUser) : ip = "unknown";

      this.authenticationService.login(this.model.username, this.model.password, ip).subscribe(
        data => {

          if (data.error) {
            this.toastr.error(data.error, 'Login')
            this.loading = false;
          } else {
            this.cacheService.setStatusCaching(true);
            this.getCommonData(data).subscribe(
              datacommon => {
                let listMenu = datacommon[0];
                let detailUser = datacommon[1];

                if (detailUser) {
                  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                  let imageAvatar = detailUser['payload']['userDetail'].avartarThumbnail;
                  let imageAvatarFormat = `${this.urlFileServer}${imageAvatar}`;

                  currentUser.employeeName = detailUser['payload']['userDetail'].employeeName;
                  localStorage.setItem('currentUser', JSON.stringify(currentUser));
                  localStorage.setItem('imgAvatar', JSON.stringify(imageAvatarFormat));
                  this.globals._avatar = imageAvatarFormat;

                  //login pass
                  localStorage.setItem('loginPasswordFMBP',CryptoJS.AES.encrypt(password, '#base64Key#'));
                }

                localStorage.setItem('currentmenus', JSON.stringify(listMenu['payload']));
                //localStorage.setItem('languages', JSON.stringify(data2['payload']));
                this.documentInfoModel.docNo = data.employeeId;
                
                // this.fileSvc.getAvatar(this.documentInfoModel).subscribe(
                //   data => {
                //     if (data['payload'].filestream) {
                //       localStorage.setItem('imgAvatar', 'data:' + data['payload'].imageType + ';base64,' + data['payload'].filestream);
                //       this.globals._avatar = 'data:' + data['payload'].imageType + ';base64,' + data['payload'].filestream;
                //     }
                //     else {
                //       localStorage.setItem('imgAvatar', '/assets/img/missing_avatar.svg.png');
                //       this.globals._avatar = '/assets/img/missing_avatar.svg.png';
                //     }
                //     this.globals.reset();
                //   }
                // );
                this.commonSvc.getResourceByEmpId(detailUser['payload']['userDetail'].language).subscribe(
                  data => {
                    localStorage.setItem('languages', JSON.stringify(data['payload']));
                    this.router.navigate([this.returnUrl || 'admin/dashboard']);
                    // if (!environment.production)
                    //   this.router.navigate([this.returnUrl || 'admin/dashboard']);
                    // else
                    //   this.document2.location.href = environment.UrlWebsite + '/admin/dashboard';
                  }
                );

                // Caching data
                this.cacheService.getStdCodesCache(["FLTYPE", "FLMAKER", "FLBRAND", "FLEETSTATUS", "FMLICCLASS", "FMSTAFFROLE", "FMSTAFFSTATUS", "FMENGLEVEL", "FLTRANTYPE",
                                                    "FLFUELTYPE", "FMCUSTTYPE", "FMBKTYPE", "VOUCHERTYPE","FMBOOKSTATUS", "FLEETUSETYPE", "FWDOCTYPE","FWSVCTYPE", "LANGUAGE",
                                                    "FMPAYMENTMETHOD","FORIGNLANGUAGE","MOBILEINT","INSURANCE","BOOKSOURCE", "INSTYPEUSER", "FWINCIDENTTYPE", "TICKETTYPE", 
                                                    "TAXCODE", "RSSVCTYPEITEM", "INCIDENTSTATUS", "SUPPLIERTYPE", "CURRENCY", "FLDRVCLASS", "FLDRVTYPE", "FLPURCHTYPE",
                                                    "FLOWNERSHIP", "FOREIGNLANGUAGE", "SERVICELEVEL", "ANNTYPE"]);
              },
              error => {
                this.toastr.error(error['message'], 'Login')
                this.loading = false;
              }
            );
          }
        },
        error => {
          this.alertService.error('Username or password is incorrect.');
          this.loading = false;
          //this.router.navigate([this.returnUrl]);
        }
      );
    } catch (e) {
      this.loading = false;
    }

  }

  getCommonData(data: any) {
    const menus = this.userService.getPageMenu(this.model.username, 'WB_ENT', 'S1', 'WB_ENT');
    const employeeDetail = this.userService.getUserDetail({ EmployeeId: data.employeeId, SystemId: 'WB_ENT' });
    return forkJoin([menus, employeeDetail]);
  }

  initPage() {
    //this.googleCapcha.isvalid = false;

    this.globals._avatar = null;
    this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');
    // this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    const userid = this.cookieService.get('ent_userid');

    if (userid) {
      const pwd = this.cookieService.get('ent_pwd');
      const bytes = CryptoJS.AES.decrypt(pwd, '#base64Key#');
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      this.model.password = plaintext;
      this.model.username = userid;
      this.model.Remember = true;
    } else {
      this.model.password = '';
      this.model.userid = '';
    }

    const window = this.window.nativeWindow;
    const ip = window.location.origin;
    this.model.iPAddress = ip;

    if (this.route.snapshot.queryParams['resetpassword'] != null) {
      const resetId = this.route.snapshot.queryParams['resetpassword'];
      this.commonSvc.confirmResetPassword({ 'code': resetId }).subscribe(
        data => {
          if (data['payload'] == '') {
            this.toastr.success('Your is password was changed, please check email to get password!', 'Reset password')
            this.modalRef.hide();
            this.resetModel = {};
          } else {
            this.toastr.error(data['payload'], 'Reset Password');
          }
        }
      );

      this.router.navigateByUrl(this.router.url, { queryParams: {} });
    }
  }

  openModal() {

  }
}
