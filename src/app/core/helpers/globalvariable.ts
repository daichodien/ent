import { Injectable } from '@angular/core';

@Injectable()
export class Globalconst {
  _avatar = 'null';
  _userinfo: any = {};
  _resources: any = {};
  SYSTEM_ID = 'WB_ENT';
  constructor() {
    this.reset();
  }
  reset() {
    this._avatar = localStorage.getItem('imgAvatar');
    this._userinfo = JSON.parse(localStorage.getItem('currentUser'));
    this._resources = JSON.parse(localStorage.getItem('languages'));
  }
}
export enum EnumMPLSystem {
    WB_ENT = 'WB_ENT'
}


export const REFDOCTYPE =
{
  Booking: 'BOOKING',
  Customer: 'CUS',
  Driver: 'DRV',
  Fleet: 'FLT',
  FleetModel: 'FLTD',
  PickupPlace: 'PUP',
  TaxAndInsurance: 'TAIN',
  FleetMaintenance: 'FLTM',
  FleetIncident: 'FLTI',
  Inspection: 'INS',
  Article: 'ART',
  Supplier: 'SUP',
  Announcement: 'ANN'
}

export enum ServiceItem {
  CARRENTALDAILY = 1,
  CARRENTALMONTHLY,
  CARRENTALINTERNAL,
}

