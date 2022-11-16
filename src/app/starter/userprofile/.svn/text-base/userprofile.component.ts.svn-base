import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileuploadComponent } from '../../core/directives';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../core/directives/base.component';
import { Router } from '@angular/router';
import { UserService, AuthenticationService, FileService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../core/services/common.service';
import { EnumMPLSystem, Globalconst } from '../../core/helpers/globalvariable';
import { Documentinfo } from '../../core/models/userprofile/documentinfo';
import { environment } from '../../../environments/environment';
import { GlobalConstants } from '../../core/services/admin-contants/global-constants';
import { _const } from '../../core/helpers/constants';
import * as CryptoJS from 'crypto-js';
import { CacheService } from '../../core/services/cache.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent extends BaseComponent {


  @ViewChild("video") videoElement: any;
  public video: any;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;

  @ViewChild('staticModal') public modalAvatar: ModalDirective;
  @ViewChild('staticModal2') public modalAvatar2: ModalDirective;
  loading = false;
  model: any = {};
  modelChangePass: any = {};
  avatar: string = '';
  localstream;
  isUseSSL = false;
  dataSource: any = {};
  dataSourceUserLogin: any = {};
  imageUrl: string;
  config: any = {};
  languages:any = [];
  vehicles: any = [];
  documentInfoModel:Documentinfo = new  Documentinfo();
  currentUser: any = {};
  systemID: string;
  urlFileServer = environment.urlFileServer;
  fieldTextType: boolean;
  fieldTextType1: boolean;
  fieldTextType2: boolean;

  constructor(
      router: Router,
      private userSvc: UserService,
      private toastr: ToastrService,
      private commonsv: CommonService,
      private authensv: AuthenticationService,
      private fileSvc: FileService,
      public globals: Globalconst,
      private userService: UserService,
      private cacheService: CacheService,
      // private ssoUserProfile: SSOUserProfileService,
      // private ssoUserProfile: SSOUserProfileService
  ) {
    super(router);
    //them get timeline
    this.captures = [];
    this.languages = this.globals._resources;
    this.currentUser = this.globals._userinfo;
    this.systemID = "ENT"; 
  }

  ngOnInit() {
    this.getLanguages();
    this.getEmployeeById();
    //them
    const employeeId = this.currentUser.employeeId;
    if(employeeId){
      this.getUserlogin(employeeId, this.systemID)
    }
  }

  //them getuserlogin
  getUserlogin(employeeId: number , systemId : string){
    if(!employeeId){
      this.toastr.error('error','Get user login failed !')
      return;
    }
    this.userService.getUserLogin(employeeId, systemId).subscribe(
      data => {
        this.dataSourceUserLogin = data['payload'];
      }
    )

    // this.getDataExtenalAccount(employeeId);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  
  getLanguages()
  {
    this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.languages = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'LANGUAGE';
          });
        }
    });
  }
  
  changePassword(f2){
    const curPass = localStorage.getItem('loginPasswordFMBP');
    var bytes = CryptoJS.AES.decrypt(curPass, '#base64Key#');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if(!this.modelChangePass.currentpassword || this.modelChangePass.currentpassword != plaintext){
      this.toastr.error("Current password wrong!", "Error");
      return;
    }
 
     let model:any = {};
     model.passWord = f2.value.confirmPassword;
     model.UpdateUser = this.currentuser.employeeId;
     model.EmployeeId = this.currentuser.employeeId;
     model.IpAddress = GlobalConstants.ipAddressCurrentUser ?  GlobalConstants.ipAddressCurrentUser: localStorage.getItem(_const.LOCAL_STORAGE.ipAdressUser);
     model.SystemId = EnumMPLSystem.WB_ENT;

     let data = this.modelChangePass.currentpassword;


    this.authensv.changePassword(model).subscribe(
      data=>{
        if (data["payload"] > 0) {
          this.toastr.success("Update password successfully !");
        }
        else {
          this.toastr.error("Update failed !");
        }
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    )
  }
  getEmployeeById() {
    this.userSvc.getById(this.currentuser.employeeId).subscribe(
      data => {
        this.model = data["payload"]["userInfo"];
        this.globals._avatar = `${this.urlFileServer}${data["payload"]["userInfo"]["avartarThumbnail"]}`;
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    )
  }
  UpdateSettings() {
    this.userSvc.updateUserProfile(this.model).subscribe(
      data => {
        if (data["payload"] > 0) {
          this.toastr.success("Update successfully !");
        }
        else {
          this.toastr.error("Update failed !");
        }
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    )
  }
  updateAvatar() {
    if (this.fileUpload.files.length > 0) {
      if (!this.fileUpload.isValidFiles()) {
        this.toastr.error(this.fileUpload.errors[0]);
        return;
      }
      this.fileUpload._userId = this.currentuser.employeeId;
      this.fileUpload.refNoValue = this.currentuser.employeeId;
      this.fileUpload.refNoType = "PAT";

      this.fileUpload.SaveAvatar().subscribe(
        data => {
          this.toastr.success("Update Success");
          this.modalAvatar.hide();
          this.documentInfoModel.docNo = this.currentuser.employeeId
          // this.fileSvc.getAvatar(this.documentInfoModel).subscribe(
          //   data=>{
          //     localStorage.setItem('imgAvatar', 'data:' + this.urlFileServer + data["payload"].imageType + ';base64,' + data["payload"].filestream);
          //     this.globals._avatar = localStorage.getItem('imgAvatar');
          //   }
          // );

          this.userService.getUserDetail({ EmployeeId: this.currentuser.employeeId, SystemId: 'ENT' }).subscribe(data => {
            // console.log(data);
            let avatar = data["payload"]['userDetail']['avartarThumbnail'] ? `${this.urlFileServer}${data["payload"]['userDetail']['avartarThumbnail']}`  : '/assets/img/missing_avatar.svg.png';

            localStorage.setItem('imgAvatar', avatar);
            this.globals._avatar = avatar;
          
          });
        },
        error => {
          this.toastr.error(error.message);
        }
      );
    }
  }

}
