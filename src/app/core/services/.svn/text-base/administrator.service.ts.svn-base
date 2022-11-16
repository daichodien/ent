import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';
import { Response } from '@angular/http';

@Injectable()
export class AdministratorService {

    private urlAPI: string;

    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/standardcode/";
    }

    search(_model:any) {
        return this.http.Post(this.urlAPI+'stdcodeget', _model).map((response: Response) => response);
    }
    
    searchNew(_model:any) {
        return this.http.Post(this.urlAPI+'stdcodes', _model).map((response: Response) => response);
    }

    stdcodeinsert(_model:any) {
        return this.http.Post(this.urlAPI+'stdcodeinsert',_model).map((response: Response) => response);
    }

    stdcodeupdate(_model:any) {
        return this.http.Post(this.urlAPI+'stdcodeupdate',_model).map((response: Response) => response);
    }

    stdcodedelete(_model:any) {
        return this.http.Post(this.urlAPI+'StdCodeDelete',_model).map((response: Response) => response);
    }

    getStandardCode(model: any) {
        return this.http.Post(this.urlAPI + 'getstandardcode', model).map((response: Response) => response);
    }

    StdCode_CodeTypes_Combobox() {
        return this.http.Get(this.urlAPI + 'stdcodegetcombobox').map((response: Response) => response);

    }

}