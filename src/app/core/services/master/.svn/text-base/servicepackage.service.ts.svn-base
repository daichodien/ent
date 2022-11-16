import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';
import { WindowRef } from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePackageSaveModel } from '../../models/master/servicepackagemodel';

@Injectable()
export class ServicePackageService {
  urlAPI: string;
  constructor(
    private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/";
  }

  getStaffWithRole(id: String) {
    return this.http.Get(this.urlAPI + 'staff/' + 'getstaffwithrole/' + id).map((response: Response) => response);
  }
  
  getServicePackageList(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'getservicepackagelist', model).map((response: Response) => response);
  }
  deleteServicePackage(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'deleteservicepackage', model).map((response: Response) => response);
  }
  getServicePackageByID(SvcPkgId: number) {
    return this.http.Get(this.urlAPI + 'servicepackage/' + 'getservicepackage?SvcPkgId=' + SvcPkgId).map((response: Response) => response);
  }
  saveServicePackage(model: ServicePackageSaveModel) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'saveservicepackage', model).map((response: Response) => response);
  }
  updateServicePackage(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'updateservicepackage', model).map((response: Response) => response);
  }

  getAllBranchCodes(){
    return this.http.Get(this.urlAPI + 'servicepackage/' + 'getallbranchcodes').map((response: Response) => response);
  }

  getServicePackageDetailList(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'getservicepackagedetail', model).map((response: Response) => response);
  }

  deleteServicePackageDetail(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'deleteservicepackagedetail', model).map((response: Response) => response);
  }

  saveServicePackageDetail(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'saveservicepackagedetail', model).map((response: Response) => response);
  }

  updateServicePackageDetail(model: any) {
    return this.http.Post(this.urlAPI + 'servicepackage/' + 'updateservicepackagedetail', model).map((response: Response) => response);
  }

  getColor() {
    let listColor: any = [
      {
        "ID": 1,
        "Name": "",
        "Value": ""
      },
      {
        "ID": 2,
        "Name": "White",
        "Value": "#FFFFFF"
      }, {
        "ID": 3,
        "Name": "Red",
        "Value": "#FF0000",
      },
      {
        "ID": 4,
        "Name": "Blue",
        "Value": "#003399",
      },
      {
        "ID": 5,
        "Name": "Black",
        "Value": "#000000",
      },
      {
        "ID": 6,
        "Name": "Silver",
        "Value": "#c0c0c0",
      },
      {
        "ID": 7,
        "Name": "Gray",
        "Value": "#D3D3D3",
      },
      {
        "ID": 8,
        "Name": "Yellow",
        "Value": "#FFFF00",
      },
    ];
    return listColor;
  }


}
