import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';
import { CustomerDto, CustomerDeleteModel } from '../../models/master/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  urlAPI: string;
  constructor( private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/customer/";
  }

  getCustomers(model: any){
    return this.http.Post(this.urlAPI + 'getcustomers', model).map((response: Response) => response);
  }

  getCustomer(id: string) {
    return this.http.Get(this.urlAPI + 'getcustomer/?id=' + id).map((response: Response) => response);
  }

  saveCustomer(model: CustomerDto)
  {
    return this.http.Post(this.urlAPI + 'savecustomer', model).map((response: Response) => response);
  }

  updateCustomer(model: CustomerDto) {
    return this.http.Post(this.urlAPI + 'updatecustomer', model).map((response: Response) => response);
  }

  deleteCustomer(model: CustomerDeleteModel) {
    return this.http.Post(this.urlAPI + 'deletecustomer', model).map((response: Response) => response);
  }
  
}
