import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PublicService } from '../../../../core/services/public.service';
import { SupportService } from '../../../../core/services/support.service';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-driver-fleet',
  templateUrl: './driver-fleet.component.html',
  styleUrls: ['./driver-fleet.component.css']
})
export class DriverFleetComponent extends BaseComponent {
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter();

  dataSource: any = [];
  searchModel: any;
  locTypes: any = [];

  constructor(public router: Router,
    public modalService: BsModalService,
    public _publicService: PublicService,
    public _supportService: SupportService,
    public _bookingService: BookingService,
    public bsModalRef: BsModalRef) {
    super(router);
    this.searchModel = this.modalService.config['initialState'];
  }

  ngOnInit() {
    this.getCheckListInspectionResult();
  }

  getCheckListInspectionResult() {
    debugger;
      this._bookingService.getFleetAssignByDriverId(this.searchModel.model).subscribe(
        data => {
          this.dataSource = data['payload'];
        }
      );
  }
}
