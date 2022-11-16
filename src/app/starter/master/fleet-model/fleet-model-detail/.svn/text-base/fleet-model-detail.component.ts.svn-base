import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../core/services/common.service';
import { StdCodeDTO } from '../../../../core/models/common/stdcodeDTO';
import { FleetService } from '../../../../core/services/master/fleet.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { FleetModelSaveModel } from '../../../../core/models/master/fleetmodel';
import { FileuploadComponent } from '../../../../core/directives';
import { REFDOCTYPE } from '../../../../core/helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { CacheService } from '../../../../core/services/cache.service';
@Component({
  selector: 'app-fleet-model-detail',
  templateUrl: './fleet-model-detail.component.html',
  styleUrls: ['./fleet-model-detail.component.css']
})
export class FleetModelDetailComponent extends BaseComponent {
  @ViewChild('uploadfile') public fileUpload: FileuploadComponent;
  @ViewChild('uploadimage') public uploadimage: FileuploadComponent;

  fleetModel: any = {};
  listStdCode: StdCodeDTO[];
  listMaker: StdCodeDTO[];
  listFleetType: StdCodeDTO[];
  listFuelType: StdCodeDTO[];
  listBrand: StdCodeDTO[];
  listTransmissionType: StdCodeDTO[];
  listDrivingWheelType: StdCodeDTO[];
  listDriverClass: StdCodeDTO[];
  id: any;
  makerOfFleetModelDesc: string = "";
  brandOfFleetModelDesc: string = "";
  fleetTypeOfFleetModelDesc: string = "";
  transmissionTypeOfFleetModelDesc: string = "";
  engineCapacityTypeOfFleetModelDesc: string = "";
  constructor(public router: Router,
    public commonService: CommonService,
    private actRoute: ActivatedRoute,
    private _fleetService: FleetService,
    public toastr: ToastrService,
    private cacheService: CacheService,
  ) {
    super(router);

  }

  ngOnInit() {
    this.id = this.actRoute.params["_value"].id;
    this.fileUpload.refNoType = REFDOCTYPE.FleetModel;
    this.fileUpload._userId = this.currentuser.employeeId;
    this.loadInit();

    this.actRoute.params.subscribe(async params => {
      try {
        this.id = params.id
        if (this.id != "new") {
          this.getFleetModel();
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.id;
          this.fileUpload.loadFiles();
        }
        else {
          //add default value for add new 
          this.fileUpload.autoSave = false;
        }
      } catch (e) {
      }
    });
  }
  loadInit() {
      this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listMaker = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLMAKER';
          });
          this.listFleetType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTYPE';
          });
          this.listFuelType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLFUELTYPE';
          });
          this.listBrand = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLBRAND';
          });
          this.listTransmissionType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLTRANTYPE';
          });
          this.listDriverClass = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLDRVCLASS';
          });
          this.listDrivingWheelType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FLDRVTYPE';
          });
        }
    });
  }

  getFleetModel() {

    if (this.id != "new") {
      this._fleetService.getFleetModel(this.id).subscribe(
        data => {
          data["success"] == true ? this.fleetModel = data["payload"] : this.toastr.error("Error:", 'Fleet');
          if (this.fleetModel.featureImage != null) {
            let modelImage = {
              filePath: this.fleetModel.featureImage
            }
            this.uploadimage.getImage(modelImage);
          }
        },
        error => this.toastr.error(error.message, 'Fleet')
      );
    }
  }
  makeDesc() {
    this.makerOfFleetModelDesc = this.listStdCode.find((m) => m.codeGroup == "FLMAKER" && m.code == this.fleetModel.maker).codeDesc;
    this.brandOfFleetModelDesc = this.listStdCode.find((m) => m.codeGroup == "FLBRAND" && m.code == this.fleetModel.brand).codeDesc;
    this.fleetTypeOfFleetModelDesc = this.listStdCode.find((m) => m.codeGroup == "FLTYPE" && m.code == this.fleetModel.fleetType).codeDesc;
    this.transmissionTypeOfFleetModelDesc = this.listStdCode.find((m) => m.codeGroup == "FLTRANTYPE" && m.code == this.fleetModel.transmissionType).codeDesc;
    this.fleetModel.fleetModelDesc = this.makerOfFleetModelDesc + ' ' + this.brandOfFleetModelDesc + ' ' + this.fleetTypeOfFleetModelDesc + ' ' + this.transmissionTypeOfFleetModelDesc
      + ' ' + this.fleetModel.engineCapacityCC;
  }
  save() {
    // this.IsSubmit = true;
    let model: any = this.fleetModel;
    model.kerbWeightKG = null
    this.fleetModel.showWebPortal = this.fleetModel.showWebPortal == true ? 1 : 0;

    if (this.id == "new") {
      model.createUser = this.currentuser.employeeId
      if (this.uploadimage.angularCropper === undefined) {
        model.featureImage = "";
        this.insert(model);
      }
      else {
        this.uploadimage.SaveImage(this.currentuser.employeeId, 'fleetmodel').subscribe(
          data => {
            model.featureImage = data["payload"].filePath;
            this.insert(model);
          }
        )
      }
    }
    else {
      model.fleetModelId = this.id;
      model.userId = this.currentuser.employeeId;

      if (this.uploadimage.angularCropper === undefined) {
        model.featureImage = "";
        this.update(model);
      }
      else {
        if (this.uploadimage.files.length > 0) {
          this.uploadimage.SaveImage(this.currentuser.employeeId, 'fleetmodel').subscribe(
            data => {
              model.featureImage = data["payload"].filePath;
              this.update(model);
            }
          )
        } else {
          this.update(model);
        }
      }
    }
  }
  
  update(model) {
    this._fleetService.updateFleetModel(model).subscribe(
      data => {
        this.IsSubmit = false;
        if (data["success"] == true && data["payload"] > 0) {
          this.toastr.success('Update Successfully !', 'Fleet Model')
        }
        else {
          this.toastr.error('Update failed !', 'Fleet Model')
        }
      },
      error => {
        this.IsSubmit = false;
        this.toastr.error(error, 'Fleet Model')
      })
  }

  insert(model) {
    this._fleetService.saveFleetModel(model).subscribe(
      data => {

        this.IsSubmit = false;
        if (data["success"] == true && data["payload"] > 0) {
          this.toastr.success('Save Successfully !', 'Fleet Model')
          if (this.fileUpload.files.length > 0) {
            this.fileUpload.refNoValue = data['payload'];
            this.fileUpload.SaveFile();
          }
          this.id = data["payload"];
          this.router.navigate(['admin/master/fleetmodel/' + data["payload"]]);
        }
        else {
          this.toastr.error('Save failed !', 'Fleet Model')
        }
      },
      error => {
        this.IsSubmit = false;
        this.toastr.error(error, 'Fleet Model')
      })
  }
  changeMaker() {
    this.listBrand = this.listStdCode.filter((m) => m.codeVariant == this.fleetModel.maker && m.codeGroup == "FLBRAND");
  }
  back() {
    this.router.navigate(['admin/master/fleetmodel'], { queryParams: this.actRoute.queryParams['_value'] })
  }
  formatDate(data) {
    return this.commonService.convertMilisecondToUTCDateTime(data);
  }
}
