import { Component, OnInit, ViewChild } from '@angular/core';
import { FleetService } from '../../../core/services/master/fleet.service';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { DxSchedulerComponent, DxDraggableModule, DxScrollViewModule } from 'devextreme-angular';
import * as moment from 'moment';
import { CommonService } from '../../../core/services/common.service';
import { StdCodeDTO } from '../../../core/models/common/stdcodeDTO';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SaveBookFleetForAssign } from '../../../core/models/BookingDto';
import { environment } from '../../../../environments/environment';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';
declare var AdminLTE: any;
var that: any;
@Component({
  selector: 'app-daily-booking',
  templateUrl: './daily-booking.component.html',
  styleUrls: ['./daily-booking.component.css']
})
export class DailyBookingComponent extends BaseComponent {
  @ViewChild(DxSchedulerComponent) dataSchedule: DxSchedulerComponent;
  appointmentsData: any = [];
  currentDate: Date = new Date();
  prioritiesData: any = [];
  listFleetType: any = [];
  listFleetModel: any = [];
  listMaker: StdCodeDTO[];
  listBrand: StdCodeDTO[];
  listStdCode: StdCodeDTO[];
  listUseType: StdCodeDTO[];
  modelSearch: any = {};
  tasks: any = [];
  searchFleetModel: any;
  draggingGroupName: string = "appointmentsGroup";
  saveBookFleetForAssignModel: SaveBookFleetForAssign = new SaveBookFleetForAssign();
  titleHeader: string = '';
  constructor(
    public _fleetService: FleetService,
    public router: Router,
    public bookSvc: BookingService,
    public _commonService: CommonService,
    private toastr: ToastrService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService
  ) {
    super(router);
    that = this;
  }
  ngOnInit() {
    this.modelSearch.fleetDesc = "";
    this.modelSearch.maker = "";
    this.modelSearch.fleetType = "";
    this.modelSearch.brand = "";
    this.modelSearch.fleetModel = "";
    this.modelSearch.fleetusetype = "SHORTTERM";
    this.loadInit();
    AdminLTE.init();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Daily Booking");
  }
  loadInit() {
    this.getStdCodesCache();
    this._fleetService.getFleetModelsDailyBooking({ "FleetType": "", "FleetModelDesc": "", "TransmissionType": "", "FuelType": "", "Maker": "", "Brand": "" }).subscribe(
      data => {
        this.listFleetModel = data['payload'];
        this.listFleetModel.forEach(e => {
          e.featureImage = environment.urlFileServer + e.featureImage;
        })
      }
    );
    let model = {
      "FleetType": "",
      "FleetModelDesc": "",
      "TransmissionType": "",
      "FuelType": "",
      "Maker": "",
      "Brand": ""
    }

    //this.search();
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listFleetType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLTYPE";
          });
          this.listMaker = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLMAKER";
          });
          this.listBrand = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLBRAND";
          });
          this.listUseType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == "FLEETUSETYPE";
          });
        }
    });
  }
  onSubmit(form: NgForm) {
    this.search();
  }
  search() {
    this._fleetService.getFleets(this.modelSearch).subscribe(
      data => {
        let fleets: any = data['payload'];
        let temp: any = [];

        fleets.forEach(element => {
          element.text = element.fleetModelDesc;
          element.id = element.fltId;
          element.driverAge = moment().diff(moment(element.dateofBirth).format('YYYY-MM-DD').toString(), 'years', false).toString();
          element.dateOfJoin = moment(element.dateofJoin).format('YYYY');
          element.fleetImage = environment.urlFileServer + element.featureImage;
          element.driverImage = environment.urlFileServer + element.avatarThumbnail;
          temp.push(element);
        });
        this.prioritiesData = temp;
      }
    );
    setTimeout(() => {
      this.seachBoooking()
    }, 500);

  }
  onListDragStart(e) {
    e.cancel = true;
  }
  async seachBoooking() {
    let searchBookModel = {
      "BranchCode": "",
      "UserId": "1",
      "BookNo": "",
      "CustId": "",
      "FleetType": "",
      "BookStatus": "",
      "getByBookDate": 0,
      "fleetDesc": "",
      "bookType": "",
      "driverId": "",
      "fleetUseType": this.modelSearch.fleetusetype,
      "FleetModel": this.modelSearch.fleetModel,
      "BookDateF": moment(this.dataSchedule.instance.getStartViewDate()).format('YYYYMMDD'),
      "BookDateT": moment(this.dataSchedule.instance.getEndViewDate()).format('YYYYMMDD')
    };

    let books: any = await this.bookSvc.search(searchBookModel).toPromise().then(
      data => {
        return data['payload'];
      });
    this.appointmentsData = [];
    this.tasks = [];
    books.forEach(e => {
      e.allDay = true;
      if (e.bookStatus != 'Booked') {
        this.appointmentsData.push(
          {
            bookNo: e.bookNo,
            text: e.customerName,
            priorityId: e.fleetId,
            startDate: moment(e.pickupTime),
            endDate: moment(e.returnTime),
            color: '#ED7D31',
            allDay: true,
            customerName: e.customerName,
            bookStatus: e.bookStatus,
            pickup: moment(e.pickupTime).format('HH:MM'),
            return: moment(e.returnTime).format('HH:MM'),
            pickupDay: moment(e.pickupTime).format('DD/MM/YYYY'),
            returnDay: moment(e.returnTime).format('DD/MM/YYYY'),
          }
        );
      }
      if (e.bookStatus == 'Booked') {
        e.text = e.customerName + ' (' + moment(e.pickupTime).format('DD-MM') + ')';
        e.id = e.bookNo;
        this.tasks.push(e);
      }
    });
    this.dataSchedule.instance.getDataSource().reload();
  }
  onItemDragStart(e) {
    e.itemData = e.fromData;
  }

  onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;
    }
  }
  onAppointmentRemove(e) {
    const index = this.appointmentsData.indexOf(e.itemData);

    if (index >= 0) {
      this.appointmentsData.splice(index, 1);
      this.tasks.push(e.itemData);
    }
  }

  onAppointmentAdd(e) {
    that.asignBooking(e);
  }
  asignBooking(e: any) {
    const index = this.tasks.indexOf(e.fromData);

    if (index >= 0) {
      this.tasks.splice(index, 1);
      this.appointmentsData.push(e.itemData);
    }

    let saveModel: SaveBookFleetForAssign = new SaveBookFleetForAssign();

    saveModel.bookNo = e.itemData.bookNo;
    saveModel.fleetId = e.itemData.priorityId[0];
    saveModel.createUser = this.currentuser.employeeId;
    saveModel.updateUser = this.currentuser.employeeId;
    saveModel.pickUpPlace = 63
    saveModel.returnPlace = 63;
    saveModel.pickUpTime = e.itemData.pickupTime;
    saveModel.returnTime = e.itemData.returnTime;
    saveModel.staffId = this.prioritiesData.find(x => x.id == saveModel.fleetId).staffId || null;
    saveModel.fleetModelId = this.prioritiesData.find(x => x.id == saveModel.fleetId).fleetModelId || null;;
    saveModel.brId = '0';

    this.bookSvc.saveBookFleetForAssign(saveModel).subscribe(
      data => {
        if (data["payload"] > 0) {
          this.toastr.success("Assign Fleet sucessfull", "Assign Fleet")
        }
        else {
          this.toastr.error('Save failed !', 'Assign Fleet')
        }
        this.seachBoooking();
      },
      error => {
        this.seachBoooking();
        this.toastr.error(error.error, 'Assign Fleet')
      }
    );
  }
}
