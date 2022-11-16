import { Component, OnInit, Compiler, NgModule, TemplateRef } from '@angular/core';
import { BookingService } from '../core/services/booking.service';
import { ItemChecklistInsItemRequest, SaveChecklistInspectionRequest } from '../core/models/inspection/inspectionmodel';
import { GroupByPipe } from '../core/helpers/groupby.pipe';
import { CommonService } from '../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FleetService } from '../core/services/master/fleet.service';
import { WebcamUtil, WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable, fromEvent } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { FileService } from '../core/services';
import { PublicService } from '../core/services/public.service';
import { CheckListInspectionImagesComponent } from '../starter/support/check-inspection/check-list-inspection-images/check-list-inspection-images.component';
import { environment } from '../../environments/environment';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-inspectionlist',
  templateUrl: './inspectionlist.component.html',
  styleUrls: ['./inspectionlist.component.css']
})
export class InspectionlistComponent implements OnInit {
  isCollapsed = false;
  listQuestionItems: any = {}
  uncheckableRadioModel = '';
  ChecklistInspectionRequest: any
  ItemChecklistInsItemRequest: ItemChecklistInsItemRequest[] = [];
  saveChecklistInspectionRequestModel: SaveChecklistInspectionRequest = new SaveChecklistInspectionRequest();
  totalPass: number = 0;
  totalFail: number = 0;
  totalNA: number = 0;
  isDisable: boolean = false;
  currentuser: any;
  driverId: any;
  equimentCode: string;
  bookNo: any;
  listFleet: any;
  isCamera: boolean = false;
  arrImage: string[] = [];
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  userId: string;
  myWindow: any;
  isActive: boolean = true;
  type: string;
  mode: string;
  clId: number;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  sizeCamera: number;
  dataSource: any = [];
  fileToUpload: File = null;
  showFleets:boolean = true;
  constructor(
    private _bookingService: BookingService,
    public commonService: CommonService,
    public toastr: ToastrService,
    public actRoute: ActivatedRoute,
    private _fleetService: FleetService,
    private fileService: FileService,
    private compiler: Compiler,
    private router: Router,
    private modalService: BsModalService,
    private publicService: PublicService
  ) {
    this.currentuser = JSON.parse(localStorage.getItem('currentUser')) || {};
    this.sizeMobileOfWidthScreen();
  }

