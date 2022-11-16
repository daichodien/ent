import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/directives/base.component';
import { SupportService } from '../../../../core/services/support.service';
import { PublicService } from '../../../../core/services/public.service';

@Component({
  selector: 'app-check-inspection-detail',
  templateUrl: './check-inspection-detail.component.html',
  styleUrls: ['./check-inspection-detail.component.css']
})
export class CheckInspectionDetailComponent extends BaseComponent {
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()

  dataSource: any = [];
  searchModel: any;
  locTypes: any = [];
  listResults: any = [{
      id: 'EXEL',
      name:"Excellent"
    }, 
    {
      id: 'AVEG',
      name:'Average'
    },
    {
      id: 'NA',
      name:'N/A'
    },
    {
      id: 'FAIL',
      name:'Fail'
    },
    {
      id: 'PAAT',
      name:'Pass with attention'
    }
    ];

    mode: any;
    isAllowedUpdate: any = true;

  constructor(public router: Router,
              public modalService: BsModalService,
              public _publicService: PublicService,
              public _supportService: SupportService,
              public bsModalRef: BsModalRef) {
    super(router);
    this.searchModel = this.modalService.config["initialState"];
    this.mode = this.searchModel.mode;
    this.mode == 'PUBLIC' ? this.isAllowedUpdate = false : this.isAllowedUpdate = true;
  }

  ngOnInit() {
    this.getCheckListInspectionResult();
  }

  getCheckListInspectionResult() {
    debugger
    if (this.mode == 'PUBLIC' ) {
      this._publicService.getCheckListInspectionDetail(this.searchModel.model).subscribe(
        data => {
          this.dataSource = data['payload'];
        }
      );
    } else {
      this._supportService.getCheckListInspectionDetail(this.searchModel.model).subscribe(
        data => {
          this.dataSource = data['payload'];
        }
      );
    }
  }

  editorPreparing(e) {
    // console.log(e);
    
    if (e.parentType === 'dataRow' && (e.dataField !== 'result' && e.dataField !== 'comment')) {
      // console.log('sdsdsdsd');
      // console.log(e.parentType);
      // console.log(e.dataField);
      // console.log(e.editorType);
      
      
      e.editorOptions.readOnly = true;
     // e.editorType = 'dxCheckBox';
    } 
    // else if (e.editorName !== 'dxCheckBox') {
    //   e.editorOptions.disabled = true;
    // }
  }

}
