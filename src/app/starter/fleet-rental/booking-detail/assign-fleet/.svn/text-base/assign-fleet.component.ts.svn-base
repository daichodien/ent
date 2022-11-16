import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Globalconst } from '../../../../core/helpers';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../core/directives/base.component';
import { SaveBookFleetForAssign } from '../../../../core/models/BookingDto';
import { BookingService } from '../../../../core/services/booking.service';
import { FleetsDTO, FleetModel, FleetModelForBooking } from '../../../../core/models/master/Fleet';
import { FleetService } from '../../../../core/services/master/fleet.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-assign-fleet',
  templateUrl: './assign-fleet.component.html',
  styleUrls: ['./assign-fleet.component.css']
})
export class AssignFleetComponent extends BaseComponent {
  
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()

  dataSource: any = []
  dataSourceFleet: FleetsDTO;

  allMode: string;
  listFleetModel: any;
  listDriver: any;
  isAllocateOtherDriver: boolean = false;
  pickUpDate: any;
  returndate: any;
  saveBookFleetForAssignModel: SaveBookFleetForAssign = new SaveBookFleetForAssign();
  modelSearch = new FleetModelForBooking();
  checkBoxesMode: string;
  fleetDescDropValue: any
  treeDataSource: any;
  treeBoxValue: string;
  gridDataSource: any;
  _gridBoxValue: any;
  _gridSelectedRowKeys: number[] = [3];
  allocateOtherDriver:number;
  fleetDesc:string;
  driverAssigned: any = null;
  fleetDescAssigned: any = null;
  fleetDescAssignedId: any = null;
  driverAssignedId: any = null;
  isRequiredDriver: any = true;
  isNoBookingAvailable: number = 0;

  constructor(public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    public bookingService: BookingService,
    private _fleetService: FleetService,

  ) {
    super(router);
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
    if (modalService.config["initialState"] != null) {
      let datafromDetail = modalService.config["initialState"];
      this.listFleetModel = datafromDetail["listFleetModel"];
      this.saveBookFleetForAssignModel.pickUpTime = datafromDetail["pickupdate"];
      this.saveBookFleetForAssignModel.returnTime = datafromDetail["returndate"];
      this.saveBookFleetForAssignModel.pickUpPlace = datafromDetail["pickUpPlace"];
      this.saveBookFleetForAssignModel.returnPlace = datafromDetail["returnPlace"];
      this.saveBookFleetForAssignModel.bookNo = datafromDetail["bookNo"];
      this.saveBookFleetForAssignModel.brId = datafromDetail["brId"];
      this.saveBookFleetForAssignModel.fleetId = datafromDetail["fltId"];
      this.saveBookFleetForAssignModel.fleetDesc = datafromDetail["fleet_Desc"];
      this.saveBookFleetForAssignModel.staffName = datafromDetail["staffName"];
      this.saveBookFleetForAssignModel.staffId = datafromDetail["staffId"];
      this.fleetDescAssigned = datafromDetail["fleet_Desc"];
      this.driverAssigned = datafromDetail["staffName"];
      this.driverAssignedId = datafromDetail["staffId"];
      this.fleetDescAssignedId = datafromDetail["fltId"];
      this.modelSearch.fleetModelId = datafromDetail["fleetModel"];
      this.listDriver = datafromDetail["listDriver"];
      this.isRequiredDriver = datafromDetail["isRequiredDriver"];

      this.getFleets()
    }

  }

  model: any = {};

  ngOnInit() {
    this.model = this.modalService.config["initialState"];
  }

  getFleets() {
    //this.saveBookFleetForAssignModel.fleetId = null
    this.modelSearch.pickUpTime = this.saveBookFleetForAssignModel.pickUpTime;
    this.modelSearch.returnTime = this.saveBookFleetForAssignModel.returnTime;
    this.modelSearch.fleetModelId = this.modelSearch.fleetModelId == null ? 0 : this.modelSearch.fleetModelId;
    this.modelSearch.noBooking = this.isNoBookingAvailable;
    this.modelSearch.convert();
    this._fleetService.getFleetsForBooking(this.modelSearch).subscribe(data => {
      if (data["success"] == true) {
        this.dataSourceFleet = data["payload"];
        let dataGrid = this.dataGrid.instance;
        dataGrid.clearSelection();
        dataGrid.option("focusedRowIndex", -1);
      }
    });
    
  }

  searchInfoDriverById(id: number) {
    let result = [];
    if (this.listDriver) {
      result = this.listDriver.filter((obj) => {
        return obj.staffID == id;
      });
    }
    return result;
    
  }

