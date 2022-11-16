import { Component } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FileService } from '../../../../core/services';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router } from '@angular/router';
import { REFDOCTYPE, Globalconst } from '../../../../core/helpers';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-check-list-inspection-images',
  templateUrl: './check-list-inspection-images.component.html',
  styleUrls: ['./check-list-inspection-images.component.css']
})
export class CheckListInspectionImagesComponent extends BaseComponent {
  beReplacedPath: string =  "LE\\ETP\\";
  replacePath: string = "https://fmbp.enterprise.vn/uploads/";

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  clId: any;
  dataSource: any = [];
  link: any = '';
  mode: any;
  userId:any;
  currentUserId: any;
  isAllowedDelete: any = true;
  urlFileServer = environment.urlFileServer;

  constructor(public router:Router, 
              public modalService: BsModalService, 
              public bsModalRef: BsModalRef,
              public globals: Globalconst,
              private toastr: ToastrService,
              public docSvc: FileService) { 
    super(router);
    this.clId = modalService.config["initialState1"].clId;
    this.link = modalService.config["initialState1"].link;
    this.mode = modalService.config["initialState1"].mode;
    this.userId = modalService.config["initialState1"].userid;
    this.mode == 'PUBLIC' ? this.isAllowedDelete = false : this.isAllowedDelete = true;
    this.getGalleries(this.clId);
    this.currentUserId = this.currentuser.employeeId;
  }

  ngOnInit() {
    // this.galleryOptions = [
    //   {
    //       width: '100%',
    //       height: '500px',
    //       thumbnailsColumns: 4,
    //       imageAnimation: NgxGalleryAnimation.Slide

    //   },
    //   // max-width 800
    //   {
    //       breakpoint: 800,
    //       width: '100%',
    //       height: '600px',
    //       imagePercent: 80,
    //       thumbnailsPercent: 20,
    //       thumbnailsMargin: 20,
    //       thumbnailMargin: 20
    //   },
    //   // max-width 400
    //   {
    //       breakpoint: 400,
    //       preview: false
    //   }
    // ];
  }

  formatUrlImageFormServer(beReplacedPath: string, filePathRaw: string, urlFileServer) {
    let indexUrl = filePathRaw.indexOf(beReplacedPath);
    let Url = filePathRaw.substring(indexUrl);
    
    // replacing directory path to get image from server
    var filePathReplaced = Url.replace(beReplacedPath, urlFileServer);
    filePathReplaced = filePathReplaced.replace(/\\/gi, '/');

    return filePathReplaced;
  }

  getGalleries(id:string) {
    var that = this;
    var refNoType = REFDOCTYPE.Inspection;
    var refNoValue = id;

    this.docSvc.getList(refNoType, refNoValue).subscribe(
      data => {
        //return new array with NgxGalleryImage[] format
        var curUser = this.currentUserId;
        this.galleryImages = data['payload'].map(function (value) {
          // replacing directory path to get image from server
          let filePathReplaced = that.formatUrlImageFormServer(that.beReplacedPath, value.filePath, that.urlFileServer);
          filePathReplaced = filePathReplaced.replace(/\\/gi, '/')
          var isAllowDel = value.createUser == curUser;
          return {   
                  docNo: value.docNo,  
                  big: filePathReplaced,
                  small: filePathReplaced,
                  medium: filePathReplaced,
                  isAllowDelete: isAllowDel
                }
        })
      }
    )

  }

  deleteImage(image) {
    var imgModel: any = {};
    let that=this;
    var result = confirm("Are you sure delete this image?", 'Confirm Delete');
    result.done((dialogResult:any)=>{
        if (dialogResult) {
            if(that.globals._userinfo == null || that.globals._userinfo == undefined)
            {
              imgModel.userId =  that.userId;
            }
            else
            {
              
              imgModel.userId = that.globals._userinfo.employeeId;
            }
            imgModel.docNo = image.docNo;
            imgModel.refNoValue = image.docNo;
            imgModel.docRefType = image.docNo;

            this.docSvc.delete(imgModel).subscribe(
                data => {
                    if (data['payload'] > 0) {
                        const index: number = this.galleryImages.indexOf(image);
                        if (index !== -1) {
                            this.galleryImages.splice(index, 1);
                        }
                        this.toastr.success('Delete successful!', 'Delete Image')
                        this.router.navigateByUrl(this.link + '#page');
                    }
                },
                error => {
                  this.toastr.error('Delete failed!', 'Delete Image')
                }
            );
        }
    })
  }

  hideModal() {
    this.router.navigateByUrl(this.link);
    this.bsModalRef.hide();
  }

  rotateImage(imageID, direction){ 
    var deg  = document.getElementById(imageID).getElementsByTagName("img")[0].style.transform;
    var rotate = "rotate("
    if (deg){
    	var curDeg = deg.match(/(\d+)/)[0];
        if (curDeg) {
          var convertDeg = parseInt(curDeg);
          if (deg.indexOf('-') > -1) { // containing negative number
            convertDeg *= -1;
          }
          if (direction == 'left') {
            convertDeg -= 90;            
          }
          else if (direction == 'right'){
            convertDeg += 90;            
          }          
          rotate = rotate + convertDeg + "deg)";
        }
    }
    else {
      if (direction == 'left') rotate = "rotate(-90deg)";
      else if (direction == 'right') rotate = "rotate(90deg)";
    }
  // Code for IE9
  //document.getElementById("myDIV").style.msTransform = rotate; 
  // Standard syntax
  document.getElementById(imageID).getElementsByTagName("img")[0].style.transform = rotate; 
  }
}
