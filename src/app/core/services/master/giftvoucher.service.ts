import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';

@Injectable()
export class GiftVoucherService {


    urlAPI: string;
  
    constructor( private http: ApplicationHttpClient) {
      this.urlAPI = http._urlAPIEnterprise + "/giftvoucher/";
     }
     getGiftVouchers(model: any) {
        return this.http.Post(this.urlAPI + 'getgiftvouchers', model).map((response: Response) => response);
     }
     saveGiftVoucher(model: any) {
      return this.http.Post(this.urlAPI + 'savegiftvoucher', model).map((response: Response) => response);
   }
   updateGiftVoucher(model: any) {
      return this.http.Post(this.urlAPI + 'updategiftvoucher', model).map((response: Response) => response);
   }
   deleteGiftVoucher(model: any) {
      return this.http.Post(this.urlAPI + 'deletegiftvoucher', model).map((response: Response) => response);
   }
   getListVoucherBySerialNo(serialno:string)
   {
      return this.http.Get(this.urlAPI + 'getvoucher/' + serialno).map((response:Response) => response);
   }

}