  Save() {
    // 'Allocate Other Driver' is not pressed and there is no fleet is assigned
    if (!this.isAllocateOtherDriver 
        && ((this.saveBookFleetForAssignModel.fleetId == null
            && this.saveBookFleetForAssignModel.staffId == null)
        || (this.saveBookFleetForAssignModel.fleetId == undefined
            && this.saveBookFleetForAssignModel.staffId == undefined ))) {
        this.toastr.error('You must assign to a driver!', 'Assign Fleet');
      return;
    }

    // 'Allocate Other Driver' is pressed
    if (this.isAllocateOtherDriver) {
      // One Driver is chosen
      if (this.allocateOtherDriver !== undefined && this.allocateOtherDriver != null) {
        // Set value to this.saveBookFleetForAssignModel.staffId
        let infoDriver = this.searchInfoDriverById(this.allocateOtherDriver);

        this.saveBookFleetForAssignModel.staffId = this.allocateOtherDriver
        this.saveBookFleetForAssignModel.staffName = (infoDriver && infoDriver.length > 0 ? infoDriver[0]["staffName"] : "");

        // If the new fleet is the same as the old fleet
        if (this.saveBookFleetForAssignModel.fleetId == this.fleetDescAssignedId
          && this.saveBookFleetForAssignModel.staffId == this.driverAssignedId) {
            this.toastr.info('Please assign another fleet!', 'Assign Fleet');
            return;
          }
      } else { // There is no Driver is chosen
        this.toastr.error('You must assign to a driver!', 'Assign Fleet');
        return;
      }
    // 'Allocate Other Driver' is not pressed
    } else if (this.saveBookFleetForAssignModel.fleetId == this.fleetDescAssignedId // If the new fleet is the same as the old fleet
               && this.saveBookFleetForAssignModel.staffId == this.driverAssignedId
               && (this.saveBookFleetForAssignModel.fleetId != null || this.saveBookFleetForAssignModel.staffId != null)) {
      this.toastr.info('Please assign another fleet!', 'Assign Fleet');
      return;
    }

    // The old fleet has Driver and its FleetDesc diff with the new fleet's fleetDesc, and the new Fleet has no Driver
    if (this.fleetDescAssignedId != null 
        && this.saveBookFleetForAssignModel.fleetId == null 
        && this.saveBookFleetForAssignModel.staffId != null ) {
        // Assign with new fleetDesc
        this.saveBookFleetForAssignModel.fleetId = this.fleetDescAssignedId
    }

    if (this.driverAssignedId != null 
        && this.saveBookFleetForAssignModel.staffId == null 
        && this.saveBookFleetForAssignModel.fleetId != null ) {
        // Assign with new Driver
        this.saveBookFleetForAssignModel.staffId = this.driverAssignedId
    }

    this.saveBookFleetForAssignModel.createUser = this.currentuser.employeeId;
    this.saveBookFleetForAssignModel.fleetModelId = this.modelSearch.fleetModelId;
    this.saveBookFleetForAssignModel.updateUser = this.currentuser.employeeId;
    
    if (!this.isRequiredDriver) {
      this.saveBookFleetForAssignModel.staffId = null;
    }

    if (this.saveBookFleetForAssignModel.fleetId) {
      this.bookingService.saveBookFleetForAssign(this.saveBookFleetForAssignModel).subscribe(
        data => {
          if (data["payload"] > 0) {
            this.toastr.success("Assign Fleet sucessfull", "Assign Fleet")
          }
          else {
            this.toastr.error('Save failed !', 'Assign Fleet')
          }
          this.reloadGrid.emit(null);
          this.bsModalRef.hide();
        },
        error => {
          this.toastr.error(error.error, 'Assign Fleet')
        }
      );
    } else {
      this.toastr.error('FleetID is currently unavailable!', 'Assign Fleet');
    }
    
  }

  getSelectedItemsKeys(items) {
    var result = [],
      that = this;

    items.forEach(function (item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }
  treeView_itemSelectionChanged(e) {
    const nodes = e.component.getNodes();
    this.treeBoxValue = this.getSelectedItemsKeys(nodes).join("");
  }



  get gridSelectedRowKeys(): number[] {
    return this._gridSelectedRowKeys;
  }

  set gridSelectedRowKeys(value) {
    this.fleetDescDropValue = value.length && value[0]["fleet_Desc"] || null;
    this.saveBookFleetForAssignModel.fleetId = value.length && value[0]["fltId"] || null;
    this._gridSelectedRowKeys = value;
  }

  gridBox_displayExpr(item) {
    return item && item.fleet_Desc
  }

  SelectionChanged(e) {
    // If fleet has been assigned and the new fleet has fleetDesc or Driver same with the old one, and the rest one is null => return
    if (this.driverAssignedId != null && this.fleetDescAssignedId != null 
        && (
            (this.driverAssignedId == e.selectedRowsData[0].staffID && e.selectedRowsData[0].fltId == null)
            || (this.fleetDescAssignedId == e.selectedRowsData[0].fltId && e.selectedRowsData[0].staffID == null)
          )
      ) {
        return;
    }

    this.saveBookFleetForAssignModel.fleetId =  e.selectedRowsData[0].fltId;
    this.saveBookFleetForAssignModel.staffId =  e.selectedRowsData[0].staffID;
    this.saveBookFleetForAssignModel.staffName = e.selectedRowsData[0].fleet_Desc
    this.fleetDesc = e.selectedRowsData[0].fleet_Desc
     
  }

  handleNoBookingAvailable(e) {
    let isCheck = e['value'];
    this.isNoBookingAvailable = (isCheck === true ? 1 : 0);

    this.getFleets();
  }

}
