import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../../../core/services/master/driver.service';
import { ToastrService } from 'ngx-toastr';
import { confirm } from 'devextreme/ui/dialog';
import { DxDataGridComponent } from 'devextreme-angular';
import { environment } from '../../../../environments/environment';
import { DriverFleetComponent } from './driver-fleet/driver-fleet.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent extends BaseComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  adminLte: JQuery;
  constructor(private commomService: CommonService, public router: Router, private toastr: ToastrService, private cacheService: CacheService,
    private _staffService: DriverService, private routeat: ActivatedRoute, private modalService: BsModalService, private appService: TitleHeaderPageService,

  ) {
    super(router);
  }
  public _urlImage = environment.UrlWebsite;

  searchModel: any = {};
  dataSource: any = [];
  licenseClass: any = [];
  listStaffRoles: any = [];
  listStaffStatus: any = [];
  listEnglishLevel: any = [];
  fileName: any = '';
  titleHeader: string = '';
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Driver");
    this.searchModel.staffName = '';
    this.searchModel.staffRole = '';
    this.searchModel.licenseClass = '';
    this.searchModel.staffStatus = 'WORK';
    this.searchModel.englishLevel = '';
    this.searchModel.mobileNo = '';
    if (Object.keys(this.routeat.snapshot['queryParams']).length > 0) {
      this.routeat.queryParams.subscribe(params => {
        this.searchModel.staffName = params['staffName'];
        this.searchModel.staffRole = params['staffRole'];
        this.searchModel.licenseClass = params['licenseClass'];
        this.searchModel.staffStatus = params['staffStatus'];
        this.searchModel.englishLevel = params['englishLevel'];
        this.searchModel.mobileNo = params['mobileNo'];
      });
    }
    $('body').data('lte.layout');

    this.getStdCodesCache();
    this.search();
  }
  search() {
    this._staffService.search(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    );
  }
  viewDetail(id: any) {
    this.router.navigate(['admin/master/driver/' + id]);
  }

  // Caching API
  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.licenseClass = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMLICCLASS';
          });
          this.listStaffRoles = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMSTAFFROLE';
          });
          this.listStaffStatus = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMSTAFFSTATUS';
          });
          this.listEnglishLevel = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMENGLEVEL';
          });
        }
    });
  }

  delete(id: number) {
    const result = confirm('Are you sure delete this row?', 'Confirm delete');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.searchModel.userId = this.currentuser.employeeId;
        this.searchModel.staffID = id;
        this._staffService.delete(this.searchModel).subscribe(
          data => {
            if (data['success'] === true) {
              data['payload'] > 0 ? this.toastr.success('Delete successfully!', 'Staff') : this.toastr.error('Delete failed!', 'Staff');
              this.search();
            } else {
              this.toastr.error('Delete failed!', 'Staff');
            }
          },
          error => {
            this.toastr.error(error, 'Staff');
          }
        );
      }
    });
  }
  next(id: string) {
    let querypara: any = this.searchModel;
    querypara.pageIndex = this.dataGrid.instance['_options'].paging.pageIndex === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageIndex;
    querypara.pageSize = this.dataGrid.instance['_options'].paging.pageSize === undefined ? 0 : this.dataGrid.instance['_options'].paging.pageSize;
    this.router.navigate(['admin/master/driver/' + id], { queryParams: querypara });
  }
  viewFleet(staffID) {
    const data: any = {
      Id: staffID
    };
    const initialState = {
      model: data
    };
    debugger;
    this.bsModalRef = this.modalService.show(DriverFleetComponent, Object.assign({}, { initialState, class: 'modal-xl', ignoreBackdropClick: true }));
  }
}
