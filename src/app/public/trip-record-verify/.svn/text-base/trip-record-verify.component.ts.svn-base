import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import * as moment from 'moment';
import { TripRecordVerifyDto } from '../../core/models/TripRecordVerifyDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PublicService } from '../../core/services/public.service';

declare var $: any;

@Component({
  selector: 'app-trip-record-verify',
  templateUrl: './trip-record-verify.component.html',
  styleUrls: ['./trip-record-verify.component.css']
})
export class TripRecordVerifyComponent {
  tripRecordVerifies: any = [];
  saveTripRecordVerifyDto: TripRecordVerifyDto = new TripRecordVerifyDto();
  id: any = 0;
  name: any = '';
  trIds: any = [];
  modalRef: BsModalRef;
  @ViewChild('templateRemark') templateRemark: TemplateRef<any>;
  @ViewChild('templateSecurCode') templateSecurCode: TemplateRef<any>;

  constructor(public router: Router,
    private routeact: ActivatedRoute,
    private _publicService: PublicService,
    public toastr: ToastrService,
    private modalService: BsModalService,
    public _commonSvc: CommonService) {
  }

  ngOnInit() {
    this.routeact.queryParams.subscribe(param => {
      if (param['id']) {
        this.id = param['id'];
      }

      if (param['name']) {
        this.name = param['name'];
      }

      this.getTripVerifies();
    })
  }

  getTripVerifies() {
    this._publicService.getTripVerifies(this.id).subscribe(
      data => {
        this.tripRecordVerifies = data['payload'];
      }
    )
  }

  formatTime(timeMilis) {
    return moment(timeMilis).format("DD/MM HH:mm")
    //return moment(timeMilis).format("DD/MM/YYYY hh:mm A")
  }

  verify() {
    let checkedLen = $('input.approved-item:checked').length;

    if (checkedLen != this.tripRecordVerifies.length && this.saveTripRecordVerifyDto.remark == '') {
      this.toastr.warning('Please leave the remark!', 'Remark Is Required')
    } else if (this.saveTripRecordVerifyDto.securityCode == '') {
      this.toastr.warning('Please provide Security Code!', 'Security Code Is Required')
    } else {
      this.saveTripRecordVerifyDto.trIds = this.trIds.toString();
      this.saveTripRecordVerifyDto.trVId = this.id;

      this._publicService.saveTripVerifies(this.saveTripRecordVerifyDto).subscribe(
        data => {
          if (data['payload'] > 0) {
            this.toastr.success('Update Trip Record Verify successfully!', 'Trip Record Verify');
            $('.approved-item').prop('checked', false);
            $('#check-all').prop('checked', false);
            this.saveTripRecordVerifyDto = new TripRecordVerifyDto();
            this.getTripVerifies();
          } else {
            this.toastr.error('Update Trip Record Verify failed! Please check your Security Code', 'Trip Record Verify');
          }
        }, error => {
          this.toastr.error(error, 'Trip Record Verify')
        }
      )
    }

  }

  checkAll(event) {
    this.trIds = [];
    if (event.target.checked) {
      $('.approved-item').prop('checked', true);

      this.tripRecordVerifies.forEach(element => {
        this.trIds.push(element.trId);
      });
    }
    else {
      $('.approved-item').prop('checked', false);
    }
  }

  checkValue(event, value) {
    let checkedLen = $('input.approved-item:checked').length;

    if (checkedLen != this.tripRecordVerifies.length) {
      $('#check-all').prop('checked', false);
    }

    if (event.target.checked) {
      this.trIds.push(value);
    } else {
      let index = this.trIds.indexOf(value);
      if (index > -1) {
        this.trIds.splice(index, 1);
      }
    }

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}