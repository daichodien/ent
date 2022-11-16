import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FileuploadComponent } from '../../../../core/directives';
import { Router, ActivatedRoute } from '@angular/router';
import { Globalconst } from '../../../../core/helpers';
import { CommonService } from '../../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../../core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../../../core/directives/base.component';
import { SupportService } from '../../../../core/services/support.service';
import { FleetIncidentDto } from '../../../../core/models/tax-and-insurance/FleetIncidentDto';
import {SaveLogIncidentsDto} from '../../../../core/models/SaveLogIncidentsDto';
import { CacheService } from '../../../../core/services/cache.service';

@Component({
  selector: 'app-customer-ticket-logs',
  templateUrl: './customer-ticket-logs.component.html',
  styleUrls: ['./customer-ticket-logs.component.css']
})
export class CustomerTicketLogsComponent extends BaseComponent {
  @ViewChild(FileuploadComponent) public fileUpload: FileuploadComponent;
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter();
  model: any = {};
  activityTypes: any = [];
  listEmp: any = [];
  listLogs: any = [];
  editMode = false;
  saveLogIncidentsDto: SaveLogIncidentsDto = new SaveLogIncidentsDto();
  fleetIncidentDto: FleetIncidentDto = new FleetIncidentDto();
  incidentTypes:any = [];
  comment: any = {};
  listTicketType:any = [];
  constructor(
    public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    public commonSvc: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public fileSvc: FileService,
    private sanitizer: DomSanitizer,
    private _supportService: SupportService,
    private cacheService: CacheService,
  ) { 
    super(router);
    let data :any = modalService.config["initialState"];
    if (modalService.config["initialState"] != null) {
      this.model = data.model || {};
      this.listLogs = data.logs || [];
    }

  }

  ngOnInit() {
    this.comment.comment = '';

    this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.incidentTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FWINCIDENTTYPE';
          });
          this.listTicketType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'TICKETTYPE';
          });
        }
    });
  }
 
  updateStatus(statusType,descriptionStatus) {
    let dataTemp :any= {
      incNo: this.model.afId,
      details: this.currentuser.employeeName + ' updated Status to ' + descriptionStatus ,
      actionType: "INCSTATUS",
      createdOn: new Date(),
      createdBy: this.currentuser.employeeName,
      avartarThumbnail: null
    }
    this.saveLogIncidentsDto.details = this.currentuser.employeeName + ' updated Status to ' + descriptionStatus;
    this.saveLogIncidentsDto.actionType =  "INCSTATUS";
    this.saveLogIncidentsDto.createdBy = this.currentuser.employeeId;
    this.saveLogIncidentsDto.incNo = this.model.afId;
    this.SaveLogsIncident(dataTemp);
    this.UpdateStatusIncident(statusType);
    // INCSTATUS
   
  }
  Save(actionType)
  {
    if (this.saveLogIncidentsDto.details == "") {
      return
    }
    let dataTemp :any = {
      incNo: this.model.afId,
      details: this.saveLogIncidentsDto.details,
      actionType: actionType,
      createdOn: new Date(),
      createdBy: this.currentuser.employeeName,
      avartarThumbnail: null
    }
    this.saveLogIncidentsDto.actionType = actionType;
    this.saveLogIncidentsDto.createdBy = this.currentuser.employeeId;
    this.saveLogIncidentsDto.incNo = this.model.afId;
    
    this.SaveLogsIncident(dataTemp);
    
    
  }
  SaveLogsIncident(model)
  {
    this._supportService.saveIncidentLog(this.saveLogIncidentsDto).subscribe(data =>{
      if (data["payload"] > 0) {
        this.listLogs.push(model);
        this.saveLogIncidentsDto.details = "";
      }}
    );
  }
  UpdateStatusIncident(statusType)
  {
    
    let model :any  = {
      AFId:this.model.afId,
      Status:statusType,
      UpdateUser:this.currentuser.employeeId,
      ResolutionMemo:this.model.resolutionMemo,
      ResolvedDate:null
    }
    
    this._supportService.UpdateStatusIncident(model).subscribe(
      data=>{
        this.model.status =statusType;
        if (statusType == 'DONE') {
          this.model.resolvedDate = new Date();
        }
     
        this.saveLogIncidentsDto.details = "";
        this.reloadGrid.emit(true);
      },
      error=>
      {
        this.toastr.error(error.error,"Error");
      }
    )
  }
  
  

  

}
