import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';
import { WindowRef } from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetSaveModel } from '../../models/master/Fleet';

@Injectable()
export class FleetService {
  urlAPI: string;
  constructor(
    private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/";
  }

  getFleets(model: any) {
    return this.http.Post(this.urlAPI + 'fleet/' + 'getfleets', model).map((response: Response) => response);
  }
  deleteFleets(model: any) {
    return this.http.Post(this.urlAPI + 'fleet/' + 'deletefleet', model).map((response: Response) => response);
  }
  getFleet(id: number) {
    return this.http.Get(this.urlAPI + 'fleet/' + 'getfleet/?id=' + id).map((response: Response) => response);
  }
  getStaffWithRole(id: String) {
    return this.http.Get(this.urlAPI + 'staff/' + 'getstaffwithrole/' + id).map((response: Response) => response);
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
  getFleetModels(model: any) {
    return this.http.Post(this.urlAPI + 'fleetmodel/' + 'getfleetmodels', model).map((response: Response) => response);
  }
  saveFleet(model: FleetSaveModel) {
    return this.http.Post(this.urlAPI + 'fleet/' + 'savefleet', model).map((response: Response) => response);
  }
  updateFleet(model: FleetSaveModel) {
    return this.http.Post(this.urlAPI + 'fleet/' + 'updatefleet', model).map((response: Response) => response);
  }
  deleteFleetModel(model: any) {
    return this.http.Post(this.urlAPI + 'fleetmodel/' + 'deletefleetmodel', model).map((response: Response) => response);
  }
  getFleetModel(id: number) {
    return this.http.Get(this.urlAPI + 'fleetmodel/' + 'getfleetmodel?id=' + id).map((response: Response) => response);
  }
  saveFleetModel(model: any) {
    return this.http.Post(this.urlAPI + 'fleetmodel/' + 'savefleetmodel', model).map((response: Response) => response);
  }
  updateFleetModel(model: any) {
    return this.http.Post(this.urlAPI + 'fleetmodel/' + 'updatefleetmodel', model).map((response: Response) => response);
  }
  getfleetmile(model:any)
  {
        return this.http.Post(this.urlAPI + 'fleet/' + 'getfleetmile', model).map((res:Response)=> res);
  }

  getFleetModelsDailyBooking(model: any) {
    return this.http.Post(this.urlAPI + 'fleetmodel/' + 'getfleetmodelsdetailbooking', model).map((response: Response) => response);
  }

  getFleetsForBooking(model: any) {
    return this.http.Post(this.urlAPI + 'fleet/' + 'getfleetsforbooking', model).map((response: Response) => response);
  }

}
