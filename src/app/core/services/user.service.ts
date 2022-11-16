import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { User } from '../models/index';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs"
import { ApplicationHttpClient } from './_base/http-client';
@Injectable()

export class UserService {
    urlAPI: string;
    urlAPI2: string;
    allowedListpage: string[];

    constructor(private httpClient: ApplicationHttpClient) {
        this.urlAPI = `${httpClient._urlAPIEnterpriseCommon}/employeeservice`;
        this.urlAPI2 = httpClient._urlAPI;
        this.allowedListpage = [];
    }

    getAll() {
        return this.httpClient
        .Get('/api/users')
        .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.httpClient
        .Get(environment.urlServiceSSO + 'api/authentication' + '/userprofile/' + id)
        .map((response: Response) => response);
    }

    updateUserProfile(model: FormData) {
        return this.httpClient
        .Post(environment.urlServiceSSO + 'api/userprofile' + '/updateuserprofile', model)
        .map((response: Response) => response);
    }

    getEmployeeById(id: number) {
        return this.httpClient
        .Get(this.urlAPI + '/employee/detail/' + id)
        .map((response: Response) => response);
    }

    getEmployeeById2(id: number) {
        return this.httpClient
        .Get(this.urlAPI + '/employee/' + id)
        .map((response: Response) => response);
    }

    create(user: User) {
        return this.httpClient
        .Post('/api/users', user)
        .map((response: Response) => response.json());
    }

    search(user: any) {
        return this.httpClient
        .Post(this.urlAPI + '/employee/search', user)
        .map((response: Response) => response);
    }

    searchByDevision(model: any) {
        return this.httpClient
        .Post(this.urlAPI + '/employee/division', model)
        .map((response: Response) => response);
    }

    update(user: User) {
        return this.httpClient
        .Put(this.urlAPI + '/updateprofile', user)
        .map((response: Response) => response);
    }

    delete(id: number) {
        return this.httpClient.Delete('/api/users/' + id).map((response: Response) => response.json());
    }

    getPageMenu(userId: string, systemId: string, subsidiary: string, PlatformCode: string) {
        let model: any = {};
        model.UserID = userId;
        model.SystemId = systemId;
        model.SubsidiaryId = subsidiary;
        model.PlatformId = PlatformCode;
        
        return this.httpClient
        .Post(environment.urlEnterpriseService + "/ssocommonservice" + '/menus', model)
        .map((response: Response) => {

            this.allowedListpage = this.convertMenuObj2ListString(response['payload']);
            
            return response;
        });
    }

    convertMenuObj2ListString(response: any) {
        let list: string[] = [];
        response.forEach(obj => {
            obj['menuChils'].forEach(element => {
                list.push(element['pageId']);
            });
        });

        return list;
    }

    getAllowedListPage() {
        if(this.allowedListpage && this.allowedListpage.length > 0) {
            return this.allowedListpage;
        }

        // Get from localStorage
        const currentMenus = JSON.parse(localStorage.getItem("currentmenus"));
        this.allowedListpage = this.convertMenuObj2ListString(currentMenus);
        
        return this.allowedListpage;
    }

    checkPermissionPage(pageName: string) {
        const listAllow = this.getAllowedListPage();
        let listMatch = listAllow.filter(obj => {
            return obj === pageName;
        });

        if(listMatch && listMatch.length > 0) 
            return true;
        
        return false;
    }

    getGenderType() {
        return [{
            "ID": 'M',
            "Name": "Male"
        }, {
            "ID": 'F',
            "Name": "Female"
        }];
    }

    getItAdmin(id: string) {
        return this.httpClient
        .Get(this.urlAPI + '/itadmin/' + id)
        .map((response: Response) => response);
    }

    changePassword(model: any) {
        return this.httpClient
        .Post(environment.urlServiceSSO + '/authentication' + '/changepassword', model)
        .map((response: Response) => response);
    }

    public handleError = (error: Response) => {
        return Observable.throw(error.statusText)
    }

    getStatusSummary(model: any) {
        return this.httpClient
        .Post(this.urlAPI + '/employee/statussummary', model)
        .map((response: Response) => response);
    }

    getUserDetail(model: any) {
        return this.httpClient
        .Post(this.urlAPI2 + 'api/userprofile/getemployeeprivate', model)
        .map((response: Response) => response);
    }
    //get api 
    getUserLogin(userid : number, systemid: string){
        return this.httpClient
        .Get(environment.urlEnterpriseService + `/userprofile/employee/userlogin/${userid}/${systemid}`)
        .map((response: Response) => response);
    }
}