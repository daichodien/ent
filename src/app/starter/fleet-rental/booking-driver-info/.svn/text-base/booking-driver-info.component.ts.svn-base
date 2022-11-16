import { Component, OnInit } from '@angular/core';
import { Globalconst } from '../../../core/helpers';
import { CommonService } from '../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from '../../../core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from '../../../core/directives/base.component';

@Component({
  selector: 'app-booking-driver-info',
  templateUrl: './booking-driver-info.component.html',
  styleUrls: ['./booking-driver-info.component.css']
})
export class BookingDriverInfoComponent extends BaseComponent {
  model: any = {};
  activityTypes: any = [];
  listEmp: any = [];
  editMode = false;
  listLogs: any = [];
  listLicenseClass:any = [];
  constructor(public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private commonSvc: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public fileSvc: FileService,
    private sanitizer: DomSanitizer
  ) {
    super(router);
    let dataModal :any = modalService.config["initialState"];
    if (modalService.config["initialState"] != null) {
      // this.model = modalService.config["initialState"].model || {};
      // this.listLogs = modalService.config["initialState"].logs || [];
      // this.editMode = modalService.config["initialState"].editMode;
      this.listLicenseClass =   dataModal.listLicenseClass;
    }
  }

  ngOnInit() {
  }

  

}
