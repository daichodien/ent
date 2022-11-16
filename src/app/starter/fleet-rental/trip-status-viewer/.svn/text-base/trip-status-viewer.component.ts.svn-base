import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Globalconst } from '../../../core/helpers';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../../core/services/booking.service';
import { error } from 'util';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-trip-status-viewer',
  templateUrl: './trip-status-viewer.component.html',
  styleUrls: ['./trip-status-viewer.component.css']
})
export class TripStatusViewerComponent extends BaseComponent {
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()
  

  constructor(public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public bookingsv: BookingService
  ) {
    super(router);
  }
  model: any = {};
  ngOnInit() {
    this.model = this.modalService.config["initialState"];
    debugger;
  }
  closeBooking() {
    let model = {
      bookNo: this.model.bookNo,
      closeUser: this.currentuser.employeeId,
      closeMemo: this.model.closeMemo
    }
    var result = confirm("Are you sure close booking?", 'Confirm Close Booking');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.bookingsv.closebooking(model).subscribe(
          data => {
            if (data["payload"] > 0) {
              this.toastr.success("Close Booking successfully !", "Close Booking");
              this.bsModalRef.hide();
              this.reloadGrid.emit(null);

            }
            else {
              this.toastr.error("Close Booking failed !", "Close Booking");
            }
          },
          error => {
            this.toastr.error(error.error, "Close Booking");
          }
        )
      }
      
    })

  }

}
