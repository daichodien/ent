import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';

@Injectable()
export class SupplierService {

    private urlAPI: string;
    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/supplier/";
    }
    getsuppliers(model:any) {
        return this.http.Get(this.urlAPI + `getsuppliers?SupplierName=${model.supplierName}&SupplierType=${model.supplierType}&CountryId=${model.country}&MobileNo=${model.mobileNo}`).map((response: Response) => response);
    }
    getsupplier(suppId:number) {
        return this.http.Get(this.urlAPI + `getsupplier/${suppId}`).map((response: Response) => response);
    }
    savesuppliers(model:any)
    {
        return this.http.Post(this.urlAPI + 'savesuppliers', model).map((response: Response) => response);
    }
    updatesuppliers(model:any)
    {
        return this.http.Put(this.urlAPI + 'updatesuppliers', model).map((response: Response) => response);
    }

    deletesuppliers(model:any)
    {
        return this.http.Post(this.urlAPI + 'deletesuppliers', model).map((response: Response) => response);
    }

}
