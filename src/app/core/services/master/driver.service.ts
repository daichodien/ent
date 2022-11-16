import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  urlAPI: string;
  constructor(
    private http: ApplicationHttpClient,
) {
    this.urlAPI = http._urlAPIEnterprise + "/staff/";
  }
  insert(model:any)
  {
    return  this.http.Post(this.urlAPI + 'savestaff',model).map((response: Response) => response);
  }
  search(model:any)
  {
    return  this.http.Post(this.urlAPI + 'getstaffs',model).map((response: Response) => response);
  }
  getById(Id:any)
  {
      return  this.http.Get(this.urlAPI + 'getstaff/?id='+Id).map((response: Response) => response);
  }
  delete(model: any) {
    return this.http.Post(this.urlAPI + 'deletestaff', model).map((response: Response) => response);
  }
  update(model:any)
  {
    return  this.http.Post(this.urlAPI + 'updatestaff',model).map((response: Response) => response);
  }
}
