import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';
import { Response } from '@angular/http';

@Injectable()
export class ReportService {

    private urlAPI: string;

    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/reports/";
    }

    getBookingsReport(model: any) {
        return this.http.Post(this.urlAPI + 'getbooksreport', model).map((response: Response) => response);
    }

}