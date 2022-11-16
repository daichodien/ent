import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { CheckInspectionDetailComponent } from '../../../starter/support/check-inspection/check-inspection-detail/check-inspection-detail.component';
import { CheckListInspectionImagesComponent } from '../../../starter/support/check-inspection/check-list-inspection-images/check-list-inspection-images.component';
import { PublicService } from '../../../core/services/public.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css', '../../public.component.css']
})
export class CheckListComponent {
  dataSource: any;
  searchModel: any = {};
  listFleets: any = [];
  bsModalRef: BsModalRef;
  idCust: any = 0;
  customerName: any = '';
  maxDateT: any = new Date();
  minDateF: any = moment(new Date()).subtract(3, 'months');

  constructor(public _publicService: PublicService
            , public toastr: ToastrService
            , private routeact: ActivatedRoute
            , private modalService: BsModalService) {

    this.searchModel.CheckDateF = moment(new Date()).subtract(14, 'days');
    this.searchModel.CheckDateT = moment(new Date());
    this.searchModel.equipmentCode = '';
    this.idCust = this.routeact.params["_value"].id;
  }

  ngOnInit() {
    AdminLTE.init();
    this.getCheckListInspections();

    this.routeact.queryParams.subscribe(param => {
      if (param['id']) {
        this.idCust = param['id'];
      }
      this.getCustomer(this.idCust);
      this.getFleet(this.idCust)
    });
  }

  getCustomer(id: any) {
    if (id != 0) {
      this._publicService.getCustomer(id).subscribe(data => {
        this.customerName = data['payload'].customerName;
      })
    }
  }
  
  getFleet(id:any) {
    if (id != 0) {
      this._publicService.GetFleetByCustomer(id).subscribe(data => {
        this.listFleets = data['payload'];
      })
    }
  }

  getCheckListInspections() {
    this.searchModel.CheckDateF != null ? this.searchModel.CheckDateF = moment(this.searchModel.CheckDateF).format('MM/DD/YYYY') : this.searchModel.CheckDateF = '';
    this.searchModel.CheckDateT != null ? this.searchModel.CheckDateT = moment(this.searchModel.CheckDateT).format('MM/DD/YYYY') : this.searchModel.CheckDateT = '';

    if (this.searchModel.equipmentCode == null || this.searchModel.equipmentCode == '') {
      return;
    }

    this._publicService.getCheckListInspections(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
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
      mode: 'PUBLIC'
    };

    this.bsModalRef = this.modalService.show(CheckInspectionDetailComponent, Object.assign({}, { initialState, class: 'modal-xl', ignoreBackdropClick: true }));
  }

  viewGalleries(clId) {
    const initialState1 = {
      clId: clId,
      link: 'public/checklist?id=' + this.idCust,
      mode: 'PUBLIC'
    };

    this.bsModalRef = this.modalService.show(CheckListInspectionImagesComponent, Object.assign({}, { initialState1, class: 'modal-lg', ignoreBackdropClick: true, keyboard: false }));
  }

}