  ngOnInit() {
    debugger;
    this.actRoute.queryParams.subscribe(params => {
      this.driverId = params.driverid;
      this.equimentCode = params.equimentcode;
      this.bookNo = params.bookno;
      this.userId = params.userid;
      this.type = params.type;
      this.mode = params.mode;
      this.clId = params.clid;

      if(this.bookNo && this.bookNo=='')
      {
          this.showFleets = false;
      }
      if(this.equimentCode && this.equimentCode!='')
      {
        this.showFleets = false;
      }
      if(this.mode==='edit')
      {
        this.showFleets = false;
      }
    })
    this.getListQuestionItems();

    this.getFleets();

    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });



  }

  ngAfterViewInit(): void {
    if (this.mode == "edit") {

    }

  }
  async getListQuestionItems() {

    if (this.mode == "edit") {
      this._bookingService.GetQuestionItemsById(this.clId).subscribe(
        data => {
          this.listQuestionItems = data["payload"];
          this.getChecklistInspectionDetail(this.clId);
        }
      )

      // this.listQuestionItems  = this._bookingService.GetQuestionItemsById(this.clId).toPromise().then((data)=>{
      //   return data;
      //   console.log("Promise resolved with: " + JSON.stringify(data));
      // }).catch((error)=>{
      //   console.log("Promise rejected with " + JSON.stringify(error));
      // });



      // console.log("Data: " + JSON.stringify(this.listQuestionItems)); 


    }
    else {
      // this._bookingService.getQuestionItems(this.type,this.equimentCode)
      // .subscribe(data => {
      //   this.listQuestionItems = data["payload"];
      //   setTimeout(() => {
      //     this.CheckAllByStatus('na');
      //   }, 100);

      // });
    }


  }
  GetQuestion() {
    this._bookingService.getQuestionItems(this.type, this.equimentCode)
      .subscribe(data => {
        this.listQuestionItems = data["payload"];
        if (environment.production == false) {
          setTimeout(() => {
            this.CheckAllByStatus('NA');
          }, 100);
        }
      });
  }

  AddArrayAnswerInspectionItem(event, result: string, qTId: number, comment: string) {
    this.setColorButton(event);
    let item = new ItemChecklistInsItemRequest();
    item.CLId = 0;
    item.QTId = qTId;
    item.Result = result;
    item.Comment = "";//$('#comment'+qTId).val().toString();
    item.InspectionValue = 0;
    item.Score = 0;
    const IsExistsIndex = this.ItemChecklistInsItemRequest.findIndex(m => m.QTId === qTId);
    if (IsExistsIndex == -1) { // not exists
      this.ItemChecklistInsItemRequest.push(item);
    }
    else {
      this.ItemChecklistInsItemRequest[IsExistsIndex].Result = result;
    }
    this.totalPass = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'AVEG' || m.Result === 'PAAT' || m.Result === 'EXEL').length;
    this.totalFail = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'FAIL').length;
    this.totalNA = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'NA').length;
  }

  Save(form: any) {
    if (this.mode == "edit") {
      this.SaveForUpdate();
    }
    else {
      this.SaveForInsert(form);
    }
  }

  SaveForInsert(form: any) {
    let listCommentChecklist: any = form.value;
    //var commentchecklist: string;
    // for (let index = 0; index < this.ItemChecklistInsItemRequest.length; index++) {
    //   commentchecklist = listCommentChecklist["comment" + (index + 1) + ""];// get value of comment id
    //   this.ItemChecklistInsItemRequest[index].Comment = commentchecklist;
    // };
    this.ItemChecklistInsItemRequest.forEach(e => {
      e.Comment = listCommentChecklist["comment" + e.QTId];// get value of comment id
    });
    /// find and check validation
    let isCheckValidation: boolean = this.checkValidation();
    if (isCheckValidation == true) {
      this.isDisable = true;
      this.ItemChecklistInsItemRequest = this.ItemChecklistInsItemRequest.sort(function (obj1, obj2) { return obj1.QTId - obj2.QTId; })
      this.saveChecklistInspectionRequestModel.CheckDate = new Date();
      this.saveChecklistInspectionRequestModel.EquipmentCode = this.equimentCode;
      this.saveChecklistInspectionRequestModel.DriverId = this.driverId;
      this.saveChecklistInspectionRequestModel.ShipmentNo = this.bookNo;
      this.saveChecklistInspectionRequestModel.CreateUser = this.userId;
      this.saveChecklistInspectionRequestModel.TotalScore = this.totalPass;
      this.saveChecklistInspectionRequestModel.TotalAllocatedScore = this.totalPass;
      this.saveChecklistInspectionRequestModel.ScorePercent = 100;
      this.saveChecklistInspectionRequestModel.ShipmentRefType = "";
      this.saveChecklistInspectionRequestModel.FinalResult = "";
      this.saveChecklistInspectionRequestModel.items = this.ItemChecklistInsItemRequest;
      this.saveChecklistInspectionRequestModel.CheckType = this.type;

      if (this.arrImage.length > 0) {
        this._bookingService.saveCheckListInspection(this.saveChecklistInspectionRequestModel).subscribe(
          data => {
            if (data["payload"] > 0) {
              this.SaveImageTakePhoto(data["payload"]);
              this.showResultAfterSaveSuccess();
              this.toastr.success("Save Checklist sucessfull", "Inspection");
            }
            else {
              this.toastr.error("Save Failed", "Inspection");
              this.isDisable = false
            }
          },
          error => {
            this.toastr.error(error.error, "Inspection");
            this.isDisable = false
          }
        );
      } else {
        this.toastr.info("Please take at least 1 photo!", 'Inspection');
      }

    }
  }
  SaveForUpdate() {
    this._bookingService.UpdateChecklistInsItem(this.ItemChecklistInsItemRequest).subscribe(
      data => {
        if (data["payload"] > 0) {
          this.toastr.success("Updated Success !", "Inspection")
        }
      }
    )
  }
  getchecklistinspectionresult() {
    let model: any = {}
    this._bookingService.getchecklistinspectionresult(model).subscribe(
      data => {

      }
    )
  }
  showResultAfterSaveSuccess() {
    $(".animation").show();
    $(".content-checklist").hide();
    $(".animation").animate({ top: '0px' });
  }

  checkValidation(): boolean {

    var qtIdtoCheck: number, checkExistsInItemChecklistInsItemRequest;
    if (this.equimentCode == "" || this.equimentCode == null || this.equimentCode == undefined) {
      this.scrollTOElement('#list-fleet', -100, 2000);
      this.toastr.info("Please select a fleet !", "Inspection")
      return false;
    }

    for (let itemIndex = 0; itemIndex < this.listQuestionItems.length; itemIndex++) {
      qtIdtoCheck = this.listQuestionItems[itemIndex].qtId;
      checkExistsInItemChecklistInsItemRequest = this.ItemChecklistInsItemRequest.findIndex(m => m.QTId === qtIdtoCheck);

      if (checkExistsInItemChecklistInsItemRequest == -1) { // not exists

        let groupquestionItems = this.commonService.groupbyArray(this.listQuestionItems, 'groupDesc')
        for (let indexOfGroupquestion = 0; indexOfGroupquestion < groupquestionItems.length; indexOfGroupquestion++) {
          let arrChild = groupquestionItems[indexOfGroupquestion].value;
          var checkBodyCardNotYetOpen = arrChild.findIndex(m => m.qtId === qtIdtoCheck);
          if (checkBodyCardNotYetOpen != -1) {
            $('#card-body' + indexOfGroupquestion + '').slideDown("slow");
            break;
          }
        }
        this.scrollTOElement('#groupChecklist' + qtIdtoCheck + '', -100, 2000); // scroll to ellement not yet checked
        this.toastr.info("Please do all the above checklist !", "Inspection")
        return false
      }
    }
    return true;
  }
  scrollTOElement = (element, offsetParam?, speedParam?) => {
    const toElement = $(element);
    const focusElement = $(element);
    const offset = offsetParam * 1 || 200;
    const speed = speedParam * 1 || 500;
    $('html, body').animate({
      scrollTop: toElement.offset().top + offset
    }, speed);
    if (focusElement) {
      $(focusElement).focus();
    }
  }

  getFleets() {
    let that = this;
    this._bookingService.getFleetsForInspection(this.type).subscribe(data => {
      if (data["success"]) {
        this.listFleet = data["payload"];
        if (that.equimentCode && that.equimentCode != '') {
          let fleet = this.listFleet.find(x => x.fleet_Desc == that.equimentCode);
          that.equimentCode = fleet.fltId;
          this.GetQuestion();
        }
      }
    });
  }


  collapse(index) {
    this.scrollTOElement('#card-body' + index + '', -100, 500);
    $('#card-body' + index + '').slideToggle("slow");
    let groupquestionItems = this.commonService.groupbyArray(this.listQuestionItems, 'groupDesc')
    for (let indexOfGroupquestion = 0; indexOfGroupquestion < groupquestionItems.length; indexOfGroupquestion++) {
      if (index != indexOfGroupquestion) {
        $('#card-body' + indexOfGroupquestion + '').slideUp("slow");
      }
    }


  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    debugger
    console.info('received webcam image', webcamImage);
    this.arrImage.push(webcamImage.imageAsDataUrl);
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {

    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  openModal(template: TemplateRef<any>) {
    if (this.mode == "edit") {
      this.viewGalleries(this.clId);
    }
    else {
      this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

  }


  openImage(strBase64, index: number) {

    const initialState = {
      strBase64: strBase64,
      index: index
    };
    this.bsModalRef = this.modalService.show(PreviewImageComponent, Object.assign({}, { initialState, class: 'modal-lg', ignoreBackdropClick: true }));
    this.bsModalRef.content.event.subscribe(data => {
      this.arrImage.splice(data, 1);//REMOVE
    });
  }

  SaveImageTakePhoto(id) {

    if (this.arrImage.length > 0) {
      for (let index = 0; index < this.arrImage.length; index++) {
        let formData: FormData = new FormData();
        formData.append('docRefType', "INS");
        formData.append('refNoType', "INS");
        formData.append('refNoValue', id);
        formData.append('createUser', this.userId);
        formData.append('userId', this.userId);
        let strBase64: string = this.arrImage[index];

        formData.append('files', this.fileService.dataURLtoFile(strBase64, this.equimentCode + '.jpg'), this.equimentCode + '' + index + '.jpg');

        this.fileService.saveImage(formData).subscribe(
          data => {
            //this.toastr.success("Save Image Success !", "Inspection")
          },
          error => {
            this.toastr.error("Save Image Error", "Inspection");
            console.log("imagesave", error.error);
          }
        );
      }
    }

  }

  sizeMobileOfWidthScreen() {
    var size = window.innerWidth;
    this.sizeCamera = 400;
    if (size < 668) {
      var sizeOfPercent = 15;
      this.sizeCamera = size - (sizeOfPercent * size / 100);
    }
  }
  reload() {
    this.ItemChecklistInsItemRequest = [];
    this.totalPass = 0;
    this.totalFail = 0;
    this.totalNA = 0;
    $(".btn-custom").removeClass("active");
    $(".animation").animate({ top: '-500px' });
    $(".content-checklist").show();
    $(".animation").slideUp();
    this.arrImage = [];
  }
  changeEquimentCode(e) {
    this.equimentCode = e.value
    this.GetQuestion();
  }


  setColorButton(e) {
    for (let index = 0; index < e.target.parentElement.children.length; index++) {
      e.target.parentElement.children[index].classList.remove('active')

    }
    e.srcElement.classList.add('active');
  }
  showTextInput(id: string) {
    let cId = '#noted-' + id;
    $(cId).slideToggle();
    $(cId).find('textarea')[0].focus();
  }
  CheckAllByStatus(result: string) {
    this.listQuestionItems.forEach(element => {

      let item = new ItemChecklistInsItemRequest();
      item.CLId = 0;
      item.QTId = element.qtId;
      item.Result = result;
      item.Comment = "";
      item.InspectionValue = 0;
      item.Score = 0;
      const IsExistsIndex = this.ItemChecklistInsItemRequest.findIndex(m => m.QTId === element.qtId);
      if (IsExistsIndex == -1) { // not exists
        this.ItemChecklistInsItemRequest.push(item);
      }
      else {
        this.ItemChecklistInsItemRequest[IsExistsIndex].Result = result;
      }
      this.totalPass = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'AVEG' || m.Result === 'PAAT' || m.Result === 'EXEL').length;
      this.totalFail = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'FAIL').length;
      this.totalNA = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'NA').length;
      let param = "#groupChecklist" + element.qtId;
      let queryE: any = $(param).children('.btn-custom');
      queryE.each(element => {
        queryE[element].classList.remove('active')
      });
      $('#naqtId' + element.qtId).addClass('active');
    });
  }

  getChecklistInspectionDetail(id) {
    let model: any = {};
    model.clId = id;

    this.publicService.getCheckListInspectionDetail(model).subscribe(
      data => {
        this.dataSource = data["payload"];
        this.equimentCode = this.dataSource[0].equipmentCode;
        this.dataSource.forEach(element => {
          let item = new ItemChecklistInsItemRequest();
          item.CLId = id;
          item.QTId = element.qtId;
          item.Result = element.result;
          item.Comment = "";
          item.InspectionValue = 0;
          item.Score = 0;
          this.ItemChecklistInsItemRequest.push(item);
          this.totalPass = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'AVEG' || m.Result === 'PAAT' || m.Result === 'EXEL').length;
          this.totalFail = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'FAIL').length;
          this.totalNA = this.ItemChecklistInsItemRequest.filter(m => m.Result === 'NA').length;
          this.activeColorforButtonByResult(element.result, element.qtId);
        });
      }
    )
  }
  activeColorforButtonByResult(result, qtId) {
    var query = "";
    switch (result) {
      case "EXEL":
        query = '#exelqtId' + qtId;
        break;
      case "AVEG":
        query = '#passqtId' + qtId;
        break;
      case "PAAT":
        query = '#paatqtId' + qtId;
        break;
      case "FAIL":
        query = '#failqtId' + qtId;
        break;
      default:
        query = '#naqtId' + qtId;
        break;
    }

    $(query).addClass('active');
  }

  viewGalleries(clId) {
    const initialState1 = {
      clId: clId,
      link: `inspection?mode=edit&clid=${clId}`,
      mode: 'SECURE',
      userid: this.userId
    };

    this.bsModalRef = this.modalService.show(CheckListInspectionImagesComponent, Object.assign({}, { initialState1, class: 'modal-lg', ignoreBackdropClick: true, keyboard: false }));
  }
  handleFileInput(files: FileList) {
    debugger
    this.fileToUpload = files.item(0);
    const fileReader = new FileReader();
    this.imageToBase64(fileReader, this.fileToUpload)
      .subscribe(base64image => {
        this.arrImage.push(base64image);
        // alert(base64image);
        // do something with base64 image..
      });
  }
  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));

  }

}


