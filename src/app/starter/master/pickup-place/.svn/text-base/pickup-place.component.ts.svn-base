import { Component, OnInit, ViewChild } from '@angular/core';
import { PickupPlaceModel } from '../../../core/models/master/PickupPlace';
import { PickupPlaceService } from '../../../core/services/master/pickup-place.service';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, PRIMARY_OUTLET, ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';
import { AreaModel } from '../../../core/models/master/Area';
import { debug } from 'util';
import { CommonService } from '../../../core/services/common.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
declare var AdminLTE: any;
@Component({
  selector: 'app-pickup-place',
  templateUrl: './pickup-place.component.html',
  styleUrls: ['./pickup-place.component.css']
})
export class PickupPlaceComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  searhModel: any = {};
  languages: any = {};
  dataSource: any = [];
  listusers: any = [];
  listAreas: any = [];
  fileName: string;
  titleHeader: string = '';
  modelSearch: PickupPlaceModel = new PickupPlaceModel();
  areasModel: AreaModel = new AreaModel();
  constructor(public router: Router,
    private commonService: CommonService,
    private _pickupPlaceService: PickupPlaceService,
    private routeat :  ActivatedRoute,
    private toastr: ToastrService,
    private appService: TitleHeaderPageService
    ) {
    super(router);
    this.fileName = this.commonService.getFileName('Pickup_Place');
  }

  ngOnInit() {
    AdminLTE.init();
    this.loadInit();
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Pick Up PLace");

    if (Object.keys(this.routeat.snapshot["queryParams"]).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.modelSearch.pickUpPlace = params['pickUpPlace'];
        this.modelSearch.areaCode = params['areaCode'];
      })
    }
    this.search();
  }

  loadInit() {
    this._pickupPlaceService.getAreaCodes(this.areasModel).subscribe(
      data => {
        this.listAreas = data["payload"];
        this.listAreas.unshift({ AreaCode: "", AreaDesc: "", ParentCode: "" });
      });
  }

  getPickupPlaces() {
    if (this.modelSearch.areaCode == null) {
      this.modelSearch.areaCode = "";
    }

    this._pickupPlaceService.getPickupPlaces(this.modelSearch).subscribe(data => {
      if (data["success"] == true) {
        this.dataSource = data["payload"];
      }
    });
  }

  search() {
    this.getPickupPlaces();
  }

  delete(id: number) {
    var result = confirm("Are you sure delete this row?", 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.modelSearch.userId = this.currentuser.employeeId;
        this.modelSearch.puId = id;
        this._pickupPlaceService.deletePickupPlace(this.modelSearch).subscribe(
          data => {
            if (data["success"] == true) {
              data["payload"] > 0 ? this.toastr.success('Delete successfully!', 'Pickup Place') : this.toastr.error('Delete failed!', 'Pickup Place')
              this.getPickupPlaces();
            } else {
              this.toastr.error('Delete failed!', 'Pickup Place')
            }
          },
          error => {
            this.toastr.error(error, 'Pickup Place')
          }
        )
      }
    })
  }
  next(id: string) {
    let querypara: any = this.modelSearch;
    querypara.pageIndex = this.dataGrid.instance["_options"].paging.pageIndex === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance["_options"].paging.pageSize === undefined ? 0 : this.dataGrid.instance["_options"].paging.pageSize;
    this.router.navigate(['admin/master/pickupplace/' + id], { queryParams: querypara })
  }


}
