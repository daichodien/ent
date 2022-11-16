import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';
import { SaveBookInvoice } from '../models/booking/saveBookInvoice';

@Injectable()
export class AccountingService {
    urlAPI: string;
    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/accounting/";

    }

    saveBookInvoice(model: SaveBookInvoice) {
        return this.http.Post(this.urlAPI + 'savebookinvoice', model).map((response: Response) => response);
    }

    updateBookInvoice(model: SaveBookInvoice) {
        return this.http.Post(this.urlAPI + 'updatebookinvoice', model).map((response: Response) => response);
    }

    searchBookInvoices(model: any) {
        return this.http.Post(this.urlAPI + 'getbookinvoices', model).map((response: Response) => response);
    }
    getBookInvoice(model:any)
    {
        return this.http.Post(this.urlAPI + 'getbookinvoice', model).map((response: Response) => response);
    }

    payInvoice(model:any)
    {
        return this.http.Post(this.urlAPI + 'payinvoice',model).map((response: Response) => response);
    }
    printInvoice(model:any)
    {
        return this.http.Post(this.urlAPI + 'printinvoice', model).map((response: Response) => response);
    }

    getPeriodForPayment(bookNo)
    {
        return this.http.Get(this.urlAPI + 'getperiodforpayment?bookNo=' + bookNo).map((response: Response) => response);
    }

    sendInvoice(model: any) {
        return this.http.Post(this.urlAPI + 'sendinvoice', model).map((response: Response) => response);
    }


}
