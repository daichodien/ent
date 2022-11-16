import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';
import { Booking } from '../models/BookingDto';
import { DeleteBookSvcCharge } from '../models/booking/bookSvcChargeDto';
import { SaveChecklistInspectionRequest } from '../models/inspection/inspectionmodel';
import { SaveBookInvoice } from '../models/booking/saveBookInvoice';
import { Response } from '@angular/http';

@Injectable()
export class BookingService {

    private urlAPI: string;
    private urlAPISupport: string;
    data: any
    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/booking/";
        this.urlAPISupport = http._urlAPIEnterprise + "/support/";
    }
    search(model: any) {
        return this.http.Post(this.urlAPI + 'getbooks', model).map((response: Response) => response);
    }

    getById(id: number) {
        return this.http.Get(this.urlAPI + 'getbook?BookNo=' + id).map((response: Response) => response);
    }

    save(model: Booking) {
        return this.http.Post(this.urlAPI + 'savebook', model).map((response: Response) => response);
    }

    update(model: Booking) {
        return this.http.Post(this.urlAPI + 'updatebook', model).map((response: Response) => response);
    }
    delete(model: any) {
        return this.http.Post(this.urlAPI + 'deletebook', model).map((response: Response) => response);
    }
    saveBookTripRecord(model: any) {
        return this.http.Post(this.urlAPI + 'savebooktriprecord', model).map((response: Response) => response);
    }
    saveBookSvcCharge(model: any) {
        return this.http.Post(this.urlAPI + 'savebooksvccharge', model).map((response: Response) => response);
    }
    saveBookFleetForAssign(model: any) {
        return this.http.Post(this.urlAPI + 'savebookfleetforassign', model).map((response: Response) => response);
    }

    getBookSvcCharges(id: string) {
        return this.http.Get(this.urlAPI + 'getbooksvccharges?BookNo=' + id).map((response: Response) => response);
    }
    getServiceItems() {
        return this.http.Get(this.urlAPI + 'getserviceitems').map((response: Response) => response);
    }
    deleteBookSvcCharge(model: DeleteBookSvcCharge) {
        return this.http.Post(this.urlAPI + 'deletebooksvccharge', model).map((response: Response) => response);
    }
    getQuestionItems(type: any, flId: any) {
        return this.http.Get(this.urlAPISupport + 'getquestionitem?code=' + type + '&id=' + flId).map((res: Response) => res);
    }
    saveCheckListInspection(model: SaveChecklistInspectionRequest) {
        return this.http.Post(this.urlAPISupport + 'savechecklistinspection', model).map((res: Response) => res);
    }
    GetQuestionItemsById(clid: any) {
        return this.http.Get(this.urlAPISupport + 'getquestionitemsbyid?CLId=' + clid).map((res: Response) => res);
    }
    UpdateChecklistInsItem(model: any) {
        return this.http.Post(this.urlAPISupport + 'updatechecklistinsitem', model).map((res: Response) => res);
    }

    getchecklistinspectionresult(model) {
        return this.http.Post(this.urlAPISupport + 'getchecklistinspectionresult', model).map((res: Response) => res);
    }

    closebooking(model: any) {
        return this.http.Post(this.urlAPI + 'closebooking', model).map((res: Response) => res);
    }

    getfleettracking(model: any) {
        return this.http.Post(this.urlAPI + 'getfleettracking', model).map((response: Response) => response);

    }

    updateBookStatus(model: any) {
        return this.http.Post(this.urlAPI + 'updatebookstatus', model).map((response: Response) => response);
    }

    getFleetsForInspection(type: any) {
        return this.http.Get(this.urlAPISupport + 'getfleets/' + type).map((response: Response) => response);
    }

    getFleetAssignByDriverId(model: any) {
        return this.http.Get(this.urlAPI + 'getassignfleetbydriver?Id=' + model.Id).map((res: Response) => res);
    }
}
