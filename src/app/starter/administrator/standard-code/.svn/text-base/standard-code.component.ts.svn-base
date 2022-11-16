import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/directives/base.component';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { AdministratorService } from '../../../core/services/administrator.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-standard-code',
  templateUrl: './standard-code.component.html',
  styleUrls: ['./standard-code.component.css']
})
export class StandardCodeComponent extends BaseComponent {
  @ViewChild("gridContainer") dataGrid: DxDataGridComponent;
  listcodetype: any = [];
  dataSource: any = {};
  typecode: "";
  title = "";
  searchModel: any = {};
  searchModelNew: any = {};
  id: any;
  isFromMaintenance: boolean = false;
  titleHeader: string = '';
  constructor(
    private commonsvc: CommonService,
    private stdcodesv: AdministratorService,
    private toastr: ToastrService,
    public router: Router,
    private appService: TitleHeaderPageService
  ) {
    super(router);
    this.searchModelNew = { codeDesc: "", codeType: ""};

    if (this.router.url.indexOf('maintenance/standardcode/item') > -1){
      // Load Standard code from Maintainance Page : RSSVCTYPEITEM
      this.searchModelNew.codeType = "RSSVCTYPEITEM";
      this.searchModelNew.codeDesc = "";
      this.isFromMaintenance = true;
    }
    else {
      this.searchModelNew = { codeDesc: "", codeType: ""};
    }
    this.searchNew();
    
    // this.dataSource.store = new CustomStore({
    //   load: (loadOptions) => {
    //     let that = this;
    //     this.id = this.searchModel.codeType;
    //     return that.stdcodesv.search(this.id)
    //       .toPromise()
    //       .then(res => {
    //         return {
    //           data: res["payload"],
    //           totalCount: res["payload"][0] ? res["payload"][0].totalCount : 0
    //         }
    //       }).catch(error => {
    //         throw 'Data Loading Error'
    //       });
    //   },

    // });
    
  }

  ngOnInit() {
    AdminLTE.init();
    this.stdcodesv.StdCode_CodeTypes_Combobox().subscribe(
      data => {
        this.listcodetype = data["payload"];
      }
    );
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("Standard Code");

  }

  search() {
    // if (this.dataGrid.instance) {
    //   this.dataGrid.instance.refresh();
    // }
    this.stdcodesv.search(this.searchModel).subscribe(
      data => {
        this.dataSource = data["payload"];        
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    );
  }

  searchNew() {
    // if (this.dataGrid.instance) {
    //   this.dataGrid.instance.refresh();
    // }
    this.stdcodesv.searchNew(this.searchModelNew).subscribe(
      data => {
        this.dataSource = data["payload"];        
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    );
  }

  insertstdcode(eventName) {
    let model = eventName.data;
    // model.codeType = this.searchModel.codeType;
    this.stdcodesv.stdcodeinsert(model).subscribe(
      data => {
        if (data["payload"] == 1) {
          this.toastr.success("Insert success", "Insert StdCode");
          this.searchNew();
        }
        else if (data["payload"] == -1) {
          this.toastr.error("This value already exists ! Please enter a different value.", "Insert StdCode");
        }
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    );
  }

  onEditorPreparing(e) {
    if (e.parentType === "dataRow") {
      if (e.dataField === "codeID" || e.dataField === "codeType"){
        if (e.row.isNewRow == true) {
          e.editorOptions.disabled = false;
  
        }
        else {
          e.editorOptions.disabled = true;
        }
      }
      // else if (e.dataField === 'isUse')
      // {
      //   if (e.row.isNewRow == true) {
      //     e.editorOptions.value = true;  
      //     e.editorOptions.disabled = true;
      //   }        
      // } 
    }
  }
  
  updatestdcode(eventName) {
    const updatedObject = Object.assign({}, eventName.oldData, eventName.newData);
    // updatedObject.codeType = this.searchModelNew["codeType"];
    // if (updatedObject.isUse == false) updatedObject.isUse = 0;
    // else updatedObject.isUse = 1;
    this.stdcodesv.stdcodeupdate(updatedObject).subscribe(

      data => {
        if (data["payload"] == 1) 
        {
          this.toastr.success("Update success", "Update StdCode");
          this.searchNew();
        }
        else if (data["payload"] == -1) {
          this.toastr.error("Update failed !", "Update StdCode");
        }
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    );
  }

  removestdcode(eventName) {
    let deleteObj = eventName.data;
    // deleteObj.codeType = eventName.data.codeGroup;
    // if (deleteObj.isUse == false) deleteObj.isUse = 0;
    // else deleteObj.isUse = 1;
    this.stdcodesv.stdcodedelete(deleteObj).subscribe(
      data => {
        if (data["payload"] == 1) 
        {
          this.toastr.success("Delete success", "Delete StdCode");
          this.searchNew();
        }
        else if (data["payload"] == -1) {
          this.toastr.error("Delete failed !", "Delete StdCode");
        }
      },
      error => {
        this.toastr.error(error["message"] ? error["message"] : error);
      }
    );
  }

  

}
