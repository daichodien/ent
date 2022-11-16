import { AfterViewInit, Component, OnInit } from '@angular/core';
import DataGrid from "devextreme/ui/data_grid";
import { CommonService } from './core/services/common.service';
import Calendar from "devextreme/ui/date_box";
import * as moment from 'moment';
import { AuthenticationService } from './core/services';
import { Helpers } from './core/helpers';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CacheService } from './core/services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  snapshot: RouterStateSnapshot;
  constructor(
    public commonSvc: CommonService,
    private auth: AuthenticationService,
    private router: Router,
    private cacheService: CacheService,
  ) {
    // Handle refresh token first time
    this.snapshot = router.routerState.snapshot;
    
    // End handle Refresh token first time

    let that = this;
    let grid: any = DataGrid;
    grid.defaultOptions({
      options: {
        editing: {
          // allowUpdating: true,
          // allowDeleting:true,
          // allowAdding:true,
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        groupPanel: {
          visible: true
        },
        selection: {
          mode: 'single',
        },
        paging: {
          enable: true,
          pageSize: "20"
        },
        pager: {
          allowedPageSizes: [20, 50, 100],
          showInfo: true,
          showPageSizeSelector: true,
        },
        onCellPrepared: function (e) {

          if (e.rowType === "data" && e.column.command === "edit") {
            var isEditing = e.row.isEditing,
              cellElement = e.cellElement;

            if (isEditing) {
              let saveLink = cellElement.querySelector(".dx-link-save"),
                cancelLink = cellElement.querySelector(".dx-link-cancel");

              saveLink.classList.add("dx-icon-save");
              cancelLink.classList.add("dx-icon-revert");

              saveLink.textContent = "";
              cancelLink.textContent = "";
            }
            else {
              let editLink = cellElement.querySelector(".dx-link-edit"),
                deleteLink = cellElement.querySelector(".dx-link-delete");
              if (editLink) {
                editLink.classList.add("dx-icon-edit");
                editLink.textContent = "";
              }
              if (deleteLink) {
                deleteLink.textContent = "";
                deleteLink.classList.add("dx-icon-trash");
              }
            }
          }
          if (e.rowType === "data") {
            if (e.column.dataType == 'datetime') {
              e.cellElement.innerText = e.cellElement.innerText.length == 1 ? "" : that.commonSvc.convertMilisecondToUTCDateTime(e.cellElement.innerText);
            }
            else if (e.column.dataType == 'date2') {
              // e.cellElement.innerText =that.commonSvc.convertMilisecondToUTCDate2(e.value);
              e.cellElement.innerText = e.cellElement.innerText.length == 1 ? "" : that.commonSvc.convertMilisecondToUTCDate2(e.cellElement.innerText);
              // e.cellElement.innerText = (new Date(e.value)).toUTCString();// that.commonSvc.convertMilisecondToUTCDate(e.value);
            }
            else if (e.column.dataType == 'date') {
              // e.cellElement.innerText =that.commonSvc.convertDate(e.value);
              e.cellElement.innerText = e.cellElement.innerText.length == 1 ? "" : that.commonSvc.convertDate(e.cellElement.innerText);
              // e.cellElement.innerText = (new Date(e.value)).toUTCString();// that.commonSvc.convertMilisecondToUTCDate(e.value);
            }
            else if (e.column.dataType == 'localTime') {
              e.cellElement.innerText = e.cellElement.innerText.length == 1 ? "" : that.commonSvc.convertUTCtoLocalTime(e.cellElement.innerText);

            }
          }
        },
        export: {
          customizeExcelCell: function (e) {
            if (e.gridCell.rowType == 'data' && e.gridCell.column.dataType == 'localTime') {
              e.value = moment(e.value).format('DD/MM/YYYY hh:mm A');
            }
          }
        }
      },
    });

    let calendar: any = Calendar;
    calendar.defaultOptions({
      options: {
        invalidDateMessage: 'Date format must be DD/MM/YYYY',
        useMaskBehavior: true,
        showClearButton: true,
        placeholder: "DD/MM/YYYY",
        width: "100%",
        displayFormat: "dd/MM/yyyy",
      }
    })
  }
  async ngOnInit() {
    // if (localStorage.getItem("currentUser") && JSON.parse(localStorage.getItem("currentUser"))["refresh_token"]) {
    //   await this.auth.refeshTokenAsync().toPromise().then(
    //     result => {
    //       if(result && result['_body']){
    //         const newInfo = Helpers.getLocalStorage('currentUser');
    //         const objectReturn = JSON.parse(result['_body']);
    
    //         newInfo['access_token'] = objectReturn['access_token'];
    //         newInfo['refresh_token'] = objectReturn['refresh_token'];
    //         Helpers.setLocalStorage('currentUser', newInfo);
    //       }
    //     },
    //     error => {
    //       return this.redirect2LoginPage();
    //     }
    //   );
    // } else {
    //   return this.redirect2LoginPage();
    // }

    this.getStdCodeInit();
  }

  redirect2LoginPage() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.snapshot.url,logout:true }});
  }

  getStdCodeInit() {
    if (localStorage.getItem("currentUser") && JSON.parse(localStorage.getItem("currentUser"))["access_token"]) {
      // Global caching 
      this.cacheService.getStdCodesCache(["FLTYPE", "FLMAKER", "FLBRAND", "FLEETSTATUS", "FMLICCLASS", "FMSTAFFROLE", "FMSTAFFSTATUS", "FMENGLEVEL", "FLTRANTYPE",
                                          "FLFUELTYPE", "FMCUSTTYPE", "FMBKTYPE", "VOUCHERTYPE","FMBOOKSTATUS", "FLEETUSETYPE", "FWDOCTYPE","FWSVCTYPE", "LANGUAGE",
                                          "FMPAYMENTMETHOD","FORIGNLANGUAGE","MOBILEINT","INSURANCE","BOOKSOURCE", "INSTYPEUSER", "FWINCIDENTTYPE", "TICKETTYPE", 
                                          "TAXCODE", "RSSVCTYPEITEM", "INCIDENTSTATUS", "SUPPLIERTYPE", "CURRENCY", "FLDRVCLASS", "FLDRVTYPE", "FLPURCHTYPE",
                                          "FLOWNERSHIP", "FOREIGNLANGUAGE", "SERVICELEVEL", "ANNTYPE"]);
      this.cacheService.setStatusCaching(true);
    }
    
  }
}
