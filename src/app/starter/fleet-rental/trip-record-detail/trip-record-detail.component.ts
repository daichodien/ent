import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { FileuploadComponent } from '../../../core/directives';
import { Router, ActivatedRoute } from '@angular/router';
import { Globalconst } from '../../../core/helpers';
import { CommonService } from '../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SaveBookTripRecord, BookFleets } from '../../../core/models/BookingDto';
import { BookingService } from '../../../core/services/booking.service';
import { FleetService } from '../../../core/services/master/fleet.service';
@Component({
  selector: 'app-trip-record-detail',
  templateUrl: './trip-record-detail.component.html',
  styleUrls: ['./trip-record-detail.component.css']
})
export class TripRecordDetailComponent extends BaseComponent {

  @ViewChild("assetUploadFile") public fileUpload: FileuploadComponent;
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()
  model: any = {};
  activityTypes: any = [];
  listEmp: any = [];
  editMode = false;
  listLogs: any = [];
  bookFleets: BookFleets = new BookFleets();

  saveBookTripRecordModel: SaveBookTripRecord = new SaveBookTripRecord();
  constructor(public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private commonSvc: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public fileSvc: FileService,
    private sanitizer: DomSanitizer,
    public _bookingService: BookingService,
    public fleetService: FleetService

  ) {
    super(router);
    if (modalService.config["initialState"] != null) {

      // this.model = modalService.config["initialState"].model || {};
      // this.listLogs = modalService.config["initialState"].logs || [];
      // this.editMode = modalService.config["initialState"].editMode;
    }
    if (modalService.config["bookFleets"] != null) {
      this.bookFleets = modalService.config["bookFleets"]
    }
  }

  ngOnInit() {
  }
  Save() {
    this.saveBookTripRecordModel.bRId = this.bookFleets.brId;
    this.saveBookTripRecordModel.createUser = this.currentuser.employeeId;
    this.saveBookTripRecordModel.staffId = this.bookFleets.staffId;
    this._bookingService.saveBookTripRecord(this.saveBookTripRecordModel).subscribe(
      data => {
        if (data["payload"] > 0) {
          this.toastr.success('Save Successfully !', 'Trip Status')
        } else {
          this.toastr.error('Save failed !', 'Trip Status')
        }
        this.reloadGrid.emit(null);
        this.bsModalRef.hide();
      },
      error => {
        this.IsSubmit = false
        this.toastr.error(error.message, 'Trip Status')
      }
    )
  }
  getMile()
  {
    let model = {
      FleetDesc:  this.bookFleets.fleet_Desc
    };
    this.fleetService.getfleetmile(model).subscribe(
      data=>{
        let dataMile = data["payload"];
        if (dataMile.length > 0) {
          this.saveBookTripRecordModel.startMile = dataMile[0].lastestMile;
        }
       
      }
    )
  }
}
