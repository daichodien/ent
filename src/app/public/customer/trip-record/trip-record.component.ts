import { Component } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { CustomerService } from '../../../core/services/master/customer.service';
import { PublicService } from '../../../core/services/public.service';

@Component({
  selector: 'app-trip-record',
  templateUrl: './trip-record.component.html',
  styleUrls: ['./trip-record.component.css', '../../public.component.css']
})
export class TripRecordComponent extends BaseComponent {
  searchModel: any = {};
  dataSource: any = [];
  idCust: any = 0;
  customerName: any = '';
  listFleets: any = [];
  maxDateT: any = new Date();
  minDateF: any = moment(new Date()).subtract(3, 'months');

  constructor(public router: Router,
    private _publicService: PublicService,
    private routeact: ActivatedRoute) {
    super(router);
    this.searchModel.dateFrom = moment(new Date()).subtract(14, 'days');
    this.searchModel.dateTo = moment(new Date());
    this.searchModel.bookingNo = '';
    this.searchModel.customerNo = '';
    this.searchModel.fleetDesc = '';
    this.searchModel.approvalStatus = "";
    this.searchModel.isUserVerify = "";

    this.idCust = this.routeact.params["_value"].id;
  }

  ngOnInit() {
    this.getTripRecords();

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

  getFleet(id: any) {
    if (id != 0) {
      this._publicService.GetFleetByCustomer(id).subscribe(data => {
        this.listFleets = data['payload'];
      })
    }
  }

  getTripRecords() {
    this.searchModel.dateFrom = moment(this.searchModel.dateFrom).format('MM/DD/YYYY');
    this.searchModel.dateTo = moment(this.searchModel.dateTo).format('MM/DD/YYYY');

    if (this.searchModel.customerNo == null) {
      this.searchModel.customerNo = '';
    }

    if (this.searchModel.fleetDesc == null || this.searchModel.fleetDesc == '') {
      return;
    }

    this._publicService.getAprroveTripRecords(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    )
  }
}
