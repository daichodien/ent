import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PickupPlaceService } from '../../../../core/services/master/pickup-place.service';
import { PickupPlaceModel } from '../../../../core/models/master/PickupPlace';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GooglemapComponent } from '../../../map-popup/map-popup.component';
import { FileuploadComponent } from '../../../../core/directives';
import { AreaModel } from '../../../../core/models/master/Area';
import { REFDOCTYPE } from '../../../../core/helpers';
import { CommonService } from '../../../../core/services/common.service';
declare var AdminLTE: any;

@Component({
  selector: 'app-pickup-place-detail',
  templateUrl: './pickup-place-detail.component.html',
  styleUrls: ['./pickup-place-detail.component.css']
})

export class PickupPlaceDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;
  @Output() callbackOnModelWindowClose: EventEmitter<null> = new EventEmitter();
  id:any;
  searhModel:any={};
  languages:any={};
  dataSource:any=[];
  listusers:any=[];
  listAreas:any=[];
  bsModalRef: BsModalRef;
  pickUpPlaceModel: PickupPlaceModel = new PickupPlaceModel();
  areasModel: AreaModel = new AreaModel();
  isOfficialPickUpPlaceBl:any = false;
  isOfficialReturnPlace:any = false;
  constructor(public router: Router,
              private routeact: ActivatedRoute,
              private toastr: ToastrService,
              public _pickupPlaceService: PickupPlaceService,
              public _commonService:CommonService,
              public modalService: BsModalService,) { 
    super(router);
    this.id = this.routeact.params["_value"].id;
  }
  
  ngOnInit() {
    this.fileUpload.refNoType = REFDOCTYPE.PickupPlace;
    this.fileUpload._userId = this.currentuser.employeeId;
    AdminLTE.init();
    this.loadInit();

    this.routeact.params.subscribe(async params => {
      try {
          this.id = params['id'];
          if (this.id != "0") {
            this.getPickupPlace();
            this.fileUpload.autoSave = true;
            this.fileUpload.refNoValue = this.id;
            this.fileUpload.loadFiles();
          }
          else {
            //add default value for add new 
            this.pickUpPlaceModel.svcPkgDtlId = 1;
            this.fileUpload.autoSave = false;
          }
      } catch (e) {
      }
    });
  }

  loadInit() {
    this._pickupPlaceService.getAreaCodes(this.areasModel).subscribe(
      data => {
        this.listAreas = data["payload"];
      });
  }

  getPickupPlace() {
    if (this.id != "0") {
        this._pickupPlaceService.getPickupPlace(this.id).subscribe(data => {
          debugger
          data["success"] == true ? this.pickUpPlaceModel = data["payload"] : this.toastr.error("Error:", "Pickup Place");
          if(this.pickUpPlaceModel.isOfficialPickUpPlace == "0") {
            this.isOfficialPickUpPlaceBl = false;
          } else {
            this.isOfficialPickUpPlaceBl = true;
          } 
          if(this.pickUpPlaceModel.isOfficialReturnPlace == "0") {
            this.isOfficialReturnPlace = false;
          } else {
            this.isOfficialReturnPlace = true;
          } 

          console.log(this.pickUpPlaceModel);    
      },
      error => this.toastr.error(error, "Pickup Place"))
    }
  }
  formatDate(data)
  {
    return this._commonService.convertMilisecondToUTCDateTime(data);
  }
  save() {
    this.pickUpPlaceModel.createUser = this.currentuser.employeeId;
    this.pickUpPlaceModel.userId = this.currentuser.employeeId;

    if(this.isOfficialPickUpPlaceBl == false) {
      this.pickUpPlaceModel.isOfficialPickUpPlace = "0";
    } else {
      this.pickUpPlaceModel.isOfficialPickUpPlace = "1";
    }
    if (this.isOfficialReturnPlace == false) {
      this.pickUpPlaceModel.isOfficialReturnPlace = "0";
    }
    else{
      this.pickUpPlaceModel.isOfficialReturnPlace = "1";
    }

    if (this.id == "0") {
      this._pickupPlaceService.savePickupPlace(this.pickUpPlaceModel).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Insert Pickup Place successfully!', 'Pickup Place');
            this.id = data["payload"];
            this.router.navigate(['admin/master/pickupplace/' + data["payload"]]);
          } else {
            this.toastr.error('Insert Pickup Place failed!', 'Pickup Place')
          }
        },
        error => {
          this.toastr.error(error, 'Pickup Place')
        })
    } else {
      this._pickupPlaceService.updatePickupPlace(this.pickUpPlaceModel).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success('Update Pickup Place successfully!', 'Pickup Place');
          } else {
            this.toastr.error('Update Pickup Place failed!', 'Pickup Place')
          }
        },
        error => {
          this.toastr.error(error, 'Pickup Place')
        }
      )
    }
  }

  pickFromMap() {
    const initialState = {
      lat : this.pickUpPlaceModel.lat,
      lng : this.pickUpPlaceModel.lon,
    };
    this.bsModalRef = this.modalService.show(GooglemapComponent, Object.assign({}, { initialState,class: 'modal-lg', ignoreBackdropClick: true }));
    this.bsModalRef.content.event.subscribe(data=>{
      this.pickUpPlaceModel.lat = data.lat;
      this.pickUpPlaceModel.lon = data.lng;
    });
  }
  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/master/pickupplace'], { queryParams: params })
      params = [];
    });
  }
}