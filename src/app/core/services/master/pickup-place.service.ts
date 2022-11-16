import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';

@Injectable({
  providedIn: 'root'
})
export class PickupPlaceService {

  urlAPI: string;
  
  constructor( private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/master/";
   }

   getPickupPlaces(model: any) {
      return this.http.Post(this.urlAPI + 'getpickupplaces', model).map((response: Response) => response);
   }

   getPickupPlace(id: any) {
    return this.http.Get(this.urlAPI + 'getpickupplace/?id=' + id).map((response: Response) => response);
   }

   savePickupPlace(model: any) {
    return this.http.Post(this.urlAPI + 'savepickupplace', model).map((response: Response) => response);
   }
   
  updatePickupPlace(model: any) {
    return this.http.Post(this.urlAPI + 'updatepickupplace', model).map((response: Response) => response);
  }

  deletePickupPlace(model: any) {
     return this.http.Post(this.urlAPI + 'deletepickupplace', model).map((response: Response) => response);
   }

   getAreaCodes(model: any) {
     return this.http.Post(this.urlAPI + 'getareas', model).map((response: Response) => response);
   }
}
