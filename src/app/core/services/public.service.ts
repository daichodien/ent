import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
    private urlAPI: string;

    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/public/";
    }

    getAprroveTripRecords(model: any) {
        return this.http.Post(this.urlAPI + 'getaprrovetriprecords', model).map((response: Response) => response);
    }

    getTripVerifies(id: any) {
        return this.http.Get(this.urlAPI + 'gettripverifies?Id=' + id).map((response: Response) => response);
    }

    saveTripVerifies(model: any) {
        return this.http.Post(this.urlAPI + 'saveverifytriprecord', model).map((response: Response) => response);
    }

    getCheckListInspections(model: any) {
        return this.http.Post(this.urlAPI + 'getchecklistinspection', model).map((res:Response)=> res);
    }

    GetFleetByCustomer(id: any) {
        return this.http.Get(this.urlAPI + 'GetFleetByCustomer/?id='+id).map((res:Response)=> res);
    }

    getCheckListInspectionDetail(model: any) {
        return this.http.Post(this.urlAPI + 'getchecklistinspectiondetail', model).map((res:Response)=> res);
    }

    // getListImages(refNoType: string, refNoValue: string) {
    //     return this.http.Post(this.urlAPI + 'getdocuments',{refNoValue:refNoValue,docRefType:refNoType,fileName:''}).map((response: Response) => response);
    // }

    // deleteImage(model:any) 
    // {
    //     return this.http.Post(this.urlAPI + 'deletedocument',model).map((response: Response) => response);
    // }

    getCustomer(id: string) {
        return this.http.Get(this.urlAPI + 'getcustomer/?id=' + id).map((response: Response) => response);
    }
}
