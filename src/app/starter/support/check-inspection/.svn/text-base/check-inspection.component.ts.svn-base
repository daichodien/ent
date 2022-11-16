import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import * as moment from 'moment';
import { FleetService } from '../../../core/services/master/fleet.service';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from '../../../core/services/support.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CheckInspectionDetailComponent } from './check-inspection-detail/check-inspection-detail.component';
import { CheckListInspectionImagesComponent } from './check-list-inspection-images/check-list-inspection-images.component';
import { confirm } from 'devextreme/ui/dialog';
import { CommonService } from '../../../core/services/common.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-check-inspection',
  templateUrl: './check-inspection.component.html',
  styleUrls: ['./check-inspection.component.css']
})
export class CheckInspectionComponent extends BaseComponent {
  dataSource: any;
  searchModel: any = {};
  listFleets: any = [];
  checkTypes: any = [];
  bsModalRef: BsModalRef;
  maxDateT: any = new Date();
  titleHeader: string = '';
  minDateF: any = moment(new Date()).subtract(3, 'months');

  constructor(public router: Router
    , public _supportService: SupportService
    , private _fleetService: FleetService
    , public toastr: ToastrService
    , public commonService: CommonService
    , private appService: TitleHeaderPageService
    , private cacheService: CacheService
    , private modalService: BsModalService) {

    super(router)
    this.searchModel.CheckDateF = moment(new Date()).subtract(3, 'days');
    this.searchModel.CheckDateT = moment(new Date());
    this.searchModel.equipmentCode = '';
    this.searchModel.createdUser=0;
    this.searchModel.checkType = '';
  }

  ngOnInit() {
    AdminLTE.init();
    this.getCheckListInspections();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Checklist Inspection");

    let model = {
      "fleetDesc": "",
      "maker": "",
      "fleetType": "",
      "brand": "",
      "fleetModel": ""
    }

    this._fleetService.getFleets(model).subscribe(data => this.listFleets = data["payload"]);
    this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.checkTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'INSTYPEUSER';
          });
        }
    });
  }


  getCheckListInspections() {
    this.searchModel.CheckDateF != null ? this.searchModel.CheckDateF = moment(this.searchModel.CheckDateF).format('MM/DD/YYYY') : this.searchModel.CheckDateF = '';
    this.searchModel.CheckDateT != null ? this.searchModel.CheckDateT = moment(this.searchModel.CheckDateT).format('MM/DD/YYYY') : this.searchModel.CheckDateT = '';

    if (this.searchModel.equipmentCode == null) {
      this.searchModel.equipmentCode = '';
    }
    
    if (this.searchModel.checkType == null) {
      this.searchModel.checkType = '';
    }

    this._supportService.getCheckListInspections(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
        AdminLTE.init();
      }
    )
  }

  onSubmit() {
    this.getCheckListInspections();
  }

  viewDetail(clId) {
    let data: any = {
      clId: clId
    }

    const initialState = {
      model: data,
      mode: 'SECURE'
    };

    this.bsModalRef = this.modalService.show(CheckInspectionDetailComponent, Object.assign({}, { initialState, class: 'modal-xl', ignoreBackdropClick: true }));
  }

  viewGalleries(clId) {
    const initialState1 = {
      clId: clId,
      link: 'admin/support/checklistinspection',
      mode: 'SECURE'
    };

    this.bsModalRef = this.modalService.show(CheckListInspectionImagesComponent, Object.assign({}, { initialState1, class: 'modal-lg', ignoreBackdropClick: true, keyboard: false }));
  }

  deleteCheckList(obj: any) {
    var model: any = {};
    model.CLId = obj.data.clId;
    model.UpdateUser = this.currentuser.employeeId;

    this._supportService.deleteChecklistInsitem(model).subscribe(
      data => {
        if (data["payload"] > 0 ) {
          this.toastr.success("Delete Checklist Inspection Successful!", "Checklist Inspection");
        }
      },
      error => {
        this.toastr.error("Delete Checklist Inspection Failed", "Checklist Inspection");
      }
    );
  }

}

